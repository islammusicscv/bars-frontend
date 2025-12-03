import {createContext, useState, useContext, type ReactNode, useEffect} from 'react';

// Definiramo, kaj vse bo naš Context ponujal ostalim komponentam
interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    userId: number | null;
    login: (token: string) => void;
    logout: () => void;
}

// Ustvarimo context s privzetimi vrednostmi
const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    userId: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Ob zagonu preverimo, če je token že shranjen v localStorage brskalnika
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userId, setUserId] = useState<number | null>(null);

    //rabim, da ugotovim id userja, ko bom parsal žeton
    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            const decoded = parseJwt(storedToken);
            if (decoded) {
                setUserId(decoded.sub || decoded.id);
            }
        }
    }, []);

    // Funkcija za prijavo: shrani token v state in v localStorage
    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        //pogledam id
        const decoded = parseJwt(newToken);
        if (decoded) {
            setUserId(decoded.sub || decoded.id);
        }
    };

    // Funkcija za odjavo: izbriše token
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserId(null);
    };

    // Če token obstaja (ni null), je uporabnik prijavljen
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook za enostavnejši dostop do contexta
export const useAuth = () => useContext(AuthContext);
