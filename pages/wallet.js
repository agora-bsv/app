// /pages/wallet.js

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../src/contexts/AuthContext'; 
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';

const WalletPage = () => {
  // const user = handcashUser;
  // useEffect(() => {
  //   if (window.location.search.includes('reload=true')) {
  //     window.location.href = '/wallet';
  //   }
  // }, []);
  const { currentUser } = useAuth();
  const user = currentUser;
  const title = 'Wallet';
  const description = 'This is your wallet page';
  const headerObjects = [
    { icon: '' },
    { icon: '', onClick: () => console.log('Perform action') },
  ];

  return (
    <Viewport>
    <PageLayout title={title} description={description} headerObjects={headerObjects}>
    <div>
      { user ? 
      <>
        <h1>Welcome, {user.displayName}!</h1>
        <img src={user.photoURL} />
        <p>handle: @{user.handle}</p>
        <p>Balance ({user.balance.fiatCurrencyCode}): {user.balance.fiatBalance}</p>
        <p>Balance (Satoshi): {user.balance.satoshiBalance}</p>	

        {/* <p>Permissions: {user.permissions.join(", ")}</p> */}
        {/* Add your wallet UI components here */}
      </>
      : <p>Loading...</p>}
      
    </div>
    </PageLayout>
  </Viewport>
    
  );
};

export default WalletPage;
