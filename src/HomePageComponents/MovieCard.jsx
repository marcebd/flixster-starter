import { useState } from 'react'

const MovieCard = () => {
  return (

    <div className="MovieCard">
      <img src='ChangeImage.png' />
      <div className="MovieCardInfo">
        <h1>Movie Title</h1>
        <p>Movie Rating</p>
      </div>
    </div>
  )
}

export default MovieCard;
