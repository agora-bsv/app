// pages/verify-email.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';
import { withAuth } from '../utils/AuthUtils';
import Dialog from '../components/Dialog';

const VerifyEmailPage = () => {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

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
          const isSocialLoginUser = user.providerData.length > 0;
          if (isSocialLoginUser) {
            router.push('/profile'); // Redirect to /profile directly for social login users
          }
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
        .then(() => {
          console.log('Email verification sent');
          setEmailSent(true);
        })
        .catch((error) => {
          console.error('Error sending email verification:', error);
          setEmailSent(false);
        });
    }
  };

  const handleRefresh = () => {
    router.reload();
  };

  const title = 'Verify Email';
  const description = 'Verify your email';
  const headerObjects = [
    { icon: '' },
    { icon: '', onClick: handleRefresh },
  ];

  return (
    <Viewport>
      <PageLayout title={title} description={description} headerObjects={headerObjects}>
        <Dialog>
          <div className="dialogheading">Verify your email</div>
          <div className="dialogtxt">Did not receive an email? Make sure to check your updates or spam folder.</div>
          <button type="button" className="submitbutton" onClick={handleResendEmail} disabled={emailSent}>
            <div className="fonticon"></div>
            <div className="buttontitle">{emailSent ? 'Sent. Check your inbox' : 'Resend'}</div>
          </button>
        </Dialog>
        <div className="footer">
          {/* Footer content */}
        </div>
      </PageLayout>
    </Viewport>
  );
};

export default withAuth(VerifyEmailPage);


