// Import the CSS styles specific to the Modal component
import './Modal.css';

// Import React, useEffect, and useState hooks from the React library
import React, { useEffect, useState } from 'react';

// Import the function to get genre names based on genre IDs
import { getGenreNames } from './GetGenredNames';

// Define the Modal component with destructured props
const Modal = ({ movie, isOpen, onClose }) => {
    // State to store the trailer URL
    const [trailerUrl, setTrailerUrl] = useState('');

    // State to store the runtime of the movie
    const [runtime, setRuntime] = useState('');

    // State to control trailer modal visibility
    const [showTrailer, setShowTrailer] = useState(false);

    // useEffect hook to fetch movie details when the modal is opened or the movie changes
    useEffect(() => {
        const fetchMovieDetails = async () => {
            // Return early if no movie is selected or modal is not open
            if (!movie || !isOpen) return;

            // API key and URL construction for fetching movie details
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=videos`;

            try {
                // Fetch movie details from the API
                const response = await fetch(url);
                const data = await response.json();
                setRuntime(data.runtime); // Set the runtime from the fetched data

                // Find a trailer video among the fetched videos
                const trailer = data.videos.results.find(video => video.type === 'Trailer');
                setTrailerUrl(trailer ? `https://www.youtube.com/embed/${trailer.key}` : '');
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [movie, isOpen]); // Dependencies for the useEffect hook

    // Return null to not render anything if the modal is not open
    if (!isOpen) return null;

    // Get genre names using the genre IDs from the movie data
    const genreNames = getGenreNames(movie?.genre_ids);

    // Render the Modal component
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

// Export the Modal component as the default export of this module
export default Modal;
