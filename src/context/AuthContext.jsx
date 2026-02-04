import { createContext, useContext, useState, useEffect } from 'react';
import dbService from '../services/dbService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('admac_logged_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Error parsing session:', e);
                localStorage.removeItem('admac_logged_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        const users = dbService.getUsers();
        const foundUser = users.find(u => u.username === username && u.password === password);

        if (foundUser) {
            if (foundUser.status !== 'Ativo') {
                return { success: false, message: 'Este usuário está inativo.' };
            }
            const userData = {
                id: foundUser.id,
                name: foundUser.name,
                username: foundUser.username,
                role: foundUser.role,
                photo: foundUser.photo
            };
            setUser(userData);
            localStorage.setItem('admac_logged_user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, message: 'Usuário ou senha incorretos.' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admac_logged_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
