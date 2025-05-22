/**
 * Utility functions for timer operations and formatting
 */

/**
 * Format seconds into MM:SS display format
 * 
 * @param {number} totalSeconds - The total seconds to format
 * @returns {string} Formatted time string in MM:SS format
 */
export const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  // Add leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Calculate percentage of time remaining for progress displays
 * 
 * @param {number} timeRemaining - Seconds remaining in the timer
 * @param {number} totalDuration - Total duration of the timer in seconds
 * @returns {number} Percentage of time completed (0-100)
 */
export const calculateProgress = (timeRemaining, totalDuration) => {
  if (totalDuration <= 0) return 0;
  
  const timeElapsed = totalDuration - timeRemaining;
  const progressPercentage = (timeElapsed / totalDuration) * 100;
  
  return Math.min(Math.max(progressPercentage, 0), 100); // Clamp between 0-100
};

/**
 * Convert minutes to seconds
 * 
 * @param {number} minutes - Minutes to convert
 * @returns {number} Total seconds
 */
export const minutesToSeconds = (minutes) => {
  return minutes * 60;
};

/**
 * Convert seconds to minutes rounded to 1 decimal place
 * 
 * @param {number} seconds - Seconds to convert
 * @returns {number} Minutes with 1 decimal place
 */
export const secondsToMinutes = (seconds) => {
  return Math.round((seconds / 60) * 10) / 10;
};
