// 🌌 utils.js - Utility functions for AI Prompt Manager 2030++

/**
 * 🌟 Format a timestamp into a beautiful, localized string.
 * @param {number|string|Date} timestamp - Raw timestamp or date
 * @returns {string} Formatted human-readable date
 */
export function formatDate(timestamp) {
  try {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString(undefined, options);
  } catch (error) {
    console.error('⛔ Failed to format date:', error);
    return 'Unknown Date';
  }
}

/**
 * 🔁 Debounce high-frequency functions
 * @param {Function} fn - function to debounce
 * @param {number} delay - debounce timeout
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 🎯 Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
