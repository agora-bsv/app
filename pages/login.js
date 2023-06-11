// pages/login.js

import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { useRouter } from 'next/router';
import LoginDialog from '../components/LoginDialog';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';

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
      <PageLayout
        title="Login"
        description="Welcome back, fellow human."
        headerObjects={[
          { icon: '' },
          { icon: '', onClick: () => console.log('Perform action') },
        ]}>
            <LoginDialog
            router={router}
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
          <div className="footer">{/* Footer content */}</div>
      </PageLayout>
    </Viewport>
  );
};

export default LoginPage;
