// pages/login.js

import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { useRouter } from 'next/router';
import LoginDialog from '../components/LoginDialog';
import Viewport from '../components/Viewport';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setEmailError('Enter your email');
      return;
    }
  
    if (!password) {
      setPasswordError('Enter your password');
      return;
    }
  
    try {
      console.log('Attempting login');
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Email/Password invalid');
    }
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          router.push('/profile');
        } else {
          router.push('/verify-email');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      console.log('Attempting Google login from LoginPage');
      await signInWithGoogle();
      console.log('Google login successful from LoginPage');
      router.push('/profile');
    } catch (error) {
      console.error('Error signing in with Google from LoginPage:', error);
    }
  };
  

  return (
    <Viewport>
      <div className="header">
        <div className="headerobj">
          <div className="fonticon"></div>
        </div>
        <div className="headerbody">
          <div className="headertitle">AGORA BETA v0.0.1</div>
          <div className="headerdescription">This is some text inside of a div block.</div>
        </div>
        <div className="headerobj">
          <div className="fonticon"></div>
        </div>
      </div>
      <div className="body">
       <LoginDialog router={router}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleGoogleSignIn={handleGoogleSignIn}
          emailError={emailError}
          passwordError={passwordError}
          loginError={loginError}
        />
      </div>
      <div>
        <div className="footer">{/* Footer content */}</div>
      </div>
    </Viewport>
  );
};

export default LoginPage;
