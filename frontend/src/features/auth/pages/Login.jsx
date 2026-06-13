import React, { useState } from 'react';
import "../auth.form.scss";
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        await login({ email, password });
        navigate('/profile');
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button primary-button">
                        Login
                    </button>
                </form>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    );
};

export default Login;