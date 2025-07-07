// js/state.js

import { wordList } from "./wordList.js";

export const gameState = {
  gameMode: "dutch-to-english",
  currentWordIndex: 0,
  correctScore: 0,
  wrongScore: 0,
  questionCount: 10,
  selectedDifficulty: "easy",
  shuffledWordList: [],
  isChecking: false,
  timerInterval: null,
  secondsElapsed: 0,

  get fullWordList() {
    return [...wordList];
  }
};