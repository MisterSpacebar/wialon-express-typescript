import express = require('express');
import { Application, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path = require('path');

const app: Application = express();
const port: number = 3000;

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
    target: 'http://localhost:5173', // Vite development server default port
    ws: true,
  });
  app.use(viteServerProxy);
}

// Serve the React application's build files in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});