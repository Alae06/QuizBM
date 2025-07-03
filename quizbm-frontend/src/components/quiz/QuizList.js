import React from 'react';
import QuizCard from './QuizCard';
import quizService from '../../services/quiz';

const QuizList = ({ quizzes, isCreator, onQuizDeleted }) => {
    const handleDelete = async (quiz) => {
        if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
            try {
                await quizService.deleteQuiz(quiz.id);
                if (onQuizDeleted) onQuizDeleted();
            } catch (err) {
                alert('Failed to delete quiz.');
                console.error(err);
            }
        }
    };

    if (quizzes.length === 0) {
        return (
            <div className="text-center p-8 border-dashed border-2 border-gray-300 rounded-lg bg-white">
                <h3 className="text-xl font-semibold text-gray-700">No quizzes yet!</h3>
                <p className="text-gray-500 mt-2">
                    {isCreator
                        ? 'Get started by creating your first quiz.'
                        : 'No quizzes are available at the moment. Please check back later!'}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} isCreator={isCreator} onDelete={() => handleDelete(quiz)} />
            ))}
        </div>
    );
};

export default QuizList;
