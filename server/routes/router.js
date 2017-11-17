const express = require('express');

const router = express.Router();
const bookController = require('../controller/bookController');
const userController = require('../controller/userController');
/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     tags:
 *       - books
 *     description: Add a new book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book 
 *         description: book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/book'
 *     responses:
 *       200:
 *         description: Book added successfully
 */

router.post('/api/v1/books', bookController.create);
/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     tags:
 *       - books
 *     description: Get all books in the catalog
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of books
 *         schema:
 *           $ref: '#/definitions/book'
 */
router.get('/api/v1/books', bookController.getAllBooks);
 /**
 * @swagger
 * /api/books/v1/bookId:
 *   put:
 *     tags: books
 *     description: Updates a single book
 *     produces: application/json
 *     parameters:
 *       name: book
 *       in: body
 *       description: Fields for the book resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/book'
 *     responses:
 *       200:
 *         description: Successfully modified
 */
router.put('/api/v1/books/:bookId', bookController.update);
/**
 * @swagger
 * /api/v1/users/:userId/borrow/:bookId:
 *   put:
 *     tags:
 *       - books
 *         users
 *     description: Admin to approve request to borrow book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book Approved
 */
router.put('/api/v1/users/:userId/borrow/:bookId', bookController.approveBorrowedBook);
/**
 * @swagger
 * /api/v1/users/:userId/return/:bookId:
 *   put:
 *     tags:
 *       - books
 *         users
 *     description: Admin to accept returned book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: This book is successfully returned
 */
router.put('/api/v1/users/:userId/return/:bookId', bookController.approveReturnedBook);
/**
 * @swagger
 * /api/v1/users/:userId/borrow/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to borrow book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Enjoy the book
 */
router.post('/api/v1/users/:userId/borrow/:bookId', userController.borrowBook);
/**
 * @swagger
 * /api/v1/users/:userId/return/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to return a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book successfully returned
 */
router.post('/api/v1/users/:userId/return/:bookId', userController.returnBook);
 /**
 * @swagger
 * /api/v1/users/:userId/review/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to review a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name:  review
 *         description: userId and bookId
 *         in: body
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Thanks for your review
 */
router.post('/api/v1/users/:userId/review/:bookId', userController.reviewBook);
 /**
 * @swagger
 * /api/v1/users/:userId/fav/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to mark a book as favorite
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Marked as favorite
 */
router.post('/api/v1/users/:userId/fav/:bookId', userController.markAsFavorites);
 /**
 * @swagger
 * /api/v1/users/:userId/favbooks:
 *   get:
 *     tags:
 *       - favorite book
 *     description: To get a user favorite books
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: see below your favorites book
 *         schema:
 *           $ref: '#/definitions/user'
 */
router.get('/api/v1/users/:userId/favbooks', userController.getFavoritesBook);
router.get('/api/v1/books/sort', userController.getUpvote);





module.exports = router;