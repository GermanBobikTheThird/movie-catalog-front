import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await AuthService.login(username, password);
            login(data.access, username);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Incorrect login or password');
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '50px auto',
                textAlign: 'center',
            }}
        >
            <h1>{t('auth.loginTitle')}</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    marginTop: '20px',
                }}
            >
                <Input
                    placeholder={t('auth.usernamePlaceholder')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder={t('auth.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <div style={{ color: 'red' }}>{error}</div>}

                <Button type="submit">{t('auth.submitLogin')}</Button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <Link to="/register" style={{ color: '#e50914' }}>
                    {t('auth.toRegister')}
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
