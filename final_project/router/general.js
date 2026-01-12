const express = require('express');
const router = express.Router();
let books = require('../books.json');

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.json(books[isbn]);
});

// Get books by author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = {};
  Object.keys(books).forEach(isbn => {
    if (books[isbn].author === author) {
      result[isbn] = books[isbn];
    }
  });
  res.json(result);
});

// Get books by title
router.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = {};
  Object.keys(books).forEach(isbn => {
    if (books[isbn].title === title) {
      result[isbn] = books[isbn];
    }
  });
  res.json(result);
});

// Get book reviews
router.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.json(books[isbn].reviews);
});
module.exports.general = router;
