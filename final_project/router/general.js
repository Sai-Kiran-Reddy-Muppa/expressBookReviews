const express = require('express');
const axios = require('axios');
const router = express.Router();

const BOOKS_URL = 'http://localhost:5000/';

// Get all books
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get book by ISBN
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_URL);
    const book = response.data[req.params.isbn];
    book ? res.json(book) : res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

// Get books by author
router.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_URL);
    const books = response.data;
    const result = Object.fromEntries(
      Object.entries(books).filter(
        ([, book]) => book.author === req.params.author
      )
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

// Get books by title
router.get('/title/:title', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_URL);
    const books = response.data;
    const result = Object.fromEntries(
      Object.entries(books).filter(
        ([, book]) => book.title === req.params.title
      )
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports.general = router;
