// This file handles CRUD operations for news articles.
const express = require('express');
const News = require('../models/News');

const router = express.Router();

// Create News Article
// Endpoint to create a new article:
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    // Create a new article with the provided data
    const newArticle = new News({ title, content });
    // Save the article in the database
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get News Articles
// Endpoint to fetch all articles:
router.get('/', async (req, res) => {
  try {
    // Fetch all articles from the database
    const articles = await News.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// Step 7: Run the Backend Server
// Start the backend server using Nodemon
// Nodemon automatically restarts the server when changes are detected: