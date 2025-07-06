import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="text-primary">Welcome Back!</span>
                </h1>
                <p className="hero-subtitle">
                  Sign in to your account to access your quizzes and continue creating amazing content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="login-form-container">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                  <h3 className="mb-0">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Sign In to Your Account
                  </h3>
                </div>
                <div className="card-body p-4">
                  <LoginForm />
                </div>
                <div className="card-footer bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                  <p className="mb-0 text-muted">
                    <i className="fas fa-info-circle me-2"></i>
                    Don't have an account? <a href="/register" className="text-decoration-none">Sign up here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
