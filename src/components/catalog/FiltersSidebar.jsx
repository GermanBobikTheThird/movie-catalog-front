import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './FiltersSidebar.css';

const FilterGroup = ({ title, items, states, onItemClick, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => {
        if (!searchTerm) return items;
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a, b) => {
            const stateA = states[a.id] ? 1 : 0;
            const stateB = states[b.id] ? 1 : 0;
            if (stateA !== stateB) return stateB - stateA;
            return a.name.localeCompare(b.name);
        });
    }, [filteredItems, states]);

    return (
        <div className="filter-group">
            <h3>{title}</h3>
            <div style={{ marginBottom: '8px' }}>
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filter-list">
                {sortedItems.map((item) => {
                    const currentState = states[item.id] || 0;
                    return (
                        <div
                            key={item.id}
                            className={`filter-item state-${currentState}`}
                            onClick={() => onItemClick(item.id)}
                        >
                            <span className="item-name">{item.name}</span>
                            <div className="state-icon">
                                {currentState === 1 && (
                                    <span style={{ color: '#46d369' }}>✓</span>
                                )}
                                {currentState === -1 && (
                                    <span style={{ color: '#e50914' }}>✕</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const RangeFilterGroup = ({
    title,
    fromVal,
    toVal,
    onChangeFrom,
    onChangeTo,
    minPlaceholder,
    maxPlaceholder,
}) => {
    return (
        <div className="filter-group">
            <h3>{title}</h3>
            <div className="range-inputs">
                <Input
                    type="number"
                    placeholder={minPlaceholder}
                    value={fromVal}
                    onChange={(e) => onChangeFrom(e.target.value)}
                    className="range-input-field"
                />
                <span className="range-separator">—</span>
                <Input
                    type="number"
                    placeholder={maxPlaceholder}
                    value={toVal}
                    onChange={(e) => onChangeTo(e.target.value)}
                    className="range-input-field"
                />
            </div>
        </div>
    );
};

const FiltersSidebar = ({
    genres = [],
    countries = [],
    mediaTypes = [],
    genreStates,
    countryStates,
    typeStates,
    yearRange,
    ratingRange,
    onToggleGenre,
    onToggleCountry,
    onToggleType,
    setYearRange,
    setRatingRange,
    onReset,
}) => {
    const { t } = useTranslation();

    return (
        <aside className="filters-sidebar">
            <div className="filters-header">
                <h3 className="sidebar-title">{t('catalog.filters')}</h3>
                <button onClick={onReset} className="btn-text reset-link">
                    {t('catalog.reset')}
                </button>
            </div>

            <RangeFilterGroup
                title={t('catalog.sortOptions.rating')}
                fromVal={ratingRange.min}
                toVal={ratingRange.max}
                onChangeFrom={(val) =>
                    setRatingRange((prev) => ({ ...prev, min: val }))
                }
                onChangeTo={(val) =>
                    setRatingRange((prev) => ({ ...prev, max: val }))
                }
                minPlaceholder="0"
                maxPlaceholder="10"
            />

            <RangeFilterGroup
                title={t('catalog.year')}
                fromVal={yearRange.min}
                toVal={yearRange.max}
                onChangeFrom={(val) =>
                    setYearRange((prev) => ({ ...prev, min: val }))
                }
                onChangeTo={(val) =>
                    setYearRange((prev) => ({ ...prev, max: val }))
                }
                minPlaceholder="1900"
                maxPlaceholder="2025"
            />

            <FilterGroup
                title={t('catalog.type')}
                items={mediaTypes}
                states={typeStates}
                onItemClick={onToggleType}
                placeholder={t('catalog.searchFilter')}
            />

            <FilterGroup
                title={t('catalog.country')}
                items={countries}
                states={countryStates}
                onItemClick={onToggleCountry}
                placeholder={t('catalog.searchFilter')}
            />

            <FilterGroup
                title={t('catalog.genres')}
                items={genres}
                states={genreStates}
                onItemClick={onToggleGenre}
                placeholder={t('catalog.searchFilter')}
            />

            <Button onClick={onReset} style={{ width: '100%', marginTop: 'auto' }}>
                {t('catalog.reset')}
            </Button>
        </aside>
    );
};

export default FiltersSidebar;