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
            // 
            res.redirect('/')
        }catch(err){
            console.log(err);
            res.redirect('/')

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

// get details of books 
bookDetails : async(req,res)=>{
    let id = req.body.id
    try{
        let bookDetails= await db.get().collection(collection.bookList).findOne({_id:objectId(id)})
        res.json({status:true,bookDetails})
    }catch(err){
        res.json({status:false})
    }
},

// edit the book details 
editBook : async (req,res)=>{
    console.log(req.body);
    try{

        let update = await db.get().collection(collection.bookList).updateOne(
            { _id: objectId(req.body.id) },
            { $set: { Title: req.body.Title, Author : req.body.Author, Language:req.body.Language , Description:req.body.Description} }
         )
         console.log(update);
    }catch(err){

    }
}

}