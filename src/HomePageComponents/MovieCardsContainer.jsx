import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieCardsContainer = ({ searchQuery, sortOption }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set()); // State for favorited movies
  const [watched, setWatched] = useState(new Set()); // State for watched movies
  const itemsPerPage = 20; // Number of items per page

  useEffect(() => {
    const fetchAllMovies = async () => {
      let fetchedMovies = [];
      let page = 1;
      let hasMore = true;
      const apiKey = import.meta.env.VITE_API_KEY;
      const baseUrl = 'https://api.themoviedb.org/3';
      while (hasMore) {
        let url = `${baseUrl}/movie/now_playing?language=en-US&page=${page}&api_key=${apiKey}`;
        if (searchQuery) {
          url = `${baseUrl}/search/movie?query=${encodeURIComponent(searchQuery)}&page=${page}&api_key=${apiKey}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        const newMovies = data.results.filter(movie => !fetchedMovies.some(m => m.id === movie.id)); // Filter out duplicates
        fetchedMovies = [...fetchedMovies, ...newMovies];
        hasMore = data.page < data.total_pages; // Check if there are more pages
        page += 1;
      }
      setAllMovies(fetchedMovies);
      setDisplayMovies(applySorting(fetchedMovies, sortOption).slice(0, itemsPerPage));
    };

    fetchAllMovies();
  }, [searchQuery, sortOption]);

  const applySorting = (movies, sortOption) => {
    if (sortOption === 'alphabetical') {
      return [...movies].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'release-date') {
      return [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortOption === 'rating') {
      return [...movies].sort((a, b) => b.vote_average - a.vote_average);
    }
    return movies;
  };

  const toggleFavorite = (movieId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return new Set(newFavorites);
    });
  };

  const toggleWatched = (movieId) => {
    setWatched(prev => {
      const newWatched = new Set(prev);
      if (newWatched.has(movieId)) {
        newWatched.delete(movieId);
      } else {
        newWatched.add(movieId);
      }
      return new Set(newWatched);
    });
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const nextItems = applySorting(allMovies, sortOption).slice(0, nextPage * itemsPerPage);
    setDisplayMovies(nextItems);
  };

  return (
    <div className="MovieCardsContainer">
      {displayMovies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.has(movie.id)}
          isWatched={watched.has(movie.id)}
          onToggleFavorite={() => toggleFavorite(movie.id)}
          onToggleWatched={() => toggleWatched(movie.id)}
        />
      ))}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}

export default MovieCardsContainer;
