import React, { useState } from 'react';

import Header from './HomePageComponents/Header';
import MovieCardsContainer from './HomePageComponents/MovieCardsContainer';

const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');


  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };


  return (
    <div className="App">
      <Header onSearch={handleSearch} />
        <MovieCardsContainer page={page} searchQuery={searchQuery} sortOption={sortOption} />
    </div>
  );
}

export default App;
