// pages/profile.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase';
import Viewport from '../components/Viewport';

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkEmailVerification = () => {
      const user = auth.currentUser;
      if (!user) {
        // User is not logged in, redirect to the login page
        router.push('/login');
      } else if (user.emailVerified) {
        // User is logged in and email is verified, stay on the profile page
        return;
      } else {
        // User is logged in but email is not verified, redirect to the verify-email page
        router.push('/verify-email');
      }
    };

    checkEmailVerification();
  }, []);

  return (
    <Viewport>
      <div className="header">
        <div className="headerobj">
          <div className="fonticon"></div>
        </div>
        <div className="headerbody">
          <div className="headertitle">Profile Page</div>
          <div className="headerdescription">This is your profile page</div>
        </div>
        <div className="headerobj">
          <div className="fonticon"></div>
        </div>
      </div>
      <div className="body">
        {/* Body content */}
      </div>
      <div className="footer">
        {/* Footer content */}
      </div>
    </Viewport>
  );
};

export default ProfilePage;