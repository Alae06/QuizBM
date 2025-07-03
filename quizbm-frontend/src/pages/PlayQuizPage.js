import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../services/quiz';
import LoadingSpinner from '../components/common/LoadingSpinner';
import QuizPlayer from '../components/quiz/QuizPlayer';
import Leaderboard from '../components/quiz/Leaderboard';

const PlayQuizPage = () => {
    const { slug } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [gameState, setGameState] = useState('intro'); // intro, playing, finished
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pin, setPin] = useState('');
    const [isPinVerified, setIsPinVerified] = useState(false);
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const response = await quizService.getPublicQuiz(slug);
                setQuiz(response.data);
                if (!response.data.has_pin) {
                    setIsPinVerified(true);
                }
            } catch (err) {
                setError('Quiz not found or failed to load.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [slug]);

    const handlePinSubmit = async (e) => {
        e.preventDefault();
        try {
            await quizService.verifyPin(quiz.id, pin);
            setIsPinVerified(true);
        } catch (err) {
            setError('Invalid PIN.');
        }
    };
    
    const handleStartQuiz = () => {
        setGameState('playing');
    };

    const handleFinishQuiz = (finalScore) => {
        setScore(finalScore);
        setGameState('finished');
    };

    if (loading) return <LoadingSpinner />;
    if (error && !quiz) return <div className="text-red-500 text-center p-8">{error}</div>;

    if (!isPinVerified) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
                <p className="mb-4">{quiz.description}</p>
                <form onSubmit={handlePinSubmit} className="max-w-sm mx-auto">
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter PIN"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Enter Quiz
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {gameState === 'intro' && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{quiz.description}</p>
                    <button onClick={handleStartQuiz} className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
                        Start Quiz
                    </button>
                </div>
            )}
            {gameState === 'playing' && (
                <QuizPlayer quiz={quiz} onFinish={handleFinishQuiz} />
            )}
            {gameState === 'finished' && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Quiz Finished!</h1>
                    <p className="text-2xl mb-6">Your score: {score}%</p>
                    <div className="max-w-md mx-auto">
                        <Leaderboard quiz={quiz} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayQuizPage;
