const { response } = require('express');
const express = require('express');
const router = express.Router();
const booksHelper = require('../helper/books')
// let {addBook,books,editBook}=booksHelper;


router.get('/',booksHelper.books)

router.post('/add_book',booksHelper.addBook)

router.post('/editBook',booksHelper.bookDetails)

router.post('/edited_book',booksHelper.editBook)


module.exports = router;