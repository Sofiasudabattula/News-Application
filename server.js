const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const config = require('./config/config');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Add middleware to handle CORS, parse JSON data, and manage body requests:
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
console.log('Mongo URI:', process.env.MONGO_URI);
// Use mongoose to connect to the MongoDB database using the URI from the .env file:
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Routes
// Define routes for authentication and news articles:
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));

// Start the server
// Listen on the specified port:
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Step 3: Create Environment Variables
// Create a `.env` file in the root of the backend folder and add the following:
// MONGO_URI=your_mongodb_connection_string
// JWT_SECRET=your_jwt_secret_key
// This secures sensitive data like database credentials and JWT secret.

// Step 4: MongoDB Models

