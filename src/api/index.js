import axios from 'axios';
import { API_ROUTES, APP_CONSTANTS } from '../utils/constants';

const $api = axios.create({
    baseURL: API_ROUTES.BASE_URL,
});

// 1. Request Interceptor (Отправляем токен, если есть)
$api.interceptors.request.use((config) => {
    const lang = localStorage.getItem(APP_CONSTANTS.LANG_KEY) || 'ru';
    config.headers['Accept-Language'] = lang;

    const token = localStorage.getItem(APP_CONSTANTS.TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
        }
        throw error;
    }
);

export default $api;
