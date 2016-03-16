"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;

const isValidTurn = aceyDeuceyGameEngine.isValidTurn;

test.only("isValidTurn", t => {
    t.test("moving one piece", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.board[6].isPlayerOne = true;
            gameState.board[6].numPieces = 1;
            
            const diceRoll = [2, 4];
            
            const proposedTwoDiceMove = [
                {currentPosition: 6, numberOfSpaces: 2, isBar: false},
                {currentPosition: 8, numberOfSpaces: 4, isBar: false}
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedTwoDiceMove),
                true,
                "the turn is valid when player 1 moves one piece twice"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);                
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[15].isPlayerOne = false;
            gameState.board[15].numPieces = 1;
            
            const diceRoll = [2, 4];
            
            const proposedTwoDiceMove = [
                {currentPosition: 15, numberOfSpaces: 2, isBar: false},
                {currentPosition: 13, numberOfSpaces: 4, isBar: false}
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedTwoDiceMove),
                true,
                "the move is valid when player 2 moves one piece twice"
            );
        });
    });
    
    // t.test("moving two pieces", t => {
        
    // });
    
    // t.test("doubles", t => {
        
    // });
    
    // t.test("acey deucey", t => {
        
    // });
});