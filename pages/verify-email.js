// pages/verify-email.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

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
          router.push('/profile');
        } catch (error) {
          console.error(error);
        }
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
    <div>
      <h1>Verify your email</h1>
      <p>Did not receive an email? <button onClick={handleResendEmail}>Resend</button></p>
    </div>
  );
};

export default VerifyEmailPage;
