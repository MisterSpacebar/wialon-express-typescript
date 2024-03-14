"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
var port = 3000;
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Render the index view
app.get('/', function (req, res) {
    res.render('index', { message: 'Hello, World!' });
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
