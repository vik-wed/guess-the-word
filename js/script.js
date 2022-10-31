// ul for guessed letters 
const guessedLetters = document.querySelector(".guessed-letters");
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
    let guess = guessInput.value;
    console.log(guess);
    guessInput.value = "";
})