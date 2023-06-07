// firebase.js

import dotenv from 'dotenv';
dotenv.config();

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Enable Google sign-in provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  return auth.signInWithPopup(googleProvider);
};

// Create a Firebase auth context
export const AuthContext = createContext();

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap the app and provide the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = () => {
    return auth.signOut();
  };

  const value = {
    user,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

