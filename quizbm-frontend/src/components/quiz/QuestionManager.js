import React, { useState, useEffect, useCallback } from 'react';
import quizService from '../../services/quiz';
import LoadingSpinner from '../common/LoadingSpinner';
import QuestionForm from './QuestionForm';
import Modal from '../common/Modal';

const QuestionManager = ({ quiz }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [formError, setFormError] = useState("");

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

    const handleOpenModal = (question = null) => {
        setEditingQuestion(question);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingQuestion(null);
    };

    const handleSubmitForm = async (questionData) => {
        try {
            setFormError("");
            if (editingQuestion) {
                await quizService.updateQuestion(editingQuestion.id, questionData);
            } else {
                await quizService.createQuestion(quiz.id, questionData);
            }
            fetchQuestions();
            handleCloseModal();
        } catch (err) {
            console.error('Failed to save question', err);
            let msg = 'Failed to save question.';
            if (err.response && err.response.data && err.response.data.message) {
                msg = err.response.data.message;
            } else if (err.message) {
                msg = err.message;
            }
            setFormError(msg);
        }
    };

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
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-white p-8 shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Questions</h2>
                <button onClick={() => handleOpenModal()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded">
                    + Add Question
                </button>
            </div>
            {questions.length > 0 ? (
                <ul>
                    {questions.map((question, index) => (
                        <li key={question.id} className="border-b last:border-b-0 py-3">
                            <p className="font-semibold">{index + 1}. {question.question_text}</p>
                            <div className="flex justify-end space-x-2 mt-2">
                                <button onClick={() => handleOpenModal(question)} className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded">Edit</button>
                                <button onClick={() => handleDeleteQuestion(question.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No questions yet. Add one to get started!</p>
            )}

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <h3 className="text-lg font-bold mb-4">{editingQuestion ? 'Edit Question' : 'Add New Question'}</h3>
                    {formError && (
                        <div style={{background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500}}>
                            {formError}
                        </div>
                    )}
                    <QuestionForm
                        onSubmit={handleSubmitForm}
                        onCancel={handleCloseModal}
                        initialData={editingQuestion}
                        isEditing={!!editingQuestion}
                    />
                </Modal>
            )}
        </div>
    );
};

export default QuestionManager; 