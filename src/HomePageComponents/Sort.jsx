import React, { useState, useEffect } from 'react';

function DropdownMenu({ onSortChange }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    onSortChange(event.target.value); // Pass the selected option back to the parent
  };

  return (
    <div>
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
