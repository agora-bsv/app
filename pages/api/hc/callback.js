import {v4 as uuidv4} from 'uuid';
import AuthTokenRepository from "../../../src/repositories/AuthTokenRepository";
import HandCashService from "../../../src/services/HandCashService";
import SessionTokenRepository from "../../../src/repositories/SessionTokenRepository";

export default async function handler(req, res) {
    try {
        const {authToken} = req.query;

        // Check if authToken is not undefined or null
        if (!authToken) {
            throw new Error("AuthToken is missing from the query parameters.");
        }

        const handCashService = new HandCashService(authToken);
        const {publicProfile} = await handCashService.getProfile();
        const balance = await handCashService.getBalance();

        const payload = {
            sessionId: uuidv4(),
            user: {
                handle: publicProfile.handle,
                displayName: publicProfile.displayName,
                avatarUrl: publicProfile.avatarUrl,
                balance,
            },
        };

        const sessionToken = SessionTokenRepository.generate(payload);
        AuthTokenRepository.setAuthToken(authToken, payload.sessionId);

        // Set cookie
        res.setHeader('Set-Cookie', `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Strict`);

        // Redirect user
        return res.redirect(`/wallet`);
    } catch (error) {
        console.error('Error in /api/hc/callback:', error);

        // Send an error response
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
