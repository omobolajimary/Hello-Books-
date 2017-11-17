const express = require('express');
var swaggerJSDoc = require('swagger-jsdoc');
const app = express();
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
const userRoute = require('./server/routes/router');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
var Console = console;
Console.log('sever up and running' + " " + port);



// Log requests to the console.
app.use(logger('dev'));

//Use BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.get('/', function (req, res) {
  res.send('Welcome to Hello Books!')
})

// app.listen(port, () => {
//   console.log('Server started on port 3000');
  
// });

app.use('/', userRoute);

module.exports = app;