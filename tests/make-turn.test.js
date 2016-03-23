"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../lib");
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
        });
    });
    
    t.test("throws an error", t => {
       t.plan(3);
       
       const diceRoll = [2, 5];
       const invalidTurn = [
           {currentPosition: 6, numberOfSpaces: 3, isBar: false},
           {currentPosition: 13, numberOfSpaces: 5, isBar: false}
       ];
       const gameState = getInitialGameState();
       
       try {
           makeTurn(gameState, diceRoll, invalidTurn);
           t.fail("makeTurn should have thrown an error for an invalid turn");
       } catch (error) {
           t.equal(error.proposedMoves, invalidTurn, "error.proposedMove is the same as the invalid move");
           t.equal(error.gameState, gameState, "error.gameState is the same as the gameState");
           t.equal(error.diceRoll, diceRoll, "error.diceRoll is the same as the diceRoll");
       }
        
    });
    
     t.test("acey deucey turns", t => {
        t.test("player 1", t => {
            t.plan(1);
            const diceRoll = [2, 1, 3];
           
            const aceyDeuceyMoves = [
               {currentPosition: -1, numberOfSpaces: diceRoll[0], isBar: false},
               {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false}
            ];
           
            const gameState = getInitialGameState();
            gameState.board[aceyDeuceyMoves[1].currentPosition].isPlayerOne = true;
            gameState.board[aceyDeuceyMoves[1].currentPosition].numPieces = 1;
            gameState.board[aceyDeuceyMoves[2].currentPosition].isPlayerOne = true;
            gameState.board[aceyDeuceyMoves[2].currentPosition].numPieces = 4;
            
            const newGameState = getInitialGameState();
            newGameState.board[1].isPlayerOne = true;
            newGameState.board[1].numPieces = 1;  
            newGameState.board[6].isPlayerOne = true;
            newGameState.board[6].numPieces = 1; 
            newGameState.board[19].isPlayerOne = true;
            newGameState.board[19].numPieces = 4;
            newGameState.playerOne.initialPieces = 14;
            
            t.deepEqual(
                makeTurn(gameState, diceRoll, aceyDeuceyMoves),
                newGameState,
                "the correct game state is returned when player 1 completes an acey deucey move"
            );            
       });
       
        t.test("player 2", t => {
            t.plan(1);
            const diceRoll = [2, 1, 3];
           
            const aceyDeuceyMoves = [
               {currentPosition: 24, numberOfSpaces: diceRoll[0], isBar: false},
               {currentPosition: 20, numberOfSpaces: diceRoll[1], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false},
               {currentPosition: 16, numberOfSpaces: diceRoll[2], isBar: false}
            ];
           
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[aceyDeuceyMoves[1].currentPosition].isPlayerOne = false;
            gameState.board[aceyDeuceyMoves[1].currentPosition].numPieces = 1;
            gameState.board[aceyDeuceyMoves[2].currentPosition].isPlayerOne = false;
            gameState.board[aceyDeuceyMoves[2].currentPosition].numPieces = 4;
            
            const newGameState = getInitialGameState();
            newGameState.isPlayerOne = false;
            newGameState.board[22].isPlayerOne = false;
            newGameState.board[22].numPieces = 1;  
            newGameState.board[19].isPlayerOne = false;
            newGameState.board[19].numPieces = 1; 
            newGameState.board[13].isPlayerOne = false;
            newGameState.board[13].numPieces = 4;
            newGameState.playerTwo.initialPieces = 14;
            
            t.deepEqual(
                makeTurn(gameState, diceRoll, aceyDeuceyMoves),
                newGameState,
                "the correct game state is returned when player 2 completes an acey deucey move"
            );           
       });
    });
    // can't move turns - need to update isValidTurn
});