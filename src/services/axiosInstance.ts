import axios from 'axios';

// Ustvarimo lastno instanco z osnovnimi nastavitvami
const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // Tvoj backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Prestreže klic PREDEN gre na server
apiClient.interceptors.request.use(
    (config) => {
        // Preberemo token iz localStorage
        const token = localStorage.getItem('token');
        
        // Če token obstaja, ga dodamo v header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (opcijsko): Za lovljenje 401 napak (potečen token)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Če dobimo 401 Unauthorized, lahko tukaj avtomatsko odjavimo uporabnika
            // localStorage.removeItem('token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
