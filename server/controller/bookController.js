
const models = require('../models');

const {
  book, user, borrow,
} = models;

  // API to Add a book
exports.create = (req, res) => {
  const {
    userId,
  } = req.decoded.id;
  console.log(req.decoded.id);
  user.findById(req.decoded.id).then((User) => {
    if (User.role !== 'admin') {
      console.log(User.id, User.role);
      return res.status(404).json({ message: 'You are not authorized' });
    }
  });
  if (req.body.bookName === ' ') {
    return res.status(400).json({ message: 'Book Name is required' });
  }
  else if (req.body.author === ' ') {
    return res.status(500).send({ message: 'Author Name is required' });
  }
  else if (req.body.bookStatus === ' ') {
    return res.status(500).send({ message: 'Book Status is required' });
  }
  else if (req.body.description === ' ') {
    return res.status(500).send({ message: 'Description is required' });
  }
  book.findOne({
    where: {
      bookName: req.body.bookName,
    },
  })
    .then((Book) => {
      if (Book) {
        return res.status(400).send({ status: false, message: 'Book already exist' });
      }
      if (req.body.bookStatus === 'available' || req.body.bookStatus === 'unavailable') {
        book.create({
          bookName: req.body.bookName,
          author: req.body.author,
          bookStatus: req.body.bookStatus,
          description: req.body.description,
        })
          .then((Book) => {
            res.status(200).send({ status: true, message: 'Book Successfully Added', data: Book });
          });
      } else {
        return res.status(500).json({ status: false, message: 'books can either be available or unavailable' });
      }
      console.log(req.body);
    });
};

// API Endpoint to Modify a book
exports.modify = (req, res) => {
  const {
    userId,
  } = req.decoded.id;
  user.findById(req.decoded.id).then((User) => {
    if (User.role !== 'admin') {
      return res.status(404).json({ message: 'You are not authorized' });
    }
  });
  book.findOne({
    where: {
      id: req.params.bookId,
    },
  })
    .then((Book) => {
      if (!Book) {
        res.status(400).send({ status: false, message: 'Book not found' });
      }
      else {
        book.update(
          {
            bookName: req.body.bookName,
            author: req.body.author,
            bookStatus: req.body.bookStatus,
            description: req.body.description,
            upvotes: parseInt(req.body.upvotes, 10),
          },
          {
            where: {
              id: req.params.bookId,

            },
          },
        )
          .then((Book) => {
            res.status(200).send({ status: true, message: 'Book Successfully Updated', data: req.body });
          });
        console.log(req.body);
      }
    });
};

// API Endpoint to get all the books in the catalogue
exports.getAllBooks = (req, res) => {
  book.findAll({
    include: [
      { all: true },
    ],
    order: [
      ['bookName', 'DESC'],
    ],
  })
    .then(books => res.json(books));
};

// API Endpoint to Approve to Borrow a book.
exports.approveToBorrow = (req, res) => {
  const {
    userId,
  } = req.decoded.id;
  user.findById(req.decoded.id).then((User) => {
    if (User.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized' });
    }
    user.findById(req.params.userId).then((borrowUser) => {
      if (!borrowUser) {
        res.status(400).send({ status: false, message: 'user not found' });
      } else {
        // Check if book exist
        book.findById(req.params.bookId).then((Book) => {
          if (!Book) {
            res.status(400).send({ status: false, message: 'Book not found' });
          } else {
            borrow.findOne({
              where: {
                book_id: req.params.bookId,
                user_id: req.params.userId,
              },
            })
              .then((Borrow) => {
                if (!Borrow) {
                  res.status(400).send({ status: false, message: 'This user has not requested for this book' });
                } else {
                // Check if the status of a book is available or not
                  if (book.bookStatus !== 'unavailable') {
                    return res.status(200).json({ message: 'Approved to borrow', bookName: book.bookName, bookId: book.id });
                  }
                  return res.status(400).json({ message: 'Book currently unavailable' });
                }
              });
          }
        });
      }
    });
  });
};
