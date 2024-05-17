import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { Application, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path  from 'path';

// Import the routes
import authRouter from './routes/auth';
import { logoutRoute } from './routes/logout';
import userSessionRouter from './routes/userSession';
import unitRouter from './routes/allUnits';
import uploadRouter from './routes/register';
import hardwareIDRouter from './routes/hardwareID';

const app: Application = express();

const portExpress: number = 3000;
const portVite: number = 5173;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/wialon-portal/dist')));

// This line is needed to parse the body of incoming JSON requests
app.use(express.json());
// Set up the CORS middleware
app.use(cors({
  origin: `http://172.16.1.202:${portVite}`, // Allow the React application to connect to the server
  credentials: true // Set this to true to allow the session cookie to be sent back and forth
}));

const sessionOptions: session.SessionOptions = {
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto', maxAge: 300000 }
};

app.use(session(sessionOptions));

// Define the structure of the user session interface
declare module 'express-session' {
  export interface SessionData {
    user?: { session_id: string; name: string; user_id: string; };
    //user?: { [key: string]: any };
  }
}

// Define the structure of each unit group object
interface UnitGroup {
  nm: string;         // Name
  cls: number;        // Class
  id: number;         // ID
  mu: number;         // MU (some kind of measurement or flag)
  u: number[];        // An array of user IDs
  uacl: number;       // Access control level?
}

// Extend the session interface to include the new custom data type
declare module 'express-session' {
  interface SessionData {
      unit_group?: UnitGroup[];  // An array of UnitGroup objects
  }
}

// Set up the login route
app.use('/auth', authRouter);
// set up the /logout route
app.get('/logout', logoutRoute);
// Set up the user session route
app.use('/user', userSessionRouter);
// Set up the units route
app.use('/units', unitRouter);
// Set up the upload route
app.use('/upload', uploadRouter);
// Set up hardware ID route
app.use('/hardware_id', hardwareIDRouter);
// catch all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/wialon-portal/dist/index.html'));
});


// Serve the React application's build files in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/wialon-portal/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Proxy requests to the Vite development server during development
if (process.env.NODE_ENV === 'development') {
  const viteServerProxy = createProxyMiddleware({
    target: `http://localhost:${portVite}`, // Vite development server default port
    ws: true,
  });
  app.use(viteServerProxy);
} else {
  // Serve static files in production
  app.use(express.static('dist'));
}

app.listen(portExpress, '0.0.0.0', () => {
  console.log(`Server is running on PORT:${portExpress}`);
});