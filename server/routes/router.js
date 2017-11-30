const express = require('express');
require('dotenv').config();
const authenticate = require('../middleware/authenticate.js');
const dotenv = require('dotenv').config();

//dotenv.load();
const router = express.Router();
const bookController = require('../controller/bookController');
const userController = require('../controller/userController');

router.post('/api/v1/books', authenticate, bookController.create);
// router.get('/api/v1/books', bookController.getAllBooks);
// router.put('/api/v1/books/:bookId', bookController.update);
// router.put('/api/v1/users/:userId/borrow/:bookId', bookController.approveBorrowedBook);
// router.put('/api/v1/users/:userId/return/:bookId', bookController.approveReturnedBook);
// router.post('/api/v1/users/:userId/borrow/:bookId', userController.borrowBook);
// router.post('/api/v1/users/:userId/return/:bookId', userController.returnBook);
// router.post('/api/v1/users/:userId/review/:bookId', userController.reviewBook);
// router.post('/api/v1/users/:userId/fav/:bookId', userController.markAsFavorites);
// router.get('/api/v1/users/:userId/favbooks', userController.getFavoritesBook);
// router.get('/api/v1/books/sort', userController.getUpvote);
router.post('/api/v1/user/signup', userController.signup);
router.post('/api/v1/user/signin', userController.signin);






module.exports = router;