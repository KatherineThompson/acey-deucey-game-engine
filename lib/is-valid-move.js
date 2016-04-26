"use strict";

const canMoveOffBoard = require("./can-move-off-board");
const canMoveToSpace = require("./can-move-to-space");
const constants = require("./constants");

function isValidMove(gameState, proposedMove) {
    const proposedSpaceIndex = proposedMove.currentPosition +
        proposedMove.numberOfSpaces *
        (gameState.isPlayerOne ? 1 : -1);
    const isPlayerOne = gameState.isPlayerOne;
    const currentBoardSpace = gameState.board[proposedMove.currentPosition];
    const activePlayer = isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    
    const firstBoardSpace = constants.FIRST_BOARD_SPACE;
    const lastBoardSpace = constants.LAST_BOARD_SPACE;
    const currentPieceDoesNotExist = proposedMove.currentPosition >= firstBoardSpace &&
        proposedMove.currentPosition <= lastBoardSpace &&
        currentBoardSpace.isPlayerOne !== isPlayerOne;
        
    if (currentPieceDoesNotExist) {
        return false;
    }
    
    if (activePlayer.barPieces && !proposedMove.isBar) {
        return false;
    }
    
    if (!activePlayer.barPieces && proposedMove.isBar) {
        return false;
    }
    
    if ((isPlayerOne && proposedSpaceIndex > lastBoardSpace) ||
        (!isPlayerOne && proposedSpaceIndex < firstBoardSpace)
    ) {
        return canMoveOffBoard(gameState);
    }
    
    const isMovingOnBoard = (proposedMove.currentPosition < firstBoardSpace && isPlayerOne) ||
        (proposedMove.currentPosition > lastBoardSpace && !isPlayerOne);
        
    if (isMovingOnBoard && !activePlayer.initialPieces && !activePlayer.barPieces) {
        return false;
    }
    
    if (canMoveToSpace(gameState, proposedSpaceIndex).isAvailable) {
        return true;
    }
       
    return false;
}

module.exports = isValidMove;