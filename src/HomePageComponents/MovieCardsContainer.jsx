import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import LoadMoreButton from './LoadMoreButton'; // Import LoadMoreButton

const MovieCardsContainer = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // State to keep track of the current page

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
          console.error('API key is undefined. Check .env file and make sure it is loaded correctly.');
          return;
        }
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(prevMovies => [...prevMovies, ...data.results]); // Append new movies to the existing list
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchMovies();
  }, [page]); // Depend on page state

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment page number
  };

  return (
    <div className="MovieCardsContainer">
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No movies found or data is still loading.</p>
      )}
      <LoadMoreButton onLoadMore={handleLoadMore} />
    </div>
  );
}

export default MovieCardsContainer;
