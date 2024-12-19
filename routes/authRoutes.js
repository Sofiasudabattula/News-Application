const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config'); // Import the config file

const router = express.Router();

/**
 * Register a new user
 * @route POST /api/auth/register
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the user's password
    const saltRounds = 10; // Set salt rounds for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Log in an existing user
 * @route POST /api/auth/login
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token using the secret key from config.js
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' }); // Token valid for 1 hour

    // Respond with the token and user details (excluding password)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
