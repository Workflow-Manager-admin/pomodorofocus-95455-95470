import React from 'react';
import { PomodoroProvider } from '../../context/PomodoroContext';
import Timer from '../Timer/Timer';
import BreakSuggestion from '../BreakSuggestion/BreakSuggestion';
import Settings from '../Settings/Settings';
import './MainContainer.css';

// PUBLIC_INTERFACE
/**
 * Main container component for the PomodoroFocus application
 * Integrates all the Pomodoro app features: timer, break suggestions, and settings
 */
const MainContainer = () => {
  return (
    <PomodoroProvider>
      <div className="pomodoro-container">
        <header className="pomodoro-header">
          <div className="app-title">
            <h1>PomodoroFocus</h1>
            <p className="app-tagline">Stay focused and productive</p>
          </div>
          <div className="app-controls">
            <Settings />
          </div>
        </header>
        
        <main className="pomodoro-main">
          <Timer />
          <BreakSuggestion />
          
          <div className="session-info">
            <SessionCounter />
          </div>
        </main>
      </div>
    </PomodoroProvider>
  );
};

/**
 * Component to display the number of Pomodoro sessions completed
 */
const SessionCounter = () => {
  const { completedSessions } = usePomodoroContext();
  
  return (
    <div className="session-counter">
      <span className="session-label">Sessions completed today:</span>
      <span className="session-count">{completedSessions}</span>
    </div>
  );
};

export default MainContainer;
