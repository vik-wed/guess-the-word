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
let word = "magnolia";
// all guessed letters
let guessedLetters = [];
// starting num of remaining guesses
let remainingGuesses = 8;

// function to load more words
async function getWord(){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);

}

getWord();

// function to add placeholders for each letter
function placeholder(word){
    let placeholderWord = [];
    for (let letter of word){
        placeholderWord.push("●");
    }
    wordInProgress.innerText = placeholderWord.join("");
}



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
        showGuessedLetters();
        updateGuessesRemaining(guess);
        updatedWordInProgress(guessedLetters);

    }
}

// function to update ul with guesses
function showGuessedLetters (){
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){
        let li = document.createElement("li"); 
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// function to update word in progress
function updatedWordInProgress(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};


//function to count remaining guesses
function updateGuessesRemaining(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `The word doesn't contain ${guess}.`
        remainingGuesses--;

    } else {
        message.innerText = "You guessed a right letter!";
    }

    if (remainingGuesses === 0){
        message.innerText = `Game over! The word to guess was ${word}`;
        startOver();

    } else if (remainingGuesses === 1){
        guessRemainingSpan.innerText = `${remainingGuesses} guess`;

    } else {
        guessRemainingSpan.innerText = `${remainingGuesses} guesses`;
    }

}


// function to check if word was guessed and player won
function checkIfWin(){
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML= `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    };
};


// function to replay
function startOver(){
    guessButton.classList.add("hide");
    guessRemaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

// click event listener for play again button
playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    guessRemainingSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessRemaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    
    
})