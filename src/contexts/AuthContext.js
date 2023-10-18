// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Certifique-se de que não estamos inicializando o firebase mais de uma vez
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
  firebase.app(); // se já inicializado, use essa instância
}

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// Provedores de autenticação
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
  const firestore = firebase.firestore();

  const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
  const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);
  const logout = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Limpeza da inscrição ao desmontar
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    auth,
    signInWithGoogle,
    signInWithTwitter,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
