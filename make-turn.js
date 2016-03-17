"use strict";
const makeMove = require("./make-move");

function makeTurn(gameState, diceRoll, proposedMoves) {
    // check for isvalidturn and if not throw error
    function makeAllMoves(gameState, proposedMoves) {
        if (!proposedMoves.length) {
            gameState.isPlayerOne = !gameState.isPlayerOne;
            return gameState;
        }
        
        const firstMove = proposedMoves[0];
        const newGameState = makeMove(gameState, firstMove);
        const newProposedMoves = proposedMoves.slice(1);
        return makeAllMoves(newGameState, newProposedMoves);        
    }
    return makeAllMoves(gameState, proposedMoves);
}

module.exports = makeTurn;