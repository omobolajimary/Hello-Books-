let user = require("../models/user.js");
let books = require("../models/book.js");
let borrowed =require("../models/borrowed.js");
let review =require("../models/review.js");
let favorites =require("../models/favorites.js")
 
module.exports = {
//API to borrow a book
    borrowBook (req, res) {
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
        if (!bookExist) {
            res.status(404).json("This book does not exist")
        }
        if (!userExist) {
            res.status(404).json("user not found")
      }
        else if (bookExist.bookId && bookExist.bookStatus === "unavailable") {
            res.status(404).json({
            message: "This book is currently unavailable",
            details:
            {
            "bookName": bookExist.bookName, 
            "bookId": bookExist.bookId, 
            "status": bookExist.bookStatus, 
            "username": userExist.userName, 
            "userId": userExist.userId
            }
            })
        }
        else {
          let lastBorrowed=Math.max.apply(Math,borrowed.map(function(b){return parseInt(b.borrowId, 10);}))
            borrowed.push({borrowId: ++lastBorrowed, userId:userExist.userId, bookId:bookExist.bookId})
                res.status(200).json({ 
                  status: true, 
                  message:'Book borrowed successfully. Enjoy!',
                  details: {
                  "bookName": bookExist.bookName,
                  "bookId": bookIden, 
                  "username": userExist.userName,
                  "userId": borrowerId
                  }
             })
        }
        },
    //API to return borrowed book
    returnBook (req, res) {
        const returneeId = parseInt(req.params.userId, 10);
        const bookIden = parseInt(req.params.bookId, 10);
        let userExist;
	    let bookExist; 
        user.forEach((u) =>{
          const userNumber = parseInt(u.userId,10);
          if (userNumber === returneeId)
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
        if (!bookExist) {
            res.status(404).json("This book does not exist")
        }
        if (!userExist) {
            res.status(404).json("user not found")
      }
      else{
          res.json({ status: true, message:'Thanks for the return', 
            "bookName": bookExist.bookName, "bookId": bookId, 
            "username": userExist.username, "userId": userId} )
      }
	},
    //API to review a book
    reviewBook (req, res) {
        let reviewId = review.length +1 ;
        const reviewerId = parseInt(req.params.userId, 10);
        const bookIden = parseInt(req.params.bookId, 10);
        let userExist;
	    let bookExist; 
        user.forEach((u) =>{
          const userNumber = parseInt(u.userId,10);
          if (userNumber === reviewerId)
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
        if (!bookExist) {
            res.status(404).json("This book does not exist")
        }
        if (!userExist) {
            res.status(404).json("user not found")
      }
        if (bookExist && bookExist.bookStatus === "unavailable") {
            res.status(404).json({message: "This book is currently unavailable", "bookName": bookExist.bookName, 
            "bookId": bookId, "status": bookExist.bookStatus, "username": userExist.username, "userId": userId})
        }
        else {
             review.push(reviewerId, bookIden, req.body.reviewText)
                res.json({ status: true, message:'Thanks for the review!', "bookName": bookExist.bookName, "bookId": bookIden, 
                "username": userExist.userName, "userId": reviewerId, "reviewText":req.body.reviewText, "reviewId":reviewId} )
        }
    },
    //API to mark a book as favorites
    markAsFavorites (req, res)  {
        let favoritesId = favorites.length + 1;
        const reviewerId = parseInt(req.params.userId, 10);
        const bookIden = parseInt(req.params.bookId, 10);
        let userExist;
	    let bookExist; 
        user.forEach((u) =>{
          const userNumber = parseInt(u.userId,10);
          if (userNumber === reviewerId)
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
        if (!bookExist) {
            res.status(404).json("This book does not exist")
        }
        if (!userExist) {
            res.status(404).json("user not found")
      }
      else{
          favorites.push(bookIden, reviewerId)
          res.status(200).json({status: true, message:"Book marked as favorites", "bookName": bookExist.bookName, "bookId": bookIden, 
                "username": userExist.userName, "userId": reviewerId, "favoritesId": favoritesId
          })
      }
    },
    getFavoritesBook (req, res) {
        const reviewerId = parseInt(req.params.userId, 10);
        let userExist;
        favorites.forEach((f) =>{
          const userNumber = parseInt(u.userId,10);
          if (userNumber === reviewerId)
           {
            userExist= f;
            return userExist
           }
        });
        if (!userExist) {
            res.status(404).json("user not found")
      }
      else{
        let userFavorites = [];
        userFavorites = userExist
        let favbooks = userExist.bookId
        let userId = userExist.userId
      
       res.status(200).json({message: "Your favorites book", "favbook": favbooks, "user": userId});
    }
      }
    }

