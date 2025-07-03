import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

const Header = () => {
    // const { user, logout } = useAuth();
    const user = null; // Mock user state
    const navigate = useNavigate();

    const handleLogout = () => {
        // logout();
        navigate('/login');
    };

    return (
        <header className="header-bar">
            <nav className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0'}}>
                <Link to="/" className="header-title">
                    QuizBm
                </Link>
                <div className="header-actions">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="header-link">
                                Dashboard
                            </Link>
                            <span className="header-user">Welcome, {user.name}!</span>
                            <button
                                onClick={handleLogout}
                                className="header-logout"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="header-link">
                                Login
                            </Link>
                            <Link to="/register" className="header-register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
