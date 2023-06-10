// pages/signup.js

// pages/signup.js

import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { useRouter } from 'next/router';
import SignUpDialog from '../components/SignUpDialog';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';

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
      <PageLayout
        title="AGORA BETA v0.0.1"
        description="This is some text inside of a div block."
        headerObjects={[
          { icon: '' },
          { icon: '', onClick: () => console.log('Perform action') },
        ]}
      >
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
        <div className="footer">{/* Footer content */}</div>
      </PageLayout>
    </Viewport>
  );
};

export default SignUpPage;

