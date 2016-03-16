"use strict";
const isValidMove = require("./is-valid-move");

function isValidTurn(gameState, diceRoll, proposedMoves) {
    function doDiceMatchMoves() {
        const sortedDice = diceRoll.sort();
        const numSpaces = [];
        proposedMoves.forEach(function(move) {
           numSpaces.push(move.numSpaces); 
        });
        numSpaces.sort();
        
        return sortedDice.every((num, index) => num === numSpaces[index]);
    }

    if (doDiceMatchMoves()){
        let newGameState = gameState;
        return proposedMoves.every(move => {
            isValidMove(newGameState, move);
            newGameState = makeMove(newGameState, move);
        });
    }
    return false;
}

module.exports = isValidTurn;