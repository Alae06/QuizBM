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
    if (error && !quiz) return <div className="alert alert-danger text-center p-5">{error}</div>;

    if (!isPinVerified) {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card shadow border-0">
                            <div className="card-body text-center">
                                <h1 className="card-title mb-3">{quiz.title}</h1>
                                <p className="card-text mb-4">{quiz.description}</p>
                                <form onSubmit={handlePinSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            value={pin}
                                            onChange={(e) => setPin(e.target.value)}
                                            placeholder="Enter PIN"
                                            className="form-control form-control-lg text-center"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg w-100">
                                        Enter Quiz
                                    </button>
                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="play-quiz-page">
            {/* Hero Section */}
            <div className="hero-section mb-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="hero-content">
                                <h1 className="hero-title mb-2">
                                    <span className="text-primary">{quiz.title}</span>
                                </h1>
                                <p className="hero-subtitle mb-0">{quiz.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {gameState === 'intro' && (
                            <div className="card border-0 shadow-lg text-center">
                                <div className="card-body py-5">
                                    <button onClick={handleStartQuiz} className="btn btn-success btn-lg px-5">
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        )}
                        {gameState === 'playing' && (
                            <QuizPlayer quiz={quiz} onFinish={handleFinishQuiz} />
                        )}
                        {gameState === 'finished' && (
                            <div className="card border-0 shadow-lg text-center">
                                <div className="card-body py-5">
                                    <h2 className="mb-3 text-success">Quiz Finished!</h2>
                                    <p className="fs-3 mb-4">Your score: <span className="fw-bold">{score}%</span></p>
                                    <div className="mx-auto" style={{ maxWidth: 400 }}>
                                        <Leaderboard quiz={quiz} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayQuizPage;
