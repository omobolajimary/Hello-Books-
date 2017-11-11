let user = require("../models/user.js");
let books = require("../models/book.js");
let borrowed =require("../models/borrowed.js");
let review =require("../models/review.js")
 
module.exports = {
//API to borrow a book
    borrowBook (req, res) {
        const userId = parseInt(req.params.userId, 10);
        const userExist = user.filter(r => r.userId === userId)[0];
       
        const bookId = parseInt(req.params.bookId, 10);
        const bookExist = books.filter(r => r.bookId === bookId)[0];

        if (!bookId) {
            res.status(404).json("This book does not exist")
        }
        if (!userId) {
            res.status(404).json("user not found")
       }
         else if (bookId && bookStatus === "unavailable") {
            res.status(404).json({message: "This book is currently unavailable", "bookName": bookExist.bookName, 
            "bookId": bookId, "status": bookExist.bookStatus, "username": userExist.username, "userId": userId})
        }
        else {
             borrowed.push(userId, bookId)
                res.status(200).json({ status: true, message:'Enjoy!', "bookName": bookExist.bookName, "bookId": bookId, 
                "username": userExist.username, "userId": userId} )
        }
    },
    //API to return borrowed book
    returnBook (req, res) {
        const userId = parseInt(req.params.userId, 10);
        const userExist = user.filter(r => r.userId === userId)[0];
        
        const bookId = parseInt(req.params.bookId, 10);
        const bookExist = books.filter(r => r.bookId === bookId)[0];
        
        res.json({ status: true, message:'Thanks for the return', 
            "bookName": bookExist.bookName, "bookId": bookId, 
            "username": userExist.username, "userId": userId} )

	},
    reviewBook (req, res) {
        req.body.reviewId = review.length +1 ;
        const userId = parseInt(req.params.userId, 10);
        const userExist = user.filter(r => r.userId === userId)[0];

        const bookId = parseInt(req.params.bookId, 10);
        const bookExist = books.filter(r => r.bookId === bookId)[0];
        
        if (!userExist) {
            res.status(404).json("user not found")
        }
        else if (!bookExist) {
            res.status(404).json("This book does not exist")
        }
        

        if (bookExist && bookExist.bookStatus === "unavailable") {
            res.status(404).json({message: "This book is currently unavailable", "bookName": bookExist.bookName, 
            "bookId": bookId, "status": bookExist.bookStatus, "username": userExist.username, "userId": userId})
        }
        else {
             review.push(userId, bookId, req.body.reviewText)
                res.json({ status: true, message:'Thanks for the review!', "bookName": bookExist.bookName, "bookId": bookId, 
                "username": userExist.username, "userId": userId, "review":req.body.reviewText} )
        }
    },


}