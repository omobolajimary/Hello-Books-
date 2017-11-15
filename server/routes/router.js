const express = require('express');
const router = express.Router();
const book_controller = require('../controller/bookController');
const user_controller = require('../controller/userController');

router.post('/api/v1/books', book_controller.create);
router.get('/api/v1/books', book_controller.getAllBooks);
router.put('/api/v1/books/:bookId', book_controller.update);
router.post('/api/v1/user/:userId/borrow/:bookId', user_controller.borrowBook);
router.post('/api/v1/user/:userId/return/:bookId', user_controller.returnBook);
router.post('/api/v1/user/:userId/review/:bookId', user_controller.reviewBook);
router.post('/api/v1/user/:userId/fav/:bookId', user_controller.markAsFavorites);
router.get('/api/v1/user/:userId/favbooks', user_controller.getFavoritesBook);
router.get('/api/v1/books/sort',user_controller.getUpvote);





module.exports = router;