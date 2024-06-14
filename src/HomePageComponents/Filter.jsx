import React, { useState, useEffect } from 'react';
import { Genres } from './Genres'; // Ensure this is correctly imported

const Filter = ({ onFilterChange }) => {
  const [favorited, setFavorited] = useState(false);
  const [watched, setWatched] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState({});

  useEffect(() => {
    onFilterChange({ favorited, watched, genres: selectedGenres });
  }, [favorited, watched, selectedGenres, onFilterChange]);

  const handleGenreChange = (genreId) => {
    setSelectedGenres(prev => ({
      ...prev,
      [genreId]: !prev[genreId]
    }));
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={favorited}
          onChange={(e) => setFavorited(e.target.checked)}
        />
        Favorites
      </label>
      <label>
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
        Watched
      </label>
      <div>
        <h4>Genres:</h4>
        {Object.entries(Genres).map(([id, name]) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={!!selectedGenres[id]}
              onChange={() => handleGenreChange(id)}
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
