"use strict";

const isValidMove = require("./is-valid-move");
const constants = require("./constants");


function findPossibleMoves(gameState, diceRoll, isBar, selectedPieceIndex) {
    const possibleMoves = [];
    
    function checkRoll(numberOfSpaces) {
        const proposedMove = {
            numberOfSpaces: numberOfSpaces,
            isBar: isBar
        };
        
        if (isBar) {
            proposedMove.currentPosition = gameState.isPlayerOne ?
                constants.PLAYER_ONE_START_SPACE : constants.PLAYER_TWO_START_SPACE;
        } else {
            proposedMove.currentPosition = selectedPieceIndex;
        }
            
        if (isValidMove(gameState, proposedMove)) {
            let possibleMoveIndex = null;
            if (gameState.isPlayerOne) {
                possibleMoveIndex = proposedMove.currentPosition + numberOfSpaces;
            } else {
                possibleMoveIndex = proposedMove.currentPosition - numberOfSpaces;
            }
            if (possibleMoveIndex < constants.PLAYER_ONE_START_SPACE) {
                possibleMoveIndex = constants.PLAYER_ONE_START_SPACE;
            }
            if (possibleMoveIndex > constants.PLAYER_TWO_START_SPACE) {
                possibleMoveIndex = constants.PLAYER_TWO_START_SPACE;
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