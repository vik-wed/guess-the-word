// ul for guessed letters 
const guessedLettersElement = document.querySelector(".guessed-letters");
// button to enter guess
const guessButton = document.querySelector(".guess");
// guessed letter input
const guessInput = document.querySelector(".letter");
// word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// remaining guesses p
const guessRemaining = document.querySelector(".remaining");
// span within remaining guesses p
const guessRemainingSpan = document.querySelector(".remaining span");
// message p
const message = document.querySelector(".message");
// play again button
const playAgainButton = document.querySelector(".play-again");

// starting word
const word = "magnolia";
const guessedLetters = [];

// function to add placeholders for each letter
function placeholder(word){
    let placeholderWord = [];
    for (let letter of word){
        placeholderWord.push("●");
    }
    wordInProgress.innerText = placeholderWord.join("");
}

placeholder(word);

// button with click event listener
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = guessInput.value;
     
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    };
    guessInput.value = "";
})

// function to validate user's input
function validateInput(input){
    let acceptedLetter = /[a-zA-Z]/; 
    if (input.length === 0){
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1){
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A-Z"
    } else {
        return input;
    }
};

// function to capture guesses made
function makeGuess(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "That letter has been guessed already - try again!"
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}

