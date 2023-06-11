// netlify/functions/session-tokens.js

const jwt = require('jsonwebtoken');

const { v4: uuidv4 } = require('uuid');

const sessionTokens = new Map();

function generate(payload) {
  const sessionId = uuidv4();
  const sessionToken = generateSessionToken(payload, sessionId);
  sessionTokens.set(sessionToken, payload);
  return sessionToken;
}

function getSessionPayload(sessionToken) {
  return sessionTokens.get(sessionToken);
}

function removeSessionToken(sessionToken) {
  sessionTokens.delete(sessionToken);
}

function generateSessionToken(payload, sessionId) {
    const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return sessionToken;
  }
  

module.exports = {
  generate,
  getSessionPayload,
  removeSessionToken
};
