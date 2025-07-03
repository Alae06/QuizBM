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
        if(participantName.trim()){
            setHasStarted(true);
            setStartTime(Date.now());
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
            <div className="quiz-results">
                <div className="quiz-results-header">
                    <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
                    <div className="quiz-results-score">
                        {quizResults.score}%
                    </div>
                    <div className="text-xl text-gray-600 mb-6">
                        You got {quizResults.correct_answers} out of {quizResults.total_questions} questions correct
                    </div>
                    <div className="quiz-results-summary">
                        <div className="text-lg font-semibold mb-2">Summary</div>
                        <div className="quiz-results-stats">
                            <div>
                                <div className="quiz-results-correct text-2xl">{quizResults.correct_answers}</div>
                                <div className="text-sm text-gray-600">Correct</div>
                            </div>
                            <div>
                                <div className="quiz-results-incorrect text-2xl">{quizResults.total_questions - quizResults.correct_answers}</div>
                                <div className="text-sm text-gray-600">Incorrect</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quiz-results-questions">
                    <h2 className="text-2xl font-bold mb-4">Question Review</h2>
                    {quizResults.feedback.map((item, index) => (
                        <div key={item.question_id} className="quiz-results-question">
                            <div className="quiz-results-question-header">
                                <h3 className="text-lg font-semibold">
                                    Question {index + 1}
                                </h3>
                                <div className={`quiz-results-status ${item.is_correct ? 'correct' : 'incorrect'}`}>
                                    {item.is_correct ? 'Correct' : 'Incorrect'}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{item.question_text}</p>
                            <div className="quiz-results-answers">
                                <div className="quiz-results-answer-row">
                                    <span className="quiz-results-answer-label">Your answer:</span>
                                    <span className={`quiz-results-answer-value ${item.is_correct ? 'correct' : 'incorrect'}`}>
                                        {item.participant_answer || 'No answer'}
                                    </span>
                                </div>
                                {!item.is_correct && (
                                    <div className="quiz-results-answer-row">
                                        <span className="quiz-results-answer-label">Correct answer:</span>
                                        <span className="quiz-results-answer-value correct">
                                            {item.correct_answer}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="quiz-results-back-button"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!hasStarted) {
        return (
            <div className="text-center">
                <form onSubmit={handleStart}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        className="text-lg p-2 border rounded"
                        required
                    />
                    <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Start Quiz
                    </button>
                </form>
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
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{quiz.title}</h1>
                    <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold">
                        Time Left: {timeLeft}s
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`
                            }}
                        ></div>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-6">
                        {currentQuestion?.question_text}
                    </h2>
                    <div className="space-y-3">
                        {currentQuestion?.choices.map((choice, index) => {
                            let choiceClass = 'block w-full p-4 text-left border-2 rounded-lg transition-all mb-2';
                            let icon = null;
                            if (showFeedback) {
                                if (choice.id === correctChoiceId) {
                                    choiceClass += ' border-green-500 bg-green-50';
                                    icon = <span className="mr-2 text-green-600 font-bold">✓</span>;
                                } else if (selectedChoice === choice.id) {
                                    choiceClass += ' border-red-500 bg-red-50';
                                    icon = <span className="mr-2 text-red-600 font-bold">✗</span>;
                                } else {
                                    choiceClass += ' border-gray-200 bg-gray-100 text-gray-400';
                                }
                            } else if (selectedChoice === choice.id) {
                                choiceClass += ' border-blue-500 bg-blue-50';
                            } else {
                                choiceClass += ' border-gray-200 hover:border-gray-300';
                            }
                            return (
                                <button
                                    key={choice.id}
                                    onClick={() => handleAnswerSelect(choice.id)}
                                    className={choiceClass}
                                    disabled={showFeedback}
                                    type="button"
                                >
                                    <span className="font-medium mr-3">
                                        {String.fromCharCode(65 + index)}.
                                    </span>
                                    {icon}
                                    {choice.text}
                                </button>
                            );
                        })}
                    </div>
                    
                    {/* Enhanced feedback message */}
                    {showFeedback && currentFeedback && (
                        <div className={`mt-6 p-4 rounded-lg ${currentFeedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <div className="font-bold mb-2">
                                {currentFeedback.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                            </div>
                            <div className="text-sm">
                                <div className="mb-1">
                                    <span className="font-medium">Your answer:</span> {currentFeedback.participantAnswer || 'No answer'}
                                </div>
                                {!currentFeedback.isCorrect && (
                                    <div>
                                        <span className="font-medium">Correct answer:</span> {currentFeedback.correctAnswer}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    {showFeedback ? (
                        <button
                            onClick={handleNextQuestion}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next'}
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmitAnswer}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            disabled={selectedChoice === null}
                        >
                            Submit Answer
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