// Create `models/User.js`.
// This file defines the schema for users.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the user
  email: { type: String, required: true, unique: true }, // Email must be unique
  password: { type: String, required: true } // Hashed password
});

module.exports = mongoose.model('User', userSchema);