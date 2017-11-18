let books = require("../models/book.js");
let user = require("../models/user.js");
//console.log(books)

module.exports = {
//API to Post book
    create (req, res) {
        req.body.bookId = books.length +1
            if(req.body.bookName ===" "){
                return res.status(400).json({message:"Book Name is required",})
            }
            else if (!isNaN(req.body.bookName)) {
                return res.status(500).json({message:"Book name cannnot be a number",})

            }
            else if (!isNaN(req.body.author)){
                return res.status(500).json({ status: false, message: "Name of Author cannot be a number"});
            }
            else if (req.body.author === " "){
                return res.status(500).send({message:"Author Name is required",})
            }
            else if (req.body.bookStatus === " "){
                return res.status(500).send({message:"Book Status is required",})
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
        else if (req.body.author === " " || req.body.bookName=== " " || req.body.bookStatus=== " "){
            res.status(404).json("None of the fields can be empty")
        } 
        else {
            
             res.status(201).json({message:'successful', bookName: req.body.bookName, bookId: req.body.bookId, author:req.body.author, bookStatus:req.body.bookStatus,upvote:req.body.upvote});
            
        } 
    },
//API endpoint to get all books
    getAllBooks (req, res) {
        res.json(books);
    },


    //API to approve to Borrow
    approveBorrowedBook (req, res) {
	const borrowerId = parseInt(req.params.userId, 10);
    const bookIden = parseInt(req.params.bookId, 10)
    let userExist;
	let bookExist; 
        user.forEach((u) =>{
          const userNumber = parseInt(u.userId,10);
          if (userNumber === borrowerId)
           {
            userExist= u;
            return userExist
           }
        });
        
        books.forEach((book) =>{
          const bookNumber = parseInt(book.bookId,10);
          if (bookNumber === bookIden)
          {
            bookExist= book;
            return bookExist
          }
        });
console.log(bookExist.bookStatus)
    if(bookExist.bookStatus === "available"){

      res.status(200).json({message:'Approved to borrow', "bookName": bookExist.bookName, "bookId": bookIden, 
    "Admin": userExist.userName});
    }
    else 
      {
      res.status(404).json({message:"Book currently unavailable to borrow","bookName": bookExist.bookName, 
    "bookId": bookIden, "status": bookExist.bookStatus, "Admin": userExist.userName});
      
    }
},
  
//API Endpoint to accept returned book
approveReturnedBook (req, res) {

  const borrowerId = parseInt(req.params.userId, 10);
  const bookIden = parseInt(req.params.bookId, 10);
  let userExist;
	let bookExist; 
        user.forEach((u) =>{
          const userNumber = parseInt(u.userId,10);
          if (userNumber === borrowerId)
           {
            userExist= u;
            return userExist
           }
        });
        
        books.forEach((book) =>{
          const bookNumber = parseInt(book.bookId,10);
          if (bookNumber === bookIden)
          {
            bookExist= book;
            return bookExist
          }
        });
      res.status(200).json({message:"This book is successfully returned", "bookName": bookExist.bookName, "bookId": bookId, 
    "Admin": userExist.userName})
      
  
	}

}