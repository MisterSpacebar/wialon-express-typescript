import { Request, Response } from 'express';
import { logout } from '../services/logoutService';

export const logoutRoute = (req: Request, res: Response) => {
  logout(req, res);
};