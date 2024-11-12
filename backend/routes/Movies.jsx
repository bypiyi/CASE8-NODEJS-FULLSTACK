// Hanterar alla film-relaterade routes.

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAllMovies);

module.exports = router;
