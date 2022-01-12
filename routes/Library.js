const { response } = require('express');
const express = require('express');
const router = express.Router();
const booksHelper = require('../helper/books')
let {addBook,books,editBook}=booksHelper;


router.get('/',books)
// @add new books 
// @body Titile Author Language Description
// @no return 
router.post('/add_book',addBook)

router.post('/editBook',editBook)



module.exports = router;