import $api from '../api';
import { APP_CONSTANTS } from '../utils/constants';

const AuthService = {
    async login(username, password) {
        const response = await $api.post('token/', { username, password });

        if (response.data.access) {
            localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.data.access);
        }
        return response.data;
    },

    async register(username, email, password) {
        const response = await $api.post('register/', {
            username,
            email,
            password,
        });
        return response.data;
    },

    logout() {
        localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
    },
};

export default AuthService;
