import { gameState } from "./state.js";
import { checkAnswer, saveGameHistory } from "./game.js";

// Create an object to manage all DOM elements in one place.
const elements = {
  startScreen: document.getElementById("start-screen"),
  quizContainer: document.getElementById("quiz-container"),
  quizTitle: document.getElementById("quiz-title"),
  dutchWord: document.getElementById("dutch-word"),
  optionsContainer: document.getElementById("options-container"),
  feedback: document.getElementById("feedback"),
  correctScore: document.getElementById("correct-score"),
  wrongScore: document.getElementById("wrong-score"),
  totalScore: document.getElementById("total-score"),
  progressText: document.getElementById("progress-text"),
  progressBar: document.getElementById("progress-bar"),
  timer: document.getElementById("timer"),
};

/**
 * Updates the score display.
 */
export function updateScores() {
  elements.correctScore.textContent = gameState.correctScore;
  elements.wrongScore.textContent = gameState.wrongScore;
  elements.totalScore.textContent =
    gameState.correctScore + gameState.wrongScore;
}

/**
 * Updates the timer display.
 */
export function updateTimerDisplay() {
  const minutes = Math.floor(gameState.secondsElapsed / 60);
  const seconds = gameState.secondsElapsed % 60;
  elements.timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

/**
 * Updates the progress bar and progress text.
 */
export function updateProgressBar() {
  elements.progressBar.value = gameState.currentWordIndex + 1;
  elements.progressBar.max = gameState.questionCount;
  elements.progressText.textContent = `Question ${
    gameState.currentWordIndex + 1
  } / ${gameState.questionCount}`;
}

/**
 * Renders the question and answer options on the screen.
 * @param {string} questionWord - The word to be asked.
 * @param {string[]} options - Array of answer options.
 * @param {string} correctOption - The correct answer.
 */
export function renderQuestion(questionWord, options, correctOption) {
  elements.dutchWord.textContent = questionWord;
  elements.optionsContainer.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    // Calls checkAnswer from game.js to check the answer.
    button.onclick = () => checkAnswer(option, correctOption, button);
    elements.optionsContainer.appendChild(button);
  });
}

/**
 * Shows feedback to the user whether the answer is correct or incorrect.
 * @param {boolean} isCorrect - Whether the answer is correct.
 * @param {string} correctOption - The correct answer.
 */
export function showFeedback(isCorrect, correctOption) {
  const buttons = elements.optionsContainer.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  if (isCorrect) {
    elements.feedback.textContent = "Correct!";
    elements.feedback.className = "correct-text";
  } else {
    elements.feedback.textContent = `Incorrect! (Correct: ${correctOption})`;
    elements.feedback.className = "wrong-text";
  }
}

/**
 * Highlights the selected and correct answers.
 * @param {HTMLElement} selectedButton - The button clicked by the user.
 * @param {string} correctOption - The correct answer.
 */
export function highlightAnswers(selectedButton, correctOption) {
  if (selectedButton.textContent === correctOption) {
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
    const allButtons = elements.optionsContainer.querySelectorAll("button");
    allButtons.forEach((btn) => {
      if (btn.textContent === correctOption) {
        btn.classList.add("correct");
      }
    });
  }
}

/**
 * Resets the UI for the next question.
 */
export function resetUI() {
  elements.feedback.textContent = "";
  elements.feedback.className = "";
}

/**
 * Hides the start screen and shows the quiz screen.
 */
export function showQuizScreen() {
  elements.startScreen.style.display = "none";
  elements.quizContainer.style.display = "block";
  elements.quizContainer.className = "container quiz-container"; // Reset classes

  if (gameState.gameMode === "dutch-to-english") {
    elements.quizContainer.classList.add("quiz-container-dutch");
    elements.quizTitle.textContent = "Dutch to English";
  } else {
    elements.quizContainer.classList.add("quiz-container-english");
    elements.quizTitle.textContent = "English to Dutch";
  }
}

/**
 * Shows the results screen when the quiz is finished.
 */
export function showResultsScreen() {
  // Call this in showResultsScreen after showing results
  saveGameHistory();
  const accuracy = (gameState.correctScore / gameState.questionCount) * 100;
  let performance = "";

  if (accuracy >= 90) performance = "Excellent";
  else if (accuracy >= 70) performance = "Good";
  else if (accuracy >= 50) performance = "Average";
  else performance = "Poor";

  // Clear the quiz container and display the results,
  // this is an easy way to show results without breaking the original HTML structure.
  elements.quizContainer.innerHTML = `
        <div id="results-container">
            <h2>Quiz Completed!</h2>
            <p>Performance: <strong>${performance}</strong></p>
            <p>Accuracy: ${accuracy.toFixed(2)}%</p>
            <p>Time Taken: ${elements.timer.textContent}</p>
            <button class="home-page">Home Page</button>
        </div>
    `;

  // When the "Home Page" button is clicked, reload the page to reset the game.
  // This is the simplest and most reliable method.
  elements.quizContainer
    .querySelector(".home-page")
    .addEventListener("click", () => {
      window.location.reload();
    });
}
