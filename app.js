const express = require('express');


const app = express();
require('dotenv').config();
const dotenv = require('dotenv').config();

//dotenv.load();

const router = require('./server/routes/router');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
const Console = console;
Console.log('sever up and running' + ' ' + port);



// Log requests to the console.
app.use(logger('dev'));

// Use BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Hello Books.'
}));

app.use('/', router);

module.exports = app;