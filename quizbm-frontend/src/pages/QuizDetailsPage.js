import React from 'react';

const QuizDetailsPage = () => {
    return (
        <div className="quiz-details-page">
            {/* Hero Section */}
            <div className="hero-section mb-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="hero-content">
                                <h1 className="hero-title mb-2">
                                    <span className="text-primary">Quiz Details</span>
                                </h1>
                                <p className="hero-subtitle mb-0">
                                    Details for a specific quiz will be shown here.
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
                        <div className="card border-0 shadow-lg">
                            <div className="card-body text-center p-5">
                                <h2 className="card-title mb-3">Quiz Details</h2>
                                <p className="card-text text-muted mb-0">
                                    Details for a specific quiz will be shown here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizDetailsPage;
