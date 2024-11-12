// Databaskonfiguration och anslutning

// models/Movie.js
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title: String,
  posterUrl: String,
  description: String,
  genre: String,
  director: String,
  duration: String,
});
module.exports = mongoose.model('Movie', movieSchema);
