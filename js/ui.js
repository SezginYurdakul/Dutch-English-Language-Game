import { gameState } from "./state.js";
import { checkAnswer } from "./game.js";

// DOM Elementlerini tek bir yerden yönetmek için bir obje oluşturalım.
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
 * Skor tablosunu günceller.
 */
export function updateScores() {
  elements.correctScore.textContent = gameState.correctScore;
  elements.wrongScore.textContent = gameState.wrongScore;
  elements.totalScore.textContent = gameState.correctScore + gameState.wrongScore;
}

/**
 * Zamanlayıcı göstergesini günceller.
 */
export function updateTimerDisplay() {
  const minutes = Math.floor(gameState.secondsElapsed / 60);
  const seconds = gameState.secondsElapsed % 60;
  elements.timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

/**
 * İlerleme çubuğunu ve metnini günceller.
 */
export function updateProgressBar() {
    elements.progressBar.value = gameState.currentWordIndex + 1;
    elements.progressBar.max = gameState.questionCount;
    elements.progressText.textContent = `Question ${gameState.currentWordIndex + 1} / ${gameState.questionCount}`;
}

/**
 * Ekrana soruyu ve cevap seçeneklerini yerleştirir.
 * @param {string} questionWord - Sorulacak kelime.
 * @param {string[]} options - Cevap seçenekleri dizisi.
 * @param {string} correctOption - Doğru cevap.
 */
export function renderQuestion(questionWord, options, correctOption) {
    elements.dutchWord.textContent = questionWord;
    elements.optionsContainer.innerHTML = "";
    
    options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        // Cevap kontrolü için game.js'deki checkAnswer fonksiyonunu çağırır.
        button.onclick = () => checkAnswer(option, correctOption, button);
        elements.optionsContainer.appendChild(button);
    });
}

/**
 * Cevabın doğru veya yanlış olduğunu kullanıcıya gösterir.
 * @param {boolean} isCorrect - Cevabın doğruluğu.
 * @param {string} correctOption - Doğru cevap.
 */
export function showFeedback(isCorrect, correctOption) {
    const buttons = elements.optionsContainer.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        elements.feedback.textContent = "Correct!";
        elements.feedback.className = "correct-text";
    } else {
        elements.feedback.textContent = `Incorrect! (Correct: ${correctOption})`;
        elements.feedback.className = "wrong-text";
    }
}

/**
 * Seçilen ve doğru olan cevapları renkle vurgular.
 * @param {HTMLElement} selectedButton - Kullanıcının tıkladığı buton.
 * @param {string} correctOption - Doğru cevap.
 */
export function highlightAnswers(selectedButton, correctOption) {
    if (selectedButton.textContent === correctOption) {
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
        const allButtons = elements.optionsContainer.querySelectorAll("button");
        allButtons.forEach(btn => {
            if (btn.textContent === correctOption) {
                btn.classList.add("correct");
            }
        });
    }
}

/**
 * Bir sonraki soru için arayüzü temizler.
 */
export function resetUI() {
    elements.feedback.textContent = "";
    elements.feedback.className = "";
}

/**
 * Başlangıç ekranını gizleyip test ekranını gösterir.
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
 * Test bittiğinde sonuç ekranını gösterir.
 */
export function showResultsScreen() {
    const accuracy = (gameState.correctScore / gameState.questionCount) * 100;
    let performance = "";

    if (accuracy >= 90) performance = "Excellent";
    else if (accuracy >= 70) performance = "Good";
    else if (accuracy >= 50) performance = "Average";
    else performance = "Poor";

    // Quiz konteynerini temizleyip sonuçları içine yazmak,
    // orijinal HTML yapısını bozmadan sonuç göstermenin kolay bir yoludur.
    elements.quizContainer.innerHTML = `
        <div id="results-container">
            <h2>Quiz Completed!</h2>
            <p>Performance: <strong>${performance}</strong></p>
            <p>Accuracy: ${accuracy.toFixed(2)}%</p>
            <p>Time Taken: ${elements.timer.textContent}</p>
            <button class="home-page">Home Page</button>
        </div>
    `;

    // "Home Page" butonuna tıklandığında oyunu sıfırlamak için sayfayı yeniden yükle.
    // Bu en basit ve en güvenilir yöntemdir.
    elements.quizContainer.querySelector('.home-page').addEventListener('click', () => {
        window.location.reload();
    });
}