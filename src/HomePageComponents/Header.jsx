import { useState } from 'react'

const Header = () => {
  return (
    <header className="Header">
      <h1 className='headerTitle'>Flixster</h1>
      <input type="text" id="searchBar" placeholder="Search movies..." className="searchBar"></input>
    </header>
  )
}

export default Header
