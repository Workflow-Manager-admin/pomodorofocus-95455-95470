import React, { createContext, useContext, useState, useEffect } from 'react';

// Define default settings for the Pomodoro timer
const defaultSettings = {
  workDuration: 25, // in minutes
  shortBreakDuration: 5, // in minutes
  longBreakDuration: 15, // in minutes
  sessionsBeforeLongBreak: 4, // number of work sessions before a long break
};

// Create the context
const PomodoroContext = createContext();

// PUBLIC_INTERFACE
/**
 * Provider component for the Pomodoro context
 * Manages the state and logic for the Pomodoro timer and settings
 */
export const PomodoroProvider = ({ children }) => {
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(defaultSettings.workDuration * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [completedSessions, setCompletedSessions] = useState(0);
  const [settings, setSettings] = useState(defaultSettings);

  // Track timer with useEffect
  useEffect(() => {
    let intervalId = null;

    if (isActive) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            // Timer completed
            clearInterval(intervalId);
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup interval on component unmount or when timer is stopped
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  // Handle timer completion
  const handleTimerComplete = () => {
    // Play sound notification (to be implemented)
    const notification = new Audio(); // placeholder for notification sound
    
    if (mode === 'work') {
      // Completed a work session
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      // Determine if it's time for a long break
      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        setMode('longBreak');
        setTimeRemaining(settings.longBreakDuration * 60);
      } else {
        setMode('shortBreak');
        setTimeRemaining(settings.shortBreakDuration * 60);
      }
    } else {
      // Completed a break
      setMode('work');
      setTimeRemaining(settings.workDuration * 60);
    }
  };

  // Start timer
  const startTimer = () => {
    setIsActive(true);
  };

  // Pause timer
  const pauseTimer = () => {
    setIsActive(false);
  };

  // Reset timer to beginning of current mode
  const resetTimer = () => {
    setIsActive(false);
    switch (mode) {
      case 'work':
        setTimeRemaining(settings.workDuration * 60);
        break;
      case 'shortBreak':
        setTimeRemaining(settings.shortBreakDuration * 60);
        break;
      case 'longBreak':
        setTimeRemaining(settings.longBreakDuration * 60);
        break;
      default:
        setTimeRemaining(settings.workDuration * 60);
    }
  };

  // Change timer mode manually
  const changeMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    
    // Set appropriate time based on mode
    switch (newMode) {
      case 'work':
        setTimeRemaining(settings.workDuration * 60);
        break;
      case 'shortBreak':
        setTimeRemaining(settings.shortBreakDuration * 60);
        break;
      case 'longBreak':
        setTimeRemaining(settings.longBreakDuration * 60);
        break;
      default:
        setTimeRemaining(settings.workDuration * 60);
    }
  };

  // Update settings
  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
    
    // Update current timer if needed
    resetTimer(); // Reset with new duration
  };

  const value = {
    timeRemaining,
    isActive,
    mode,
    completedSessions,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    updateSettings,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook to use the Pomodoro context
 * @returns {Object} The Pomodoro context values and methods
 */
export const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoroContext must be used within a PomodoroProvider');
  }
  return context;
};
