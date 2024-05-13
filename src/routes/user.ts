// auth.ts
import express from 'express';

const router = express.Router();

// Define the 'user' property on the 'Session' interface or 'Partial<SessionData>' type
router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

export default router;