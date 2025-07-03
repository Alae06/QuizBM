import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(form.email, form.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">Sign In</h2>
                {error && <div className="text-red-500 text-center mb-2">{error}</div>}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} type="email" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input name="password" value={form.password} onChange={handleChange} type="password" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-pink-600 transition-all">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
