const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const models = require('../models');

const {
  user,
} = models;

const salt = bcrypt.genSaltSync(10);

module.exports = {
  signup(req, res) {
    if (req.body.userName === '') {
      res.json({message: 'Username is required'});
    }
    else if (req.body.email === '') {
      res.json({message: 'Email is required'});
    }
    else if (req.body.password === '') {
      res.json({message: 'Password is required'});
    }
    else if (req.body.password != req.body.confirmPassword) {
      res.json({message:'Please ensure the Password match'})
    }
    if (!validator.isEmail(req.body.email)) {
      res.status(400).send('Invalid email');
    }
    if (!validator.isAlphanumeric(req.body.password)) {
      res.send('password must contain number and alphabet');
    }

    user.findOne({
      where: {
        userName: req.body.userName,
      },
    })
      .then((User) => {
        if (User) {
          res.status(400).send({ status: false, message:'Username already exist'});
        }
        else {
          user.create({
            userName: req.body.userName,
            password: bcrypt.hashSync((req.body.password), salt),
            confirmPassword: req.body.confirmPassword,
            email: req.body.email,
          })
            .then((User) => {
              res.status(200).send({ status: true, message:'Successful', data: User });
            });
        }
      });
  },
  signin(req, res) {
    const {
      userName,
    }  = req.body.userName;
    const {
      password,
    }  = req.body.password;
    if (userName === '') {
      res.json({message:'Username is required'})
    }
    else if (password === '') {
      res.json({message:'Password is required'})
    }
    user.findOne({
      where: {
        userName: req.body.userName,
      },
    })
      .then((User) => {
        if (!User) {
          res.status(404).send({ status: false, message:'Authentication failed. User not found'});
        }
        else if (User) {
          if (bcrypt.compareSync(req.body.password, User.password)) {
            const token = jwt.sign({
              id: User.id,
              // userName: User.userName, email: User.email, role: User.role,
              
            }, 'secret', { expiresIn: '60 minutes' });
            console.log(User.userName, User.role, User.email);
            res.status(200).send({ status: true, message:'Authentication Successful', token: token });
          } else {
            res.status(401).send({ status: false, message:'Authentication failed. Incorrect Password'});
          }
        }
      })
  },
  signout(req, res) {
    return res.status(200).send({ message: 'You have successfully signed out', token: null });
  },
};
