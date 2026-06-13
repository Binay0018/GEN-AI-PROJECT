import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, profile } from "../auth.api.jsx";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context; // ✅ capital L

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const response = await login({ email, password });
            setUser(response.user);
        } catch (e) {
            console.error('Login failed:', e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ name, email, password }) => {
        setLoading(true);
        try {
            const response = await register({ name, email, password });
            setUser(response.user);
        } catch (e) {
            console.error('Registration failed:', e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => { // ✅ capital L
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (e) {
            console.error('Logout failed:', e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const handleProfile = async () => {
        setLoading(true);
        try {
            const response = await profile();
            setUser(response.user);
        } catch (e) {
            console.error('Profile retrieval failed:', e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout, // ✅ capital L
        profile: handleProfile
    };
};