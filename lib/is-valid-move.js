"use strict";

const canMoveOffBoard = require("./can-move-off-board");

function isValidMove(gameState, proposedMove) {
    const proposedSpace = proposedMove.currentPosition + proposedMove.numberOfSpaces * (gameState.isPlayerOne ? 1 : -1);
    const isPlayerOne = gameState.isPlayerOne;
    const proposedBoardSpace = gameState.board[proposedSpace];
    const currentBoardSpace = gameState.board[proposedMove.currentPosition];
    const activePlayer = isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    
    const currentPieceDoesNotExist = proposedMove.currentPosition >= 0 &&
        proposedMove.currentPosition <= 23 &&
        currentBoardSpace.isPlayerOne !== isPlayerOne;
        
    if (currentPieceDoesNotExist) {
        return false;
    }
    
    if (activePlayer.barPieces && proposedMove.isBar === false) {
        return false;
    }
    
    if ((isPlayerOne && proposedSpace > 23) || (!isPlayerOne && proposedSpace < 0)) {
        return canMoveOffBoard(gameState);
    }
    
    const isMovingOnBoard = (proposedMove.currentPosition < 0 && isPlayerOne) ||
        (proposedMove.currentPosition > 23 && !isPlayerOne);
        
    if (isMovingOnBoard && !activePlayer.initialPieces && !activePlayer.barPieces) {
        return false;
    }
    
    if (
        isPlayerOne === proposedBoardSpace.isPlayerOne ||
        proposedBoardSpace.isPlayerOne === null ||
        (proposedBoardSpace.isPlayerOne !== isPlayerOne && proposedBoardSpace.numPieces === 1)
    ) {
        return true;
    }
       
    return false;
}

module.exports = isValidMove;