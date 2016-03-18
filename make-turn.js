"use strict";
const makeMove = require("./make-move");
const isValidTurn = require("./is-valid-turn").isValidTurn;
const getAceyDeucey = require("./is-valid-turn").getAceyDeucey;

function makeTurn(gameState, diceRoll, proposedMoves) {
    
    if (!isValidTurn(gameState, diceRoll, proposedMoves)) {
        const err = new Error("The proposed turn is not valid.");
        err.proposedMoves = proposedMoves;
        err.gameState = gameState;
        err.diceRoll = diceRoll;
        throw err;
    }
    
    function makeAllMoves(gameState, proposedMoves) {
        if (!proposedMoves.length) {
            const aceyDeucey = getAceyDeucey(diceRoll);
            if (aceyDeucey.isAceyDeucey === false) {
                gameState.isPlayerOne = !gameState.isPlayerOne;
            }
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