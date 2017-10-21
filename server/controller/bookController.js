const dummyData = require("../models/book.js");


module.exports = {
    books(req, res) {
        if(req.body.bookName === ""){
            res.json({message:"Book Name is required"})
        }
        dummyData.books.findOne({
            where: {
                Name: req.body.bookName,
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