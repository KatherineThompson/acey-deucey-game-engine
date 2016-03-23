"use strict";

const numberOfPieces = require("./constants").NUMBER_OF_GAME_PIECES;

function checkForWinner(gameState) {
    if (gameState.playerOne.winningPieces === numberOfPieces) {
        return true;
    }
    if (gameState.playerTwo.winningPieces === numberOfPieces) {
        return false;
    }
    return null;
}

module.exports = checkForWinner;