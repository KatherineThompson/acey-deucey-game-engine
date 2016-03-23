"use strict";
const isValidMove = require("./is-valid-move");
const constants = require("./constants");
const _ = require("lodash");

function makeMove(oldGameState, proposedMove) {
   
    if (!isValidMove(oldGameState, proposedMove)) {
        const err = new Error("The proposed move is not valid.");
        err.proposedMove = proposedMove;
        err.gameState = oldGameState;
        throw err;
    }

    const firstBoardSpace = constants.FIRST_BOARD_SPACE;
    const lastBoardSpace = constants.LAST_BOARD_SPACE;     
    const newGameState = _.cloneDeep(oldGameState);
    const oldPosition = proposedMove.currentPosition;
    const isPlayerOne = newGameState.isPlayerOne;
    const newPosition = oldPosition + proposedMove.numberOfSpaces * (newGameState.isPlayerOne ? 1 : -1);
    const newSpace = newGameState.board[newPosition];
    const isMovingOnBoard = (oldPosition < firstBoardSpace && isPlayerOne) ||
        (oldPosition > lastBoardSpace && !isPlayerOne);
    const isMovingOffBoard = (newPosition > lastBoardSpace && isPlayerOne) ||
        (newPosition < firstBoardSpace && !isPlayerOne);
    const activePlayer = isPlayerOne ? newGameState.playerOne : newGameState.playerTwo;
    
    if (isMovingOnBoard) {
        proposedMove.isBar ? activePlayer.barPieces-- : activePlayer.initialPieces--;
    } else {
        const oldSpace = newGameState.board[oldPosition];
        oldSpace.numPieces--;
        if (oldSpace.numPieces === 0) {
            oldSpace.isPlayerOne = null;
        }
    }
    
    if (isMovingOffBoard) {
        activePlayer.winningPieces++;
    } else if (newSpace.isPlayerOne !== isPlayerOne) { 
        if (newSpace.isPlayerOne === !isPlayerOne) { // jshint ignore:line
            const opposingPlayerName = isPlayerOne ? "playerTwo" : "playerOne";
            newGameState[opposingPlayerName].barPieces++;   
        }
        
        newSpace.isPlayerOne = isPlayerOne;
        newSpace.numPieces = 1;
    } else {
        newSpace.numPieces++;
    }
    
    return newGameState;
}

module.exports = makeMove;