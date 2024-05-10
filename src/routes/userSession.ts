import express from 'express';
const router = express.Router();

type User = {
    status: boolean;
    session_id: string;
    name: string;
    user_id: number;
};

let fetchCount: number = 1;

router.get('/session', (req, res) => {
    console.log('(express/src/user) connected to user session route');
    console.log('(express/src/user) user: ',req.session.user);
    if (req.session.user) {
      console.log('(express/src/user) User session found', req.session.user);
      const user: User = {
        status: true,
        session_id: req.session.user.session_id,
        name: req.session.user.name,
        user_id: parseInt(req.session.user.user_id),
      };
      console.log('fetch count (session): ', fetchCount);
      fetchCount++;

      console.log('User Object:', user);
  
      res.json({ user });
    } else {
      console.log('(express/src/user) User session not found');
      res.json({ user: { status: false } });
    }
  });

  export default router;