import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await AuthService.register(
                formData.username,
                formData.email,
                formData.password
            );

            const data = await AuthService.login(
                formData.username,
                formData.password
            );

            login(data.access, formData.username);

            navigate('/');
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            if (err.response && err.response.status === 400) {
                setError('Registration error. That name may already be taken.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
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
            <h1>{t('auth.registerTitle')}</h1>

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
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                    required
                />

                <Input
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                />

                <Input
                    type="password"
                    placeholder={t('auth.passwordPlaceholder')}
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    required
                />

                {error && <div style={{ color: 'red' }}>{error}</div>}

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? '...' : t('auth.submitRegister')}
                </Button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <Link to="/login" style={{ color: '#e50914' }}>
                    {t('auth.toLogin')}
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
