import React, { useState } from 'react';
import { usePomodoroContext } from '../../context/PomodoroContext';
import './Settings.css';

// PUBLIC_INTERFACE
/**
 * Settings component for configuring Pomodoro timer durations
 */
const Settings = () => {
  const { settings, updateSettings } = usePomodoroContext();
  
  // Local state to track form values
  const [formValues, setFormValues] = useState({
    workDuration: settings.workDuration,
    shortBreakDuration: settings.shortBreakDuration,
    longBreakDuration: settings.longBreakDuration,
    sessionsBeforeLongBreak: settings.sessionsBeforeLongBreak
  });
  
  // Track if settings modal is open
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert to number and ensure it's positive
    const numValue = Math.max(1, parseInt(value) || 1);
    
    setFormValues({
      ...formValues,
      [name]: numValue
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formValues);
    setIsOpen(false);
  };
  
  return (
    <>
      <button className="settings-button" onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        Settings
      </button>
      
      {isOpen && (
        <div className="settings-overlay">
          <div className="settings-modal">
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            <h2 className="settings-title">Timer Settings</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="settings-group">
                <label htmlFor="workDuration">
                  Focus Duration (minutes)
                </label>
                <input
                  type="number"
                  id="workDuration"
                  name="workDuration"
                  min="1"
                  max="60"
                  value={formValues.workDuration}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="settings-group">
                <label htmlFor="shortBreakDuration">
                  Short Break Duration (minutes)
                </label>
                <input
                  type="number"
                  id="shortBreakDuration"
                  name="shortBreakDuration"
                  min="1"
                  max="30"
                  value={formValues.shortBreakDuration}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="settings-group">
                <label htmlFor="longBreakDuration">
                  Long Break Duration (minutes)
                </label>
                <input
                  type="number"
                  id="longBreakDuration"
                  name="longBreakDuration"
                  min="1"
                  max="60"
                  value={formValues.longBreakDuration}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="settings-group">
                <label htmlFor="sessionsBeforeLongBreak">
                  Sessions Before Long Break
                </label>
                <input
                  type="number"
                  id="sessionsBeforeLongBreak"
                  name="sessionsBeforeLongBreak"
                  min="1"
                  max="10"
                  value={formValues.sessionsBeforeLongBreak}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="settings-actions">
                <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
