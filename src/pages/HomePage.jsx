import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaService from '../services/media.service';
import MovieGrid from '../components/catalog/MovieGrid';
import FiltersSidebar from '../components/catalog/FiltersSidebar';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import './HomePage.css';

const HomePage = () => {
    const { t, i18n } = useTranslation();
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [nextPage, setNextPage] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);
    const [mediaTypes, setMediaTypes] = useState([]);

    const filters = useCatalogFilters();

    const {
        sortField,
        sortDirection,
        yearRange,
        ratingRange,
        genreStates,
        countryStates,
        typeStates,
    } = filters;

    const buildParams = useCallback(() => {
        const params = {};

        const prefix = sortDirection === 'desc' ? '-' : '';
        params.ordering = `${prefix}${sortField}`;

        const search = searchParams.get('search');
        if (search) params.search = search;

        if (yearRange.min) params.min_year = yearRange.min;
        if (yearRange.max) params.max_year = yearRange.max;
        if (ratingRange.min) params.min_rating = ratingRange.min;
        if (ratingRange.max) params.max_rating = ratingRange.max;

        const processStates = (statesObj, paramName, excludeParamName) => {
            const included = [];
            const excluded = [];
            Object.entries(statesObj).forEach(([id, status]) => {
                if (status === 1) included.push(id);
                if (status === -1) excluded.push(id);
            });
            if (included.length) params[paramName] = included.join(',');
            if (excluded.length) params[excludeParamName] = excluded.join(',');
        };

        processStates(genreStates, 'genres', 'exclude_genres');
        processStates(countryStates, 'countries', 'exclude_countries');
        processStates(typeStates, 'media_type', 'exclude_media_type');

        return params;
    }, [
        sortField,
        sortDirection,
        yearRange,
        ratingRange,
        genreStates,
        countryStates,
        typeStates,
        searchParams,
    ]);

    useEffect(() => {
        const fetchDictionaries = async () => {
            try {
                const [genresData, countriesData, typesData] =
                    await Promise.all([
                        MediaService.getGenres(),
                        MediaService.getCountries(),
                        MediaService.getMediaTypes(),
                    ]);
                setGenres(genresData);
                setCountries(countriesData);
                setMediaTypes(typesData);

                const urlGenreId = searchParams.get('genres');
                if (urlGenreId) {
                    filters.setGenreStates({ [urlGenreId]: 1 });
                }
            } catch (error) {
                console.error('Dicts fetch error:', error);
            }
        };
        fetchDictionaries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            setIsLoading(true);
            try {
                const params = buildParams();
                const data = await MediaService.getAll(params);

                if (Array.isArray(data)) {
                    setMovies(data);
                    setNextPage(null);
                } else if (data.results) {
                    setMovies(data.results);
                    setNextPage(data.next);
                } else {
                    setMovies([]);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setMovies([]);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [buildParams]);

    const handleLoadMore = async () => {
        if (!nextPage || isLoadingMore) return;

        setIsLoadingMore(true);
        try {
            const urlObj = new URL(nextPage);
            const pageNum = urlObj.searchParams.get('page');

            const params = buildParams();
            params.page = pageNum;

            const data = await MediaService.getAll(params);

            if (data.results) {
                setMovies((prev) => [...prev, ...data.results]);
                setNextPage(data.next);
            }
        } catch (error) {
            console.error('Load more error:', error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    return (
        <div className="home-page">
            <main className="catalog-main">
                <div className="sort-bar">
                    <span>{t('catalog.sortBy')}:</span>
                    <select
                        value={filters.sortField}
                        onChange={(e) => filters.setSortField(e.target.value)}
                        className="sort-select"
                    >
                        <option value="year">
                            {t('catalog.sortOptions.year')}
                        </option>
                        <option value="rating">
                            {t('catalog.sortOptions.rating')}
                        </option>
                        <option value="created_at">
                            {t('catalog.sortOptions.created_at')}
                        </option>
                    </select>

                    <button
                        className="btn-text sort-dir-btn"
                        style={{
                            color: '#fff',
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.2rem',
                        }}
                        onClick={filters.toggleSortDirection}
                    >
                        {filters.sortDirection === 'asc' ? '↑' : '↓'}
                    </button>

                    <div style={{ marginLeft: 'auto', color: '#888' }}>
                        {t('catalog.found', { count: movies.length })}
                    </div>
                </div>

                {isLoading ? (
                    <div className="loading">{t('catalog.loading')}</div>
                ) : (
                    <>
                        <MovieGrid movies={movies} />

                        {nextPage && (
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: '30px',
                                }}
                            >
                                <button
                                    className="btn-primary load-more-btn"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    style={{
                                        padding: '10px 30px',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        backgroundColor: '#e50914',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        opacity: isLoadingMore ? 0.7 : 1,
                                    }}
                                >
                                    {isLoadingMore
                                        ? '...'
                                        : t('catalog.loadMore') || 'Show More'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <FiltersSidebar
                genres={genres}
                countries={countries}
                mediaTypes={mediaTypes}
                genreStates={filters.genreStates}
                countryStates={filters.countryStates}
                typeStates={filters.typeStates}
                yearRange={filters.yearRange}
                ratingRange={filters.ratingRange}
                onToggleGenre={filters.toggleGenre}
                onToggleCountry={filters.toggleCountry}
                onToggleType={filters.toggleType}
                setYearRange={filters.setYearRange}
                setRatingRange={filters.setRatingRange}
                onReset={filters.resetFilters}
            />
        </div>
    );
};

export default HomePage;
