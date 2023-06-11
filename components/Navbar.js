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
    <div className="navbar">
        <Link href="/" className="navlink">
        <img className="imgicon" src="https://uploads-ssl.webflow.com/5ef3b5428f4b7952587ac1df/648532fe14507f85e6f53994_agora.svg" />
          <div className="navlabel">AGORA</div>
        </Link>
        <Link href="#" className="navlink">
          <div className="navicon"></div>
          <div className="navlabel">Post</div>
        </Link>
        <Link href="#" className="navlink">
          <div className="navicon"></div>
          <div className="navlabel">Browse</div>
        </Link>
        <Link href="#" className="navlink">
          <div className="navicon"></div>
          <div className="navlabel">Chat</div>
        </Link>
        <Link href="#" className="navlink">
          <div className="navicon"></div>
          <div className="navlabel">Wallet</div>
        </Link>
        {user ? (
          <>
            {user.emailVerified && (
              <Link href="/profile" className="navlink">
                <div className="navicon"></div>
                <div className="navlabel">Profile</div>
              </Link>
            )}
            {!user.emailVerified && (
              <Link href="/verify-email" className="navlink">
                <div className="navicon"></div>
                <div className="navlabel">Verify Email</div>
              </Link>
            )}
            <Link href="/" className="navlink" onClick={handleLogout}>
              <div className="navicon"></div>
              <div className="navlabel">Logout</div>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="navlink">
              <div className="navicon"></div>
              <div className="navlabel">Login</div>
            </Link>
            <Link href="/signup" className="navlink">
              <div className="navicon"></div>
              <div className="navlabel">Sign Up</div>
            </Link>
          </>
        )}
    </div>
  );
};

export default Navbar;
