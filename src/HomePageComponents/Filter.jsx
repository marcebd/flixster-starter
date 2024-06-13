import React, { useState, useEffect } from 'react';

const Filter = ({ onFilterChange }) => {
  const [favorited, setFavorited] = useState(false);
  const [watched, setWatched] = useState(false);

  const handleFilterUpdate = () => {
    onFilterChange({ favorited, watched });
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={favorited} onChange={(e) => {
          setFavorited(e.target.checked);
          handleFilterUpdate();
        }} />
        Watched
      </label>
      <label>
        <input type="checkbox" checked={watched} onChange={(e) => {
          setWatched(e.target.checked);
          handleFilterUpdate();
        }} />
        Favorite
      </label>
    </div>
  );
};

export default Filter;
