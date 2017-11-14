let books = require("../models/book.js");
//console.log(books)

module.exports = {
//API to Post book
    create (req,res) {
        req.body.bookId = books.length +1
            if(req.body.bookName ===" "){
                return res.status(400).json({message:"Book Name is required",})
            }
            else if (req.book.bookName===!isNAN){
                return res.status(400).json({message:"Book name cannnot be a number",})

            }
            else if (!isNaN(item.Author)){
                return res.status(500).json({ status: false, message: "Name of Author cannot be a number"});
            }
            else if (req.body.author===" "){
                return res.status(400).send({message:"Author Name is required",})
            }
            else if(req.body.bookStatus===" "){
                return res.status(400).send({message:"Book Status is required",})
            }
            else if (req.body.bookStatus === "available" || req.body.bookStatus === "unavailable") {
  	            books.push(req.body);
                    return res.status(200).json({message:'book added successfully', "data": req.body});
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
        else if (req.body.author === " " || req.body.bookName=== "" || req.body.bookStatus=== ""){
            res.status(404).json("None of the fields can be empty")
        } 
        else {
            
             res.status(201).json(books[bookId-1] = req.body);
            
        } 
    },
//API endpoint to get all books
    getAllBooks (req, res) {
        res.json(books);
    }
}