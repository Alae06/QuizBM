import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../components/quiz/QuizForm';
import quizService from '../services/quiz';

const CreateQuizPage = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [newQuizId, setNewQuizId] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleCreateQuiz = async (quizData) => {
        try {
            setErrorMsg("");
            const newQuiz = await quizService.createQuiz(quizData);
            setSuccess(true);
            setNewQuizId(newQuiz.data.id);
        } catch (error) {
            console.error('Failed to create quiz:', error);
            let msg = 'Failed to create quiz. Please check the console for details.';
            if (error.response && error.response.data && error.response.data.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                msg = error.message;
            }
            setErrorMsg(msg);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    return (
        <div className="create-quiz-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="hero-content">
                                <h1 className="hero-title">
                                    <span className="text-primary">Create Your Quiz</span>
                                </h1>
                                <p className="hero-subtitle">
                                    Build engaging quizzes in minutes. Start with the basics, then add your questions.
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
                        {errorMsg && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {errorMsg}
                                <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
                            </div>
                        )}

                        {success ? (
                            <div className="success-card">
                                <div className="card border-0 shadow-lg">
                                    <div className="card-body text-center p-5">
                                        <div className="success-icon mb-4">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <h2 className="card-title text-success mb-3">Quiz Created Successfully!</h2>
                                        <p className="card-text text-muted mb-4">
                                            Your quiz has been created. Now it's time to add some questions to make it engaging!
                                        </p>
                                        <div className="d-flex gap-3 justify-content-center flex-wrap">
                                            <button
                                                className="btn btn-primary btn-lg"
                                                onClick={() => navigate(`/edit-quiz/${newQuizId}`)}
                                            >
                                                <i className="fas fa-plus me-2"></i>
                                                Add Questions
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary btn-lg"
                                                onClick={() => navigate('/dashboard')}
                                            >
                                                <i className="fas fa-tachometer-alt me-2"></i>
                                                Go to Dashboard
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="quiz-form-container">
                                <div className="card border-0 shadow-lg">
                                    <div className="card-header bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                                        <h3 className="mb-0">
                                            <i className="fas fa-edit me-2"></i>
                                            Quiz Information
                                        </h3>
                                    </div>
                                    <div className="card-body p-4">
                                        <QuizForm onSubmit={handleCreateQuiz} />
                                    </div>
                                    <div className="card-footer bg-primary p-2 text-dark bg-opacity-25 text-center py-4">
                                        <button
                                            className="btn btn-outline-secondary btn-light"
                                            onClick={handleCancel}
                                        >
                                            <i className="fas fa-times me-2"></i>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQuizPage;
