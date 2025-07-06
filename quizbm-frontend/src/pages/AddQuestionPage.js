import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionForm from '../components/quiz/QuestionForm';
import quizService from '../services/quiz';

const AddQuestionPage = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
  
    const handleAddQuestion = async (questionData) => {
      await quizService.createQuestion(quizId, questionData);
      navigate(-1); // or navigate to the quiz edit page
    };
    
  return (
    <div className="add-question-page">
      {/* Hero Section */}
      <div className="hero-section mb-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-content">
                <h1 className="hero-title mb-2">
                  <span className="text-primary">Add New Question</span>
                </h1>
                <p className="hero-subtitle mb-0">
                  Create a new question for your quiz. Fill in the details below and save to add it to your quiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
              <QuestionForm
      quizId={quizId}
      onSubmit={handleAddQuestion}
      onCancel={() => navigate(-1)}
    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionPage;
