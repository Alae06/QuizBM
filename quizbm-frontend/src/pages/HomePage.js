import React from 'react';

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="hero-content">
                                <h1 className="hero-title">
                                    <span className="text-primary">Welcome to QuizBm!</span>
                                </h1>
                                <p className="hero-subtitle">
                                    Create, share, and play beautiful timed quizzes. Challenge yourself or your friends!
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
                        <div className="welcome-card">
                            <div className="card border-0 shadow-lg">
                                <div className="card-header bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                                    <h3 className="mb-0">
                                        <i className="fas fa-rocket me-2"></i>
                                        Get Started Today
                                    </h3>
                                </div>
                                <div className="card-body text-center p-5">
                                    <div className="welcome-icon mb-4">
                                        <i className="fas fa-question-circle"></i>
                                    </div>
                                    <h2 className="card-title text-primary mb-3">Ready to Create Amazing Quizzes?</h2>
                                    <p className="card-text text-muted mb-4">
                                        Join thousands of users who are already creating engaging quizzes. 
                                        Start building your first quiz in minutes!
                                    </p>
                                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                                        <a 
                                            href="/register" 
                                            className="btn btn-primary btn-lg"
                                        >
                                            <i className="fas fa-user-plus me-2"></i>
                                            Get Started
                                        </a>
                                        <a 
                                            href="/login" 
                                            className="btn btn-outline-secondary btn-lg"
                                        >
                                            <i className="fas fa-sign-in-alt me-2"></i>
                                            Sign In
                                        </a>
                                    </div>
                                </div>
                                <div className="card-footer bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                                    <p className="mb-0 text-muted">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Free to use • No registration required to play public quizzes
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

export default HomePage;
