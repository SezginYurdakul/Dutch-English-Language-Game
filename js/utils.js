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