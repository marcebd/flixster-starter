import './Header.css'
import React, { useState} from 'react';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.results);
    } else {
      setSuggestions([]);
      if (query.length === 0) {
        onSearch(''); // Trigger fetching "now playing" movies when search is cleared
      }
    }
  };

  const handleSearch = (query) => {
    onSearch(query);
    setSuggestions([]); // Clear suggestions after search
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <header className="Header">
      <h1 className='headerTitle'>Flixster</h1>
      <input
        type="text"
        id="searchBar"
        placeholder="Search movies..."
        className="searchBar"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={() => handleSearch(searchQuery)} className='searchButton'>Search</button>
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

export default Header;
