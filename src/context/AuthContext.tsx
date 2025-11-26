import { createContext, useState, useContext, ReactNode } from 'react';

// Definiramo, kaj vse bo naš Context ponujal ostalim komponentam
interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

// Ustvarimo context s privzetimi vrednostmi
const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Ob zagonu preverimo, če je token že shranjen v localStorage brskalnika
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    // Funkcija za prijavo: shrani token v state in v localStorage
    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Funkcija za odjavo: izbriše token
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    // Če token obstaja (ni null), je uporabnik prijavljen
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook za enostavnejši dostop do contexta
export const useAuth = () => useContext(AuthContext);
