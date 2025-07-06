import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionForm from '../components/quiz/QuestionForm';
import quizService from '../services/quiz';

const EditQuestionPage = () => {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizService.getQuestion(questionId).then(res => {
      setInitialData(res.data);
      setLoading(false);
    });
  }, [questionId]);

  const handleUpdateQuestion = async (questionData) => {
    await quizService.updateQuestion(questionId, questionData);
    navigate(-1); // or navigate to the quiz edit page
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-question-page">
      {/* Hero Section */}
      <div className="hero-section mb-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-content">
                <h1 className="hero-title mb-2">
                  <span className="text-primary">Edit Question</span>
                </h1>
                <p className="hero-subtitle mb-0">
                  Update the details of your question below and save your changes.
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
                  initialData={initialData}
                  isEditing={true}
                  onSubmit={handleUpdateQuestion}
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

export default EditQuestionPage;
