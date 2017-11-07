const books = require("../models/book.js");


module.exports = {
findOne(books,key,value) {
        for(var i=0; i<books.length;i++){
            if(books[i][key]===value) {
               return books[i];
       }
    }
    return null;
},
    books(req, res) {
        if(req.body.bookName === ""){
            res.json({message:"Book Name is required"})
        }
        books.findOne({
            where: {
                key:req.body.id,
                value: req.body.bookName,
            },
        })
        .then((Name) =>{
            if(Name){
                res.status(400).send({status:false, message:'Book Name already exist'});
            }
            book.create({
                Name : req.body.bookName,
            })
            .then((book) =>{
                res.status(200).send({ status: true, message:'Successful', data:book});
            });
        })
    }
}