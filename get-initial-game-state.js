"use strict";

const _ = require("lodash");

function getInitialGameState() {
    const gameState = {
        board: [],
        isPlayerOne: true,
        playerOne: {
            initialPieces: 15,
            barPieces: 0,
            winningPieces: 0
        },
        playerTwo: {
            initialPieces: 15,
            barPieces: 0,
            winningPieces:0
        },             
    };
    
// adds an object for each of the 24 spaces on the board    
gameState.board = _(24).range().map(() => ({isPlayerOne: null, numPieces: 0})).value();
    return gameState;
}

module.exports = getInitialGameState;