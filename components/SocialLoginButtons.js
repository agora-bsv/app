// components/SocialLoginButtons.js

import React from 'react';
import { signInWithGoogle } from '../firebase';
import { useRouter } from 'next/router';


const SocialLoginButtons = () => {
    const router = useRouter();
  
    const handleGoogleSignIn = async () => {
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
      <button className="itembutton oauth w-inline-block" onClick={handleGoogleSignIn}>
        <div className="itemobj">
          <div className="fonticon brands"></div>
        </div>
        <div className="itembody">
          <div className="buttontitle _12">Google</div>
        </div>
      </button>
      <button className="itembutton oauth w-inline-block">
        <div className="itemobj">
          <div className="fonticon brands"></div>
        </div>
        <div className="itembody">
          <div className="buttontitle _12">Twitter</div>
        </div>
      </button>
      <button className="itembutton oauth w-inline-block">
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
