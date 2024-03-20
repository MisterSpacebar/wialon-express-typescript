import express from 'express';
const router = express.Router();

type User = {
    status: boolean;
    session_id: string;
    name: string;
    user_id: number;
};

router.get('/session', (req, res) => {
    console.log('connected to user session route');
    console.log('user: ',req.session.user);
    if (req.session.user) {
      const user: User = {
        status: true,
        session_id: req.session.user.session_id,
        name: req.session.user.name,
        user_id: parseInt(req.session.user.user_id),
      };
  
      res.json({ user });
    } else {
      res.json({ user: { status: false } });
    }
  });

  export default router;