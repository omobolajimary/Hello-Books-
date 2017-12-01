const validator = require('validator');

const models = require('../models');

const {
  user, book,
} = models;

module.exports = {
  // API to Add a book
  create(req, res) {
    const {
      userId,
    } = req.decoded.user.id;
    const {
      role,
    } = req.decoded.user.role;
    user.findOne({
      where: {
        role: req.decoded.user.role,
      },
    })
      .then(() => {
        if (role !== 'admin') {
          return res.status(404).json({status: false, message:'You are not authorized'})
        }
      })
    if (req.body.bookName ==='') {
      return res.status(400).json({message:'Book Name is required',})
    }
    else if (!validator.isAlpha(req.body.bookName)) {
      return res.status(500).json({message:'Book name cannnot be a number',})
    }
    else if (!validator.isAlpha(req.body.author)) {
      return res.status(500).json({ status: false, message: 'Name of Author cannot be a number'});
    }
    else if (req.body.author === '') {
      return res.status(500).send({message:'Author Name is required',})
    }
    else if (req.body.bookStatus === '') {
      return res.status(500).send({message:'Book Status is required',})
    }
    book.findOne({
      where: {
        bookName: req.body.bookName,
      },
    })
      .then((Book) => {
        if (Book) {
          return res.status(400).send({ status: false, message:'Book already exist'});
        }
        if (req.body.bookStatus === 'available' || req.body.bookStatus === 'unavailable') {
          book.create({
            bookName: req.body.bookName,
            Author: req.body.Author,
            bookStatus: req.body.bookStatus,
            Description: req.body.Description,
            user_id: userId,
          })
            .then(() => {
              res.status(200).send({
                status: true,
                message: 'Book successfully added',
                bookId: book.id,
                bookName: book.bookName,
                Author: book.Author,
                bookStatus: book.bookStatus,
                Description: book.Description,
                role,
              });
            })
            .catch(error => res.status(400).send(error));
        } else {
          return res.status(500).json({ status: false, message: 'books can either be available or unavailable' });
        }
      });
  },

}

