let books = require("../models/book.js");
//console.log(books)

module.exports = {
//API to Post book
    create (req,res) {
        req.body.bookId = books.length +1
            if(req.body.bookName===" "){
                res.status(400).send({message:"Book Name is required",})
            }
            else if(req.body.author===" "){
                res.status(400).send({message:"Author Name is required",})
            }
            else if(req.body.bookStatus===" "){
                res.status(400).send({message:"Book Status is required",})
            }
            else if (req.body.bookStatus === "available" || req.body.bookStatus === "unavailable") {
  	            books.push(req.body);
                    res.status(200).json({message:'book added successfully', "data": req.body});
            }
            
    },
//API to modify a book
    update (req, res) {
        const bookIden = parseInt(req.params.bookId, 10);
	    let bookExist; 
        books.forEach((book) =>{
          const bookNumber = parseInt(book.bookId,10);
          if (bookNumber === bookIden)
          {
            bookExist= book;
            return bookExist
          }
        });
        if (!bookExist) {
            res.status(404).json("This book does not exist")
        }

        else{
            return res.status(201).json(books[bookId-1] = req.body);
            
        } 
    },
//API endpoint to get all books
    getAllBooks (req, res) {
        res.json(books);
    }
}