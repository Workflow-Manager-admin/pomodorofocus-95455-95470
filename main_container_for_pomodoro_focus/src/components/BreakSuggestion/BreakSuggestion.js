import React, { useEffect, useState } from 'react';
import { usePomodoroContext } from '../../context/PomodoroContext';
import { getMultipleSuggestions } from '../../utils/breakSuggestions';
import './BreakSuggestion.css';

// PUBLIC_INTERFACE
/**
 * Component to display break activity suggestions during break periods
 */
const BreakSuggestion = () => {
  const { mode } = usePomodoroContext();
  const [suggestions, setSuggestions] = useState([]);
  
  // Only show suggestions during break periods
  const isBreak = mode === 'shortBreak' || mode === 'longBreak';
  const breakType = mode === 'longBreak' ? 'long' : 'short';
  
  // Get new suggestions when break starts
  useEffect(() => {
    if (isBreak) {
      setSuggestions(getMultipleSuggestions(breakType, 3));
    }
  }, [mode, isBreak, breakType]);
  
  // Don't render if not in a break
  if (!isBreak) return null;
  
  // Get new set of suggestions
  const refreshSuggestions = () => {
    setSuggestions(getMultipleSuggestions(breakType, 3));
  };
  
  return (
    <div className="break-suggestion-container">
      <h3 className="break-suggestion-title">
        {mode === 'longBreak' ? 'Long Break' : 'Quick Break'} Suggestions
      </h3>
      
      <ul className="suggestion-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="suggestion-item">
            {suggestion}
          </li>
        ))}
      </ul>
      
      <button className="refresh-suggestions-button" onClick={refreshSuggestions}>
        Show more ideas
      </button>
    </div>
  );
};

export default BreakSuggestion;
