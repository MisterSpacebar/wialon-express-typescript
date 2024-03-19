import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionId = req.session.id; // Replace this with how you retrieve the session ID
    console.log(sessionId);
    const response = await fetch(`https://hst-api.wialon.com/wialon/ajax.html?svc=core/logout&params={}&sid=${sessionId}`);

    // If the Wialon API responds with a success status, destroy the session
    if (response.status === 200) {
        req.session.destroy((err) => {
            if (err) {
              // Handle error
              console.log(err);
              res.status(500).json({ message: 'Could not log out, please try again' });
            } else {
              // Session destroyed successfully
              res.status(200).json({ message: 'Logged out successfully' });
            }
          });
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(500).json({ message: 'Could not log out, please try again' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Could not log out, please try again' });
  }
};