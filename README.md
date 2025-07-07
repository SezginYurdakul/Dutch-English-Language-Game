# Dutch Word Game

A simple quiz game to practice Dutch-to-English and English-to-Dutch translations. The game dynamically displays words and provides multiple-choice options for the user to select the correct translation.

## Features

* Username support and per-user history tracking.
* Two game modes:
    * **Dutch to English**
    * **English to Dutch**
* Selectable number of questions (10, 20, 30, 50).
* Selectable difficulty (Easy, Medium, Hard, All).
* Timer to track how long the quiz takes.
* Dynamic feedback for correct and incorrect answers.
* Text-to-speech functionality to read words and selected options aloud.
* Randomized word order and distractor options.
* Score tracking for correct, incorrect, and total attempts.
* Quiz progress bar and question counter.
* Viewable quiz history for each user.

## Technologies Used

* **HTML**: For structuring the game interface.
* **CSS**: For styling the game elements.
* **JavaScript (ES6 Modules)**: For game logic and interactivity.
* **SpeechSynthesis API**: For text-to-speech functionality.
* **LocalStorage**: For saving user history and username.

## How to Run the Project

1. Clone the repository or download the project files.
2. Ensure you have a local HTTP server to run the project (e.g., Python, Live Server in VS Code).
3. Start the server:
    * Using VS Code Live Server:
        * Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
        * Right-click on `index.html` and select **Open with Live Server**.
        ```
4. Open the project in your browser at `http://localhost:8000` (or the URL provided by your server).

## File Structure

```
words/
├── index.html         # Main HTML file
├── styles.css         # CSS file for styling
├── js/
│   ├── main.js        # Main entry point, event listeners
│   ├── game.js        # Game logic and state transitions
│   ├── ui.js          # UI rendering and updates
│   ├── state.js       # Game state management
│   ├── utils.js       # Utility functions (shuffle, speech, etc.)
│   └── wordList.js    # Word list for the quiz
└── README.md          # Project documentation
```

## How to Play

1. Open the game in your browser.

2. Enter your username (used for saving your quiz history).


3. Select the number of questions and difficulty level.
4. Select a game mode:
    * **Dutch to English**: Translate Dutch words to English.
    * **English to Dutch**: Translate English words to Dutch.
5. The quiz will start, and a word will be displayed.
6. Choose the correct translation from the multiple-choice options.
7. The game will provide feedback and move to the next word.
8. At the end of the quiz, your total score, accuracy, and time will be displayed.
9. You can view your quiz history by clicking the **Show History** button on the home screen.

## Customization

* **Adding Words**: You can add more words to the `js/wordList.js` file in the following format:
    ```javascript
    { dutch: 'nieuw_woord', english: 'new_word', difficulty: 'easy' }
    ```
    * Valid difficulty values: `"easy"`, `"medium"`, `"hard"`.
* **Styling**: Modify the `styles.css` file to customize the appearance of the game.

## Known Issues

* The SpeechSynthesis API may not work in all browsers. Ensure you are using a modern browser like Chrome or Firefox.
* The game requires a local HTTP server to function properly due to the use of ES6 modules.
* LocalStorage is used for username and history; clearing browser data will remove your progress.

## License

This project is open-source and available under the MIT License.