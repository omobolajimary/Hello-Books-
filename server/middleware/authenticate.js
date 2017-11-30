const user = require('../models/user.js');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.send(err);
        // return res.json({status: false, message: 'Failed to Authenticate token'});
      } 
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
};
