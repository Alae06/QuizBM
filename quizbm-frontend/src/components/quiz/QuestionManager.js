import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import quizService from '../../services/quiz';
import LoadingSpinner from '../common/LoadingSpinner';

const QuestionManager = ({ quiz }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchQuestions = useCallback(async () => {
        if (!quiz) return;
        try {
            setLoading(true);
            const response = await quizService.getQuestions(quiz.id);
            setQuestions(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch questions.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [quiz]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleDeleteQuestion = async (questionId) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await quizService.deleteQuestion(questionId);
                fetchQuestions();
            } catch (err) {
                console.error('Failed to delete question', err);
                alert('Failed to delete question.');
            }
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Manage Questions</h4>
                <button onClick={() => navigate(`/quiz/${quiz.id}/add-question`)} className="btn btn-primary btn-sm">
                    + Add Question
                </button>
            </div>
            {questions.length > 0 ? (
                <ul className="list-group mb-3">
                    {questions.map((question, index) => (
                        <li key={question.id} className="list-group-item d-flex justify-content-between align-items-start">
                            <div>
                                <span className="fw-bold me-2">{index + 1}.</span>
                                {question.question_text}
                            </div>
                            <div>
                                <button onClick={() => navigate(`/quiz/${quiz.id}/edit-question/${question.id}`)} className="btn btn-outline-secondary btn-sm me-2">Edit</button>
                                <button onClick={() => handleDeleteQuestion(question.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-muted">No questions yet. Add one to get started!</p>
            )}
        </div>
    );
};

export default QuestionManager; 