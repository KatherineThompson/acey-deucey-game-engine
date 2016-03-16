"use strict";
const isValidMove = require("./is-valid-move");
const makeMove = require("./make-move");

function isValidTurn(gameState, diceRoll, proposedMoves) {
    function proposedMovesMatchDice() {
        const sortedDice = diceRoll.sort();
        const numSpaces = [];
        proposedMoves.forEach(function(move) {
           numSpaces.push(move.numberOfSpaces); 
        });
        numSpaces.sort();
        
        return sortedDice.every((num, index) => num === numSpaces[index]);
    }
    
    function proposedMovesAreValid(gameState, proposedMoves) {
        if (!proposedMoves.length) {
            return true;
        }
        
        const firstMove = proposedMoves[0];
        
        if (!isValidMove(gameState, firstMove)) {
            return false;
        }
        
        const newProposedMoves = proposedMoves.slice(1);
        const newGameState = makeMove(gameState, firstMove);
        newGameState.isPlayerOne = !newGameState.isPlayerOne;
        
        return proposedMovesAreValid(newGameState, newProposedMoves);
        
    }
    
    return proposedMovesMatchDice() && proposedMovesAreValid(gameState, proposedMoves);
}

module.exports = isValidTurn;