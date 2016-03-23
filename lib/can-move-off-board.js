"use strict";
const _ = require("lodash");

function canMoveOffBoard(gameState) {
    const activePlayer = gameState.isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    if (activePlayer.initialPieces === 0 && activePlayer.barPieces === 0) {
        const dropFnName = gameState.isPlayerOne ? "dropRight" : "drop";
        return _(gameState.board)[dropFnName](6).every(space => space.isPlayerOne !== gameState.isPlayerOne);
    }
    return false;
}

module.exports = canMoveOffBoard;