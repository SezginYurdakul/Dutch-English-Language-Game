// js/main.js

import { gameState } from './state.js';
import { startGame } from './game.js';

// --- EVENT LISTENERS ---

// Soru Sayısı Seçimi
document.querySelectorAll(".question-count-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".question-count-button").forEach(btn => btn.classList.remove("selected-button"));
        button.classList.add("selected-button");
        gameState.questionCount = parseInt(button.dataset.count, 10);
    });
});

// Zorluk Seviyesi Seçimi
document.querySelectorAll(".difficulty-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".difficulty-button").forEach(btn => btn.classList.remove("difficulty-selected"));
        button.classList.add("difficulty-selected");
        gameState.selectedDifficulty = button.dataset.difficulty;
    });
});

// Oyun Modu Seçimi ve Oyunu Başlatma
document.getElementById("dutch-to-english-button").addEventListener("click", () => {
    gameState.gameMode = "dutch-to-english";
    startGame();
});

document.getElementById("english-to-dutch-button").addEventListener("click", () => {
    gameState.gameMode = "english-to-dutch";
    startGame();
});

// Sayfa ilk yüklendiğinde varsayılan seçimleri ayarla
function initializeDefaultSelections() {
    document.querySelector('.question-count-button[data-count="10"]').classList.add('selected-button');
    document.querySelector('.difficulty-button[data-difficulty="all"]').classList.add('difficulty-selected');
}

// Uygulamayı başlat
initializeDefaultSelections();