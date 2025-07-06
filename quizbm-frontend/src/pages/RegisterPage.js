import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="register-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="text-primary">Create Your Account</span>
                </h1>
                <p className="hero-subtitle">
                  Register to start creating, sharing, and playing amazing quizzes!
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
            <div className="register-form-container">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                  <h3 className="mb-0">
                    <i className="fas fa-user-plus me-2"></i>
                    Register
                  </h3>
                </div>
                <div className="card-body p-4">
                  <RegisterForm />
                </div>
                <div className="card-footer bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                  <p className="mb-0 text-muted">
                    <i className="fas fa-info-circle me-2"></i>
                    Already have an account? <a href="/login" className="text-decoration-none">Sign in here</a>
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

export default RegisterPage;
