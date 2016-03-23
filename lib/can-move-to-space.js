"use strict";

function canMoveToSpace(gameState, spaceIndex) {
    const spaceInfo = {};
    const isPlayerOne = gameState.isPlayerOne;
    const boardSpace = gameState.board[spaceIndex];
    
    if (boardSpace.isPlayerOne === isPlayerOne) {
        spaceInfo.isActivePlayer = true;
        spaceInfo.isAvailable = true;
    } else if (boardSpace.isPlayerOne === null) {
        spaceInfo.isActivePlayer = null;
        spaceInfo.isAvailable = true;
    } else if (boardSpace.isPlayerOne === !isPlayerOne) { // jshint ignore:line
        spaceInfo.isActivePlayer = false;
        if (boardSpace.numPieces === 1) {
            spaceInfo.isAvailable = true;
        } else {
            spaceInfo.isAvailable = false;
        }
    } else {
        spaceInfo.isAvailable = false;
    }    
    return spaceInfo;
}

module.exports = canMoveToSpace;