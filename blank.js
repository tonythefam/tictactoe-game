const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

function markBoard(position, mark) {
    
    // to update the gameboard, we will modify board(position) = mark
    board[position] = mark.toUpperCase();
}

let position = "1"
let mark = "O";
markBoard(position, mark);

position = "5"
mark = "X";
markBoard(position, mark);

position = "7"
mark = "X";
markBoard(position, mark);

position = "2"
mark = "O";
markBoard(position, mark);

position = "4"
mark = "O";
markBoard(position, mark);

position = "6"
mark = "X";
markBoard(position, mark);

position = "8"
mark = "X";
markBoard(position, mark);

position = "9"
mark = "O";
markBoard(position, mark);

// printing will be governed in a for loop

place = []
// to generate a placeholder array

for (let i = 1 ; i <= 9 ; i++) {
if (board[i] === " ") {
    place[i] = i;
} else {
    place[i] = board[i]
}}

console.log("\n" + place[1] + " | " + place[2] + " | " + place[3]);
console.log("---------")
console.log(place[4] + " | " + place[5] + " | " + place[6]);
console.log("---------")
console.log(place[7] + " | " + place[8] + " | " + place[9]);
console.log("---------")

// to test and update some board markings

console.log("Please input a position");
position = prompt("");

// if the position is a numerical input
function validatePosition(position) {
if (!isNaN(position) && position.trim() !== "") {
        
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

inputCorrect = validatePosition(position);
console.log(inputCorrect);

mark = "X"
markBoard(position, mark);

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

function checkWin(player) {

    let winner = 0;
    // the player will just be called X or O for simplicity
    for (let i = 0; i < winCombinations.length; i++) {
        let currentCheck = winCombinations[i];
        let boardPos = [board[currentCheck[0]], board[currentCheck[1]], board[currentCheck[2]]];
        console.log(boardPos);
        if (boardPos[0] === player && boardPos[1] === player && boardPos[2] === player) {
            winner = 1;
        } else {
        }
    }  
    return winner === 1 ? true : false
}

winner = checkWin('X');
console.log(winner);

function checkFull() {

    // if the whole board is occupied, then the object board shouldn't have any empty strings
    boardValues = Object.values(board);
    if (boardValues.includes(" ") === true) {
        console.log("The board is not full");
    } else {
        console.log("The board is full now");
    }

}

checkFull();

console.log(position);
console.log(position.trim());