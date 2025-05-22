import React, { useState } from 'react';
import './Instructions.css';

// PUBLIC_INTERFACE
/**
 * Component to display instructions on how to use the Pomodoro Technique
 */
const Instructions = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="instructions-container">
      <button 
        className="instructions-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide' : 'Show'} Pomodoro Technique Instructions
      </button>
      
      {isOpen && (
        <div className="instructions-content">
          <h3>How to Use the Pomodoro Technique</h3>
          
          <ol className="steps-list">
            <li>
              <strong>Choose a task</strong> you want to accomplish
            </li>
            <li>
              <strong>Set the timer</strong> for 25 minutes (a "Pomodoro")
            </li>
            <li>
              <strong>Work on the task</strong> until the timer rings
            </li>
            <li>
              <strong>Take a short break</strong> (5 minutes)
            </li>
            <li>
              After 4 Pomodoros, <strong>take a longer break</strong> (15-30 minutes)
            </li>
          </ol>
          
          <div className="instructions-tips">
            <h4>Tips for Success</h4>
            <ul>
              <li>Break complex tasks into smaller, actionable steps</li>
              <li>If a distraction pops into your mind, write it down for later and stay focused</li>
              <li>Once you start a Pomodoro, it should not be interrupted</li>
              <li>Use break time to rest and recharge, not to think about your work</li>
              <li>Adjust the Pomodoro and break durations to find what works best for you</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
