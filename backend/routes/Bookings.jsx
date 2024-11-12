// Hanterar alla bokningsrelaterade routes.

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingController');

router.post('/', bookingController.createBooking);

module.exports = router;