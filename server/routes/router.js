const express = require('express');

const router = express.Router();
const bookController = require('../controller/bookController');
const userController = require('../controller/userController');

router.post('/api/v1/books', bookController.create);
router.get('/api/v1/books', bookController.getAllBooks);
router.put('/api/v1/books/:bookId', bookController.update);
router.post('/api/v1/user/:userId/borrow/:bookId', userController.borrowBook);
router.post('/api/v1/user/:userId/return/:bookId', userController.returnBook);
router.post('/api/v1/user/:userId/review/:bookId', userController.reviewBook);
router.post('/api/v1/user/:userId/fav/:bookId', userController.markAsFavorites);
router.get('/api/v1/user/:userId/favbooks', userController.getFavoritesBook);
router.get('/api/v1/books/sort', userController.getUpvote);





module.exports = router;