// Logiken för att hantera show-data.

const Show = require('../models/Show');

exports.getShowsByMovie = async (req, res) => {
  try {
    const shows = await Show.find({ movieId: req.params.movieId });
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shows" });
  }
};