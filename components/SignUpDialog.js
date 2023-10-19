// components/SignupDialog.js

import React, { useState } from 'react';
import Link from 'next/link';
import SocialLoginButtons from './SocialLoginButtons';
import { useAuth } from '../src/contexts/AuthContext';

const SignUpDialog = ({
  email,
  setEmail,
  password,
  setPassword,
  handleGoogleSignIn,
}) => {
  const { auth } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');

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

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Enter your email');
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    // Clear any previous errors
    setEmailError('');
    setPasswordError('');
    setSignupError('');

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      if (user) {
        // User creation successful
        console.log('User created:', user);
      } else {
        // User creation failed
        console.error('Failed to create user');
      }
    } catch (error) {
      // Handle specific error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          setSignupError('An account already exists with this email.');
          break;
        default:
          setSignupError(error.message);
          break;
      }
    }
  };

  return (
    <div className="dialogwrapper">
      <form
        id="email-form"
        name="email-form"
        data-name="Email Form"
        method="get"
        className="dialog"
        onSubmit={(e) => handleSignUpSubmit(e)}
      >
        <div className="dialogcover"></div>
        <div className="dialogform">
          <div className="dialogheading">Sign Up</div>
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
                  setSignupError('');
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
                  setSignupError('');
                }}
              />
            </div>
          </div>
          <button type="submit" className="submitbutton">
            <div className="itemobj">
              <div className="fonticon"></div>
            </div>
            <div className="buttontitle">Sign Up</div>
          </button>
          <div className="dialogtxt">Or login with:</div>
          <SocialLoginButtons handleGoogleSignIn={handleGoogleSignIn} />
          <div className="dialogtxt _12">
            Got an account? <Link href="/login" className="link">Login</Link>
            <br />
            Forgot password? <a className="link" onClick={handleReset}>Reset</a>
          </div>
          {emailError && <div className="dialogtxt error">{emailError}</div>}
          {passwordError && <div className="dialogtxt error">{passwordError}</div>}
          {signupError && <div className="dialogtxt error">{signupError}</div>}
        </div>
      </form>
    </div>
  );
};

export default SignUpDialog;