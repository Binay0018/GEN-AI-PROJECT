import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true, // applies to all requests automatically
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export async function register({ name, email, password }) {
    try {
        const response = await api.post('/register', {
            name, email, password
        });
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (e) {
        console.error('Register error:', e);
        throw e;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('/login', {
            email, password
        });
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (e) {
        console.error('Login error:', e);
        throw e;
    }
}

export async function logout() {
    try {
        const response = await api.post('/logout');
        // Remove token from localStorage
        localStorage.removeItem('token');
        return response.data;
    } catch (e) {
        console.error('Logout error:', e);
        // Still remove token even if logout fails
        localStorage.removeItem('token');
        throw e;
    }
}

export async function profile() {
    try {
        const response = await api.get('/profile');
        return response.data;
    } catch (e) {
        console.error('Profile error:', e);
        throw e;
    }
}