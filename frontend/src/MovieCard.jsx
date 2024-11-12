import React, { useState } from 'react';
import './MovieCard.css'; 

const MovieCard = ({ movie, onShowAvailable }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="movie-card" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="movie-poster"
            />
            {isHovered && (
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-description">{movie.description}</p>
                    <p className="movie-genre"><b>Genre:</b> {movie.genre}</p>
                    <p className="movie-director"><b>Director:</b> {movie.director}</p>
                    <p className="movie-duration"><b>Duration:</b> {movie.duration}</p>
                    <button onClick={() => onShowAvailable(movie._id)}>See Available Shows</button>
                </div>
            )}
        </div>
    );
};

export default MovieCard;
