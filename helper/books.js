const db = require('../config/connection');
const collection = require('../config/collection')
const objectId = require('mongodb').ObjectId




module.exports = {

   // add books
   addBook : async(req,res)=>{
       console.log(req.body);
        try{
            var result =  await db.get().collection(collection.bookList).insertOne(req.body)
            console.log(result);
        }catch(err){
            console.log(err);

        }
   },
//    list of all books 
books : async(req,res)=>{
    try{
       let books = await db.get().collection(collection.bookList).find({}).toArray()
       console.log(books);
        res.render('mainPage',{books})
    }catch(err){
        console.log(err);
    }
},
editBook : async(req,res)=>{
    console.log('hello wo---------------------')
    console.log(req.body);
}

}