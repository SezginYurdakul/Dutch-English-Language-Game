# Dutch Word Game

A simple quiz game to practice Dutch-to-English and English-to-Dutch translations. The game dynamically displays words and provides multiple-choice options for the user to select the correct translation.

## Features

* Two game modes:
    * **Dutch to English**
    * **English to Dutch**
* Timer to track how long the quiz takes.
* Dynamic feedback for correct and incorrect answers.
* Text-to-speech functionality to read words and selected options aloud.
* Randomized word order and distractor options.
* Score tracking for correct, incorrect, and total attempts.

## Technologies Used

* **HTML**: For structuring the game interface.
* **CSS**: For styling the game elements.
* **JavaScript**: For game logic and interactivity.
* **SpeechSynthesis API**: For text-to-speech functionality.

## How to Run the Project

1.  Clone the repository or download the project files.
2.  Ensure you have a local HTTP server to run the project (e.g., Python, Live Server in VS Code).
3.  Start the server:
    * Using VS Code Live Server:
        * Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
        * Right-click on `index.html` and select **Open with Live Server**.
4.  Open the project in your browser at `http://localhost:8000` (or the URL provided by your server).

## File Structure
words
├── index.html         # Main HTML file
├── styles.css         # CSS file for styling
├── script.js          # JavaScript file for game logic
├── wordList.js        # Word list for the quiz
└── README.md          # Project documentation

## How to Play

1.  Open the game in your browser.
2.  Select a game mode:
    * **Dutch to English**: Translate Dutch words to English.
    * **English to Dutch**: Translate English words to Dutch.
3.  The quiz will start, and a word will be displayed.
4.  Choose the correct translation from the multiple-choice options.
5.  The game will provide feedback and move to the next word.
6.  At the end of the quiz, your total score and time will be displayed.

## Customization

* **Adding Words**: You can add more words to the `wordList.js` file in the following format:
    ```javascript
    { dutch: 'new_word_in_dutch', english: 'new_word_in_english' }
    ```
* **Styling**: Modify the `styles.css` file to customize the appearance of the game.

## Known Issues

* The SpeechSynthesis API may not work in all browsers. Ensure you are using a modern browser like Chrome or Firefox.
* The game requires a local HTTP server to function properly due to the use of ES6 modules.

## License

This project is open-source and available under the MIT License.