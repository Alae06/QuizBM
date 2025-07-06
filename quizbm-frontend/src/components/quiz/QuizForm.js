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
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-4">
                <label htmlFor="title" className="form-label fw-bold text-dark">
                    <i className="fas fa-heading me-2 text-primary"></i>
                    Quiz Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={quiz.title}
                    onChange={handleChange}
                    className={`form-control form-control-lg ${errors.title ? 'is-invalid' : ''}`}
                    placeholder="Enter your quiz title..."
                    required
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="form-label fw-bold text-dark">
                    <i className="fas fa-align-left me-2 text-primary"></i>
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={quiz.description}
                    onChange={handleChange}
                    rows="4"
                    className="form-control"
                    placeholder="Describe your quiz..."
                ></textarea>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <label htmlFor="max_attempts" className="form-label fw-bold text-dark">
                        <i className="fas fa-redo me-2 text-primary"></i>
                        Max Attempts
                    </label>
                    <input
                        type="number"
                        name="max_attempts"
                        id="max_attempts"
                        value={quiz.max_attempts}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        className="form-control"
                    />
                    <div className="form-text">Number of times users can retake the quiz</div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="time_per_question" className="form-label fw-bold text-dark">
                        <i className="fas fa-clock me-2 text-primary"></i>
                        Time per Question (seconds)
                    </label>
                    <input
                        type="number"
                        name="time_per_question"
                        id="time_per_question"
                        value={quiz.time_per_question}
                        onChange={handleChange}
                        min="5"
                        max="300"
                        className="form-control"
                    />
                    <div className="form-text">Time limit for each question</div>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="pin" className="form-label fw-bold text-dark">
                    <i className="fas fa-key me-2 text-primary"></i>
                    PIN (Optional)
                </label>
                <input
                    type="text"
                    name="pin"
                    id="pin"
                    value={quiz.pin}
                    onChange={handleChange}
                    className={`form-control ${errors.pin ? 'is-invalid' : ''}`}
                    placeholder="4-10 characters (optional)"
                />
                {errors.pin && <div className="invalid-feedback">{errors.pin}</div>}
                <div className="form-text">Add a PIN for additional security</div>
            </div>

            <div className="d-grid " >
                <button
                    type="submit"
                    className="btn btn-quiz btn-lg btn-outline-secondary"
                >
                    <i className="fas fa-star me-2"></i>
                    {isEditing ? 'Update Quiz' : 'Create Quiz'}
                </button>
            </div>
        </form>
    );
};

export default QuizForm;
