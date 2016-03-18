"use strict";
const isValidMove = require("./is-valid-move");

const _ = require("lodash");

function makeMove(oldGameState, proposedMove) {
   
    if (!isValidMove(oldGameState, proposedMove)) {
        const err = new Error("The proposed move is not valid.");
        err.proposedMove = proposedMove;
        err.gameState = oldGameState;
        throw err;
    }
     
    const newGameState = _.cloneDeep(oldGameState);
    const oldPosition = proposedMove.currentPosition;
    const isPlayerOne = newGameState.isPlayerOne;
    const newPosition = oldPosition + proposedMove.numberOfSpaces * (newGameState.isPlayerOne ? 1 : -1);
    const newSpace = newGameState.board[newPosition];
    const isMovingOnBoard = (oldPosition < 0 && isPlayerOne) || (oldPosition > 23 && !isPlayerOne);
    const isMovingOffBoard = (newPosition > 23 && isPlayerOne) || (newPosition < 0 && !isPlayerOne);
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
    
    // tech debt: need to create a new function to make turn since there are multiple moves in a turn and it doesn't 
    // make sense to change players after each move
    newGameState.isPlayerOne = !oldGameState.isPlayerOne;
    
    return newGameState;
}

module.exports = makeMove;