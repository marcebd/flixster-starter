// Import the CSS file for styling the Filter component
import './Filter.css'
// Import necessary hooks and React from 'react'
import React, { useState, useEffect } from 'react';
// Import the Genres data from a separate module
import { Genres } from './Genres'; // Ensure this is correctly imported

// Define the Filter component with a prop for handling filter changes
const Filter = ({ onFilterChange }) => {
  // State for tracking if 'Favorites' is selected
  const [favorited, setFavorited] = useState(false);
  // State for tracking if 'Watched' is selected
  const [watched, setWatched] = useState(false);
  // State for tracking selected genres as an object
  const [selectedGenres, setSelectedGenres] = useState({});

  // Effect hook to call onFilterChange whenever the filter states change
  useEffect(() => {
    onFilterChange({ favorited, watched, genres: selectedGenres });
  }, [favorited, watched, selectedGenres, onFilterChange]);

  // Function to handle changes in genre selection
  const handleGenreChange = (genreId) => {
    setSelectedGenres(prev => ({
      ...prev,
      [genreId]: !prev[genreId] // Toggle the genre selection
    }));
  };

  // Render the Filter component
  return (
    <div className='Filters'>
      {/* Label and checkbox for filtering favorites */}
      <label className='favoritedFilter'>
        <input
          type="checkbox"
          checked={favorited}
          onChange={(e) => setFavorited(e.target.checked)}
        />
        <div className='filterName'>Favorites</div>
      </label>
      {/* Label and checkbox for filtering watched items */}
      <label className='watchedFilter'>
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
        <div className='filterName'>Watched</div>
      </label>
      {/* Container for genre filters */}
      <div className='genresFilters'>
        {/* Map over the Genres object to create a checkbox and label for each genre */}
        {Object.entries(Genres).map(([id, name]) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={!!selectedGenres[id]}
              onChange={() => handleGenreChange(id)}
            />
            <div className='filterName'>{name}</div>
          </label>
        ))}
      </div>
    </div>
  );
};

// Export the Filter component as the default export of this module
export default Filter;
