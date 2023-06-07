// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import dotenv from 'dotenv';

dotenv.config();

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  });
}

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
