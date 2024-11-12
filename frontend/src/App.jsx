import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import ShowCard from './ShowCard';
import BookingForm from './BookingForm';
import './App.css';
import logo from '/logo.png';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [currentPage, setCurrentPage] = useState('movies');
  const [selectedShow, setSelectedShow] = useState(null);

  // Hämta filmer
  const fetchMovies = async () => {
    try {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Hämta shower för vald film
  const fetchShows = async (movieId) => {
    try {
      const response = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/shows/movie/${movieId}`);
      const data = await response.json();
      console.log('Fetched shows:', data);
      setShows(data);
      setCurrentPage('shows');
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Hantera visning av tillgängliga shower
  const handleShowAvailable = (movieId) => {
    setSelectedMovieId(movieId);
    fetchShows(movieId);
  };

  // Hantera bokning av show
  const handleBookShow = (show) => {
    setSelectedShow(show);
    setCurrentPage('booking');
  };

  // Återgå till filmlistan
  const handleBackToMovies = () => {
    setCurrentPage('movies');
    setSelectedMovieId(null);
  };

  // Återgå till shower
  const handleBackToShows = () => {
    setCurrentPage('shows');
  };

  return (
    <div>
      {currentPage === 'movies' && (
        <>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="movie-card-container">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onShowAvailable={handleShowAvailable}
              />
            ))}
          </div>
        </>
      )}

      {currentPage === 'shows' && (
        <>

          <div className="show-card-container">

          <button className="back-to-movies-btn" onClick={handleBackToMovies}>BACK TO MOVIES</button>

            {shows.map((show) => {
              const movieTitle = movies.find(movie => movie._id === selectedMovieId)?.title;
              return (
                <ShowCard
                  key={show._id}
                  show={show}
                  movieTitle={movieTitle}
                  onBook={() => handleBookShow(show)}
                />
              );
            })}
          </div>
        </>
      )}

      {currentPage === 'booking' && selectedShow && (
        <>
          <div className="booking-container">
            <BookingForm
              show={selectedShow}
              bookedSeats={selectedShow.bookedSeats}
            />
            <button className="back-to-shows-btn" onClick={handleBackToShows}>BACK TO SHOWS</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
