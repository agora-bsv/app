// netlify/functions/handcash-callback.js

const HandCashService = require("@handcash/handcash-connect").HandCashService;
const SessionTokenRepository = require("./sessionTokenRepository"); // Replace with your session token repository implementation

exports.handler = async (event, context) => {
  const { authToken } = event.queryStringParameters;

  try {
    const { publicProfile } = await new HandCashService(authToken).getProfile();

    const payload = {
      sessionId: generateSessionId(),
      user: {
        handle: publicProfile.handle,
        balance: publicProfile.balance, // Replace with the appropriate balance field from the HandCash response
        permissions: publicProfile.permissions, // Replace with the appropriate permissions field from the HandCash response
      },
    };

    const sessionToken = SessionTokenRepository.generate(payload);

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionToken }),
    };
  } catch (error) {
    console.error("Error processing HandCash login:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
