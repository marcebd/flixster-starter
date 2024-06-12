import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="MovieCard">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className="MovieCardInfo">
        <h1>{movie.title}</h1>
        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;
