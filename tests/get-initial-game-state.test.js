"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;

test("getInitialGameState", t => {
    t.plan(1);
    const gameState = {
        board: [
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0},
            {isPlayerOne: null, numPieces: 0}
        ],
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
        }      
    };
    t.deepEqual(getInitialGameState(), gameState, "returns the correct gameState object");
});