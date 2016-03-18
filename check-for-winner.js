"use strict";
const _ = require("lodash");
const numberOfPieces = require("./constants").NUMBER_OF_GAME_PIECES;

function isGameOver(gameState) {
    const activePlayer = gameState.isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    if (
        activePlayer.winningPieces === numberOfPieces &&
        activePlayer.barPieces === 0 &&
        activePlayer.initialPieces === 0
    ) {
        return _(gameState.board).every(space => space.isPlayerOne !== gameState.isPlayerOne);
    }
    
    return false;
}

module.exports = isGameOver;