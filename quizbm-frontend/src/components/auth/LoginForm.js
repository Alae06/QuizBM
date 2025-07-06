import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState({ email: false, password: false });
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const { login } = useAuth();
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
            email: !form.email ? 'Email is required.' : '',
            password: !form.password ? 'Password is required.' : '',
        };
    };

    const errors = validate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        setError('');
        if (errors.email || errors.password) return;
        try {
            await login(form.email, form.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3" noValidate>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <div className="alert alert-danger text-center mb-3">{error}</div>}
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email</label>
                <input
                    id="loginEmail"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    className={`form-control${(submitAttempted || touched.email) && errors.email ? ' is-invalid' : ''}`}
                    autoComplete="username"
                />
                {(submitAttempted || touched.email) && errors.email && (
                    <div className="invalid-feedback d-block">{errors.email}</div>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input
                    id="loginPassword"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    className={`form-control${(submitAttempted || touched.password) && errors.password ? ' is-invalid' : ''}`}
                    autoComplete="current-password"
                />
                {(submitAttempted || touched.password) && errors.password && (
                    <div className="invalid-feedback d-block">{errors.password}</div>
                )}
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
