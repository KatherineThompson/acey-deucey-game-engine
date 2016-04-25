"use strict";

const isValidMove = require("./is-valid-move");


function findPossibleMoves(gameState, selectedPieceIndex, diceRoll, isBar) {
    const possibleMoves = [];
    
    function checkRoll(numberOfSpaces) {
        const proposedMove = {
            currentPosition: selectedPieceIndex,
            numberOfSpaces: numberOfSpaces,
            isBar: isBar
        };
        if (isValidMove(gameState, proposedMove)) {
            let possibleMoveIndex = null;
            if (gameState.isPlayerOne) {
                possibleMoveIndex = selectedPieceIndex + numberOfSpaces;
            } else {
                possibleMoveIndex = selectedPieceIndex - numberOfSpaces;
            }
            if (possibleMoveIndex < -1) {
                possibleMoveIndex = -1;
            }
            if (possibleMoveIndex > 24) {
                possibleMoveIndex = 24;
            }
            possibleMoves.push(possibleMoveIndex);
        }
    }

    if (diceRoll[0] === diceRoll[1]) {
        checkRoll(diceRoll[0]);
    } else {
        diceRoll.forEach(roll => checkRoll(roll));
    }
    
    return possibleMoves;

}

module.exports = findPossibleMoves;