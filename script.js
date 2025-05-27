import { wordList } from './wordList.js'; // Import the word list

// HTML Elements
const startScreenEl = document.getElementById('start-screen'); // Start screen container
const dutchToEnglishButton = document.getElementById('dutch-to-english-button'); // Button for Dutch to English mode
const englishToDutchButton = document.getElementById('english-to-dutch-button'); // Button for English to Dutch mode
const quizContainerEl = document.getElementById('quiz-container'); // Quiz container
const dutchWordEl = document.getElementById('dutch-word'); // Element to display the word
const optionsContainerEl = document.getElementById('options-container'); // Container for answer options
const correctScoreEl = document.getElementById('correct-score'); // Element to display correct score
const wrongScoreEl = document.getElementById('wrong-score'); // Element to display wrong score
const totalScoreEl = document.getElementById('total-score'); // Element to display total score
const feedbackEl = document.getElementById('feedback'); // Element to display feedback
const timerEl = document.getElementById('timer'); // Timer element

// Variables
let gameMode = 'dutch-to-english'; // Default game mode
let currentWordIndex = 0; // Index of the current word
let correctScore = 0; // Number of correct answers
let wrongScore = 0; // Number of wrong answers
let totalScore = 0; // Total number of questions answered
let shuffledWordList = []; // Shuffled list of words
let isChecking = false; // Prevent multiple answers at the same time
let timerInterval; // Timer interval
let secondsElapsed = 0; // Total elapsed time in seconds

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Generate Distractors
// This function generates random incorrect options for the quiz
function getDistractors(correctAnswer, count) {
    const distractors = [];
    const allAnswers = wordList.map(word => gameMode === 'dutch-to-english' ? word.english : word.dutch);
    while (distractors.length < count) {
        const randomIndex = Math.floor(Math.random() * allAnswers.length);
        const randomAnswer = allAnswers[randomIndex];
        if (randomAnswer !== correctAnswer && !distractors.includes(randomAnswer)) {
            distractors.push(randomAnswer);
        }
    }
    return distractors;
}

let questionCount = 10; // Default question count

// Event listener for question count buttons
const questionCountButtons = document.querySelectorAll('.question-count-button');
questionCountButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'selected-button' class from all buttons
        questionCountButtons.forEach(btn => btn.classList.remove('selected-button'));

        // Add 'selected-button' class to the clicked button
        button.classList.add('selected-button');

        // Set the question count based on the selected button
        questionCount = parseInt(button.getAttribute('data-count'), 10);
        console.log(`Question count set to: ${questionCount}`);
    });
});
// Start Timer
// This function starts the timer and updates the timer element every second
function startTimer() {
    clearInterval(timerInterval); // Clear any previous timer
    secondsElapsed = 0;
    timerEl.textContent = '00:00';
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Stop Timer
// This function stops the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Update Scores
// This function updates the score elements on the screen
function updateScores() {
    correctScoreEl.textContent = correctScore;
    wrongScoreEl.textContent = wrongScore;
    totalScoreEl.textContent = totalScore;
}

let usedWords = []; // List of used words

// Load Next Word
// This function loads the next word and generates answer options
function loadNextWord() {
    if (currentWordIndex >= questionCount || currentWordIndex >= shuffledWordList.length) {
        stopTimer(); // Stop the timer
        showResults(); // Show the results
        return;
    }

    // Update progress bar and text
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    progressBar.value = currentWordIndex + 1; // Update progress bar value
    progressBar.max = questionCount; // Set max value to total questions
    progressText.textContent = `Question ${currentWordIndex + 1} / ${questionCount}`; // Update progress text

    isChecking = false;
    feedbackEl.textContent = '';
    feedbackEl.className = '';

    let currentWord;

    do {
        currentWord = shuffledWordList[currentWordIndex];
        if (!usedWords.includes(currentWord)) {
            usedWords.push(currentWord); // Add the word to the used words list
            break; // Exit the loop if the word is not used
        }
        currentWordIndex++;
    } while (currentWordIndex < shuffledWordList.length);

    // Add the word to the used words list
    usedWords.push(currentWord);

    // Set the word and options based on the selected game mode
    if (gameMode === 'dutch-to-english') {
        dutchWordEl.textContent = currentWord.dutch;
        speakWord(currentWord.dutch, 'nl-NL'); // Speak the Dutch word
        const options = [currentWord.english];
        options.push(...getDistractors(currentWord.english, 4));
        shuffleArray(options);

        optionsContainerEl.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, currentWord.english, button);
            optionsContainerEl.appendChild(button);
        });
    } else if (gameMode === 'english-to-dutch') {
        dutchWordEl.textContent = currentWord.english;
        speakWord(currentWord.english, 'en-US'); // Speak the English word
        const options = [currentWord.dutch];
        options.push(...getDistractors(currentWord.dutch, 4));
        shuffleArray(options);

        optionsContainerEl.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, currentWord.dutch, button);
            optionsContainerEl.appendChild(button);
        });
    }
}

// Check Answer
// This function checks if the selected answer is correct or not
function checkAnswer(selectedOption, correctOption, button) {
    if (isChecking) return;
    isChecking = true;
    totalScore++; // Increment total score

    // Speak the selected option
    speakWord(selectedOption, gameMode === 'dutch-to-english' ? 'en-US' : 'nl-NL');

    const buttons = optionsContainerEl.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true); // Disable all buttons

    let delayTime;

    if (selectedOption === correctOption) {
        correctScore++;
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = 'correct-text';
        button.classList.add('correct');
        delayTime = 1500;
    } else {
        wrongScore++;
        feedbackEl.textContent = `Incorrect! (Correct: ${correctOption})`;
        feedbackEl.className = 'wrong-text';
        button.classList.add('wrong');
        buttons.forEach(btn => {
            if (btn.textContent === correctOption) {
                btn.classList.add('correct');
            }
        });
        delayTime = 3000;
    }

    updateScores(); // Update scores
    currentWordIndex++;

    setTimeout(loadNextWord, delayTime);
}

// Start Game
// This function initializes the game based on the selected mode
function startGame() {
    startScreenEl.style.display = 'none'; // Hide the start screen
    quizContainerEl.style.display = 'block'; // Show the quiz screen

    // Set background color and title based on game mode
    if (gameMode === 'dutch-to-english') {
        quizContainerEl.classList.add('quiz-container-dutch');
        quizContainerEl.classList.remove('quiz-container-english');
        document.getElementById('quiz-title').textContent = 'Dutch to English';
    } else if (gameMode === 'english-to-dutch') {
        quizContainerEl.classList.add('quiz-container-english');
        quizContainerEl.classList.remove('quiz-container-dutch');
        document.getElementById('quiz-title').textContent = 'English to Dutch';
    }

    currentWordIndex = 0;
    correctScore = 0;
    wrongScore = 0;
    totalScore = 0;
    updateScores(); // Reset and display scores

    shuffledWordList = [...wordList];
    shuffleArray(shuffledWordList);

    loadNextWord(); // Load the first word
    startTimer(); // Start the timer
}

// Show Results
// This function displays the results after the quiz is completed
function showResults() {
    const accuracy = (correctScore / questionCount) * 100;
    let performance = '';

    if (accuracy >= 90) {
        performance = 'Excellent';
    } else if (accuracy >= 70) {
        performance = 'Good';
    } else if (accuracy >= 50) {
        performance = 'Average';
    } else {
        performance = 'Poor';
    }

    quizContainerEl.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Performance: <strong>${performance}</strong></p>
        <p>Accuracy: ${accuracy.toFixed(2)}%</p>
        <p>Time Taken: ${timerEl.textContent}</p>
        <button class="home-page" onclick="prepareGame()">Home Page</button>
    `;
}

// Text-to-Speech
// This function uses the SpeechSynthesis API to read the word aloud
function speakWord(word, langCode) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = langCode;
        synth.speak(utterance);
    } else {
        console.warn('SpeechSynthesis is not supported in this browser.');
    }
}

// Prepare Game
// This function resets the game and shows the start screen
window.prepareGame = function prepareGame() {
    quizContainerEl.style.display = 'none'; // Hide the quiz screen
    startScreenEl.style.display = 'block'; // Show the start screen
    stopTimer(); // Stop/reset the timer
    timerEl.textContent = '00:00';
};

// Event Listeners for Mode Selection
dutchToEnglishButton.addEventListener('click', () => {
    gameMode = 'dutch-to-english';
    startGame();
});

englishToDutchButton.addEventListener('click', () => {
    gameMode = 'english-to-dutch';
    startGame();
});