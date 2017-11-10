let user = require("../models/user.js");
let books = require("../models/book.js");
let borrowed =require("../models/borrowed.js")

 
module.exports = {
//API to borrow a book
    borrowBook (req, res) {
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
             borrowed.push(userId, bookId)
                res.json({ status: true, message:'Enjoy!', "bookName": bookExist.bookName, "bookId": bookId, 
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


}