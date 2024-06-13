import React from 'react';
import { getGenreNames } from './GetGenredNames';


const Modal = ({ movie, isOpen, onClose }) => {
if (!isOpen) return null;
const genreNames = getGenreNames(movie?.genre_ids);
  return (
    <div className="Modal-Overlay">
        <div className="Modal-Content">
            <div className='Modal-Movie-Poster'>
                <img src={'https://image.tmdb.org/t/p/w500/'+movie?.poster_path} alt="movie?.title"/>
            </div>
            <div className='Modal-Movie-Info'>
                <h1>{movie?.title}</h1>
                <h2>{movie?.release_date}</h2>
                <h2>Genres: {genreNames.join(', ')}</h2>
                <img src={'https://image.tmdb.org/t/p/w500/'+movie?.backdrop_path} alt="movie?.title"/>
                <p>{movie?.overview}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  );
};

export default Modal;

//Add movie genres
