import React, { useState, useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';
import quizService from '../../services/quiz';

const QuizPlayer = ({ quiz, onFinish }) => {
    // Add a log to check for remounts
    console.log('QuizPlayer MOUNTED');

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [participantName, setParticipantName] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [quizResults, setQuizResults] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [questionFeedback, setQuestionFeedback] = useState({});
    const [nameError, setNameError] = useState('');

    // Only depend on quiz.questions and currentQuestionIndex
    const currentQuestion = quiz.questions[currentQuestionIndex];

    // Timer logic
    const handleTimeUp = () => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: null }));
        setShowFeedback(true);
        // Mark as incorrect if no answer selected
        setQuestionFeedback(prev => ({
            ...prev,
            [currentQuestion.id]: {
                isCorrect: false,
                participantAnswer: null,
                correctAnswer: getCorrectAnswerText(currentQuestion)
            }
        }));
    };

    const { timeLeft, startTimer, resetTimer, stopTimer } = useTimer(
        currentQuestion?.time_per_question || quiz.time_per_question || 30,
        handleTimeUp
    );

    useEffect(() => {
        if (hasStarted && currentQuestion) {
            resetTimer(currentQuestion.time_per_question || quiz.time_per_question || 30);
            startTimer();
            setSelectedChoice(null);
            setShowFeedback(false);
        }
        // eslint-disable-next-line
    }, [currentQuestionIndex, hasStarted]);

    const handleAnswerSelect = (choiceId) => {
        if (showFeedback) return;
        setSelectedChoice(choiceId);
    };

    const handleSubmitAnswer = () => {
        if (selectedChoice === null) return;
        
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedChoice }));
        setShowFeedback(true);
        stopTimer();

        // Calculate feedback for this question
        const selectedChoiceObj = currentQuestion.choices.find(c => c.id === selectedChoice);
        const correctChoice = currentQuestion.choices.find(c => c.is_correct);
        const isCorrect = correctChoice && correctChoice.id === selectedChoice;

        setQuestionFeedback(prev => ({
            ...prev,
            [currentQuestion.id]: {
                isCorrect,
                participantAnswer: selectedChoiceObj ? selectedChoiceObj.text : null,
                correctAnswer: correctChoice ? correctChoice.text : null
            }
        }));
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedChoice(null);
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        setIsSubmitting(true);
        const finalAnswers = { ...answers };
        if (selectedChoice !== null && !showFeedback) {
            finalAnswers[currentQuestion.id] = selectedChoice;
        }
        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 1;
        try {
            console.log(quiz.slug);
            const response = await quizService.submitAttempt(quiz.slug, {
                participant_name: participantName,
                answers: finalAnswers,
                time_taken: timeTaken
            });
            setQuizResults(response.data);
            setShowResults(true);
            onFinish(response.data.score);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('There was an error submitting your quiz.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStart = (e) => {
        e.preventDefault();
        if (participantName.trim()) {
            setHasStarted(true);
            setStartTime(Date.now());
            setNameError('');
        } else {
            setNameError('Please enter your name.');
        }
    };

    // Helper function to get correct answer text for a question
    const getCorrectAnswerText = (question) => {
        const correctChoice = question.choices.find(c => c.is_correct);
        return correctChoice ? correctChoice.text : null;
    };

    // Helper to get correct choice id for current question (from backend data, not exposed to user)
    const getCorrectChoiceId = () => {
        if (!quizResults || !quizResults.feedback) return null;
        const feedback = quizResults.feedback.find(f => f.question_id === currentQuestion.id);
        if (feedback) {
            const correctText = feedback.correct_answer;
            const correct = currentQuestion.choices.find(c => c.text === correctText);
            return correct ? correct.id : null;
        }
        return null;
    };

    // Show results screen if quiz is finished
    if (showResults && quizResults) {
        return (
            <div className="card border-0 shadow-lg mb-4">
                <div className="card-body text-center">
                    <h2 className="mb-3 text-success">Quiz Results</h2>
                    <div className="fs-1 fw-bold mb-3">{quizResults.score}%</div>
                    <div className="mb-4">You got {quizResults.correct_answers} out of {quizResults.total_questions} questions correct</div>
                    <h4 className="mb-3">Question Review</h4>
                    {quizResults.feedback.map((item, index) => (
                        <div key={item.question_id} className="mb-4 p-3 border rounded bg-light text-start">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-semibold">Question {index + 1}</span>
                                <span className={`badge ${item.is_correct ? 'bg-success' : 'bg-danger'}`}>{item.is_correct ? 'Correct' : 'Incorrect'}</span>
                            </div>
                            <div className="mb-2">{item.question_text}</div>
                            <div><strong>Your answer:</strong> {item.participant_answer || <span className="text-muted">No answer</span>}</div>
                            {!item.is_correct && (
                                <div><strong>Correct answer:</strong> {item.correct_answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!hasStarted) {
        return (
            <div className="card border-0 shadow-lg mb-4">
                <div className="card-body text-center py-5">
                    <form onSubmit={handleStart} className="row g-2 justify-content-center align-items-center">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className={`form-control form-control-lg${nameError ? ' is-invalid' : ''}`}
                                placeholder="Enter your name"
                                value={participantName}
                                onChange={e => setParticipantName(e.target.value)}
                            />
                            {nameError && <div className="invalid-feedback d-block">{nameError}</div>}
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-success btn-lg w-100">Start Quiz</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Per-question feedback UI
    const currentFeedback = questionFeedback[currentQuestion.id];
    const correctChoiceId = currentQuestion.choices.find(c => c.is_correct)?.id;
    const isAnswered = showFeedback || answers[currentQuestion.id] !== undefined;
    const isCorrect = currentFeedback ? currentFeedback.isCorrect : (correctChoiceId !== null && selectedChoice === correctChoiceId);
    const showCorrect = showFeedback && correctChoiceId !== null;

    console.log('QUIZ:', JSON.stringify(quiz));
    console.log('RENDER', { selectedChoice, showFeedback, timeLeft });

    return (
        <div className="card border-0 shadow-lg mb-4">
            <div className="card-body">
                <h3 className="card-title mb-3">{quiz.title}</h3>
                <div className="mb-2 text-muted">Time Left: {timeLeft}s</div>
                <div className="mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</div>
                <div className="mb-4 fw-bold fs-5">{currentQuestion.question_text}</div>
                <div className="list-group mb-4">
                    {currentQuestion.choices.map(choice => (
                        <button
                            key={choice.id}
                            type="button"
                            className={`list-group-item list-group-item-action${selectedChoice === choice.id ? ' active' : ''}${showFeedback && choice.is_correct ? ' list-group-item-success' : ''}`}
                            disabled={showFeedback}
                            onClick={() => handleAnswerSelect(choice.id)}
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
                {showFeedback && (
                    <div className={`alert ${questionFeedback[currentQuestion.id]?.isCorrect ? 'alert-success' : 'alert-danger'} text-center`}>
                        {questionFeedback[currentQuestion.id]?.isCorrect ? 'Correct!' : (
                            <>
                                Incorrect. The correct answer is: <strong>{questionFeedback[currentQuestion.id]?.correctAnswer}</strong>
                            </>
                        )}
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmitAnswer}
                        disabled={selectedChoice === null || showFeedback}
                    >
                        Submit Answer
                    </button>
                    {showFeedback && (
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleNextQuestion}
                            disabled={isSubmitting}
                        >
                            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const areEqual = (prevProps, nextProps) => {
    return (
        prevProps.quiz.id === nextProps.quiz.id &&
        prevProps.quiz.questions.length === nextProps.quiz.questions.length
    );
};

export default QuizPlayer;