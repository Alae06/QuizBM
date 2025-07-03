import React, { useState, useEffect } from 'react';
import quizService from '../../services/quiz';
import echo from '../../services/websocket';
import LoadingSpinner from '../common/LoadingSpinner';

const Leaderboard = ({ quiz }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await quizService.getLeaderboard(quiz.slug);
                setScores(response.data);
            } catch (error) {
                console.error('Failed to fetch leaderboard', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();

        const channel = echo.channel(`quiz.${quiz.id}`);

        channel.listen('.score.updated', (event) => {
            setScores(currentScores => {
                const newScores = [...currentScores, event];
                return newScores
                    .sort((a, b) => b.score - a.score || a.time_taken - b.time_taken)
                    .slice(0, 10);
            });
        });

        return () => {
            channel.stopListening('.score.updated');
            echo.leaveChannel(`quiz.${quiz.id}`);
        };

    }, [quiz]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
            <ol className="space-y-2">
                {scores.map((score, index) => (
                    <li key={index} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                        <span className="font-semibold">{index + 1}. {score.participant_name}</span>
                        <span className="font-bold text-blue-600">{score.score}%</span>
                    </li>
                ))}
            </ol>
            {scores.length === 0 && <p className="text-center text-gray-500 mt-4">No scores yet!</p>}
        </div>
    );
};

export default Leaderboard;
