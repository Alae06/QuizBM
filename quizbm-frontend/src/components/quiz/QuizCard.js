import React from 'react';
import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon, PlayCircleIcon, ShareIcon } from '@heroicons/react/24/outline';

const QuizCard = ({ quiz, isCreator, onDelete }) => {
    const handleShare = () => {
        const publicUrl = `${window.location.origin}/q/${quiz.slug}`;
        navigator.clipboard.writeText(publicUrl);
        alert(`Copied to clipboard: ${publicUrl}`);
    };

    const handleDelete = () => {
        // Placeholder for delete functionality
        if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
            console.log(`Deleting quiz ${quiz.id}`);
        }
    };

    return (
        <div className="bg-gradient-to-br from-white via-indigo-50 to-pink-100 shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl border border-indigo-100">
            <div className="p-6">
                <h3 className="font-extrabold text-2xl mb-2 text-indigo-700 tracking-tight drop-shadow">{quiz.title}</h3>
                <p className="text-gray-700 text-base mb-4">
                    {quiz.description || 'No description available.'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700">
                        {quiz.questions_count} Questions
                    </span>
                    <span className="inline-block bg-pink-100 rounded-full px-3 py-1 text-sm font-semibold text-pink-600">
                        {quiz.quiz_attempts_count} Attempts
                    </span>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={handleShare} title="Share" className="flex items-center gap-1 text-sm bg-green-400 hover:bg-green-500 text-white py-1 px-3 rounded shadow transition-all">
                        <ShareIcon width={20} height={20} /> Share
                    </button>
                    {isCreator ? (
                        <>
                            <Link to={`/edit-quiz/${quiz.id}`} title="Edit" className="flex items-center gap-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded shadow transition-all">
                                <PencilSquareIcon width={20} height={20} /> Edit
                            </Link>
                            <button onClick={onDelete} title="Delete" className="flex items-center gap-1 text-sm bg-red-400 hover:bg-red-500 text-white py-1 px-3 rounded shadow transition-all">
                                <TrashIcon width={20} height={20} /> Delete
                            </button>
                        </>
                    ) : (
                        <Link to={`/play-quiz/${quiz.slug}`} title="Play" className="flex items-center gap-1 text-sm bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded shadow transition-all">
                            <PlayCircleIcon width={20} height={20} /> Play
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
