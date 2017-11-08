const express = require('express');
const router = express.Router();
const book_controller = require('../controller/bookController');

router.post('/api/books', book_controller.create);




module.exports = router;