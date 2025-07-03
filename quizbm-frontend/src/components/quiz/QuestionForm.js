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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Question Text</label>
                <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.questionText ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                    required
                />
                {errors.questionText && <p className="text-red-500 text-xs mt-1">{errors.questionText}</p>}
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Question Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                </select>
            </div>

            <fieldset>
                <legend className="text-sm font-medium text-gray-700">Choices</legend>
                <div className="space-y-2 mt-2">
                    {choices.map((choice, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type={type === 'multiple_choice' ? 'checkbox' : 'radio'}
                                name={type === 'multiple_choice' ? `choice-${index}`: 'correct_choice'}
                                checked={!!choice.is_correct}
                                onChange={(e) => handleChoiceChange(index, 'is_correct', e.target.checked)}
                                disabled={type === 'true_false'}
                            />
                            <input
                                type="text"
                                value={choice.text}
                                onChange={(e) => handleTextChange(index, e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder={`Choice ${index + 1}`}
                                required
                                disabled={type === 'true_false'}
                            />
                            {type === 'multiple_choice' && (
                                <button type="button" onClick={() => removeChoice(index)} className="text-red-500 hover:text-red-700">
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {type === 'multiple_choice' && choices.length < 6 && (
                    <button type="button" onClick={addChoice} className="mt-2 text-sm text-blue-500 hover:text-blue-700">
                        + Add Choice
                    </button>
                )}
                {errors.choices && <p className="text-red-500 text-xs mt-1">{errors.choices}</p>}
            </fieldset>

            <div>
                <label className="block text-sm font-medium text-gray-700">Time per Question (seconds)</label>
                <input
                    type="number"
                    min={5}
                    max={300}
                    value={timePerQuestion}
                    onChange={e => setTimePerQuestion(Number(e.target.value))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded">
                    Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    {isEditing ? 'Update Question' : 'Add Question'}
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;
