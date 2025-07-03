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
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="container">
            <div className="edit-quiz-header">
                <h1>Edit Quiz</h1>
                <p className="edit-quiz-desc">Update your quiz details and manage questions below. Click "Add Question" to start building your quiz!</p>
            </div>
            <div className="edit-quiz-layout">
                <div className="edit-quiz-info-card">
                    <h2>Quiz Details</h2>
                    <QuizForm onSubmit={handleUpdateQuiz} initialData={quiz} isEditing={true} />
                </div>
                <div className="edit-quiz-questions-card">
                    <h2>Questions</h2>
                    <QuestionManager quiz={quiz} />
                </div>
            </div>
        </div>
    );
};

export default EditQuizPage;
