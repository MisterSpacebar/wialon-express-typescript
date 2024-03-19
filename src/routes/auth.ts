// src/routes/auth.ts

import express from 'express';
import authService from '../services/authService';


const router = express.Router();

router.get('/redirect', async (req, res) => {
    console.log(req);
    const authToken = req.query.access_token;

    try {
        const user: any = await authService.authenticate(authToken as string);

        // Define the 'user' property on the 'Session' interface or 'Partial<SessionData>' type
        req.session.user = {
            // unique session id per login
            session_id: user.data.eid,
            name: user.data.au,
            user_id: user.data.user.id
        };
        console.log(req.session.user);
        res.send('Authentication successful');
    } catch (err) {
        res.status(500).send('Authentication failed');
    }
});

export default router;