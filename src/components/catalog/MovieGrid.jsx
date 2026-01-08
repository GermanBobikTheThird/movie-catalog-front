import { useTranslation } from 'react-i18next';
import MovieCard from '../MovieCard';

const MovieGrid = ({ movies, isLoading }) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <div className="state-message">{t('catalog.loading')}</div>;
    }

    if (movies.length === 0) {
        return (
            <div className="state-message">
                <h3>{t('catalog.notFound')}</h3>
                <p>{t('catalog.noResultsDesc')}</p>
            </div>
        );
    }

    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGrid;