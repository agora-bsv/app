// netlify/functions/handcash-callback.js


const sessionTokenRepository = require('./session-tokens');

export default async function handler(req, res) {
  const { authToken } = req.query;

  // Get the user's public profile using the authToken
  const publicProfile = await new HandCashService(authToken).getProfile();

  const payload = {
    sessionId: uuidv4(),
    user: {
      handle: publicProfile.handle,
      displayName: publicProfile.displayName,
      avatarUrl: publicProfile.avatarUrl,
    },
  };

  // Generate a session token based on the payload
  const sessionToken = sessionTokenRepository.generate(payload);

  // Redirect the user to the home page with the sessionToken parameter
  return res.redirect(`/wallet?sessionToken=${sessionToken}`);

}
