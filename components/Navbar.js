// components/Navbar.js

import Link from 'next/link';
import { useAuth } from '../src/contexts/AuthContext';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  console.log('Navbar currentUser', currentUser)

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     // redirect to login page
  //     router.push('/login');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleLogout = async () => {
    if (currentUser.authService === 'handcash') {
      await fetch('/api/hc/logout', {
        method: 'POST',
      });
      window.location.href = "/login";
      
    } else {
      try {
        await logout();
        // Redirect the user to the homepage or login page
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
      }
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
        <Link href="/crowdfunding" className="navlink">
          <div className="navicon">{String.fromCodePoint(0xf4c0)}</div>
          <div className="navlabel">Crowd Funding</div>
        </Link>
        {currentUser?.authService === 'handcash' &&
        <Link href="/wallet" className="navlink">
          <div className="navicon"></div>
          <div className="navlabel">Wallet</div>
        </Link>}
        {currentUser && !currentUser.emailVerified && (
                <Link href="/verify-email" className="navlink">
                  <div className="navicon"></div>
                  <div className="navlabel">Verify Email</div>
                </Link>
        )}
        {currentUser ?
        <>
        <Link href="/profile" className="navlink">
          <div className="navicon"></div>
          <div className="navlabel">Profile</div>
        </Link>
        <Link href="/" className="navlink" onClick={handleLogout}>
              <div className="navicon"></div>
              <div className="navlabel">Logout</div>
        </Link>
        </>
        : (
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
