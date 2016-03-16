"use strict";

const _ = require("lodash");
// check initialPieces and winningPieces
function isValidMove(gameState, proposedMove) {
    const proposedSpace = proposedMove.currentPosition + proposedMove.numberOfSpaces * (gameState.isPlayerOne ? 1 : -1);
    const isPlayerOne = gameState.isPlayerOne;
    const proposedBoardSpace = gameState.board[proposedSpace];
    const currentBoardSpace = gameState.board[proposedMove.currentPosition];
    const activePlayer = isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    
    function canMoveOffBoard() {
        if (activePlayer.initialPieces === 0 && activePlayer.barPieces === 0) {
            const dropFnName = isPlayerOne ? "dropRight" : "drop";
            return _(gameState.board)[dropFnName](6).every(space => space.isPlayerOne !== isPlayerOne);
        }
        return false;
    }
    
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
        return canMoveOffBoard();
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