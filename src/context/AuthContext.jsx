import { createContext, useContext, useState } from 'react';
import { APP_CONSTANTS } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem(APP_CONSTANTS.TOKEN_KEY);
        const username = localStorage.getItem('user_name');

        if (token && username) {
            return { username };
        }
        return null;
    });

    const login = (token, username) => {
        localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, token);
        localStorage.setItem('user_name', username);
        setUser({ username });
    };

    const logout = () => {
        localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
        localStorage.removeItem('user_name');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
