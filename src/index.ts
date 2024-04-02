import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { Application, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path = require('path');

// Import the routes
import authRouter from './routes/auth';
import { logoutRoute } from './routes/logout';
import userSessionRouter from './routes/userSession';
import unitRouter from './routes/allUnits';
import uploadRouter from './routes/register';

const app: Application = express();
const portExpress: number = 3000;
const portVite: number = 5173;

// This line is needed to parse the body of incoming JSON requests
app.use(express.json());
// Set up the CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow the React application to connect to the server
  credentials: true // Set this to true to allow the session cookie to be sent back and forth
}));

const sessionOptions: session.SessionOptions = {
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto', maxAge: 300000 }
};

app.use(session(sessionOptions));

// Set up the login route
app.use('/auth', authRouter);
// set up the /logout route
app.get('/logout', logoutRoute);
// Set up the user session route
app.use('/user', userSessionRouter);
// Set up the units route
app.use('/units', unitRouter);
// Set up the upload route
app.use('/unit-upload', uploadRouter);

// Proxy requests to the Vite development server during development
if (process.env.NODE_ENV === 'development') {
  const viteServerProxy = createProxyMiddleware({
    target: `http://localhost:${portVite}`, // Vite development server default port
    ws: true,
  });
  app.use(viteServerProxy);
}

// Serve the React application's build files in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/wialon-portal/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(portExpress, () => {
  console.log(`Server is running on http://localhost:${portExpress}`);
});