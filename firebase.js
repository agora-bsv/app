// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseConfig } from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
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
