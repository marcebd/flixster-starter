import './Modal.css'
import React, { useEffect, useState } from 'react';
import { getGenreNames } from './GetGenredNames';

const Modal = ({ movie, isOpen, onClose }) => {
    const [trailerUrl, setTrailerUrl] = useState('');
    const [runtime, setRuntime] = useState('');
    const [showTrailer, setShowTrailer] = useState(false); // State to control trailer modal visibility

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movie || !isOpen) return;

            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=videos`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setRuntime(data.runtime);

                const trailer = data.videos.results.find(video => video.type === 'Trailer');
                setTrailerUrl(trailer ? `https://www.youtube.com/embed/${trailer.key}` : '');
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [movie, isOpen]);

    if (!isOpen) return null;
    const genreNames = getGenreNames(movie?.genre_ids);

    return (
        <div className="Modal-Overlay">
            <div className="Modal-Content">
                <div className='Modal-Movie-Poster' onClick={() => setShowTrailer(true)}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title}/>
                    {trailerUrl && <div className="play-button">▶</div>} {/* Play button overlay */}
                </div>
                <div className='Modal-Movie-Info'>
                    <h1>{movie?.title}</h1>
                    <h2>{movie?.release_date}</h2>
                    <h2>Genres: {genreNames.join(', ')}</h2>
                    {runtime && <p>Runtime: {runtime} minutes</p>}
                    <div className='bottomModalInfo'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} alt={movie?.title} className='movieImage'/>
                        <p className='movieOverview'>{movie?.overview}</p>
                    </div>
                    <button onClick={onClose} className='closeButton'>Close</button>
                </div>
                {showTrailer && trailerUrl && (
                    <div className="trailer-modal">
                        <iframe
                            src={trailerUrl}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                        />
                        <button onClick={() => setShowTrailer(false)} className='closeButton'>Close Trailer</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
