import React, { useState, useEffect } from 'react';

const QuestionForm = ({ onSubmit, onCancel, initialData = null, isEditing = false }) => {
    const [questionText, setQuestionText] = useState('');
    const [type, setType] = useState('multiple_choice');
    const [choices, setChoices] = useState([
        { text: '', is_correct: true },
        { text: '', is_correct: false },
    ]);
    const [errors, setErrors] = useState({});
    const [timePerQuestion, setTimePerQuestion] = useState(30);

    useEffect(() => {
        if (initialData) {
            setQuestionText(initialData.question_text || '');
            setType(initialData.type || 'multiple_choice');
            setChoices(initialData.choices || [{ text: '', is_correct: false }, { text: '', is_correct: false }]);
            setTimePerQuestion(initialData.time_per_question || 30);
        }
    }, [initialData]);

    const handleChoiceChange = (index, field, value) => {
        const newChoices = [...choices];
        if (type === 'multiple_choice') {
            if (field === 'is_correct') {
                newChoices[index].is_correct = !!value;
            } else {
                newChoices[index][field] = value;
            }
        } else { // True/False
            newChoices.forEach((choice, i) => {
                choice.is_correct = (i === index);
            });
        }
        setChoices(newChoices);
    };
    
    const handleTextChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index].text = value;
        setChoices(newChoices);
    };

    const addChoice = () => {
        if (choices.length < 6) {
            setChoices([...choices, { text: '', is_correct: false }]);
        }
    };

    const removeChoice = (index) => {
        if (choices.length > 2) {
            const newChoices = choices.filter((_, i) => i !== index);
            setChoices(newChoices);
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        if (!questionText.trim()) {
            newErrors.questionText = 'Question text cannot be empty.';
        }
        const hasCorrectAnswer = choices.some(c => c.is_correct);
        if (!hasCorrectAnswer) {
            newErrors.choices = 'At least one choice must be marked as correct.';
        }
        const hasEmptyChoice = choices.some(c => !c.text.trim());
        if (hasEmptyChoice) {
            newErrors.choices = 'All choices must have text.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Ensure all choices have is_correct as a boolean
            const fixedChoices = choices.map(c => ({
                ...c,
                is_correct: typeof c.is_correct === 'boolean' ? c.is_correct : false
            }));
            const questionData = { question_text: questionText, type, choices: fixedChoices, time_per_question: timePerQuestion };
            onSubmit(questionData);
        }
    };

    useEffect(() => {
        if (type === 'true_false') {
            setChoices([
                { text: 'True', is_correct: true },
                { text: 'False', is_correct: false }
            ]);
        }
    }, [type]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Question Text</label>
                <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className={`form-control${errors.questionText ? ' is-invalid' : ''}`}
                    placeholder="Enter your question"
                />
                {errors.questionText && <div className="invalid-feedback d-block">{errors.questionText}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Question Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                </select>
            </div>
            <fieldset className="mb-3">
                <legend className="form-label mb-2">Choices</legend>
                <ul className="list-group mb-2">
                    {choices.map((choice, index) => (
                        <li key={index} className="list-group-item d-flex align-items-center gap-2">
                            <input
                                type={type === 'multiple_choice' ? 'checkbox' : 'radio'}
                                name={type === 'multiple_choice' ? `choice-${index}`: 'correct_choice'}
                                checked={!!choice.is_correct}
                                onChange={(e) => handleChoiceChange(index, 'is_correct', e.target.checked)}
                                disabled={type === 'true_false'}
                                className="form-check-input mt-0"
                                style={{marginRight: 8}}
                            />
                            <input
                                type="text"
                                value={choice.text}
                                onChange={(e) => handleTextChange(index, e.target.value)}
                                className="form-control me-2"
                                placeholder={`Choice ${index + 1}`}
                                disabled={type === 'true_false'}
                            />
                            {type === 'multiple_choice' && (
                                <button type="button" onClick={() => removeChoice(index)} className="btn btn-outline-danger btn-sm">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
                {type === 'multiple_choice' && choices.length < 6 && (
                    <button type="button" onClick={addChoice} className="btn btn-outline-primary btn-sm mb-2">
                        + Add Choice
                    </button>
                )}
                {errors.choices && <div className="invalid-feedback d-block">{errors.choices}</div>}
            </fieldset>
            <div className="mb-3">
                <label className="form-label">Time per Question (seconds)</label>
                <input
                    type="number"
                    min={5}
                    max={300}
                    value={timePerQuestion}
                    onChange={e => setTimePerQuestion(Number(e.target.value))}
                    className="form-control"
                />
            </div>
            <div className="d-flex gap-2 justify-content-end">
                <button type="button" onClick={onCancel} className="btn btn-outline-secondary">
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Question' : 'Add Question'}
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;
