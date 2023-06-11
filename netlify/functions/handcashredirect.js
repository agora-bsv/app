// netlify/functions/handcashredirect.js

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
    environment: "PRODUCTION" // You might want to make this configurable too
  });

  const redirectionUrl = handCashConnect.getRedirectionUrl();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Allow requests from any origin
    },
    body: JSON.stringify({ redirectionUrl })
  };
};


