import express = require('express');
import { Application, Request, Response } from 'express';
import path = require('path');

const app: Application = express();
const port: number = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render the index view
app.get('/', (req: Request, res: Response) => {
  res.render('index', { message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});