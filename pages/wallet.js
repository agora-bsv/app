// /pages/wallet.js

import { useEffect } from 'react';
import dynamic from 'next/dynamic'; // Dynamic import for server-side only code

const WalletPage = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authToken = urlParams.get('authToken');

      if (authToken) {
        try {
          const { getAccountFromAuthToken } = await import('@handcash/handcash-connect');
          const handCashConnect = new getAccountFromAuthToken({
            appId: '64854683e492acda99fc0ab6',
          });

          const account = handCashConnect.getAccountFromAuthToken(authToken);
          const { publicProfile } = await account.profile.getCurrentProfile();
          const balance = await account.wallet.getSpendableBalance();
          const permissions = await account.profile.getPermissions();

          console.log('User $handle:', publicProfile.handle);
          console.log('User balance:', balance);
          console.log('User permissions:', permissions);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    handleRedirect();
  }, []);

  return (
    <div>
      <h1>Wallet Page</h1>
      {/* Display user's $handle, balance, and permissions */}
    </div>
  );
};

export default WalletPage;
