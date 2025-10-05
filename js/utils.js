// js/utils.js

/**
 * Shuffles the elements of an array in place (Fisher-Yates Algorithm).
 * @param {Array} array The array to shuffle.
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Speaks the given word in the specified language using the browser's SpeechSynthesis API.
 * @param {string} word The word to be spoken.
 * @param {string} langCode The language code (e.g., 'nl-NL', 'en-US').
 */
export function speakWord(word, langCode) {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = langCode;

    // Try to select a matching voice for the language (especially for mobile)
    const voices = synth.getVoices();
    // Find a voice that matches the requested language code
    const matchingVoice = voices.find(
      (v) =>
        v.lang &&
        v.lang.toLowerCase().startsWith(langCode.toLowerCase().slice(0, 2))
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    synth.speak(utterance);
  } else {
    console.warn("SpeechSynthesis is not supported in this browser.");
  }
}

/**
 * Sets a cookie with the given name, value, and expiry (1 year by default).
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 * @param {number} days Number of days until expiry (default: 365).
 */
export function setCookie(name, value, days = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

/**
 * Gets a cookie value by name.
 * @param {string} name The name of the cookie.
 * @returns {string|null} The cookie value or null if not found.
 */
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

/**
 * Deletes a cookie by setting its expiry to the past.
 * @param {string} name The name of the cookie to delete.
 */
export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}