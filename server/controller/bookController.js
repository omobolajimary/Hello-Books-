
const models = require('../models');

const {
  book, user,
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
      return res.status(404).json({message: 'You are not authorized'});
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
          user_id: userId,
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

