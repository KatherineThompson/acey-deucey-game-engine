"use strict";
const isValidMove = require("./is-valid-move");
const makeMove = require("./make-move");
const _ = require("lodash");

function isValidTurn(gameState, diceRoll, proposedMoves) {
    function proposedMovesMatchDice() {
        
        if (diceRoll.length !== 2) {
            return false;
        }
        
        if (diceRoll[0] === diceRoll[1]) {
            if (proposedMoves.length !== 4){
                return false;
            } 
            return _(proposedMoves).map("numberOfSpaces").every(numberOfSpaces => numberOfSpaces === diceRoll[0]);
        }
        
        const sortedDice = _.sortBy(diceRoll);
        return _(proposedMoves)
            .map("numberOfSpaces")
            .sort()
            .every((numberOfSpaces, index) => numberOfSpaces === sortedDice[index]);
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