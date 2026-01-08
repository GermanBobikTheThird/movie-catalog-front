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
                    onSubmit={handleSearch}
                    style={{ flex: 1, maxWidth: '400px', margin: '0 20px' }}
                >
                    <Input
                        placeholder={t('catalog.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            fontSize: '14px',
                            backgroundColor: '#222',
                            borderColor: '#444',
                        }}
                    />
                </form>
                {/* ------------------- */}

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
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
