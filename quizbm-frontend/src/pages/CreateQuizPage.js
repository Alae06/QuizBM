import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../components/quiz/QuizForm';
import quizService from '../services/quiz';

const CreateQuizPage = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [newQuizId, setNewQuizId] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleCreateQuiz = async (quizData) => {
        try {
            setErrorMsg("");
            const newQuiz = await quizService.createQuiz(quizData);
            setSuccess(true);
            setNewQuizId(newQuiz.data.id);
        } catch (error) {
            console.error('Failed to create quiz:', error);
            let msg = 'Failed to create quiz. Please check the console for details.';
            if (error.response && error.response.data && error.response.data.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                msg = error.message;
            }
            setErrorMsg(msg);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    return (
        <div className="container">
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <div style={{fontWeight: 700, fontSize: '1.2rem', color: '#2563eb'}}>Step 1 of 2: Create Quiz Info</div>
                <div style={{color: '#666', marginTop: '0.5rem', fontSize: '1rem'}}>
                    Fill in the quiz details below. After creating, you can add questions.
                </div>
            </div>
            {errorMsg && (
                <div style={{background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500}}>
                    {errorMsg}
                </div>
            )}
            {success ? (
                <div style={{textAlign: 'center', background: '#e0f2fe', borderRadius: '1rem', padding: '2rem', margin: '2rem auto', maxWidth: 500}}>
                    <div style={{fontSize: '1.3rem', fontWeight: 700, color: '#2563eb'}}>Quiz created successfully!</div>
                    <div style={{margin: '1rem 0', color: '#333'}}>Now you can add questions to your quiz.</div>
                    <button
                        style={{background: '#2563eb', color: '#fff', fontWeight: 600, padding: '0.7rem 2rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.1rem', cursor: 'pointer', marginRight: '1rem'}}
                        onClick={() => navigate(`/edit-quiz/${newQuizId}`)}
                    >
                        Add Questions
                    </button>
                    <button
                        style={{background: '#f3f4f6', color: '#222', fontWeight: 500, padding: '0.7rem 2rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.1rem', cursor: 'pointer'}}
                        onClick={() => navigate('/dashboard')}
                    >
                        Go to Dashboard
                    </button>
                </div>
            ) : (
                <>
                    <QuizForm onSubmit={handleCreateQuiz} />
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
                        <button
                            style={{background: '#f3f4f6', color: '#222', fontWeight: 500, padding: '0.7rem 2rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.1rem', cursor: 'pointer'}}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateQuizPage;
