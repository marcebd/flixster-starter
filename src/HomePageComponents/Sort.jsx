import './MovieCardsContainer.css'
import React, { useState, useEffect } from 'react';

function DropdownMenu({ onSortChange }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const newSortOption = event.target.value;
    setSelectedOption(newSortOption);
    onSortChange(newSortOption);
  };

  return (
    <div className='SortButton'>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="release-date">Release Date</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}

export default DropdownMenu;
