// components/Navbar.js

import Link from 'next/link';
import { useAuth } from '../firebase';

const Navbar = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // Redirect the user to the homepage or login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && user.emailVerified && (
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        )}
        {user && !user.emailVerified && (
          <li>
            <Link href="/verify-email">Verify Email</Link>
          </li>
        )}
        <li>
          {user ? (
            <Link href="/" passHref>
              <button onClick={handleLogout}>Logout</button>
            </Link>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
