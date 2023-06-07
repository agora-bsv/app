// components/LoginDialog.js

import React, { useState } from 'react';
import Link from 'next/link';
import { auth, googleAuthProvider } from '../firebase'; // Import the auth and googleAuthProvider objects from your Firebase configuration file

const LoginDialog = () => {
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
      await auth.signInWithPopup(googleAuthProvider);
      console.log('Google login successful');
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
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Email/Password invalid');
    }
  };

  return (
    <div className="dialogwrapper w-form">
      <form id="email-form" name="email-form" data-name="Email Form" method="get" className="dialog">
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
                className="text-field w-input"
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
                className="text-field w-input"
                name="Password-2"
                data-name="Password 2"
                placeholder="Enter your Password"
                id="Password-2"
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
          <div className="oauthgrid">
            <button href="#" className="itembutton oauth w-inline-block" onClick={handleGoogleSignIn}>
              <div className="itemobj">
                <div className="fonticon brands"></div>
              </div>
              <div className="itembody">
                <div className="buttontitle _12">Google</div>
              </div>
            </button>
            <button href="#" className="itembutton oauth w-inline-block">
              <div className="itemobj">
                <div className="fonticon brands"></div>
              </div>
              <div className="itembody">
                <div className="buttontitle _12">Twitter</div>
              </div>
            </button>
            <button href="#" className="itembutton oauth w-inline-block">
              <div className="itemobj">
                <img src="https://uploads-ssl.webflow.com/647fa62eb19b9b9e23cdc100/648029610832005036e0f702_hc.svg" loading="lazy" alt="" className="icon" />
              </div>
              <div className="itembody">
                <div className="buttontitle _12">Handcash</div>
              </div>
            </button>
          </div>
          <div className="dialogtxt _12">
            Don't have an account?{' '}
            <Link href="/signup" className="link">Sign Up</Link>
            <br />
            Forgot password?{' '}
            <a className="link" onClick={handleReset}>Reset</a>
            <br />
            {/* Quick login?{' '} */}
            {/* <button className="link" onClick={handleQuickLogin}>Send link</button> */}
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
