import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import QuizList from '../quiz/QuizList';
import StatsCard from './StatsCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import quizService from '../../services/quiz';

const Dashboard = () => {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [stats, setStats] = useState({ totalQuizzes: 0, totalAttempts: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                let response;
                if (user?.role === 'creator') {
                    response = await quizService.getMyQuizzes();
                } else {
                    response = await quizService.getPublicQuizzes();
                }
                setQuizzes(response.data);
                setStats({
                    totalQuizzes: response.data.length,
                    totalAttempts: response.data.reduce((acc, quiz) => acc + (quiz.quiz_attempts_count || 0), 0),
                });
                setError(null);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [user]);

    const refreshQuizzes = async () => {
        try {
            setLoading(true);
            let response;
            if (user?.role === 'creator') {
                response = await quizService.getMyQuizzes();
            } else {
                response = await quizService.getPublicQuizzes();
            }
            setQuizzes(response.data);
            setStats({
                totalQuizzes: response.data.length,
                totalAttempts: response.data.reduce((acc, quiz) => acc + (quiz.quiz_attempts_count || 0), 0),
            });
            setError(null);
        } catch (err) {
            setError('Failed to fetch dashboard data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div className="dashboard-content py-4">
            {/* Hero Icon and Welcome */}
            <div className="text-center mb-4">
                <div className="mb-3">
                    {user?.role === 'creator' ? (
                        <span className="d-inline-block bg-white rounded-circle shadow p-3 mb-2">
                            <AcademicCapIcon width={48} height={48} className="text-primary" />
                        </span>
                    ) : (
                        <span className="d-inline-block bg-white rounded-circle shadow p-3 mb-2">
                            <UserGroupIcon width={48} height={48} className="text-primary" />
                        </span>
                    )}
                </div>
                <h2 className="fw-bold mb-1">
                    {user?.role === 'creator' ? 'Welcome, Quiz Creator!' : 'Welcome, Quiz Participant!'}
                </h2>
                <p className="text-muted mb-0">
                    {user?.role === 'creator'
                        ? 'Create, manage, and analyze your quizzes with ease. Inspire learning and fun!'
                        : 'Take quizzes, track your progress, and challenge yourself or friends!'}
                </p>
            </div>
            {/* Main Card */}
            <div className="card border-0 shadow-lg mb-4">
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <StatsCard title="Total Quizzes" value={stats.totalQuizzes} />
                        </div>
                        <div className="col-md-6">
                            <StatsCard title="Total Attempts" value={stats.totalAttempts} />
                        </div>
                    </div>
                    {user?.role === 'creator' && (
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="h5 text-primary mb-0">My Quizzes</h3>
                            <Link to="/create-quiz" className="btn btn-primary btn-lg">
                                + Create New Quiz
                            </Link>
                        </div>
                    )}
                    {user?.role !== 'creator' && (
                        <div className="mb-3">
                            <h3 className="h5 text-primary mb-0">Available Quizzes</h3>
                        </div>
                    )}
                    <QuizList quizzes={quizzes} isCreator={user?.role === 'creator'} onQuizDeleted={refreshQuizzes} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

// Tailwind custom animation (add to your global CSS if not present):
// .animate-fade-in { animation: fadeIn 1s ease-in; }
// .animate-bounce-slow { animation: bounce 2s infinite; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
