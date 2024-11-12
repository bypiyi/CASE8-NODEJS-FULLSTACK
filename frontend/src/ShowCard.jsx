import React from 'react';

const ShowCard = ({ show, onSelect, movieTitle, onBook }) => {
  // Konvertera starttid till ett läsbart format
  const startTime = new Date(show.startTime).toLocaleString();

  return (
    <div className="show-card" onClick={onSelect}>

{/* <h2>{movieTitle}</h2> */}
      <h3>DATE</h3>
      <p><b>{`${startTime}`}</b></p>
      <p><b>{`${show.availableSeats.length} available seats`}</b></p>

      {/* För att komma till bokningssidan */}
      <button onClick={() => onBook(show)}>Book tickets to this show</button>
    </div>
  );
};
export default ShowCard;
