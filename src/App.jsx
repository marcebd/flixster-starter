import React, { useState } from 'react';
import './App.css';
import Filter from './HomePageComponents/Filter';
import Header from './HomePageComponents/Header';
import MovieCardsContainer from './HomePageComponents/MovieCardsContainer';
import DropdownMenu from './HomePageComponents/Sort';
import LoadMoreButton from './HomePageComponents/LoadMoreButton';

const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <DropdownMenu onSortChange={handleSortChange} />
      <Filter />
      <MovieCardsContainer page={page} searchQuery={searchQuery} sortOption={sortOption} />
    </div>
  );
}

export default App;
