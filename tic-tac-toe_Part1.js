/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
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
// Will not be tested in Part 1
function printBoard() {
    place = []
    // to generate a placeholder array
    for (let i = 1 ; i <= 9 ; i++) {
    if (board[i] === " ") {
        place[i] = i;
    } else {
        place[i] = board[i]
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
// position is an input String

function validateMove(position) {

    // to ensure position is a string input, even if prompt-sync gives an undefined, or 
    // null input to the variable of 'position'.
    position = String(position);

    // if the position is a numerical input
    if (!isNaN(position) && position.trim() !== '') {
       numPos = Number(position); 
        // if the position is within the bounds of 1-9
        if (numPos < 1 || numPos > 9) {
            return false
        } else {
            // here we need to check if position is already occupied
            if (board[numPos] === "X" || board[numPos] === "O") {
                return false
            } else {
                return true
            }
        }
    } else {
        // this else is if they returned a non-numerical position or a blank string.
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



// Main Program, a Tester for your functions
// It does not cover the printBoard() function.

// If you pass all the tests, you should see a message 'All tests passed! Congratulations!'
// without any error

// Do Not modify the lines below!

// Test validateMove()
assert.strictEqual(validateMove(0), false, "validateMove() didn't work as expected with input : 0");
assert.strictEqual(validateMove(10), false, "validateMove() didn't work as expected with input : 10");
assert.strictEqual(validateMove('Hello'), false, "validateMove() didn't work as expected with input : 'Hello'");
assert.strictEqual(validateMove('1'), true, "validateMove() didn't work as expected with input : 1");
assert.strictEqual(validateMove('5'), true, "validateMove() didn't work as expected with input : 5");
assert.strictEqual(validateMove('9'), true, "validateMove() didn't work as expected with input : 9");

let tsetBoard = {
    1: 'X', 2: 'O', 3: 'X',
    4: 'O', 5: 'X', 6: 'O',
    7: ' ', 8: ' ', 9: ' '
};

// Test markBoard()
markBoard(1, 'X');
markBoard(2, 'O');
markBoard(3, 'X');
markBoard(4, 'O');
markBoard(5, 'X');
markBoard(6, 'O');

assert.deepStrictEqual(board, tsetBoard, "markBoard() didn't work as expected");

assert.strictEqual(validateMove('1'), false, "validateMove() didn't work as expected with duplicated input : 1");

// Test checkWin()
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");
tsetBoard[7] = 'X'
markBoard(7, 'X');
assert.deepStrictEqual(board, tsetBoard, "markBoard() didn't work as expected with input (7, 'X')");
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");


board = {
    1: 'X', 2: ' ', 3: ' ',
    4: 'O', 5: 'X', 6: ' ',
    7: 'O', 8: ' ', 9: 'X'
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'O', 2: ' ', 3: ' ',
    4: 'X', 5: 'O', 6: ' ',
    7: 'X', 8: 'X', 9: 'O'
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");

board = {
    1: 'X', 2: 'O', 3: 'O',
    4: 'X', 5: ' ', 6: ' ',
    7: 'X', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'X', 2: 'O', 3: 'X',
    4: 'X', 5: 'O', 6: ' ',
    7: ' ', 8: 'O', 9: ' '
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");

board = {
    1: 'X', 2: 'X', 3: 'X',
    4: 'O', 5: 'O', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'X', 2: 'X', 3: ' ',
    4: 'O', 5: 'O', 6: 'O',
    7: 'X', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");


// Test checkFull()
assert.strictEqual(checkFull(), false, "checkFull() didn't work as expected");
board = {
    1: 'O', 2: 'X', 3: 'O',
    4: 'O', 5: 'X', 6: 'X',
    7: 'X', 8: 'O', 9: 'X'
}
assert.strictEqual(checkFull(), true, "checkFull() didn't work as expected");

console.log("All tests passed! Congratulations!");