let user = require('../models/user.js');
let books = require('../models/book.js');
let borrowed =require('../models/borrowed.js');
let review =require('../models/review.js');
let favorites =require('../models/favorites.js')
 
module.exports = {
// API to borrow a book
  borrowBook(req, res) {
    const borrowerId = parseInt(req.params.userId, 10);
    const bookIden = parseInt(req.params.bookId, 10);
    let userDetails;
	  let bookDetails; 
    user.forEach((user) =>{
      const userNumber = parseInt(user.userId,10);
      if (userNumber === borrowerId)
      {
        userDetails = user;
        return userDetails;
      }
    });
        
    books.forEach((book) =>{
      const bookNumber = parseInt(book.bookId,10);
      if (bookNumber === bookIden)
      {
        bookDetails = book;
        return bookDetails;
      }
    });
    if (!bookDetails) {
      res.status(404).json('This book does not exist')
    }
        if (!userDetails) {
            res.status(404).json('user not found')
      }
        else if (bookDetails.bookId && bookDetails.bookStatus === 'unavailable') {
            res.status(404).json({
            message: 'This book is currently unavailable'
            details:
            {
            "bookName": bookDetails.bookName, 
            "bookId": bookDetails.bookId, 
            "status": bookDetails.bookStatus, 
            "username": userDetails.userName, 
            "userId": userDetails.userId
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
                  "bookName": bookDetails.bookName,
                  "bookId": bookIden, 
                  "username": userDetails.userName,
                  "userId": borrowerId
                  }
             })
        }
        },

    //API to return borrowed book
    returnBook (req, res) {
        const returneeId = parseInt(req.params.userId, 10);
        const bookIden = parseInt(req.params.bookId, 10);
        let userDetails;
	    let bookDetails; 
        user.forEach((user) =>{
          const userNumber = parseInt(user.userId,10);
          if (userNumber === returneeId)
           {
            userDetails= user;
            return userDetails
           }
        });
        
        books.forEach((book) =>{
          const bookNumber = parseInt(book.bookId,10);
          if (bookNumber === bookIden)
          {
            bookDetails= book;
            return bookDetails
          }
        });
        if (!bookDetails) {
            res.status(404).json('This book does not exist')
        }
        if (!userDetails) {
            res.status(404).json('user not found')
      }
      else{
          res.json({ status: true, message:'Thanks for the return', 
            'bookName': bookDetails.bookName, 'bookId': bookId, 
            'username': userDetails.username, 'userId': userId} )
      }
	},
    //API to review a book
    reviewBook (req, res) {
        let reviewId = review.length +1 ;
        const reviewerId = parseInt(req.params.userId, 10);
        const bookIden = parseInt(req.params.bookId, 10);
        let userDetails;
	    let bookExist; 
        user.forEach((user) =>{
          const userNumber = parseInt(user.userId,10);
          if (userNumber === reviewerId)
           {
            userDetails= user;
            return userDetails
           }
        });
        
        books.forEach((book) =>{
          const bookNumber = parseInt(book.bookId,10);
          if (bookNumber === bookIden)
          {
            bookDetails= book;
            return bookDetails
          }
        });
        if (!bookDetails) {
            res.status(404).json('This book does not exist')
        }
        if (!userDetails) {
            res.status(404).json('user not found')
      }
        if (bookDetails && bookDetails.bookStatus === 'unavailable') {
            res.status(404).json({message: 'This book is currently unavailable', 'bookName': bookDetails.bookName, 
            'bookId': bookId, 'status': bookDetails.bookStatus, 'username': userDetails.username, 'userId': userId})
        }
        else {
             review.push(reviewerId, bookIden, req.body.reviewText)
                res.json({ status: true, message:'Thanks for the review!', 'bookName': bookDetails.bookName, 'bookId': bookIden, 
                'username': userDetails.userName, 'userId': reviewerId, 'reviewText':req.body.reviewText, 'reviewId':reviewId} )
        }
    },
    //API to mark a book as favorites
    markAsFavorites (req, res)  {
        let favoritesId = favorites.length + 1;
        const reviewerId = parseInt(req.params.userId, 10);
        const bookIden = parseInt(req.params.bookId, 10);
        let userDetails;
	    let bookDetails; 
        user.forEach((user) =>{
          const userNumber = parseInt(user.userId,10);
          if (userNumber === reviewerId)
           {
            userDetails= user;
            return userDetails
           }
        });
        
        books.forEach((book) =>{
          const bookNumber = parseInt(book.bookId,10);
          if (bookNumber === bookIden)
          {
            bookDetails= book;
            return bookDetails
          }
        });
        if (!bookDetails) {
            res.status(404).json('This book does not exist')
        }
        if (!userDetails) {
            res.status(404).json('user not found')
      }
      else{
          favorites.push(bookIden, reviewerId)
          res.status(200).json({status: true, message:'Book marked as favorites', 'bookName': bookDetails.bookName, 'bookId': bookIden, 
                'username': userDetails.userName, 'userId': reviewerId, 'favoritesId': favoritesId
          })
      }
    },

    getFavoritesBook (req, res) {
        const reviewerId = parseInt(req.params.userId, 10);
        let userDetails;
        favorites.forEach((favorites) =>{
          const userNumber = parseInt(favorites.userId,10);
          if (userNumber === reviewerId)
           {
            userDetails= favorites;
            return userDetails
           }
        });
        if (!userDetails) {
            res.status(404).json('user not found')
      }
      else{
        let userFavorites = [];
        let favbooks = userDetails.bookId
        let userId = userDetails.userId
      userFavorites.push(favbooks)
       res.status(200).json({message: 'Your favorites book', 'user': userId, 'favbook': favbooks});
    }
      },
      getUpvote (req, res){
        const upvoteArr =[]
        sortVotes = books.sort((a,b) => b.upvote - a.upvote)
        upvoteArr.push(sortVotes)
        res.status(200).json({message: true, 'books': sortVotes})
      }
    
    }

