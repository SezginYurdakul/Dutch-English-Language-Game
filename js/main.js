// js/main.js

import { gameState } from "./state.js";
import { startGame } from "./game.js";

// --- EVENT LISTENERS ---

// Show username screen if not set
if (!localStorage.getItem("woordquiz_username")) {
  document.getElementById("username-screen").style.display = "block";
  document.getElementById("start-screen").style.display = "none";
} else {
  document.getElementById("username-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}

document.getElementById("username-submit").addEventListener("click", () => {
  const username = document.getElementById("username-input").value.trim();
  if (username) {
    localStorage.setItem("woordquiz_username", username);
    document.getElementById("username-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
  }
});

// Question Count Selection
document.querySelectorAll(".question-count-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove selection from all buttons and add to the clicked one
    document
      .querySelectorAll(".question-count-button")
      .forEach((btn) => btn.classList.remove("selected-button"));
    button.classList.add("selected-button");
    // Update the question count in game state
    gameState.questionCount = parseInt(button.dataset.count, 10);
  });
});

// Difficulty Level Selection
document.querySelectorAll(".difficulty-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove selection from all buttons and add to the clicked one
    document
      .querySelectorAll(".difficulty-button")
      .forEach((btn) => btn.classList.remove("difficulty-selected"));
    button.classList.add("difficulty-selected");
    // Update the selected difficulty in game state
    gameState.selectedDifficulty = button.dataset.difficulty;
  });
});

// Game Mode Selection and Start Game
document
  .getElementById("dutch-to-english-button")
  .addEventListener("click", () => {
    gameState.gameMode = "dutch-to-english";
    startGame();
  });

document
  .getElementById("english-to-dutch-button")
  .addEventListener("click", () => {
    gameState.gameMode = "english-to-dutch";
    startGame();
  });

// Set default selections when the page first loads
function initializeDefaultSelections() {
  document
    .querySelector('.question-count-button[data-count="10"]')
    .classList.add("selected-button");
  document
    .querySelector('.difficulty-button[data-difficulty="all"]')
    .classList.add("difficulty-selected");
}

document.getElementById('show-history').addEventListener('click', () => {
    document.getElementById("username-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    const username = localStorage.getItem('woordquiz_username');
    const history = JSON.parse(localStorage.getItem('woordquiz_history') || '{}');
    const userHistory = history[username] || [];
    let html = '';
if (userHistory.length === 0) {
    html = '<p>No history found.</p>';
} else {
    const headers = ['Date','Mode','Difficulty','Questions','Correct','Wrong','Accuracy','Time'];
    html = '<table><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
    userHistory.forEach(entry => {
        html += `<tr>
            <td data-label="Date">${entry.date}</td>
            <td data-label="Mode">${entry.mode}</td>
            <td data-label="Difficulty">${entry.difficulty}</td>
            <td data-label="Questions">${entry.questionCount}</td>
            <td data-label="Correct">${entry.correct}</td>
            <td data-label="Wrong">${entry.wrong}</td>
            <td data-label="Accuracy">${entry.accuracy}%</td>
            <td data-label="Time">${entry.time}</td>
        </tr>`;
    });
    html += '</table>';
}
    document.getElementById('history-modal').style.display = 'block';
    document.getElementById('history-list').innerHTML = html;
    
});

document.querySelector('#history-modal button').addEventListener('click', () => {
  document.getElementById('history-modal').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('username-screen').style.display = 'none';
});
// Initialize the application
initializeDefaultSelections();
