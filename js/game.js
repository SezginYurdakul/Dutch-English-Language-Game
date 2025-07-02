// js/game.js

import { gameState } from './state.js';
import { shuffleArray, speakWord } from './utils.js';
import { 
    updateScores, 
    updateTimerDisplay, 
    updateProgressBar,
    renderQuestion,
    showQuizScreen,
    showResultsScreen,
    resetUI,
    showFeedback,
    highlightAnswers
} from './ui.js';

// Starts the quiz timer and updates the timer display every second
function startTimer() {
    clearInterval(gameState.timerInterval);
    gameState.secondsElapsed = 0;
    updateTimerDisplay();
    gameState.timerInterval = setInterval(() => {
        gameState.secondsElapsed++;
        updateTimerDisplay();
    }, 1000);
}

// Stops the quiz timer
function stopTimer() {
    clearInterval(gameState.timerInterval);
}

// Returns an array of random distractor answers (wrong options) for the quiz
function getDistractors(correctAnswer, count) {
    const distractors = [];
    const allAnswers = gameState.fullWordList.map(word => 
        gameState.gameMode === "dutch-to-english" ? word.english : word.dutch
    );
    while (distractors.length < count) {
        const randomIndex = Math.floor(Math.random() * allAnswers.length);
        const randomAnswer = allAnswers[randomIndex];
        if (randomAnswer !== correctAnswer && !distractors.includes(randomAnswer)) {
            distractors.push(randomAnswer);
        }
    }
    return distractors;
}

// Loads the next word/question in the quiz
export function loadNextWord() {
    // If all questions are answered or no more words, show results
    if (gameState.currentWordIndex >= gameState.questionCount || gameState.currentWordIndex >= gameState.shuffledWordList.length) {
        stopTimer();
        showResultsScreen();
        return;
    }

    resetUI(); // Reset UI for the new question
    updateProgressBar();
    gameState.isChecking = false;

    const currentWord = gameState.shuffledWordList[gameState.currentWordIndex];
    const isDutchToEnglish = gameState.gameMode === 'dutch-to-english';

    // Prepare question and answer based on game mode
    const questionWord = isDutchToEnglish ? currentWord.dutch : currentWord.english;
    const correctOption = isDutchToEnglish ? currentWord.english : currentWord.dutch;
    const questionLang = isDutchToEnglish ? 'nl-NL' : 'en-US';
    const answerLang = isDutchToEnglish ? 'en-US' : 'nl-NL';

    speakWord(questionWord, questionLang);

    // Prepare options (correct + distractors) and shuffle them
    const options = [correctOption, ...getDistractors(correctOption, 4)];
    shuffleArray(options);
    
    renderQuestion(questionWord, options, correctOption);
}

// Checks the user's answer and updates the UI and scores
export function checkAnswer(selectedOption, correctOption, button) {
    if (gameState.isChecking) return;
    gameState.isChecking = true;
    
    const isCorrect = selectedOption === correctOption;
    const answerLang = gameState.gameMode === 'dutch-to-english' ? 'en-US' : 'nl-NL';
    speakWord(selectedOption, answerLang);
    
    if (isCorrect) {
        gameState.correctScore++;
    } else {
        gameState.wrongScore++;
    }

    showFeedback(isCorrect, correctOption);
    highlightAnswers(button, correctOption);
    updateScores();

    gameState.currentWordIndex++;
    
    // Wait before loading the next word (longer if wrong)
    setTimeout(loadNextWord, isCorrect ? 1500 : 3000);
}

// Starts the quiz: resets state, filters words by difficulty, shuffles, and loads the first question
export function startGame() {
    showQuizScreen();

    // Reset state
    gameState.currentWordIndex = 0;
    gameState.correctScore = 0;
    gameState.wrongScore = 0;
    
    // Filter and shuffle word list by selected difficulty
    if (gameState.selectedDifficulty === "all") {
        gameState.shuffledWordList = [...gameState.fullWordList];
    } else {
        gameState.shuffledWordList = gameState.fullWordList.filter(
            w => w.difficulty === gameState.selectedDifficulty
        );
    }
    shuffleArray(gameState.shuffledWordList);

    updateScores();
    loadNextWord();
    startTimer();
}