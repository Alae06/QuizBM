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

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const response = await quizService.getPublicQuiz(slug);
                setQuiz(response.data);
            } catch (err) {
                setError('Quiz not found or failed to load.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [slug]);

    const handleStartQuiz = () => {
        setGameState('playing');
    };

    const handleFinishQuiz = (finalScore) => {
        setGameState('finished');
    };

    if (loading) return <LoadingSpinner />;
    if (error && !quiz) return <div className="alert alert-danger text-center p-5">{error}</div>;

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
