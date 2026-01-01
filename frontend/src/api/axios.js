import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://post-manager-backend.onrender.com/',
    withCredentials: true, // Include cookies in requests
});

// Function to get new access token using refresh token
const refreshAccessToken = async () => {
    // const refreshToken = Cookies.get('refreshToken'); // Get refresh token from cookies
    // if (!refreshToken) return null;

    try {
        const response = await api.get('/auth/refresh');
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken); // Store access token in local storage
        return accessToken;
    } catch (error) {
        console.error('Failed to refresh access token', error);
        return null;
    }
};

// Interceptor to handle token expiration
api.interceptors.request.use(
    async (config) => {

        // ❗ Skip auth logic for login & signup
        if (
            config.url.includes('/auth/login') ||
            config.url.includes('/auth/signup') ||
            config.url.includes('/auth/refresh')
        ) {
            return config;
        }

        let accessToken = localStorage.getItem('accessToken');

        if (isTokenExpired(accessToken)) {
            accessToken = await refreshAccessToken();
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// Function to check if the token is expired
const isTokenExpired = (token) => {
    if (!token || token.split('.').length !== 3) {
        return true;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch (err) {
        return true;
    }
};


export default api;

