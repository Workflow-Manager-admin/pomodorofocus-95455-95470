/**
 * Collection of break suggestions for users during Pomodoro breaks
 * Categorized by duration (short and long breaks)
 */

// Break suggestions for short breaks (typically 5 minutes)
const shortBreakSuggestions = [
  "Stretch your arms, legs, and back",
  "Do 10 jumping jacks to get your blood flowing",
  "Close your eyes and practice deep breathing",
  "Get a glass of water and stay hydrated",
  "Look away from screens and focus on something 20 feet away for 20 seconds",
  "Tidy up your immediate workspace",
  "Do a quick mindfulness exercise",
  "Roll your shoulders and neck to release tension",
  "Take a brief walk around the room",
  "Do some quick wrist and hand stretches",
];

// Break suggestions for long breaks (typically 15-30 minutes)
const longBreakSuggestions = [
  "Take a walk outside for fresh air",
  "Do a brief meditation session",
  "Prepare a healthy snack",
  "Call a friend for a quick chat",
  "Do some light exercise or yoga",
  "Listen to a favorite song or two",
  "Take a power nap (set an alarm!)",
  "Make yourself a cup of tea or coffee",
  "Write down your thoughts or progress so far",
  "Do some quick household chores to get moving",
  "Stretch all major muscle groups",
  "Review your goals and priorities for the day",
];

/**
 * Get a random break suggestion based on break type
 * 
 * @param {string} breakType - The type of break ('short' or 'long')
 * @returns {string} A random break suggestion
 */
export const getRandomSuggestion = (breakType = 'short') => {
  const suggestions = breakType === 'long' ? longBreakSuggestions : shortBreakSuggestions;
  const randomIndex = Math.floor(Math.random() * suggestions.length);
  return suggestions[randomIndex];
};

/**
 * Get multiple unique break suggestions
 * 
 * @param {string} breakType - The type of break ('short' or 'long')
 * @param {number} count - Number of suggestions to return
 * @returns {string[]} Array of unique break suggestions
 */
export const getMultipleSuggestions = (breakType = 'short', count = 3) => {
  const suggestions = breakType === 'long' ? longBreakSuggestions : shortBreakSuggestions;
  
  // If requested count is greater than available suggestions, return all shuffled
  if (count >= suggestions.length) {
    return shuffleArray([...suggestions]);
  }
  
  // Otherwise return random unique suggestions
  const result = [];
  const usedIndexes = new Set();
  
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    
    if (!usedIndexes.has(randomIndex)) {
      result.push(suggestions[randomIndex]);
      usedIndexes.add(randomIndex);
    }
  }
  
  return result;
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 * 
 * @param {Array} array - The array to shuffle
 * @returns {Array} The shuffled array
 */
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
