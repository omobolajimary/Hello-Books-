
# Hello-Books


# Description
Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.

# Prerequisite 

 *    Knowledge of HTML, CSS and JavaScript

 *    NodeJS installed on your system, you can check out here to download https://nodejs.org/en/download/

 *    Installation of Postman for testing the API routes

# Installation

Clone the repo git clone https://github.com/omobolajimary/Hello-Books-.git and navigate to the project root directory

Install depndencies

Set up Express

Set up Database and make migrations by running the following commands.<br> 
- `sequelize db model:create.`
- `create necessary tables in the database.`
- `sequelize db migrate to apply changes in the table.`

# Hosted API
https://hellobookandela.herokuapp.com/


# Published Template
https://omobolajimary.github.io/Hello-Books/

# End points
 
 *   **Endpoints  to add a book and modify a book**
 
        	POST: /api/v1/books
			Input : {bookName,Author,bookStatus}
		
			PUT: /api/v1/books/:bookId
			Input : {bookId}
				for example:  /api/v1/books/1			
	
 *   **Endpoint to get all books in the application**
 
		    GET: /api/v1/books
   
 *   **Endpoints to borrow and return a book**
 
        	POST: /api/v1/users/:userId/borrow/:bookId
			Input : {userId,bookId}
				for example:  /api/v1/users/1/borrow/1
	
        	POST: /api/v1/users/:userId/return/:bookId
			Input : {userId,bookId}
				for example:  /api/v1/users/1/return/1
   
 *   **Endpoints to accept/reject a request to borrow and return a book**
 
   			PUT: /api/v1/users/:userId/borrow/:bookId
			
				Input : {userId,bookId}
				for example:  /api/v1/users/1/borrow/1
	
	
   	 		PUT: /api/v1/users/:userId/return/:bookId
				
				Input : {userId,bookId}
				for example: /api/v1/users/1/return/1
	
   
 *   **Endpoint to review a book**
 
        	POST: /api/v1/users/:userId/review/:bookId
			Input : {userId, review, bookId}
	
 *   **Endpoint to mark a book as favorite**
 
			POST: /api/v1/users/:userId/fav/:bookId
				Input : {userId,bookId}
				for example: /api/v1/users/1/fav/1
	
   
 *   **Endpoint to get a user’s favorite books**
 
        	GET: /api/v1/users/:userId/favbooks
			Input : {userId,bookId}
			for example: /api/v1/users/1/favbooks
	
		
	
 *   **Endpoint to get books with the most upvotes**
 
        	GET: /api/v1/books/sorted



**Status of project:	** Work in progress

   
 # Author

   Omobolaji Adediran


