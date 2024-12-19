// Import environment variables
require('dotenv').config();

// Export the configuration
module.exports = {
  mongoURI: process.env.MONGO_URI,   // MongoDB connection URI
  jwtSecret: process.env.JWT_SECRET,  // JWT secret for token generation
};