
import models from '../models';

const {
  user, book,
} = models;
// const authenticate = require('../middleware/authenticate.js');
module.exports = {
  // API to Add a book
  create(req, res) {
    const userId = req.decoded.id;
    const admin = req.decoded.user.role;
    if (admin !== 'true') {
      return res.bookStatus(404).json({status: false, message:'You are not authorized'})
    }
    if (req.body.bookName ==='') {
      return res.status(400).json({message:'Book Name is required',})
    }
    else if (!isNaN(req.body.bookName)) {
      return res.status(500).json({message:'Book name cannnot be a number',})
    }
    else if (!isNaN(req.body.author)) {
      return res.status(500).json({ status: false, message: 'Name of Author cannot be a number'});
    }
    else if (req.body.author === '') {
      return res.status(500).send({message:'Author Name is required',})
    }
    else if (req.body.bookStatus === '') {
      return res.status(500).send({message:'Book Status is required',})
    }
    else if (req.body.role === 'user') {
      return res.status(500).send({message:'You are not authorized'})
    }
    book.findOne({
      where: {
        bookName: req.body.bookName,
      },
    })
      .then((Book) => {
        if(Book) {
          res.status(400).send({ status: false, message:'Book already exist'});
        }
        else {
          book.create({
            bookName: req.body.bookName,
            author: req.body.author,
            bookStatus: req.body.bookStatus,
            upvote: req.body.upvote,
          })
            .then((Book) => {
              res.status(200).send({ status: true, message:'Successful', data: Book});
            });
        }
      });
  },
}
      