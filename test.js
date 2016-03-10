"use strict"

const test = require("tape");

const getInitialGameState = require("./get-initial-game-state");

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
    }
    t.deepEqual(getInitialGameState(), gameState, "returns the correct gameState object");
});