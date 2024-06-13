import React, { useState, useEffect } from 'react';

const Filter = ({ onFilterChange }) => {
  const [favorited, setFavorited] = useState(false);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    onFilterChange({ favorited, watched });
  }, [favorited, watched, onFilterChange]);

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
    </div>
  );
};

export default Filter;
