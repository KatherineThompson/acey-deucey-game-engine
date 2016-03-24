"use strict";

function canMoveToSpace(gameState, spaceIndex) {
    const isPlayerOne = gameState.isPlayerOne;
    const boardSpace = gameState.board[spaceIndex];
    
    if (boardSpace.isPlayerOne === isPlayerOne) {
        return {isActivePlayer: true, isAvailable: true};

    } else if (boardSpace.isPlayerOne === null) {
        return {isActivePlayer: null, isAvailable: true};

    } else if (boardSpace.isPlayerOne === !isPlayerOne) { // jshint ignore:line
        return {isActivePlayer: false, isAvailable: boardSpace.numPieces === 1};
    }
}

module.exports = canMoveToSpace;