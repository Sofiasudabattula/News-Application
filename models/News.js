const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the news article
    content: { type: String, required: true }, // Content of the news article
    date: { type: Date, default: Date.now }, // Date defaults to the current time
  });
  
  module.exports = mongoose.model('News', newsSchema);