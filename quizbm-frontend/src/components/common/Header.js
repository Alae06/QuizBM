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
        <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #6a82fb 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="container d-flex justify-content-between align-items-center py-2">
                <Link to="/" className="navbar-brand fw-bold fs-3 text-white d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-mortarboard me-2" viewBox="0 0 16 16">
  <path d="M8 0c-.176 0-.35.03-.52.09L.185 2.958a.5.5 0 0 0 0 .943l7.295 2.868a.5.5 0 0 0 .384 0l7.295-2.868a.5.5 0 0 0 0-.943L8.52.09A1.5 1.5 0 0 0 8 0zm0 1.058 6.445 2.534L8 6.126 1.555 3.592 8 1.058z"/>
  <path d="M2.651 5.99v2.286c0 1.09.848 2.132 2.13 2.807C6.06 11.754 7.49 12 8 12c.51 0 1.94-.246 3.219-.917 1.282-.675 2.131-1.717 2.131-2.807V5.99L8 8.874 2.651 5.99zm9.37 0L8 8.874 3.979 6.3v1.977c0 .633.51 1.367 1.49 1.89C6.45 10.694 7.49 11 8 11c.51 0 1.55-.306 2.531-.833.98-.523 1.49-1.257 1.49-1.89V6.3l-.001-.309z"/>
</svg>

                    QuizBm
                </Link>
                <div>
                    <Link to="/login" className="btn btn-outline-light btn-sm me-2">Login</Link>
                    <Link to="/register" className="btn btn-light btn-sm">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
