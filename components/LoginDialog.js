// components/LoginDialog.js

import React, { useState } from 'react';
import Link from 'next/link';
import SocialLoginButtons from './SocialLoginButtons';
import { useAuth } from '../src/contexts/AuthContext';
// import dynamic from 'next/dynamic';

// const SocialLoginButtons = dynamic(
//   () => import('./SocialLoginButtons'),
//   { ssr: false }
// );

const LoginDialog = ({ router }) => {
  const { signInWithGoogle, auth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Enter your email');
      return;
    }

    try {
      await auth.sendPasswordResetEmail(email);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      console.log('Google login successful');
      router.push('/profile'); // Redirect to the profile page
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

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
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Login successful');
      router.push('/profile'); // Redirect to the profile page
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Email/Password invalid');
    }
  };

  return (
    <div className="dialogwrapper">
      <form id="login-form" name="login-form" data-name="Login Form" method="get" className="dialog">
        <div className="dialogcover"></div>
        <div className="dialogform">
          <div className="dialogheading">Login</div>
          <div className="dialogtxt">Welcome back</div>
          <div className="iteminput">
            <div className="itemobj">
              <div className="fonticon"></div>
            </div>
            <div className="itembody">
              <input
                type="email"
                className="text-field"
                name="Email"
                data-name="Email"
                placeholder="Enter your email"
                id="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                  setLoginError('');
                }}
              />
            </div>
          </div>
          <div className="iteminput">
            <div className="itemobj">
              <div className="fonticon"></div>
            </div>
            <div className="itembody">
              <input
                type="password"
                className="text-field"
                name="Password"
                data-name="Password"
                placeholder="Enter your Password"
                id="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                  setLoginError('');
                }}
              />
            </div>
          </div>
          <button type="submit" className="submitbutton w-inline-block" onClick={handleLogin}>
            <div className="itemobj">
              <div className="fonticon"></div>
            </div>
            <div className="buttontitle">Login</div>
          </button>
          <div className="dialogtxt">Or login with:</div>
          <SocialLoginButtons handleGoogleSignIn={handleGoogleSignIn} />
          <div className="dialogtxt _12">
            Do not have an account?{' '}
            <Link href="/signup" className="link">Sign Up</Link>
            <br />
            Forgot password?{' '}
            <a className="link" onClick={handleReset}>Reset</a>
            <br />
          </div>
          {emailError && <div className="dialogtxt error">{emailError}</div>}
          {passwordError && <div className="dialogtxt error">{passwordError}</div>}
          {loginError && <div className="dialogtxt error">{loginError}</div>}
        </div>
      </form>
    </div>
  );
};

export default LoginDialog;
