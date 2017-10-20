const books = require("../models").dummyData.books;


module.exports = {
    books(req, res) {
        if(req.body.bookName === ""){
            res.json({message:"Book Name is required"})
        }
        books.findOne({
            where: {
                Name: req.body.bookName,
            },
        })
        .then((Name) =>{
            if(Name){
                res.status(400).send({status:false, message:'Book Name already exist'});
            }
            books.create({
                Name : req.body.bookName,
            })
            .then((books) =>{
                res.status(200).send({ status: true, message:'Successful', data:book});
            });
        })
    }
}