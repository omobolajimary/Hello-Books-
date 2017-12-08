const models = require('../models');

const {
  book, user, borrow,
} = models;

exports.borrowBook = (req, res) => {
  user.findById(req.decoded.id).then((borrowUser) => {
    if (!borrowUser) {
      res.status(400).send({ status: false, message: 'user not found' });
      } else {
        // Check if book exist
      book.findById(req.params.bookId).then((Book) => {
        if (!Book) {
          res.status(400).send({ status: false, message: 'Book not found' });
        } else if (Book.bookStatus !== 'unavailable') {
            borrow.create({
              borrowDate: Date(),
              borrowStatus: 'pending',
              returnStatus: 'pending',
            })
        .then(() => {
            res.status(200).json({ message: 'Enjoy the book', bookName: Book.bookName, borrower: borrowUser.userName, borrowDate: Date(), expectedReturnDate: new Date().setDate(new Date().getDate() + 20)});
              })
            .catch(error => res.status(400).send(error));
        } else {
              res.status(400).json({ message: 'This book is currently unavailable' });
            }
      });
      }
   });
  };