// /netlify/functions/handcash-callback.js
const sessionTokenRepository = require("./sessionTokenRepository");

export default async function handler(req, res) {
  const { authToken } = req.query;

  // Make API requests to HandCash or perform necessary operations with the authToken
  // ...

  // Generate a unique sessionId using a library like uuid
  const sessionId = generateSessionId(); // Implement your own function to generate sessionId

  // Generate the sessionToken using your preferred method (e.g., JWT)
  const sessionToken = generateSessionToken(authToken, sessionId); // Implement your own function to generate sessionToken

  // Store the sessionToken and associated data in your data store
  sessionTokenRepository.set(sessionToken, { authToken, sessionId, profile });

  // Redirect the user to the wallet page with the sessionToken parameter
  return res.redirect(`/wallet?sessionToken=${sessionToken}`);
}
