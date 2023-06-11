// /api/functions/handcash-callback.js

import { HandCashConnect } from '@handcash/handcash-connect';

export async function handler(event, context) {
  const { HC_APP_ID, HC_APP_SECRET } = process.env;
  const { queryParameters } = event;

  const authToken = queryParameters.authToken; // Retrieve the authToken from the query parameters

  if (authToken) {
    try {
      // Initialize HandCashConnect SDK with app ID and app secret
      const handCashConnect = new HandCashConnect({
        appId: HC_APP_ID,
        appSecret: HC_APP_SECRET,
      });

      // Initialize user account and perform necessary actions based on the callback
      const account = handCashConnect.getAccountFromAuthToken(authToken);
      // Perform actions as required
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return {
    statusCode: 200,
    body: 'Callback received',
  };
}
