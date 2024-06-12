import React, { useState } from 'react';

function DropdownMenu() {
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle when an option is selected
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="" className='DropDownSelect'>Select</option>
        <option value="alphabetical" className='DropDownOptions'>Alphabetical</option>
        <option value="release-date" className='DropDownOptions'>Release Date</option>
        <option value="rating" className='DropDownOptions'>Rating</option>
      </select>
    </div>
  );
}

export default DropdownMenu;
