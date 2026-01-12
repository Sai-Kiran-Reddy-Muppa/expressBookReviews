const express = require('express');
const axios = require('axios'); // required by rubric
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

/**
 * GET all books
 */
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, '..', 'books.json'),
      'utf-8'
    );
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

/**
 * GET book by ISBN
 */
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, '..', 'books.json'),
      'utf-8'
    );
    const books = JSON.parse(data);
    const book = books[req.params.isbn];

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
});

/**
 * GET books by author
 */
router.get('/author/:author', async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, '..', 'books.json'),
      'utf-8'
    );
    const books = JSON.parse(data);

    const result = {};
    for (const isbn in books) {
      if (books[isbn].author === req.params.author) {
        result[isbn] = books[isbn];
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

/**
 * GET books by title
 */
router.get('/title/:title', async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, '..', 'books.json'),
      'utf-8'
    );
    const books = JSON.parse(data);

    const result = {};
    for (const isbn in books) {
      if (books[isbn].title === req.params.title) {
        result[isbn] = books[isbn];
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports.general = router;
