const express = require('express');
require('dotenv').config();
const authenticate = require('../middleware/authenticate');
// const dotenv = require('dotenv').config();

// dotenv.load();
const router = express.Router();
const bookController = require('../controller/bookController');
const userController = require('../controller/userController');
const borrowController = require('../controller/borrowController');

router.post('/api/v1/user/signup', userController.signup);
router.post('/api/v1/user/signin', userController.signin);
router.post('/api/v1/user/signout', authenticate, userController.signout);
router.post('/api/v1/books/admin', authenticate, bookController.create);
router.put('/api/v1/books/admin/:bookId', authenticate, bookController.modify);
router.get('/api/v1/books', bookController.getAllBooks);
router.post('/api/v1/users/:userId/borrow/:bookId', authenticate, borrowController.borrowBook);
router.put('/api/v1/users/:userId/borrow/:bookId', authenticate, bookController.approveToBorrow);
// router.put('/api/v1/users/:userId/return/:bookId', bookController.approveReturnedBook);
// router.post('/api/v1/users/:userId/return/:bookId', userController.returnBook);
// router.post('/api/v1/users/:userId/review/:bookId', userController.reviewBook);
// router.post('/api/v1/users/:userId/fav/:bookId', userController.markAsFavorites);
// router.get('/api/v1/users/:userId/favbooks', userController.getFavoritesBook);
// router.get('/api/v1/books/sort', userController.getUpvote);







module.exports = router;
