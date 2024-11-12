// Logiken för att hantera bokningar.

const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { email, show, seats, bookingTime } = req.body;

  try {
    const newBooking = new Booking({ email, show, seats, bookingTime });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking" });
  }
};