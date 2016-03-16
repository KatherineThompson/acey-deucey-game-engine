"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;

const isValidTurn = aceyDeuceyGameEngine.isValidTurn;

test.only("isValidTurn", t => {
    t.test("moving one piece", t => {
        t.test("player 1", t => {
            t.plan(3);
            
            const diceRoll = [2, 4];
            
            const proposedMovesForOnePiece = [
                {currentPosition: 6, numberOfSpaces: 2, isBar: false},
                {currentPosition: 8, numberOfSpaces: 4, isBar: false}
            ];
            
            const gameState = getInitialGameState();
            gameState.board[proposedMovesForOnePiece[0].currentPosition].isPlayerOne = true;
            gameState.board[proposedMovesForOnePiece[0].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedMovesForOnePiece),
                true,
                "the turn is valid when player 1 moves one piece twice"
            );
            
            const proposedInvalidMove = [
                {currentPosition: 12, numberOfSpaces: 2, isBar: false},
                {currentPosition: 15, numberOfSpaces: 4, isBar: false}  
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedInvalidMove),
                false,
                "the turn is invalid when player 1 has an invalid move"
            );
            
            const invalidDiceRoll = [12, 32];
            
            t.equal(
                isValidTurn(gameState, invalidDiceRoll, proposedMovesForOnePiece),
                false,
                "the turn is invalid when player 1's dice roll and moves do not match"
            );
        });
        
        t.test("player 2", t => {
            t.plan(3);                
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[15].isPlayerOne = false;
            gameState.board[15].numPieces = 1;
            
            const diceRoll = [2, 4];
            
            const proposedMovesForOnePiece = [
                {currentPosition: 15, numberOfSpaces: 2, isBar: false},
                {currentPosition: 13, numberOfSpaces: 4, isBar: false}
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedMovesForOnePiece),
                true,
                "the turn is valid when player 2 moves one piece twice"
            );
            
            const proposedInvalidMove = [
                {currentPosition: 12, numberOfSpaces: 2, isBar: false},
                {currentPosition: 15, numberOfSpaces: 4, isBar: false}  
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedInvalidMove),
                false,
                "the turn is invalid when player 2 has an invalid move"
            );
            
            const invalidDiceRoll = [12, 32];
            
            t.equal(
                isValidTurn(gameState, invalidDiceRoll, proposedMovesForOnePiece),
                false,
                "the turn is invalid when player 2's dice roll and moves do not match"
            );
        });
    });
    
    t.test("moving two pieces", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const proposedMovesForTwoPieces = [
                {currentPosition: 12, numberOfSpaces: 1, isBar: false},
                {currentPosition: 2, numberOfSpaces: 6, isBar: false}
            ];
            
            const diceRoll = [6, 1];
            
            const gameState = getInitialGameState();
            gameState.board[proposedMovesForTwoPieces[0].currentPosition].isPlayerOne = true;
            gameState.board[proposedMovesForTwoPieces[0].currentPosition].numPieces = 1;
            gameState.board[proposedMovesForTwoPieces[1].currentPosition].isPlayerOne = true;
            gameState.board[proposedMovesForTwoPieces[1].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedMovesForTwoPieces),
                true,
                "the turn is valid when player 1 moves two pieces"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const proposedMovesForTwoPieces = [
                {currentPosition: 21, numberOfSpaces: 1, isBar: false},
                {currentPosition: 18, numberOfSpaces: 6, isBar: false}
            ];
                        
            const diceRoll = [6, 1];
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[proposedMovesForTwoPieces[0].currentPosition].isPlayerOne = false;
            gameState.board[proposedMovesForTwoPieces[0].currentPosition].numPieces = 1;
            gameState.board[proposedMovesForTwoPieces[1].currentPosition].isPlayerOne = false;
            gameState.board[proposedMovesForTwoPieces[1].currentPosition].numPieces = 1;            
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedMovesForTwoPieces),
                true,
                "the turn is valid when player 2 moves two pieces"
            );
        });
    });
    
    // t.test("doubles", t => {
        
    // });
    
    // t.test("acey deucey", t => {
        
    // });
});