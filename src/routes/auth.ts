// src/routes/auth.ts

import express from 'express';
import authService from '../services/authService';


const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.body.token;

    try {
        // Pass the token to the authentication service
        const user: any = await authService.authenticate(token);
        console.log(user.data);

        // Define the 'user' property on the 'Session' interface or 'Partial<SessionData>' type
        req.session.user = {
            // unique session id per login
            session_id: user.data.eid,
            name: user.data.au,
            user_id: user.data.user.id
        };

        console.log(req.session.user);

        res.status(200).json({ redirect: '/user' });
    } catch (error: any) {
        // Handle any errors that occurred during authentication
        res.status(500).json({ "error" : error.toString() });
    }
});

export default router;