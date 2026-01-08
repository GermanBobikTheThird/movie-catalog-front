import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaService from '../services/media.service';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [userMedia, setUserMedia] = useState([]);
    const [listStatuses, setListStatuses] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user) {
                navigate('/login');
                return;
            }

            setIsLoading(true);
            try {
                const [statuses, responseData] = await Promise.all([
                    MediaService.getListStatuses(),
                    MediaService.getUserMedia(),
                ]);

                setListStatuses(statuses);

                const records = responseData.results || responseData;
                setUserMedia(Array.isArray(records) ? records : []);

                if (statuses.length > 0 && activeTab === null) {
                    setActiveTab(statuses[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch profile data', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, [user, navigate, activeTab]);

    const filteredMedia = useMemo(() => {
        if (!Array.isArray(userMedia)) return [];
        return userMedia.filter((item) => {
            const statusId = item.status;
            return statusId === activeTab;
        });
    }, [userMedia, activeTab]);

    const handleUpdateStatus = async (recordId, newStatusId) => {
        try {
            const statusId = parseInt(newStatusId);
            await MediaService.updateListStatus(recordId, statusId);

            setUserMedia((prev) =>
                prev.map((item) =>
                    item.id === recordId ? { ...item, status: statusId } : item
                )
            );
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert(t('common.error'));
        }
    };

    const handleRemove = async (recordId) => {
        if (!window.confirm(t('common.confirmDelete', 'Удалить из списка?')))
            return;
        try {
            await MediaService.removeFromList(recordId);
            setUserMedia((prev) => prev.filter((item) => item.id !== recordId));
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert(t('common.error'));
        }
    };

    if (isLoading)
        return <div className="loading-screen">{t('catalog.loading')}</div>;

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>{t('profile.myLists', 'Мои списки')}</h1>
            </header>

            <div className="tabs-container">
                {listStatuses.map((status) => (
                    <button
                        key={status.id}
                        className={`tab-btn ${
                            activeTab === status.id ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab(status.id)}
                    >
                        {t(`status.${status.slug}`, status.name)}
                        <span className="count">
                            (
                            {
                                userMedia.filter((m) => m.status === status.id)
                                    .length
                            }
                            )
                        </span>
                    </button>
                ))}
            </div>

            <div className="table-wrapper">
                {filteredMedia.length > 0 ? (
                    <table className="media-table">
                        <thead>
                            <tr>
                                <th>{t('media.title', 'Название')}</th>
                                <th>{t('profile.actions', 'Действия')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMedia.map((item) => (
                                <tr key={item.id} className='table-row'>
                                    <td
                                        className="title-cell"
                                        onClick={() =>
                                            navigate(`/media/${item.media}`)
                                        }
                                    >
                                        <img
                                            src={item.media_poster}
                                            alt=""
                                            className="table-poster"
                                            onError={(e) => {
                                                e.target.src =
                                                    '/placeholder.png';
                                            }}
                                        />
                                        <div className="title-info">
                                            <div className="title-bold">
                                                {item.media_title ||
                                                    t('common.unknown')}
                                            </div>
                                            <div className="title-meta">
                                                {item.media_year && (
                                                    <span className="meta-year">
                                                        {item.media_year}
                                                    </span>
                                                )}
                                                {item.media_rating && (
                                                    <span
                                                        className="meta-rating"
                                                        style={{
                                                            color:
                                                                item.media_rating >=
                                                                7
                                                                    ? '#46d369'
                                                                    : '#e5a109',
                                                        }}
                                                    >
                                                        ★ {item.media_rating}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="actions-cell">
                                        <div className="actions-container">
                                            <select
                                                className="move-select"
                                                value={item.status}
                                                onChange={(e) =>
                                                    handleUpdateStatus(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {listStatuses.map((s) => (
                                                    <option
                                                        key={s.id}
                                                        value={s.id}
                                                    >
                                                        {t(
                                                            `status.${s.slug}`,
                                                            s.name
                                                        )}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-list">
                        {t('profile.emptyList', 'Список пуст')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
