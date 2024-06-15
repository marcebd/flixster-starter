// Import the CSS styles specific to the Header component
import './Header.css';

// Import React and the useState hook from the React library
import React, { useState } from 'react';

// Define the Header component with a destructured onSearch prop
const Header = ({ onSearch }) => {
  // State for storing the current search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for storing the list of movie suggestions
  const [suggestions, setSuggestions] = useState([]);

  // Asynchronous function to handle changes in the search input
  const handleInputChange = async (event) => {
    const query = event.target.value; // Get the current value of the input
    setSearchQuery(query); // Update the searchQuery state with the new value

    // Check if the query length is more than 2 characters
    if (query.length > 2) {
      const apiKey = import.meta.env.VITE_API_KEY; // Retrieve the API key from environment variables
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`; // Construct the API URL
      const response = await fetch(url); // Fetch data from the API
      const data = await response.json(); // Convert the response into JSON
      setSuggestions(data.results); // Update the suggestions state with the results
    } else {
      setSuggestions([]); // Clear suggestions if the query is less than 3 characters
      if (query.length === 0) {
        onSearch(''); // Trigger fetching "now playing" movies when search is cleared
      }
    }
  };

  // Function to handle the search action
  const handleSearch = (query) => {
    onSearch(query); // Call the onSearch function passed as a prop
    setSuggestions([]); // Clear suggestions after search
  };

  // Function to handle key press events in the search input
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
      handleSearch(searchQuery); // Perform search when 'Enter' is pressed
    }
  };

  // Render the Header component
  return (
    <header className="Header">
      <h1 className='headerTitle'>Flixster</h1> // Display the title
      <input
        type="text"
        id="searchBar"
        placeholder="Search movies..."
        className="searchBar"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={() => handleSearch(searchQuery)} className='searchButton'>Search</button> // Search button
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((movie, index) => (
            <li key={index} onClick={() => {
              setSearchQuery(movie.title);
              handleSearch(movie.title);
            }}>
              <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} className='movieSuggestionPoster' />
              <div className='movieSuggestionTitle'> {movie.title}</div>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

// Export the Header component as the default export of this module
export default Header;
