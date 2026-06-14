import React, { useState } from 'react';
import "../auth.form.scss";
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';

const Login = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const { error: toastError, success: toastSuccess } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            await login({ email, password });
            toastSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (e) {
            const errorMessage = e.response?.data?.message || e.userMessage || 'Login failed. Please try again.';
            toastError(errorMessage);
            console.error('Login failed:', e);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: '' });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) setErrors({ ...errors, password: '' });
    };

    if (loading) {
        return <main><h1>Loading...</h1></main>;
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={handleEmailChange}
                            disabled={loading}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                            disabled={loading}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <button type="submit" className="button primary-button" disabled={loading}>
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    );
};

export default Login;