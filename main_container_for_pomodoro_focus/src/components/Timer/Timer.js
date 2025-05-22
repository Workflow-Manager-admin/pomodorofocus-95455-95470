import React from 'react';
import { usePomodoroContext } from '../../context/PomodoroContext';
import { formatTime, calculateProgress } from '../../utils/timerUtils';
import './Timer.css';

// PUBLIC_INTERFACE
/**
 * Timer component for displaying and controlling the Pomodoro timer
 */
const Timer = () => {
  const { 
    timeRemaining, 
    isActive, 
    mode, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    changeMode,
    settings
  } = usePomodoroContext();
  
  // Calculate total duration based on current mode
  const getTotalDuration = () => {
    switch (mode) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
      default:
        return settings.workDuration * 60;
    }
  };
  
  // Calculate progress percentage for the circular timer
  const progress = calculateProgress(timeRemaining, getTotalDuration());
  
  // Calculate the circle's stroke dashoffset based on progress
  const calculateStrokeDashoffset = (progress) => {
    // Circle circumference is 2πr where r is 45 (from the SVG)
    const circumference = 2 * Math.PI * 45;
    return circumference - (progress / 100) * circumference;
  };
  
  return (
    <div className="timer-container">
      <div className="timer-mode-selector">
        <button 
          className={`mode-button ${mode === 'work' ? 'active' : ''}`}
          onClick={() => changeMode('work')}
        >
          Focus
        </button>
        <button 
          className={`mode-button ${mode === 'shortBreak' ? 'active' : ''}`}
          onClick={() => changeMode('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`mode-button ${mode === 'longBreak' ? 'active' : ''}`}
          onClick={() => changeMode('longBreak')}
        >
          Long Break
        </button>
      </div>
      
      <div className="timer-display">
        {/* SVG Circle for timer progress */}
        <svg className="timer-circle" width="100%" height="100%" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="2"
            stroke="rgba(255, 255, 255, 0.2)"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="3"
            stroke={mode === 'work' ? 'var(--kavia-orange)' : '#4CAF50'}
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={calculateStrokeDashoffset(progress)}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Timer text */}
        <div className="timer-text">
          {formatTime(timeRemaining)}
        </div>
      </div>
      
      <div className="timer-controls">
        {!isActive ? (
          <button className="control-button start-button" onClick={startTimer}>
            Start
          </button>
        ) : (
          <button className="control-button pause-button" onClick={pauseTimer}>
            Pause
          </button>
        )}
        <button className="control-button reset-button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
