import { useState, useCallback } from 'react';

export const useCatalogFilters = () => {
    const [genreStates, setGenreStates] = useState({});
    const [countryStates, setCountryStates] = useState({});
    const [typeStates, setTypeStates] = useState({});

    const [yearRange, setYearRange] = useState({ min: '', max: '' });
    const [ratingRange, setRatingRange] = useState({ min: '', max: '' });

    const [sortField, setSortField] = useState('year');
    const [sortDirection, setSortDirection] = useState('desc');

    const toggleItemState = useCallback((id, setStates) => {
        setStates((prev) => {
            const current = prev[id] || 0;
            let next = 0;
            if (current === 0) next = 1;
            else if (current === 1) next = -1;
            else if (current === -1) next = 0;

            const newStates = { ...prev };
            if (next === 0) delete newStates[id];
            else newStates[id] = next;
            return newStates;
        });
    }, []);

    const toggleGenre = useCallback(
        (id) => toggleItemState(id, setGenreStates),
        [toggleItemState]
    );
    const toggleCountry = useCallback(
        (id) => toggleItemState(id, setCountryStates),
        [toggleItemState]
    );
    const toggleType = useCallback(
        (id) => toggleItemState(id, setTypeStates),
        [toggleItemState]
    );

    const resetFilters = useCallback(() => {
        setGenreStates({});
        setCountryStates({});
        setTypeStates({});
        setYearRange({ min: '', max: '' });
        setRatingRange({ min: '', max: '' });
    }, []);

    const toggleSortDirection = useCallback(() => {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    }, []);

    return {
        genreStates,
        setGenreStates,
        countryStates,
        typeStates,
        yearRange,
        setYearRange,
        ratingRange,
        setRatingRange,
        sortField,
        setSortField,
        sortDirection,
        setSortDirection,

        toggleGenre,
        toggleCountry,
        toggleType,
        toggleSortDirection,
        resetFilters,
    };
};
