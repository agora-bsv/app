// pages/profile.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase';

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
    <div>
      <h1>Profile Page</h1>
      {/* Add your homepage content here */}
    </div>
  );
};

export default ProfilePage;
