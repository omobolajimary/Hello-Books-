const express = require('express');
const router = express.Router();
const book_controller = require('../controller/bookController');
const user_controller = require('../controller/userController');

router.post('/api/books', book_controller.create);
router.get('/api/books', book_controller.getAllBooks);
router.put('/api/books/:bookId', book_controller.update);
router.post('/api/user/:userId/borrow/:bookId', user_controller.borrowBook);
router.post('/api/user/:userId/return/:bookId', user_controller.returnBook);
router.post('/api/user/:userId/review/:bookId', user_controller.reviewBook);
router.post('/api/user/:userId/fav/:bookId', user_controller.markAsFavorites);
router.get('/api/user/:userId/favbooks', user_controller.getFavoritesBook);






module.exports = router;