const user = require("../models").user;
var bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("my password", salt);
const jwt = require("jsonwebtoken");



module.exports = {
    signup(req, res) {
      if(req.body.userName === ""){
        res.json({message:"Username is required"})
        }
      else if (req.body.email === ""){
        res.json({message:"Email is required"})
      }
      else if (req.body.password === ""){
        res.json({message:"Password is required"})
      }
      else if (req.body.password != req.body.confirmPassword){
        res.json({message:"Please ensure the Password match"})
      }
      user.findOne({
      where: {
        userName: req.body.userName,
      },
    })
    .then((User) => {
      if(User){
        res.status(400).send({ status: false, message:'Username already exist'});
      }
      else{
        user.create({
          userName: req.body.userName,
          password :bcrypt.hashSync((req.body.password), salt),
          confirmPassword: req.body.confirmPassword,
          email: req.body.email
        })
        .then((User) => {
          res.status(200).send({ status: true, message:'Successful', data: User});
        });
      }
    });
    },
    signin(req, res) {
      const userName = req.body.userName;
      const password = req.body.password;
      if(req.body.userName === ""){
        res.json({message:"Username is required"})
        }
      else if (req.body.password === ""){
        res.json({message:"Password is required"})
      }
      user.findOne({
        where: {
          userName: req.body.userName,
        },
      })
      .then((User,err) => {
        if(!User){
          res.status(404).send({ status: false, message:'Authentication failed. User not found'});
          }
        else if(User){
          // console.log(User)
          // console.log(User.password)
          if(bcrypt.compareSync(req.body.password, User.password)){
            const token = jwt.sign({
                  data: User
                }, 'secret', { expiresIn: "1440" });
            res.status(200).send({ status: true, message:'Authentication Successful', token: token});
          }else{
            res.status(401).send({ status: false, message:'Authentication failed. Incorrect Password'});
          }
        }
      })
    },
    signout (req, res) {
      
    }

}