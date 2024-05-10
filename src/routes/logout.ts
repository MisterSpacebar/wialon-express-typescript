import { Request, Response } from 'express';
import { logout } from '../services/logoutService';

export const logoutRoute = (req: Request, res: Response) => {
  logout(req, res).then(() =>{
    console.log('connected to logout route');
    // req.session.destroy((err: any) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).json({ message: 'Could not log out, please try again' });
    //   } else {
    //     res.status(200).json({ message: 'Logged out successfully' });
    //   }
    // });
    req.session.user = {
      session_id: '',
      name: '',
      user_id: ''
    };
    req.session.save( (err) => {
        if(err){
            console.log(err);
        } else {
            console.log('(express/routes/logout) user is now blank: ',req.session.user);
        }
    });
    res.redirect('/');
  });
};