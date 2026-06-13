import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/profile');
        } catch (e) {
            console.error('Register failed:', e);
        }
    };

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="button primary-button">
                        Register
                    </button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    );
};

export default Register;