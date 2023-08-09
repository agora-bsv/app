// components/SocialLoginButtons.js

import React from 'react';
import axios from 'axios'; // Import axios library
import { signInWithGoogle, signInWithTwitter } from '../firebase';
import { useRouter } from 'next/router';

const SocialLoginButtons = ( { redirectionUrl }) => {
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

  const handleTwitterSignIn = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      await signInWithTwitter();
      console.log('Twitter login successful');
      router.push('/profile');
    } catch (error) {
      console.error('Error signing in with Twitter:', error);
    }
  };

  const handleHandCashSignIn = (e) => {
    e.preventDefault(); // Prevent form submission
  
    // const appId = process.env.HANDCASH_APP_ID;
    // const handCashAuthorizationUrl = `https://app.handcash.io/#/authorizeApp?appId=64854683e492acda99fc0ab6`;
  
    window.location.href = redirectionUrl;
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
      <button className="itembutton oauth" onClick={handleTwitterSignIn}>
        <div className="itemobj">
          <div className="fonticon brands"></div>
        </div>
        <div className="itembody">
          <div className="buttontitle _12">Twitter</div>
        </div>
      </button>
      <button className="itembutton oauth" onClick={handleHandCashSignIn}>
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
