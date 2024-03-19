import express = require('express');
import session = require('express-session');
import { Application, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path = require('path');

// Import the routes
import authRouter from './routes/auth';
import { logoutRoute } from './routes/logout';

const app: Application = express();
const portExpress: number = 3000;
const portVite: number = 5173;

// This line is needed to parse the body of incoming JSON requests
app.use(express.json());

// Set up the session middleware
let sessionOptions = {
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
};

app.use(session(sessionOptions));

// Set up the login route
app.use('/auth', authRouter);
// set up the /logout route
app.post('/logout', logoutRoute);

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Set the view engine to EJS
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// // Render the index view
// app.get('/', (req: Request, res: Response) => {
//   res.render('index', { message: 'Hello, World!' });
// });

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