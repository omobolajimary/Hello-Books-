const books = require("../models/book.js");


module.exports = {
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
  	            books = books.push(req.body);
                    res.status(200).json({message:'book added successfully', "data": req.body});
            }
            
    },
    //API to Modify a book
    update (req, res) {
        const bookId = parseInt(req.params.bookId, 5);

    }

}