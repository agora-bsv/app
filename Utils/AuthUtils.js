// AuthUtils.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase';

export const checkAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkEmailVerification = () => {
      const user = auth.currentUser;
      if (!user) {
        // User is not logged in, redirect to the login page
        router.push('/login');
      } else if (user.emailVerified) {
        // User is logged in and email is verified, stay on the current page
        return;
      } else {
        // User is logged in but email is not verified, redirect to the verify-email page
        router.push('/verify-email');
      }
    };

    checkEmailVerification();
  }, []);
};


