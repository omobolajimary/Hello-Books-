const express = require('express');
const app = express();
const userRoute = require('./server/routes/router');
const bodyParser = require('body-parser');
const logger = require('morgan');


// Log requests to the console.
app.use(logger('dev'));

//Use BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


app.use('/', userRoute);