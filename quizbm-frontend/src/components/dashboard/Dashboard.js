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
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-10 px-2 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="bg-white rounded-full shadow-lg p-4 mb-4 animate-bounce-slow">
                        {user?.role === 'creator' ? (
                            <AcademicCapIcon width={64} height={64} className="text-indigo-600" />
                        ) : (
                            <UserGroupIcon width={64} height={64} className="text-pink-500" />
                        )}
                    </div>
                    <h1 className="text-4xl font-extrabold text-white drop-shadow mb-2 tracking-tight">
                        {user?.role === 'creator' ? 'Welcome, Quiz Creator!' : 'Welcome, Quiz Participant!'}
                    </h1>
                    <p className="text-lg text-white/80 mb-2 text-center max-w-xl">
                        {user?.role === 'creator'
                            ? 'Create, manage, and analyze your quizzes with ease. Inspire learning and fun!'
                            : 'Take quizzes, track your progress, and challenge yourself or friends!'}
                    </p>
                </div>
                <div className="bg-white/90 rounded-2xl shadow-2xl p-8 mb-8 backdrop-blur-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatsCard title="Total Quizzes" value={stats.totalQuizzes} />
                        <StatsCard title="Total Attempts" value={stats.totalAttempts} />
                    </div>
                    {user?.role === 'creator' && (
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-indigo-700">My Quizzes</h2>
                            <Link to="/create-quiz" className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded shadow-md transition-all duration-200 transform hover:scale-105">
                                + Create New Quiz
                            </Link>
                        </div>
                    )}
                    {user?.role !== 'creator' && (
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-pink-600">Available Quizzes</h2>
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
