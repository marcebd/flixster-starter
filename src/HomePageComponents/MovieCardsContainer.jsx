import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieCardsContainer = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
          console.error('API key is undefined. Check .env file and make sure it is loaded correctly.');
          return;
        }
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="MovieCardsContainer">
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No movies found or data is still loading.</p>
      )}
    </div>
  );
}

export default MovieCardsContainer;
