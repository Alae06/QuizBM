// src/components/common/Timer.js
import React from 'react';
import { useTimer } from '../../hooks/useTimer';

const Timer = ({ duration, onTimeUp, autoStart = false, className = '' }) => {
  const { timeLeft, isActive, startTimer, pauseTimer, resetTimer } = useTimer(duration, onTimeUp);

  React.useEffect(() => {
    if (autoStart) {
      startTimer();
    }
  }, [autoStart]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (timeLeft > 10) return 'text-green-600 bg-green-100';
    if (timeLeft > 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
}
