const { response } = require('express');
const express = require('express');
const router = express.Router();
const booksHelper = require('../helper/books')


// @get all the Books
// @no body
// @return Title, Author, Language, Description
router.get('/',booksHelper.books)

// @add new book
// @body Title, Author, Language, Description
// @no return 
router.post('/add_book',booksHelper.addBook)

// @getting book details for edit 
// @body book _id
// @return Title, Author, Language, Description
router.post('/editBook',booksHelper.bookDetails)

// @Edit book details 
// @body Title, Author, Language, Description
// @no return 
router.post('/edited_book',booksHelper.editBook)

// @verify whether a book is available/not in the library
// @body Title : name 
// @return Title, Author, Language, Description
router.post('/searchBooks',booksHelper.search)

// @delete book
// @body book _id 
// @no returns
router.delete('/delete',booksHelper.deleteBook)

router.get('/books',booksHelper.particularAuthorBooks)

// @deleting all the books of a particular author
// @body author _id 
// @no returns
router.delete('/AuthorBooksDelete',booksHelper.AuthorBooksDelete)


module.exports = router;