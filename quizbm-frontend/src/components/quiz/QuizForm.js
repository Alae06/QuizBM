import React, { useState, useEffect } from 'react';

const QuizForm = ({ onSubmit, initialData = null, isEditing = false }) => {
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        max_attempts: 3,
        time_per_question: 30,
        pin: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setQuiz({
                title: initialData.title || '',
                description: initialData.description || '',
                max_attempts: initialData.max_attempts || 3,
                time_per_question: initialData.time_per_question || 30,
                pin: initialData.pin || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuiz(prevQuiz => ({ ...prevQuiz, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!quiz.title.trim()) newErrors.title = 'Title is required.';
        if (quiz.pin && (quiz.pin.length < 4 || quiz.pin.length > 10)) {
            newErrors.pin = 'PIN must be between 4 and 10 characters.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(quiz);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="quiz-form">
            <div className="quiz-form-group">
                <label htmlFor="title" className="quiz-form-label">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={quiz.title}
                    onChange={handleChange}
                    className={`quiz-form-input${errors.title ? ' quiz-form-input-error' : ''}`}
                />
                {errors.title && <p className="quiz-form-error">{errors.title}</p>}
            </div>

            <div className="quiz-form-group">
                <label htmlFor="description" className="quiz-form-label">Description</label>
                <textarea
                    name="description"
                    id="description"
                    value={quiz.description}
                    onChange={handleChange}
                    rows="3"
                    className="quiz-form-textarea"
                ></textarea>
            </div>

            <div className="quiz-form-row">
                <div className="quiz-form-group">
                    <label htmlFor="max_attempts" className="quiz-form-label">Max Attempts</label>
                    <input
                        type="number"
                        name="max_attempts"
                        id="max_attempts"
                        value={quiz.max_attempts}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        className="quiz-form-input"
                    />
                </div>
                <div className="quiz-form-group">
                    <label htmlFor="time_per_question" className="quiz-form-label">Time per Question (seconds)</label>
                    <input
                        type="number"
                        name="time_per_question"
                        id="time_per_question"
                        value={quiz.time_per_question}
                        onChange={handleChange}
                        min="5"
                        max="300"
                        className="quiz-form-input"
                    />
                </div>
            </div>

            <div className="quiz-form-group">
                <label htmlFor="pin" className="quiz-form-label">PIN (optional)</label>
                <input
                    type="text"
                    name="pin"
                    id="pin"
                    value={quiz.pin}
                    onChange={handleChange}
                    className={`quiz-form-input${errors.pin ? ' quiz-form-input-error' : ''}`}
                    placeholder="4-10 characters"
                />
                {errors.pin && <p className="quiz-form-error">{errors.pin}</p>}
            </div>

            <div className="quiz-form-actions">
                <button
                    type="submit"
                    className="quiz-form-button"
                >
                    {isEditing ? 'Update Quiz' : 'Create Quiz'}
                </button>
            </div>
        </form>
    );
};

export default QuizForm;
