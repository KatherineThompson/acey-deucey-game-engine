"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;

const makeTurn = aceyDeuceyGameEngine.makeTurn;

test("make turn", t => {
    t.test("basic turns", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const diceRoll = [3, 5];
            
            const proposedMoves = [
                {currentPosition: 10, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: -1, numberOfSpaces: diceRoll[1], isBar: false}
            ];
            
            const gameState = getInitialGameState();
            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
            gameState.playerOne.initialPieces = 14;
            
            const newGameState = getInitialGameState();
            newGameState.isPlayerOne = false;
            newGameState.board[4].isPlayerOne = true;
            newGameState.board[4].numPieces = 1;
            newGameState.board[13].isPlayerOne = true;
            newGameState.board[13].numPieces = 1;
            newGameState.playerOne.initialPieces = 13;
            
            t.deepEqual(
                makeTurn(gameState, diceRoll, proposedMoves),
                newGameState,
                "the correct gameState is returned when player 1 moves two pieces"
            );
            
            // add error
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const diceRoll = [3, 5];
            
            const proposedMoves = [
                {currentPosition: 10, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 24, numberOfSpaces: diceRoll[1], isBar: false}
            ];
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
            gameState.playerTwo.initialPieces = 14;
            
            const newGameState = getInitialGameState();
            newGameState.board[19].isPlayerOne = false;
            newGameState.board[19].numPieces = 1;
            newGameState.board[7].isPlayerOne = false;
            newGameState.board[7].numPieces = 1;
            newGameState.playerTwo.initialPieces = 13;
            
            t.deepEqual(
                makeTurn(gameState, diceRoll, proposedMoves),
                newGameState,
                "the correct gameState is returned when player 2 moves two pieces"
            );
            
            // add error
        });
    });
    // acey deucey turns
    // can't move turns
});