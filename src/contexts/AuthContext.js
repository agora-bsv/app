// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Ensuring we are not initializing Firebase more than once
if (!firebase.apps.length) {
  // Configurações do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCrV1H9MtTDqFSkmjpHERv-z9QmAeQyR-Q",
    authDomain: "agora-icu.firebaseapp.com",
    databaseURL: "https://agora-icu-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "agora-icu",
    storageBucket: "agora-icu.appspot.com",
    messagingSenderId: "145792888876",
    appId: "1:145792888876:web:57931d3819684722d36189",
    measurementId: "G-B0E791EVNQ"
  };
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that instance
}
const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = firebase.auth();
  // const firestore = firebase.firestore();

  const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
  const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);
  const signInWithHandCash = async () => {
    try {
      const response = await fetch('/api/hc/login');
      const data = await response.json();

      if (response.ok) {
        window.location.href = data.redirectionUrl;
      } else {
        throw new Error(data.message || 'There was an error fetching the redirection URL');
      }
    } catch (error) {
      console.error('Request failure:', error);
    }
  };
  // Retrieve HandCash user details from the cookie
  const getHCUserFromCookie = async () => {
    if (!currentUser) { // Only make the call if we don't have a current user set
      try {
        const response = await fetch('/api/hc/user');
        if (!response.ok) {
          throw new Error('Could not fetch user.');
        }
        const data = await response.json();
        const { displayName, handle, avatarUrl, balance } = data.user;
        setCurrentUser({
          displayName,
          handle,
          photoURL: avatarUrl,
          balance,
          emailVerified: true, // When a user authenticates using a third-party provider, Firebase trusts the information provided by that provider, and we will adopt the same behavior here.
          authService: 'handcash', // Adding the service field
        });
      } catch (error) {
        console.error('Fetching user failed:', error);
        // Handle error, set user as null, or trigger a sign-out, etc.
      }
    }
  };

  const logout = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      // Checking if it's Firebase authentication
      if (firebaseUser) {
        // Identifying the provider used for authentication
        const provider = firebaseUser.providerData[0].providerId; // 'google.com', 'twitter.com', etc.
        const service = provider.split('.')[0]; // 'google', 'twitter', etc.
        const { displayName, email, photoURL, uid } = firebaseUser;

        // Adding the service to the user object
        setCurrentUser({
          displayName,
          email,
          photoURL,
          uid,
          authService: service,
        });
      } else {
        // "If it's not firebase, we try to retrieve the user data from HandCash
        getHCUserFromCookie();
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    auth,
    signInWithGoogle,
    signInWithTwitter,
    signInWithHandCash,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
