import api from './api';

const quizService = {
  // Creator
  getMyQuizzes: () => api.get('/quizzes'),
  createQuiz: (quizData) => api.post('/quizzes', quizData),
  getQuiz: (id) => api.get(`/quizzes/${id}`),
  updateQuiz: (id, quizData) => api.put(`/quizzes/${id}`, quizData),
  deleteQuiz: (id) => api.delete(`/quizzes/${id}`),

  // Questions
  getQuestions: (quizId) => api.get(`/quizzes/${quizId}/questions`),
  createQuestion: (quizId, questionData) => api.post(`/quizzes/${quizId}/questions`, questionData),
  updateQuestion: (questionId, questionData) => api.put(`/questions/${questionId}`, questionData),
  deleteQuestion: (questionId) => api.delete(`/questions/${questionId}`),

  // Public (participants)
  getPublicQuizzes: () => api.get('/quizzes/public'),
  getPublicQuiz: (slug) => api.get(`/quizzes/public/${slug}`),
  submitAttempt: (slug, payload) => api.post(`/quizzes/public/${slug}/submit`, payload),

  getQuestion: (questionId) => api.get(`/questions/${questionId}`),
};

export default quizService;