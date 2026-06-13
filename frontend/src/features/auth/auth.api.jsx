import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true, // applies to all requests automatically
});

export async function register({ name, email, password }) {
    try {
        const response = await api.post('/register', {
            name, email, password
        });
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
        return response.data;
    } catch (e) {
        console.error('Login error:', e);
        throw e;
    }
}

export async function logout() {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (e) {
        console.error('Logout error:', e);
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