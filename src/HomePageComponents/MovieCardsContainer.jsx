import './MovieCardsContainer.css'
import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import Filter from './Filter';
import DropdownMenu from './Sort';
import Modal from './Modal';

const MovieCardsContainer = ({ searchQuery }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const [watched, setWatched] = useState(new Set());
  const [filterSettings, setFilterSettings] = useState({
    favorited: false,
    watched: false,
    genres: {}
  });
  const [sortOption, setSortOption] = useState('');
  const itemsPerPage = 20;

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

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
      url = `${baseUrl}/search/movie?query=${encodeURIComponent(searchQuery)}&page=${page}&api_key=${apiKey}`;
    }

    console.log("Fetching movies with URL:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API response data:", data);
        if(page !== 1) {
            setAllMovies(prev => [...prev, ...data.results]);
        } else {
            setAllMovies(data.results);
        }
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    }
  }, [searchQuery, sortOption, updateDisplayMovies]);

  const handleFilterChange = useCallback((settings) => {
    console.log("Filter settings updated to:", settings);
    setFilterSettings(prev => ({ ...prev, ...settings }));
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

  const handleLoadMore = useCallback((event) => {
    event.preventDefault(); // Prevent default form submission behavior
    event.stopPropagation(); // Stop the event from bubbling up
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

export default MovieCardsContainer;
