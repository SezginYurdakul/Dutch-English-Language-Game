// js/main.js

import { gameState } from "./state.js";
import { startGame } from "./game.js";
import { setCookie, getCookie } from "./utils.js";

// --- EVENT LISTENERS ---

// Check if user exists and show appropriate landing screen
const existingUsername = getCookie("woordquiz_username");
if (!existingUsername) {
  // New user - show username input
  document.getElementById("landing-screen").classList.add("show");
  document.getElementById("new-user-welcome").classList.add("show");
} else {
  // Returning user - show personalized welcome
  document.getElementById("landing-screen").classList.add("show");
  document.getElementById("returning-user-welcome").classList.add("show");
  document.getElementById("username-display").textContent = existingUsername;
  // Also set the username in start screen for when they continue
  document.getElementById("start-screen-username").textContent = existingUsername;
}

// New user submits username
document.getElementById("username-submit").addEventListener("click", () => {
  const username = document.getElementById("username-input").value.trim();
  if (username) {
    setCookie("woordquiz_username", username); // Save to cookie for 1 year
    showGameScreen();
  }
});

// Returning user continues to game
document.getElementById("continue-to-game").addEventListener("click", () => {
  showGameScreen();
});

// User wants to change username
document.getElementById("change-username").addEventListener("click", () => {
  document.getElementById("returning-user-welcome").classList.remove("show");
  document.getElementById("new-user-welcome").classList.add("show");
  document.getElementById("username-input").value = "";
  document.getElementById("username-input").focus();
});

// Helper function to show game screen
function showGameScreen() {
  const username = getCookie("woordquiz_username");
  document.getElementById("start-screen-username").textContent = username || "Guest";
  document.getElementById("landing-screen").classList.remove("show");
  document.getElementById("start-screen").classList.add("show");
}

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
    document.getElementById("landing-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    const username = getCookie('woordquiz_username');
    const historyData = getCookie('woordquiz_history');
    const history = historyData ? JSON.parse(historyData) : {};
    const userHistory = history[username] || [];
    
    // Set the username in history modal
    document.getElementById('history-username').textContent = username || 'Unknown User';
    
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
