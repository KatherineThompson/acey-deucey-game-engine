"use strict";
const isValidMove = require("./").isValidMove;

function isValidTurn(gameState, diceRoll, proposedMoves) {
    proposedMoves.every(proposeMove => isValidMove(proposeMove));
}

module.exports = isValidTurn;