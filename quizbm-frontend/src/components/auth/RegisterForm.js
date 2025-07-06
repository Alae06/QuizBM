import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState({ name: false, email: false, password: false, password_confirmation: false });
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const validate = () => {
        return {
            name: !form.name ? 'Name is required.' : '',
            email: !form.email ? 'Email is required.' : '',
            password: !form.password ? 'Password is required.' : '',
            password_confirmation: !form.password_confirmation ? 'Please confirm your password.' :
                (form.password !== form.password_confirmation ? 'Passwords do not match.' : ''),
        };
    };

    const errors = validate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        setError('');
        if (errors.name || errors.email || errors.password || errors.password_confirmation) return;
        try {
            await register(form.name, form.email, form.password, form.password_confirmation);
            navigate('/dashboard');
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'Failed to register. Please try again.';
            setError(message);
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">Create Your Account</h2>
                {error && <div className="text-red-500 text-center mb-2">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">Name</label>
                    <input
                        id="registerName"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className={`form-control${(submitAttempted || touched.name) && errors.name ? ' is-invalid' : ''}`}
                        autoComplete="name"
                    />
                    {(submitAttempted || touched.name) && errors.name && (
                        <div className="invalid-feedback d-block">{errors.name}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Email</label>
                    <input
                        id="registerEmail"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        className={`form-control${(submitAttempted || touched.email) && errors.email ? ' is-invalid' : ''}`}
                        autoComplete="email"
                    />
                    {(submitAttempted || touched.email) && errors.email && (
                        <div className="invalid-feedback d-block">{errors.email}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input
                        id="registerPassword"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        className={`form-control${(submitAttempted || touched.password) && errors.password ? ' is-invalid' : ''}`}
                        autoComplete="new-password"
                    />
                    {(submitAttempted || touched.password) && errors.password && (
                        <div className="invalid-feedback d-block">{errors.password}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="registerPasswordConfirm" className="form-label">Confirm Password</label>
                    <input
                        id="registerPasswordConfirm"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        className={`form-control${(submitAttempted || touched.password_confirmation) && errors.password_confirmation ? ' is-invalid' : ''}`}
                        autoComplete="new-password"
                    />
                    {(submitAttempted || touched.password_confirmation) && errors.password_confirmation && (
                        <div className="invalid-feedback d-block">{errors.password_confirmation}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
