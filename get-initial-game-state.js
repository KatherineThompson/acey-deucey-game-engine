"use strict";

const _ = require("lodash");

function getInitialGameState() {
    const gameState = {
        board: [],
        playerOne: {
            initialPieces: 15,
            barPieces: 0,
            winningPieces: 0
        },
        playerTwo: {
            initialPieces: 15,
            barPieces: 0,
            winningPieces:0
        }             
    };
    
    gameState.board = _(24).range().map(() => ({isPlayerOne: null, numPieces: 0})).value();
    
    return gameState;
}

module.exports = getInitialGameState;