import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import Filter from './Filter';
import DropdownMenu from './Sort';

const MovieCardsContainer = ({ searchQuery }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const [watched, setWatched] = useState(new Set());
  const [filterSettings, setFilterSettings] = useState({ favorited: false, watched: false });
  const [sortOption, setSortOption] = useState('');
  const itemsPerPage = 20;

  const updateDisplayMovies = useCallback((movies) => {
    let filteredMovies = movies.filter(movie =>
        (!filterSettings.favorited || favorites.has(movie.id)) &&
        (!filterSettings.watched || watched.has(movie.id))
    );
    console.log("Filtered movies after applying filters:", filteredMovies);
    setDisplayMovies(filteredMovies.slice(0, currentPage * itemsPerPage));
  }, [favorites, watched, filterSettings, currentPage]);

  useEffect(() => {
    fetchMovies(1);
  }, [searchQuery, sortOption]);

  useEffect(() => {
    updateDisplayMovies(allMovies);
  }, [filterSettings, allMovies, updateDisplayMovies]);

  const fetchMovies = useCallback(async (page) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseUrl = 'https://api.themoviedb.org/3';
    let url = `${baseUrl}/discover/movie?language=en-US&page=${page}&api_key=${apiKey}`;

    if (sortOption === 'alphabetical') {
        url += '&sort_by=original_title.asc';
    } else if (sortOption === 'release-date') {
        url += '&sort_by=release_date.desc';
    } else if (sortOption === 'rating') {
        url += '&sort_by=vote_average.desc';
    }

    if (searchQuery) {
        url += `&query=${encodeURIComponent(searchQuery)}`;
    }

    console.log("Fetching movies with URL:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API response data:", data);
        setAllMovies(data.results);
        updateDisplayMovies(data.results);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    }
  }, [searchQuery, sortOption, updateDisplayMovies]);

  const handleFilterChange = useCallback((settings) => {
    console.log("Filter settings updated to:", settings);
    setFilterSettings(settings);
  }, []);

  const toggleSet = useCallback((setId, movieId) => {
    setId(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      console.log(`Toggled ${setId === setFavorites ? 'favorite' : 'watched'} for movie ID: ${movieId}`);
      return new Set(newSet);
    });
    updateDisplayMovies(allMovies);
  }, [allMovies, updateDisplayMovies]);

  const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(nextPage);
  }, [currentPage, fetchMovies]);

  const handleSortChange = useCallback((newSortOption) => {
    console.log("Sort option changed to:", newSortOption);
    setSortOption(newSortOption);
  }, []);

  return (
    <div className="MovieCardsContainer">
      <DropdownMenu onSortChange={handleSortChange} />
      <Filter onFilterChange={handleFilterChange} />
      {displayMovies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.has(movie.id)}
          isWatched={watched.has(movie.id)}
          onToggleFavorite={() => toggleSet(setFavorites, movie.id)}
          onToggleWatched={() => toggleSet(setWatched, movie.id)}
        />
      ))}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}

export default MovieCardsContainer;
