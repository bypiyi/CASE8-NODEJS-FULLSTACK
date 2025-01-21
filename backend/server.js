import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Show from './models/Shows.js';
import Movie from './models/Movies.js';
import Booking from './models/Bookings.js';

dotenv.config();

// Anslutning till MongoDB med miljövariabler från .env
const MONGO_URI = `mongodb+srv://piyitsirigotis:<db_password>@cinema-database-backend.043gn.mongodb.net/?retryWrites=true&w=majority&appName=cinema-database-backend`;

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.error('Database connection failed:', err));

// Skapar och konfigurerar Express-servern
const app = express();
app.use(cors()); // Möjliggör korsdomänsanrop
app.use(express.json()); // Gör det möjligt att hantera JSON i inkommande förfrågningar

const PORT = 3000;

// Endpoint: Hämtar alla filmer från databasen
app.get('/data', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

// Endpoint: Hämtar alla visningar för en vald film
app.get('/api/shows/movie/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params;
        const shows = await Show.find({ movieId });

        if (!shows || shows.length === 0) {
            return res.status(404).json({ error: 'No shows found for the selected movie' });
        }

        res.json(shows);
    } catch (error) {
        console.error('Error fetching shows:', error);
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

// Endpoint: Hämtar detaljer för en specifik visning
app.get('/api/shows/:id', async (req, res) => {
    try {
        const showId = req.params.id;
        const show = await Show.findById(showId).populate('movieId');

        if (!show) {
            return res.status(404).json({ error: 'Show not found' });
        }

        res.json(show);
    } catch (error) {
        console.error('Error fetching show details:', error);
        res.status(500).json({ error: 'Failed to fetch show details' });
    }
});

// Endpoint: Hanterar bokningar
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, email, showId, seats: selectedSeats } = req.body;

        // Kontrollera om nödvändiga data finns
        if (!name || !email || !showId || !selectedSeats || selectedSeats.length === 0) {
            return res.status(400).json({ error: 'Missing or invalid booking data' });
        }

        // Hämta visning baserat på showId
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ error: 'Show not found' });
        }

        // Kontrollera om några av de valda platserna redan är bokade
        const unavailableSeats = selectedSeats.filter(seat =>
            show.seats.some(s => s.seatNumber === seat && s.isBooked)
        );

        if (unavailableSeats.length > 0) {
            return res.status(400).json({ error: `The following seats are already booked: ${unavailableSeats.join(', ')}` });
        }

        // Uppdatera platserna som bokade
        show.seats = show.seats.map(seat =>
            selectedSeats.includes(seat.seatNumber) ? { ...seat, isBooked: true } : seat
        );
        await show.save();

        // Skapa en ny bokning
        const newBooking = new Booking({
            customer: { name, email },
            selectedSeats,
            showId,
        });
        await newBooking.save();

        res.status(201).json({ message: 'Booking successful!', booking: newBooking });
    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).json({ error: 'Failed to process booking' });
    }
});

// Startar servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
