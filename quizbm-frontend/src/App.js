import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import Footer from './components/common/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateQuizPage from './pages/CreateQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import PlayQuizPage from './pages/PlayQuizPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import AddQuestionPage from './pages/AddQuestionPage';
import EditQuestionPage from './pages/EditQuestionPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="container main-content flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/q/:slug" element={<PlayQuizPage />} />
              <Route path="/play-quiz/:slug" element={<PlayQuizPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/edit-quiz/:id" element={<EditQuizPage />} />
              <Route path="/create-quiz" element={<CreateQuizPage />} />
              <Route path="/quiz-details/:id" element={<QuizDetailsPage />} />
              <Route path="/quiz-details" element={<QuizDetailsPage />} />
              {/* For now, let's make dashboard accessible for testing */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/quiz/:quizId/add-question" element={<AddQuestionPage />} />
              <Route path="/quiz/:quizId/edit-question/:questionId" element={<EditQuestionPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
