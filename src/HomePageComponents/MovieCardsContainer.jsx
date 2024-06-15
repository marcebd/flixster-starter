// Import the CSS styles specific to the MovieCardsContainer component
import './MovieCardsContainer.css';

// Import necessary components and hooks from React and other files
import MovieCard from './MovieCard';
import React, { useState, useEffect, useCallback } from 'react';
import Filter from './Filter';
import DropdownMenu from './Sort';
import Modal from './Modal';

// Define the MovieCardsContainer component with destructured props
const MovieCardsContainer = ({ searchQuery }) => {
  // State to store all movies fetched from the API
  const [allMovies, setAllMovies] = useState([]);
  // State to store movies that will be displayed after filtering
  const [displayMovies, setDisplayMovies] = useState([]);
  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to store favorite movies
  const [favorites, setFavorites] = useState(new Set());
  // State to store watched movies
  const [watched, setWatched] = useState(new Set());
  // State to manage filter settings
  const [filterSettings, setFilterSettings] = useState({
    favorited: false,
    watched: false,
    genres: {}
  });
  // State to manage sorting options
  const [sortOption, setSortOption] = useState('');
  // Constant for items per page in pagination
  const itemsPerPage = 20;

  // State to manage selected movie for modal
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to open modal and set selected movie
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  // Function to close modal and reset selected movie
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  // Callback to update displayed movies based on filters
  const updateDisplayMovies = useCallback((movies) => {
    console.log("Current filter settings:", filterSettings);

    // Check if all genre filters are false or if the genres object is empty
    const areAllGenresFalse = Object.keys(filterSettings.genres).length === 0 ||
                              Object.values(filterSettings.genres).every(value => !value);

    if (areAllGenresFalse && !filterSettings.favorited && !filterSettings.watched) {
      console.log("No filters applied. Displaying all movies.");
      setDisplayMovies(movies.slice(0, currentPage * itemsPerPage));
      return; // Exit the function early since no filtering is needed
    }

    // Continue with existing filtering logic if filters are applied
    let filteredMovies = movies.filter(movie => {
      const matchesFavorited = !filterSettings.favorited || favorites.has(movie.id);
      const matchesWatched = !filterSettings.watched || watched.has(movie.id);
      console.log(`Movie ID: ${movie.id}, Favorited: ${matchesFavorited}, Watched: ${matchesWatched}`);
      const matchesGenres = Object.keys(filterSettings.genres).length === 0 ||
                            movie.genre_ids.some(id => filterSettings.genres[id]);
      return matchesFavorited && matchesWatched && matchesGenres;
    });
    console.log("Filtered movies after applying filters:", filteredMovies);
    setDisplayMovies(filteredMovies.slice(0, currentPage * itemsPerPage));
  }, [favorites, watched, filterSettings, currentPage]);

  // Effect to fetch movies when search query or sort option changes
  useEffect(() => {
    fetchMovies(1);
  }, [searchQuery, sortOption]);

  // Effect to update displayed movies when filter settings or allMovies change
  useEffect(() => {
    updateDisplayMovies(allMovies);
  }, [filterSettings, allMovies, updateDisplayMovies]);

  // Function to fetch movies from the API
  const fetchMovies = useCallback(async (page) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseUrl = 'https://api.themoviedb.org/3';
    let url = `${baseUrl}/discover/movie?language=en-US&page=${page}&api_key=${apiKey}`;

    // Adjust URL based on sort option
    if (sortOption === 'alphabetical') {
        url += '&sort_by=original_title.asc';
    } else if (sortOption === 'release-date') {
        url += '&sort_by=release_date.desc';
    } else if (sortOption === 'rating') {
        url += '&sort_by=vote_average.desc';
    }

    // Adjust URL for search query
    if (searchQuery) {
      url = `${baseUrl}/search/movie?query=${encodeURIComponent(searchQuery)}&page=${page}&api_key=${apiKey}`;
    }

  // Log the URL being used to fetch movies
console.log("Fetching movies with URL:", url);

try {
    // Perform the API request
    const response = await fetch(url);
    const data = await response.json();
    console.log("API response data:", data);
    // Append new results to existing movies if not the first page
    if(page !== 1) {
        setAllMovies(prev => [...prev, ...data.results]);
    } else {
        // Set new movies if it's the first page
        setAllMovies(data.results);
    }
} catch (error) {
    console.error("Failed to fetch movies:", error);
}
}, [searchQuery, sortOption, updateDisplayMovies]);

// Callback to handle changes in filter settings
const handleFilterChange = useCallback((settings) => {
    console.log("Filter settings updated to:", settings);
    // Update filter settings state
    setFilterSettings(prev => ({ ...prev, ...settings }));
}, []);

// Callback to toggle favorite or watched status
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

// Callback to handle loading more movies
const handleLoadMore = useCallback((event) => {
    event.preventDefault(); // Prevent default form submission behavior
    event.stopPropagation(); // Stop the event from bubbling up
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(nextPage);
}, [currentPage, fetchMovies]);

// Callback to handle changes in sort option
const handleSortChange = useCallback((newSortOption) => {
    console.log("Sort option changed to:", newSortOption);
    setSortOption(newSortOption);
}, []);

// Render the MovieCardsContainer component
return (
    <div className="MovieCardsContainer">
      <div className='SortFilter'>
        <DropdownMenu onSortChange={handleSortChange} className='SortButton' />
        <Filter onFilterChange={handleFilterChange} className='Filters'/>
      </div>
      <div className='MovieList'>
        {displayMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => openModal(movie)}
            isFavorite={favorites.has(movie.id)}
            isWatched={watched.has(movie.id)}
            onToggleFavorite={() => toggleSet(setFavorites, movie.id)}
            onToggleWatched={() => toggleSet(setWatched, movie.id)}
          />
        ))}
      </div>
      <button type="button" onClick={handleLoadMore}>Load More</button>
      <Modal movie={selectedMovie} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

// Export the MovieCardsContainer component as the default export of this module
export default MovieCardsContainer;
