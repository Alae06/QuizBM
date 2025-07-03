import React from 'react';

const HomePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white/90 rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
                <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow">Welcome to QuizBm!</h1>
                <p className="text-xl text-gray-700 mb-6">Create, share, and play beautiful timed quizzes.<br/>Challenge yourself or your friends!</p>
                <div className="flex justify-center gap-4 mt-8">
                    <a href="/register" className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:from-indigo-600 hover:to-pink-600 transition-all text-lg">Get Started</a>
                    <a href="/login" className="bg-white border-2 border-indigo-500 text-indigo-700 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-50 transition-all text-lg">Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
