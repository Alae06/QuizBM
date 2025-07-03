// src/hooks/useQuiz.js
import { useState, useEffect } from 'react';
import { quizService } from '../services/quiz';

export const useQuiz = (quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (quizId) {
      loadQuiz();
    }
  }, [quizId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const data = await quizService.getQuiz(quizId);
      setQuiz(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement du quiz');
    } finally {
      setLoading(false);
    }
  };

  const updateQuiz = async (updateData) => {
    try {
      const updatedQuiz = await quizService.updateQuiz(quizId, updateData);
      setQuiz(updatedQuiz);
      return updatedQuiz;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  const deleteQuiz = async () => {
    try {
      await quizService.deleteQuiz(quizId);
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  return {
    quiz,
    loading,
    error,
    loadQuiz,
    updateQuiz,
    deleteQuiz
  };
};

export const usePublicQuiz = (slug) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      loadPublicQuiz();
    }
  }, [slug]);

  const loadPublicQuiz = async () => {
    try {
      setLoading(true);
      const data = await quizService.getPublicQuiz(slug);
      setQuiz(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Quiz non trouvé');
    } finally {
      setLoading(false);
    }
  };

  return {
    quiz,
    loading,
    error,
    reload: loadPublicQuiz
  };
};