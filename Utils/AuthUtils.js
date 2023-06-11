// AuthUtils.js

import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

import { auth } from '../firebase';

export const checkEmailVerification = (user, router) => {
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

export const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const user = auth.currentUser;
    const router = useRouter(); // Use useRouter

    useEffect(() => {
      checkEmailVerification(user, router);
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
