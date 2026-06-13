import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import "../auth.form.scss";

const Profile = () => {
    const { user, logout, profile } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        profile(); // fetch fresh user data on mount
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    if (!user) return <main><h1>Loading...</h1></main>;

    return (
        <main>
            <div className="profile-container">

                <div className="profile-card header-card">
                    <div className="avatar">{getInitials(user.name)}</div>
                    <div className="user-info">
                        <h1>{user.name}</h1>
                        <p>{user.email}</p>
                        <span className="badge">Active</span>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-val">12</span>
                        <span className="stat-lbl">Projects</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-val">5</span>
                        <span className="stat-lbl">Logins</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-val">1h</span>
                        <span className="stat-lbl">Session</span>
                    </div>
                </div>

                <div className="profile-card details-card">
                    <p className="section-label">Account details</p>
                    <div className="info-row">
                        <span className="info-label">Name</span>
                        <span className="info-val">{user.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Email</span>
                        <span className="info-val">{user.email}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Role</span>
                        <span className="info-val">User</span>
                    </div>
                </div>

                <button className="button primary-button logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </main>
    );
};

export default Profile;