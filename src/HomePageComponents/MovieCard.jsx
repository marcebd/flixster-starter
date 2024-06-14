import './MovieCard.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, onClick, isFavorite, isWatched, onToggleFavorite, onToggleWatched }) => {
  return (
    <div className="MovieCard">
      <div className="MovieCard__header" onClick={onClick}>
        <img src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} className='movieCardPoster' alt={`${movie?.title} Poster`} />
        <h3 className='Movie-Title'>{movie?.title}</h3>
      </div>
      <div className='movieCardOverview'>
        <button onClick={onToggleFavorite} style={{ color: isFavorite ? 'red' : 'grey', border: 'none', background: 'transparent' }} className='movieCardFavoriteHeart'>
          <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} size="lg" />
        </button>
        <div className='movieCardOverview'>
        <label className='movieCardWatchedLabel'>
          <input type="checkbox" checked={isWatched} onChange={onToggleWatched} className='movieCardWatchedButton'/>
          Watched
        </label>
        <div className='rating'>
          <span className='movieCardRating'>Rating: {movie?.vote_average} / 10</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
