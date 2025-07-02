// js/utils.js

/**
 * Bir dizinin elemanlarını rastgele karıştırır (Fisher-Yates Algoritması).
 * @param {Array} array Karıştırılacak dizi.
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Verilen metni, belirtilen dilde sesli olarak okur.
 * @param {string} word Seslendirilecek kelime.
 * @param {string} langCode Dil kodu (örn: 'nl-NL', 'en-US').
 */
export function speakWord(word, langCode) {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    // Bekleyen konuşmaları iptal et
    synth.cancel(); 
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = langCode;
    synth.speak(utterance);
  } else {
    console.warn("SpeechSynthesis bu tarayıcıda desteklenmiyor.");
  }
}