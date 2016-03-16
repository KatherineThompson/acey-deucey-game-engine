"use strict";
const isValidMove = require("./is-valid-move");

function makeMove(oldGameState, proposedMove) {
   
    if (!isValidMove(oldGameState, proposedMove)) {
        const err = new Error("The proposed move is not valid.");
        err.proposedMove = proposedMove;
        err.gameState = oldGameState;
        throw err;
    }
     
    // look at _.cloneDeep
    const newGameState = copyGameState(oldGameState);
    const oldPosition = proposedMove.currentPosition;
    const isPlayerOne = newGameState.isPlayerOne;
    const newPosition = oldPosition + proposedMove.numberOfSpaces * (newGameState.isPlayerOne ? 1 : -1);
    const newSpace = newGameState.board[newPosition];
    const isMovingOnBoard = (oldPosition < 0 && isPlayerOne) || (oldPosition > 23 &! isPlayerOne);
    const isMovingOffBoard = (newPosition > 23 && isPlayerOne) || (newPosition < 0 &! isPlayerOne);
    // pull out whole active player
    const playerName = isPlayerOne ? "playerOne" : "playerTwo";
    
    if (isMovingOnBoard) {
        proposedMove.isBar ? (newGameState[playerName].barPieces--) : (newGameState[playerName].initialPieces--);
    } else {
        const oldSpace = newGameState.board[oldPosition];
        oldSpace.numPieces--;
        if (oldSpace.numPieces === 0) {
            oldSpace.isPlayerOne = null;
        }
    }
    
    if (isMovingOffBoard) {
        newGameState[playerName].winningPieces++;
    } else if (newSpace.isPlayerOne !== isPlayerOne) {
        if (newSpace.isPlayerOne === !isPlayerOne) {
            const opposingPlayerName = isPlayerOne ? "playerTwo" : "playerOne";
            newGameState[opposingPlayerName].barPieces++;   
        }
        
        newSpace.isPlayerOne = isPlayerOne;
        newSpace.numPieces = 1;
    } else {
        newSpace.numPieces++;
    }
    
    newGameState.isPlayerOne = !oldGameState.isPlayerOne;
    
    return newGameState;
}

function copyGameState(oldGameState) {
    return {
        board: copyBoard(oldGameState.board),
        isPlayerOne: oldGameState.isPlayerOne,
        playerOne: {
            initialPieces: oldGameState.playerOne.initialPieces,
            barPieces: oldGameState.playerOne.barPieces,
            winningPieces: oldGameState.playerOne.winningPieces
        },
        playerTwo: {
            initialPieces: oldGameState.playerTwo.initialPieces,
            barPieces: oldGameState.playerTwo.barPieces,
            winningPieces: oldGameState.playerTwo.winningPieces
        }
    };
}

function copyBoard(originalBoard) {
    const newBoard = [];
    originalBoard.forEach(function(space) {
        newBoard.push({
            isPlayerOne: space.isPlayerOne,
            numPieces: space.numPieces
        });
    })
    return newBoard;
}

module.exports = makeMove;