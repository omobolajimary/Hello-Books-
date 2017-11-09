const express = require('express');
const router = express.Router();
const book_controller = require('../controller/bookController');

router.post('/api/books', book_controller.create);
//router.get('/api/books/:bookId', book_controller.getSingleBook);
router.get('/api/books', book_controller.getAllBooks);
router.put('/api/books/:bookId', book_controller.update);




module.exports = router;