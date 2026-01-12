const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

let users = [];
let books = require('../books.json');

// REGISTER
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Customer already exists" });
  }

  users.push({ username, password });
  return res.json({ message: "Customer successfully registered" });
});

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid login. Check username and password" });
  }

  const token = jwt.sign({ username }, 'secretkey');
  return res.json({ message: "Customer successfully logged in", token });
});

// ADD / UPDATE REVIEW
router.put('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews["sai"] = review;
  return res.json({ message: "Review added/updated successfully" });
});

// DELETE REVIEW
router.delete('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn] && books[isbn].reviews["sai"]) {
    delete books[isbn].reviews["sai"];
    return res.json({ message: "Review deleted successfully" });
  }

  return res.status(404).json({ message: "Review not found" });
});

module.exports.authenticated = router;
