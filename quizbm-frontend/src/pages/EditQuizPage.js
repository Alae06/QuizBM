import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizForm from '../components/quiz/QuizForm';
import quizService from '../services/quiz';
import LoadingSpinner from '../components/common/LoadingSpinner';
import QuestionManager from '../components/quiz/QuestionManager';

const EditQuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const response = await quizService.getQuiz(id);
                setQuiz(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch quiz data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleUpdateQuiz = async (quizData) => {
        try {
            await quizService.updateQuiz(id, {data: quizData});
            alert('Quiz updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to update quiz:', error);
            alert('Failed to update quiz. Please check the console for details.');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="alert alert-danger text-center p-4">{error}</div>;

    return (
        <div className="edit-quiz-page">
            {/* Hero Section */}
            <div className="hero-section mb-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="hero-content">
                                <h1 className="hero-title mb-2">
                                    <span className="text-primary">Edit Quiz</span>
                                </h1>
                                <p className="hero-subtitle mb-0">
                                    Update your quiz details and manage questions below. Click "Add Question" to start building your quiz!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-lg mb-4">
                            <div className="card-header bg-primary p-2 text-dark bg-opacity-25 text-center py-3">
                                <h3 className="mb-0">Quiz Details</h3>
                            </div>
                            <div className="card-body">
                                <QuizForm onSubmit={handleUpdateQuiz} initialData={quiz} isEditing={true} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-lg mb-4">
                            <div className="card-header bg-primary p-2 text-dark bg-opacity-25 text-center py-3">
                                <h3 className="mb-0">Questions</h3>
                            </div>
                            <div className="card-body">
                                <QuestionManager quiz={quiz} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuizPage;
