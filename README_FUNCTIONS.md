# Dutch Word Game – Function Documentation

This document lists the main functions in the project, their purpose, and how they relate to each other. Function bodies are omitted; only names, parameters, and descriptions are provided.

---

## js/main.js

- **initializeDefaultSelections()**
  - Sets default selections for question count and difficulty on page load.

- **Event Listeners**
  - Handles UI events for username input, question count, difficulty, mode selection, and history modal.
  - Calls `startGame()` from `game.js` when a mode is selected.

---

## js/game.js

- **startGame()**
  - Resets game state, filters and shuffles word list, starts timer, and loads the first question.
  - Calls: `showQuizScreen()`, `updateScores()`, `loadNextWord()`, `startTimer()`

- **loadNextWord()**
  - Loads the next quiz question or shows results if finished.
  - Calls: `resetUI()`, `updateProgressBar()`, `renderQuestion()`, `speakWord()`, `shuffleArray()`, `showResultsScreen()`

- **checkAnswer(selectedOption, correctOption, button)**
  - Checks if the selected answer is correct, updates scores, gives feedback, and loads the next question after a delay.
  - Calls: `showFeedback()`, `highlightAnswers()`, `updateScores()`, `speakWord()`, `loadNextWord()`

- **saveGameHistory()**
  - Saves the current quiz result to localStorage for the current user.

- **startTimer()** (internal)
  - Starts the quiz timer and updates the timer display every second.
  - Calls: `updateTimerDisplay()`

- **stopTimer()** (internal)
  - Stops the quiz timer.

- **getDistractors(correctAnswer, count)** (internal)
  - Returns an array of random distractor answers for the quiz.

---

## js/ui.js

- **updateScores()**
  - Updates the score display in the UI.

- **updateTimerDisplay()**
  - Updates the timer display in the UI.

- **updateProgressBar()**
  - Updates the progress bar and question counter.

- **renderQuestion(questionWord, options, correctOption)**
  - Renders the current question and answer options.
  - Calls: `checkAnswer()` from `game.js` when an option is clicked.

- **showFeedback(isCorrect, correctOption)**
  - Displays feedback for correct/incorrect answers.

- **highlightAnswers(selectedButton, correctOption)**
  - Highlights the selected and correct answers in the UI.

- **resetUI()**
  - Resets feedback and UI state for the next question.

- **showQuizScreen()**
  - Switches from the start screen to the quiz screen, sets mode-specific styles.

- **showResultsScreen()**
  - Displays the results after the quiz is finished.
  - Calls: `saveGameHistory()`

---

## js/state.js

- **gameState** (object)
  - Holds the current state of the game (mode, scores, timer, etc.).
  - Provides a getter `fullWordList` for the complete word list.

---

## js/utils.js

- **shuffleArray(array)**
  - Shuffles an array in place (Fisher-Yates algorithm).

- **speakWord(word, langCode)**
  - Uses the browser's SpeechSynthesis API to speak a word in the specified language.

---

## js/wordList.js

- **wordList** (array)
  - The list of word objects used for quiz questions.

---

## Relationships

- `main.js` handles UI events and calls `startGame()` to begin a quiz.
- `game.js` manages quiz logic, state transitions, and interacts with `ui.js` for rendering and feedback.
- `ui.js` updates the DOM and calls back to `game.js` for answer checking.
- `utils.js` provides helper functions for shuffling and speech.
- `state.js` maintains the current game state.
- `wordList.js` provides the vocabulary data.

---
bir dil oyun uygulamasi icin bu yapi ve dosya yapisi dogru mu ?