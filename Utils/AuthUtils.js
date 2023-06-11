// AuthUtils.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { auth } from '../firebase';

export const checkEmailVerification = (user, router) => {
  if (!user) {
    // User is not logged in, redirect to the login page
    router.push('/login');
  } else {
    // User is logged in, stay on the current page
    return;
  }
};

export const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const user = auth.currentUser;
    const router = useRouter();

    useEffect(() => {
      checkEmailVerification(user, router);
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
