// components/SocialLoginButtons.js

import React from 'react';
import { signInWithGoogle } from '../firebase';
import { useRouter } from 'next/router';


const SocialLoginButtons = () => {
    const router = useRouter();
  
    const handleGoogleSignIn = async (e) => {
      e.preventDefault(); // Prevent form submission
  
      try {
        await signInWithGoogle();
        console.log('Google login successful');
        router.push('/profile');
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };

  return (
    <div className="oauthgrid">
      <button type="button" className="itembutton oauth" onClick={handleGoogleSignIn}>
        <div className="itemobj">
          <div className="fonticon brands"></div>
        </div>
        <div className="itembody">
          <div className="buttontitle _12">Google</div>
        </div>
      </button>
      <button className="itembutton oauth">
        <div className="itemobj">
          <div className="fonticon brands"></div>
        </div>
        <div className="itembody">
          <div className="buttontitle _12">Twitter</div>
        </div>
      </button>
      <button className="itembutton oauth">
        <div className="itemobj">
          <img
            src="https://uploads-ssl.webflow.com/647fa62eb19b9b9e23cdc100/648029610832005036e0f702_hc.svg"
            loading="lazy"
            alt=""
            className="icon"
          />
        </div>
        <div className="itembody">
          <div className="buttontitle _12">Handcash</div>
        </div>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
