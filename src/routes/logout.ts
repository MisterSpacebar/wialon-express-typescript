import { Request, Response } from 'express';
import { logout } from '../services/logoutService';

export const logoutRoute = (req: Request, res: Response) => {
  logout(req, res).then(() =>{
    console.log('connected to logout route');
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Could not log out, please try again' });
      } else {
        res.status(200).json({ message: 'Logged out successfully' });
      }
    });
    res.redirect('/');
  });
};