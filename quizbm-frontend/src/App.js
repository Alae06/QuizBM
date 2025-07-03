import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import ProtectedRoute from './components/common/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateQuizPage from './pages/CreateQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import PlayQuizPage from './pages/PlayQuizPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <main className="container main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/q/:slug" element={<PlayQuizPage />} />
              <Route path="/play-quiz/:slug" element={<PlayQuizPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/edit-quiz/:id" element={<EditQuizPage />} />
              <Route path="/create-quiz" element={<CreateQuizPage />} />
              {/* For now, let's make dashboard accessible for testing */}
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
