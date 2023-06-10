// pages/profile.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';

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

      const title = 'Profile';
    const description = 'This is your profile page';
    const headerObjects = [
      { icon: '' },
      { icon: '', onClick: () => console.log('Perform action') },
    ];

  return (
    <Viewport>
     <PageLayout title={title} description={description} headerObjects={headerObjects}>     
        <div className="body">
          {/* Body content */}
        </div>
        <div className="footer">
          {/* Footer content */}
        </div>
      </PageLayout>
    </Viewport>
  );
};

export default ProfilePage;

