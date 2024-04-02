import express from 'express';

const router = express.Router();

router.post('/unit-upload', (req, res) => {
  console.log('connected to register route');
  res.send('connected to register route');
});

export default router;