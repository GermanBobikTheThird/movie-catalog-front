import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import Input from './ui/Input';
import './Header.css';

const Header = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    MovieCatalog
                </Link>

                <form
                    className="search-form"
                    onSubmit={handleSearch}
                >
                    <Input
                        placeholder={t('catalog.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id='search-panel'
                    />
                </form>

                <div className="header-actions">
                    <nav className="nav">
                        {user ? (
                            <Link
                                to="/profile"
                                className="nav-link"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                            >
                                👤 {user.username}
                            </Link>
                        ) : (
                            <Link to="/login" className="nav-link">
                                {t('nav.login')}
                            </Link>
                        )}
                    </nav>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
};

export default Header;
