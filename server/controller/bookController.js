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
//API to get a book
    // getSingleBook (req, res) {
    //     const book = books.getById(req.params.bookId);
    //         return res.status(200).json(book.bookid );
    //},
//API to modify a book
    update (req, res) {
        const bookId = parseInt(req.params.bookId);
        const exist = books.includes(books.bookId);
        console.log(books.includes(books.bookId));
            if(exist==false){
                return res.status(400).json({message:"Book does not exist"})
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