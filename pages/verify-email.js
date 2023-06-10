// pages/verify-email.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import Viewport from '../components/Viewport';

const VerifyEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      const oobCode = urlParams.get('oobCode');

      if (mode === 'verifyEmail' && oobCode) {
        try {
          await auth.applyActionCode(oobCode);
          await auth.currentUser.reload();
        } catch (error) {
          console.error('Error applying action code:', error);
        }
      }

      const user = auth.currentUser;
      if (user) {
        console.log('User is logged in');
        if (user.emailVerified) {
          console.log('Email is verified');
          router.push('/profile');
        } else {
          console.log('Email is not verified');
        }
      }
    };

    checkEmailVerification();
  }, []);

  const handleResendEmail = () => {
    const user = auth.currentUser;
    if (user) {
      user.sendEmailVerification()
        .then(() => console.log('Email verification sent'))
        .catch((error) => console.error('Error sending email verification:', error));
    }
  };

  return (
    <Viewport>
      <div>
        <h1>Verify your email</h1>
        <p>Did not receive an email? <button onClick={handleResendEmail}>Resend</button></p>
      </div>
    </Viewport>
  );
};

export default VerifyEmailPage;
