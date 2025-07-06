import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="text-primary">Dashboard</span>
                </h1>
                <p className="hero-subtitle">
                  View your quiz stats, manage your quizzes, and track your progress all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
