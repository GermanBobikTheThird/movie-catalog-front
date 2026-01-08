import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaService from '../services/media.service';
import { useAuth } from '../context/AuthContext';
import './MediaPage.css';

const MediaPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user } = useAuth();

    const [media, setMedia] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [listStatuses, setListStatuses] = useState([]);
    const [userStatus, setUserStatus] = useState('');
    const [userMediaRecordId, setUserMediaRecordId] = useState(null);
    const [isStatusLoading, setIsStatusLoading] = useState(false);

    const formatCurrency = (value) => {
        if (!value) return null;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getRatingColor = (val) => {
        if (!val) return '#666';
        if (val >= 7) return '#46d369';
        if (val >= 5) return '#e5a109';
        return '#e50914';
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [mediaData, statusesData] = await Promise.all([
                    MediaService.getById(id),
                    MediaService.getListStatuses(),
                ]);

                setMedia(mediaData);
                setListStatuses(statusesData);

                if (user) {
                    try {
                        const statusData = await MediaService.getUserStatus(id);
                        if (statusData) {
                            setUserStatus(statusData.status);
                            setUserMediaRecordId(statusData.id);
                        }
                    } catch (err) {
                        console.error('Error fetching user status:', err);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch media data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, i18n.language, user]);

    const handleStatusChange = async (e) => {
        const selectedValue = e.target.value;

        if (!user) {
            navigate('/login');
            return;
        }

        setIsStatusLoading(true);
        try {
            if (selectedValue === 'remove') {
                if (userMediaRecordId) {
                    await MediaService.removeFromList(userMediaRecordId);
                    setUserStatus('');
                    setUserMediaRecordId(null);
                }
            } else {
                const statusId = parseInt(selectedValue, 10);
                if (isNaN(statusId)) return;

                if (userMediaRecordId) {
                    await MediaService.updateListStatus(
                        userMediaRecordId,
                        statusId
                    );
                    setUserStatus(statusId);
                } else {
                    const result = await MediaService.addToList(id, statusId);
                    setUserStatus(statusId);
                    setUserMediaRecordId(result.id);
                }
            }
        } catch (error) {
            console.error('Failed to update status', error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                alert(t('common.error'));
            }
        } finally {
            setIsStatusLoading(false);
        }
    };

    const handleGenreClick = (genreId) => {
        navigate(`/?genres=${genreId}`);
    };

    if (isLoading)
        return <div className="loading-screen">{t('catalog.loading')}</div>;
    if (!media)
        return <div className="error-screen">{t('catalog.notFound')}</div>;

    const backdropImage = media.background_url || media.poster;

    return (
        <div className="media-page">
            {backdropImage && (
                <div
                    className="media-backdrop"
                    style={{ backgroundImage: `url(${backdropImage})` }}
                />
            )}

            <div className="media-container">
                <aside className="media-sidebar">
                    {media.poster ? (
                        <img
                            src={media.poster}
                            alt={media.title}
                            className="media-poster-lg"
                        />
                    ) : (
                        <div className="media-poster-lg poster-placeholder">
                            No Image
                        </div>
                    )}
                </aside>

                <main className="media-content">
                    <div className="media-title-block">
                        <h1>{media.title}</h1>
                        {media.original_title && (
                            <div className="media-original-title">
                                {media.original_title}
                            </div>
                        )}
                    </div>

                    <div className="media-meta-row">
                        <div
                            className="media-rating-box"
                            style={{
                                color: getRatingColor(media.rating),
                                borderColor: getRatingColor(media.rating),
                            }}
                        >
                            {media.rating || '-'}
                        </div>

                        <span
                            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                        >
                            {media.year}
                        </span>

                        {media.age_rating && (
                            <span
                                className="age-badge"
                                style={{ padding: '4px 8px', fontSize: '1rem' }}
                            >
                                {media.age_rating}
                            </span>
                        )}

                        {media.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="media-tag"
                                onClick={() => handleGenreClick(genre.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="media-actions">
                        <div className="status-select-wrapper">
                            <select
                                className="btn-primary status-select"
                                value={userStatus || 'placeholder'}
                                onChange={handleStatusChange}
                                disabled={isStatusLoading}
                            >
                                <option value="placeholder" disabled>
                                    {isStatusLoading
                                        ? '...'
                                        : `+ ${t(
                                              'media.addToList',
                                              'Добавить в список'
                                          )}`}
                                </option>

                                {listStatuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {t(
                                            `status.${status.slug}`,
                                            status.name
                                        )}
                                    </option>
                                ))}

                                {userStatus && (
                                    <option
                                        value="remove"
                                        style={{ color: '#ff6b6b' }}
                                    >
                                        {t(
                                            'media.removeFromList',
                                            'Удалить из списка'
                                        )}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>

                    {media.synopsis && (
                        <section className="media-section">
                            <h3>{t('media.synopsis')}</h3>
                            <p className="media-description">
                                {media.synopsis}
                            </p>
                        </section>
                    )}

                    <section className="media-section">
                        <h3>{t('media.details')}</h3>
                        <div className="details-grid">
                            {media.countries?.length > 0 && (
                                <div className="detail-item">
                                    <span>{t('media.country')}</span>
                                    <span>
                                        {media.countries
                                            .map((c) => c.name)
                                            .join(', ')}
                                    </span>
                                </div>
                            )}

                            {media.release_date && (
                                <div className="detail-item">
                                    <span>{t('media.releaseDate')}</span>
                                    <span>
                                        {formatDate(media.release_date)}
                                    </span>
                                </div>
                            )}

                            {media.is_series
                                ? media.total_episodes && (
                                      <div className="detail-item">
                                          <span>{t('media.episodes')}</span>
                                          <span>{media.total_episodes}</span>
                                      </div>
                                  )
                                : media.duration && (
                                      <div className="detail-item">
                                          <span>{t('media.duration')}</span>
                                          <span>{`${media.duration} ${t(
                                              'media.min'
                                          )}`}</span>
                                      </div>
                                  )}

                            {media.budget > 0 && (
                                <div className="detail-item">
                                    <span>{t('media.budget')}</span>
                                    <span>{formatCurrency(media.budget)}</span>
                                </div>
                            )}

                            {media.fees > 0 && (
                                <div className="detail-item">
                                    <span>{t('media.fees')}</span>
                                    <span>{formatCurrency(media.fees)}</span>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default MediaPage;
