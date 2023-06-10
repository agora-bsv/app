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
        } catch (error) {
          console.error(error);
        }
      }

      const user = auth.currentUser;
      if (user && user.emailVerified) {
        router.push('/profile');
      }
    };

    checkEmailVerification();
  }, []);

  const handleResendEmail = () => {
    const user = auth.currentUser;
    if (user) {
      user.sendEmailVerification();
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


