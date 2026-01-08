export class API_ROUTES {
    static BASE_URL = import.meta.env.VITE_API_URL ||
                      'https://onehunli.pythonanywhere.com/api';

    static MEDIA = {
        LIST: '/media/',
        DETAIL: (id) => `/media/${id}/`,
        INFO: '/media/info/',
    };

    static AUTH = {
        LOGIN: '/token/',
        REFRESH: '/token/refresh/',
        ME: '/user/me/',
    };
}

export const APP_CONSTANTS = {
    LANG_KEY: 'app_language',
    TOKEN_KEY: 'access_token',
    REFRESH_KEY: 'refresh_token',
};