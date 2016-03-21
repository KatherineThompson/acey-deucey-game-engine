"use strict";
const makeMove = require("./make-move");
const isValidTurn = require("./is-valid-turn");
const getAceyDeucey = require("./get-acey-deucey");

function makeTurn(gameState, diceRoll, proposedMoves) {
    
    if (!isValidTurn(gameState, diceRoll, proposedMoves)) {
        const err = new Error("The proposed turn is not valid.");
        err.proposedMoves = proposedMoves;
        err.gameState = gameState;
        err.diceRoll = diceRoll;
        throw err;
    }
    
    const newGameState = proposedMoves.reduce(makeMove, gameState);

    const aceyDeucey = getAceyDeucey(diceRoll);
    if (aceyDeucey.isAceyDeucey === false) {
        newGameState.isPlayerOne = !gameState.isPlayerOne;
    }
    return newGameState;
}

module.exports = makeTurn;