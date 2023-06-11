// netlify/functions/handcashRedirect.js

const { HandCashConnect } = require("@handcash/handcash-connect");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const appId = process.env.HANDCASH_APP_ID;
  const appSecret = process.env.HANDCASH_APP_SECRET;

  const handCashConnect = new HandCashConnect({
    appId: appId,
    appSecret: appSecret,
    environment: "PRODUCTION"  // You might want to make this configurable too
  });

  const redirectionUrl = handCashConnect.getRedirectionUrl();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow requests from any origin
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, OPTIONS" // Add the allowed HTTP methods
    },
    body: JSON.stringify({ redirectionUrl })
  };
};

