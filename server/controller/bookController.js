const book = require('../models').book;
const user = require('../models').user;

module.exports = {
  create(req, res) {
    return book
      .create({
        bookName:req.body.bookName,
        author:req.body.author,
        bookStatus:req.body.bookStatus,
        upvote:req.body.upvote
      })
      .then(book => res.status(200).send(book))
      .catch(error => res.status(400).send(error));
  },
};