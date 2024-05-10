// src/routes/auth.ts

import express from 'express';
import authService from '../services/authService';

const router = express.Router();

type user = {
    session_id: string;
    name: string;
    user_id: number;
};

router.post('/token-login', async (req: express.Request, res: express.Response) => {
    console.log(req.body.accessToken);
    console.log('token-login route');
    const authToken = req.body.accessToken;

    try {
        const user: any = await authService.authenticate(authToken as string);

        if (user) {
            console.log('Authentication successful');
            // Define the 'user' property on the 'Session' interface or 'Partial<SessionData>' type
            req.session.user = {
                // unique session id per login
                // WARNING: express sessions do not scale well
                //
                session_id: user.eid,
                name: user.au,
                user_id: user.user.id
            };
            req.session.save( (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log('Session saved');
                    console.log("post-save: ",req.session.user);
                    res.send(req.session.user);
                }
            });

        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (err) {
        res.status(500).send('Authentication failed');
    }
});

export default router;