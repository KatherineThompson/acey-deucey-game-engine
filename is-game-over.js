"use strict";
const _ = require("lodash");

function isGameOver(gameState) {
    const activePlayer = gameState.isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    if (activePlayer.winningPieces === 15 && activePlayer.barPieces === 0 && activePlayer.initialPieces === 0) {
        return _(gameState.board).every(space => space.isPlayerOne !== gameState.isPlayerOne);
    }
    
    return false;
}

module.exports = isGameOver;