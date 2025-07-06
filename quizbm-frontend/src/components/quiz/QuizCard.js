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
        <div className="card mb-4 shadow-sm border-primary">
            <div className="card-body">
                <h3 className="card-title fw-bold text-primary mb-2">{quiz.title}</h3>
                <p className="card-text text-muted mb-3">
                    {quiz.description || 'No description available.'}
                </p>
                <div className="mb-3">
                    <span className="badge bg-primary me-2">
                        {quiz.questions_count} Questions
                    </span>
                    <span className="badge bg-info text-dark">
                        {quiz.quiz_attempts_count} Attempts
                    </span>
                </div>
                <div className="d-flex flex-wrap gap-2 justify-content-end mt-3">
                    <button onClick={handleShare} title="Share" className="btn btn-outline-success btn-sm d-flex align-items-center gap-1">
                        <ShareIcon width={18} height={18} /> Share
                    </button>
                    {isCreator ? (
                        <>
                            <Link to={`/edit-quiz/${quiz.id}`} title="Edit" className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1">
                                <PencilSquareIcon width={18} height={18} /> Edit
                            </Link>
                            <button onClick={onDelete} title="Delete" className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1">
                                <TrashIcon width={18} height={18} /> Delete
                            </button>
                        </>
                    ) : (
                        <Link to={`/play-quiz/${quiz.slug}`} title="Play" className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                            <PlayCircleIcon width={18} height={18} /> Play
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
