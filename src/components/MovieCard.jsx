import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const ratingValue = parseFloat(movie.rating);
    const rating = movie.rating ? ratingValue.toFixed(1) : '-';

    const getRatingColor = (val) => {
        if (!val) return '#666';
        if (val >= 7) return '#46d369';
        if (val >= 5) return '#e5a109';
        return '#e50914';
    };

    return (
        <Link to={`/media/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <div className="poster-wrapper">
                    {movie.poster ? (
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="poster-image"
                        />
                    ) : (
                        <div className="poster-placeholder">No Poster</div>
                    )}

                    <div
                        className="rating-badge"
                        style={{ backgroundColor: getRatingColor(ratingValue) }}
                    >
                        <span>{rating}</span>
                    </div>
                </div>

                <div className="card-info">
                    <h3 className="card-title">{movie.title}</h3>

                    <div className="card-meta">
                        <div className="meta-left">
                            <span>{movie.year}</span>

                            {movie.age_rating !== null &&
                                movie.age_rating !== undefined && (
                                    <span className="age-badge">
                                        {movie.age_rating}
                                    </span>
                                )}
                        </div>

                        <span className="genre-text">
                            {movie.genres && movie.genres[0]
                                ? movie.genres[0].name
                                : ''}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
