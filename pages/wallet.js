// /pages/wallet.js

import React from "react";
import { useRouter } from "next/router";
import HandCashService from '../src/services/HandCashService';
import SessionTokenRepository from "../src/repositories/SessionTokenRepository";

export function getServerSideProps({query}) {
  const {sessionToken} = query;
  const redirectionUrl = new HandCashService().getRedirectionUrl();
  try {
      return {
          props: {
              redirectionUrl,
              sessionToken: sessionToken || false,
              user: sessionToken ? SessionTokenRepository.decode(sessionToken).user : false,
          },
      };
  } catch (error) {
      console.log(error);
      return {
          props: {
              redirectionUrl,
              sessionToken: false,
              user: false,
          },
      };
  }
}

const WalletPage = ({ user }) => {
  console.log('user: ', user);
  return (
    <div>
      <h1>Welcome, {user.handle}!</h1>
      <img src={user.avatarUrl} />
      <p>displayName: {user.displayName}</p>
      <p>Balance ({user.balance.fiatCurrencyCode}): {user.balance.fiatBalance}</p>
      <p>Balance (Satoshi): {user.balance.satoshiBalance}</p>	

      {/* <p>Permissions: {user.permissions.join(", ")}</p> */}
      {/* Add your wallet UI components here */}
    </div>
  );
};

export default WalletPage;
