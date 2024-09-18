/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    
    // to update the gameboard, we will modify board(position) = mark
    board[position] = mark.toUpperCase();
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard(position) {
    place = []
    // to generate a placeholder array
    for (let i = 1 ; i <= 9 ; i++) {
    if (board[i] === " ") {
        place[i] = ("\x1b[30m" + i + "\x1b[0m");
    } else {
        // Player X is red (31), and Player O is blue (34)
        place[i] = board[i] === "X" ? "\x1b[31m" + board[i] + "\x1b[0m" : "\x1b[34m" + board[i] + "\x1b[0m"
    }}

    // colouring the current position placed by the user
    place[position] = board[position] === "X" ? "\x1b[31m\x1b[1m\x1b[4m" + board[position] + "\x1b[0m" : "\x1b[34m\x1b[1m\x1b[4m" + board[position] + "\x1b[0m"

    // printing it based on the placeholder
    console.log("\n" + place[1] + " | " + place[2] + " | " + place[3]);
    console.log("---------")
    console.log(place[4] + " | " + place[5] + " | " + place[6]);
    console.log("---------")
    console.log(place[7] + " | " + place[8] + " | " + place[9]);
    console.log("---------")

}

// I will generate special printing functions for winning and tie-ing.
function printWinBoard(winPos) {
    place = []
    // to generate a placeholder array
    for (let i = 1 ; i <= 9 ; i++) {
    if (board[i] === " ") {
        place[i] = ("\x1b[30m" + i + "\x1b[0m");
    } else {
        place[i] = ("\x1b[30m" + board[i] + "\x1b[0m");
    }}

    // colouring the winning position by the user
    for (let i = 1 ; i <= winPos.length ; i++){
    place[winPos[i-1]] = ("\x1b[1m\x1b[32m\x1b[4m" + board[winPos[i-1]] + "\x1b[0m");
    }

    // printing it based on the placeholder
    console.log("\n" + place[1] + " | " + place[2] + " | " + place[3]);
    console.log("---------")
    console.log(place[4] + " | " + place[5] + " | " + place[6]);
    console.log("---------")
    console.log(place[7] + " | " + place[8] + " | " + place[9]);
    console.log("---------")

}

// to print out a tied board, it will all be grey colour
function printTieBoard() {
    place = []
    // to generate a placeholder array
    for (let i = 1 ; i <= 9 ; i++) {
    if (board[i] === " ") {
        place[i] = ("\x1b[30m" + i + "\x1b[0m");
    } else {
        place[i] = ("\x1b[30m" + board[i] + "\x1b[0m");
    }}

    // printing it based on the placeholder
    console.log("\n" + place[1] + " | " + place[2] + " | " + place[3]);
    console.log("---------")
    console.log(place[4] + " | " + place[5] + " | " + place[6]);
    console.log("---------")
    console.log(place[7] + " | " + place[8] + " | " + place[9]);
    console.log("---------")
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {

    // to ensure position is a string input, even if prompt-sync gives an undefined, or 
    // null input to the variable of 'position'.
    position = String(position);

    // if the position is a numerical input
    if (!isNaN(position) && position.trim() !== '') {
       numPos = Math.floor(Number(position)); 
        // if the position is within the bounds of 1-9
        if (numPos < 1 || numPos > 9) {
            console.log("\n\x1b[31mThis position is not within the allowable range. Please try again.\x1b[0m");
            return false
        } else {
            // here we need to check if position is already occupied
            if (board[numPos] === "X" || board[numPos] === "O") {
                console.log("\n\x1b[31mThis posiiton is currently occupied. Please choose another position.\x1b[0m");
                return false
            } else {
                return true
            }
        }
    } else {
        // this else is if they returned a non-numerical position or a blank string.
        console.log("\n\x1b[31mThis is not a recognized input for a position. Please try again.\x1b[0m");
        return false
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {

    let winner = 0;
    // the player will just be called X or O for simplicity
    for (let i = 0; i < winCombinations.length; i++) {
        let currentCheck = winCombinations[i];
        let boardPos = [board[currentCheck[0]], board[currentCheck[1]], board[currentCheck[2]]];
        if (boardPos[0] === player && boardPos[1] === player && boardPos[2] === player) {
            winner = 1;
        } else {
        }
    }  
    return winner === 1 ? true : false
    
}

// If there is a winner, there is a function to be called upon called winPos (for artistic purpose)
function winPos(player) {

    let winner = 0;
    // the player will just be called X or O for simplicity
    for (let i = 0; i < winCombinations.length; i++) {
        let currentCheck = winCombinations[i];
        let boardPos = [board[currentCheck[0]], board[currentCheck[1]], board[currentCheck[2]]];
        if (boardPos[0] === player && boardPos[1] === player && boardPos[2] === player) {
            winner = 1;
            return winCombinations[i] // returns the array of the 3 winning positions [1, 2, 3]
        } else {
        }
    }  
    
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {

    // if the whole board is occupied, then the object board shouldn't have any empty strings
    // here, Object.values converts the board's VALUES into an array which I can use include() to check.
    boardValues = Object.values(board);
    if (boardValues.includes(" ") === true) {
        return false
    } else {
        return true
    }

}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {

    playerAnnounce = player === "X" ? "\x1b[31mPlayer \x1b[1m\x1b[4mX\x1b[0m" : "\x1b[34mPlayer \x1b[1m\x1b[4mO\x1b[0m"
    console.log("\n============================================")
    console.log("Please input a position for " + playerAnnounce + "\'s turn.");
    console.log("============================================")
    let position = prompt('');
    realPos = validateMove(position);

    while (realPos === false) {
        console.log("============================================")
        console.log("Please input a position for " + playerAnnounce + "\'s turn.");
        console.log("============================================")
        position = prompt('');
        realPos = validateMove(position);
    }

    // If this part of the code is activated, position is allowed. Proceeding to mark the board with this position
    markBoard(Math.floor(position), player);
    nextTurn = player === "X" ? "O" : "X";
    // console.log("Next turn is " + nextTurn)

    // To check whether someone has won or not
    if (checkWin(player) === true) {

        // console.log("Game has a winner!");
        winnerIdentified = true;
        // Printing out a winning board!
        let winningPosition = winPos(player);
        printWinBoard(winningPosition);
        return "winner";

    } else if (checkFull() === true) {

        // console.log("Game has ended in a tie");
        winnerIdentified = true;
        // Printing out a tied board!
        printTieBoard();
        return "tie";

    } else {

        // console.log("Game will continue!");
        // console.log(winnerIdentified);
        // Printing out the board as usual
        printBoard(Math.floor(position));
        return nextTurn

    }
}

// entry point of the entire program, where I will wrap the reset system within
console.log("\x1b[30mProperty of Wai Zhung Ng 2024\x1b[0m")
console.log("Welcome to the Tic-Tac-Toe Game!")

function game() {
    
    // reseting the board every time
    board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };

console.log('\n\n' +
    '\x1b[30m1 | 2 | 3 \n' +
    '--------- \n' +
    '4 | 5 | 6 \n' +
    '--------- \n' +
    '7 | 8 | 9 \x1b[0m');

let winnerIdentified = false
let currentTurnPlayer = 'X'
let nextAction;

while (!winnerIdentified) {
    // this line of code will always sequentially play if there is no winner.
    nextAction = playTurn(currentTurnPlayer);

    // check if there is a winner or tie to exit the loop
    if (nextAction === "winner" || nextAction === "tie") {
        winnerIdentified = true;
    } else {
        currentTurnPlayer = nextAction;
    }
}

// this part of the code will play if there is a 'winner', whether game has been won or tied.
if (nextAction === "winner") {
    playerWin = currentTurnPlayer === "X" ? "\x1b[31mPlayer \x1b[1m\x1b[4mX\x1b[0m" : "\x1b[34mPlayer \x1b[1m\x1b[4mO\x1b[0m"
    console.log("\n\x1b[32m==============================================\x1b[0m")
    console.log("\x1b[32m\x1b[1mCongratulations to " + playerWin + "\x1b[32m\x1b[1m, we have a winner!\x1b[0m");
    console.log("\x1b[32m==============================================\x1b[0m")
} else if (nextAction === "tie") {
    console.log("\n\x1b[1m================================================\x1b[0m")
    console.log("The game has ended in a tie. Neither player win.");
    console.log("\x1b[1m================================================\x1b[0m")
}

console.log("\nWould you like to retry? \x1b[32m\x1b[1m\"Y\"\x1b[0m or \x1b[33m\x1b[1m\"N\"\x1b[0m")
return prompt('');
}

let retry = game()
let retryNormal = retry.toLowerCase();

// retry system, powered by a while loop
while (retryNormal !== "n") {

    // if they want to retry, restart the game again
    if (retryNormal == "y") {
      console.log("\x1b[32mReseting the board for you...\x1b[0m")
      console.log("\x1b[32mGame has been reset!\x1b[0m")    
      retry = game()
      retryNormal = retry.toLowerCase();
    } else {
    
      // if they are inputting gibberish into the retry question.
      console.log("That input is not recognized. Please try again")
      console.log("Would you like to retry? \x1b[32m\x1b[1m\"Y\"\x1b[0m or \x1b[33m\x1b[1m\"N\"\x1b[0m")
      retry = prompt('');
      retryNormal = retry.toLowerCase();
    }
    }
    
    // a farewell message to say thank you for playing.
    console.log("\nThank you for playing! See you soon!")
    console.log("\x1b[30mProperty of Wai Zhung Ng 2024.\x1b[0m\n");


