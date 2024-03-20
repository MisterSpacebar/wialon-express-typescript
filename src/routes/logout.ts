import { Request, Response } from 'express';
import { logout } from '../services/logoutService';

export const logoutRoute = (req: Request, res: Response) => {
  logout(req, res).then(() =>{
    console.log('connected to logout route')
    res.redirect('/');
  });
};