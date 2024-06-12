// import { useState } from 'react'
import './App.css'
import Filter from './HomePageComponents/Filter'
import Header from './HomePageComponents/Header'
import MovieCardsContainer from './HomePageComponents/MovieCardsContainer'
import Sort from './HomePageComponents/Sort'
import LoadMoreButton from './HomePageComponents/LoadMoreButton'

const App = () => {
  return (

    <div className="App">
      <Header/>
      <Sort/>
      <Filter/>
      <MovieCardsContainer/>
      <LoadMoreButton/>
    </div>
  )
}

export default App;
