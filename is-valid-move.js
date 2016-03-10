"use strict";

const _ = require("lodash");

function isValidMove(gameState, proposedMove) {
    
    const proposedSpace = proposedMove.currentPosition + proposedMove.numberOfSpaces * (gameState.isPlayerOne ? 1 : -1);
    const isPlayerOne = gameState.isPlayerOne;
    const boardSpace = gameState.board[proposedSpace];
    
    function canMoveOffBoard() {
        if (isPlayerOne) {
            return _(17).range().every(num => gameState.board[num].isPlayerOne !== isPlayerOne).value();
        } else {
            return _(24).range().drop(6).every(num => gameState.board[num].isPlayerOne !== isPlayerOne).value();
        }

    }
    
    if (isPlayerOne && gameState.playerOne.barPieces && !proposedMove.isBar) {
        return false;
    } else if (!isPlayerOne && gameState.playerTwo.barPieces && !proposedMove.isBar) {
        return false;
    }
    
    if (isPlayerOne && proposedSpace > 23) {
        if (canMoveOffBoard) {
            return true;
        } else {
            return false;
        }
    } else if (!isPlayerOne && proposedSpace < 0) {
        if (canMoveOffBoard) {
            return true;
        } else {
            return false;
        }
    }
    
    if (isPlayerOne === boardSpace.isPlayerOne || boardSpace.isPlayerOne === null || (boardSpace.isPlayerOne === !isPlayerOne && boardSpace.numPieces === 1)) {
        return true;
    }
    
    return false;
}

module.exports = isValidMove;
// {currentPosition: -1, numberOfSpaces: 7, isBar: true}
// {isPlayerOne: null, numPieces: 0}