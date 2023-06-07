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
      if (user && !user.emailVerified) {
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

