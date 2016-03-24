"use strict";

const _ = require("lodash");
const constants = require("./constants.js");
const numberOfBoardSpaces = constants.NUMBER_OF_BOARD_SPACES;
const numberOfPieces = constants.NUMBER_OF_GAME_PIECES;

function getInitialGameState() {
    const gameState = {
        board: [],
        isPlayerOne: true,
        playerOne: {
            initialPieces: numberOfPieces,
            barPieces: 0,
            winningPieces: 0
        },
        playerTwo: {
            initialPieces: numberOfPieces,
            barPieces: 0,
            winningPieces:0
        },             
    };
    
    gameState.board = _(numberOfBoardSpaces).range().map(() => ({isPlayerOne: null, numPieces: 0})).value();
    return gameState;
}

module.exports = getInitialGameState;