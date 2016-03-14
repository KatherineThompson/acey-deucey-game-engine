"use strict";

const _ = require("lodash");

function isValidMove(gameState, proposedMove) {
    const proposedSpace = proposedMove.currentPosition + proposedMove.numberOfSpaces * (gameState.isPlayerOne ? 1 : -1);
    const isPlayerOne = gameState.isPlayerOne;
    const proposedBoardSpace = gameState.board[proposedSpace];
    const currentBoardSpace = gameState.board[proposedMove.currentPosition];
     
    const activePlayer = isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    
    function canMoveOffBoard() {
        if (isPlayerOne && gameState.playerOne.initialPieces === 0 && gameState.playerOne.barPieces === 0) {
            return _(17).range().every(num => gameState.board[num].isPlayerOne !== isPlayerOne);
        } else if (gameState.playerTwo.initialPieces === 0 && gameState.playerTwo.barPieces === 0){
            return _(24).range().drop(6).every(num => gameState.board[num].isPlayerOne !== isPlayerOne);
        }
        
        return false;
    }
    
    const currentPieceDoesNotExist = proposedMove.currentPosition >= 0 && proposedMove.currentPosition <= 23 && currentBoardSpace.isPlayerOne !== isPlayerOne;
    if (currentPieceDoesNotExist) {
        return false;
    }
    
    // checks to ensure that if there are pieces on the bar that the player is not trying to move a different piece
    if (activePlayer.barPieces && proposedMove.isBar === false) {
        return false;
    }
    
    // checks whether the player is trying to move pieces off the board and if that is allowed
    if ((isPlayerOne && proposedSpace > 23) || (!isPlayerOne && proposedSpace < 0)) {
        return canMoveOffBoard();
    }
    
    // checks whether the space is already occupied by the current player, is empty, or is occupied by only 1 piece of the opposing player
    if (isPlayerOne === proposedBoardSpace.isPlayerOne || proposedBoardSpace.isPlayerOne === null || (proposedBoardSpace.isPlayerOne !== isPlayerOne && proposedBoardSpace.numPieces === 1)) {
        return true;
    }
    
    return false;
}

module.exports = isValidMove;