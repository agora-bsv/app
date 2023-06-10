// pages/signup.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, signInWithGoogle } from '../firebase';
import SignUpDialog from '../components/SignUpDialog';
import Viewport from '../components/Viewport';

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleSignUp = async () => {
    if (!email) {
      setEmailError('Enter your email');
      return;
    }

    if (!password) {
      setPasswordError('Enter your password');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await user.sendEmailVerification();
      router.push('/verify-email');
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/profile');
    } catch (error) {
      console.error('Error signing in with Google:', error);
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
        <SignUpDialog
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
          handleGoogleSignIn={handleGoogleSignIn}
          emailError={emailError}
          passwordError={passwordError}
          signupError={signupError}
        />
      </div>
      <div>
        <div className="footer">{/* Footer content */}</div>
      </div>
    </Viewport>
  );
};

export default SignUpPage;
