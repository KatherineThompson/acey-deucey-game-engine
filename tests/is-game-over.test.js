"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;
const isGameOver = aceyDeuceyGameEngine.isGameOver;

test("is game over", t => {
    t.test("game hasn't started", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            
            t.equal(isGameOver(gameState), false, "the game is not over if it hasn't begun");
            
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            
            t.equal(isGameOver(gameState), false, "the game is not over if it hasn't begun");            
        });        
    });
    
    t.test("game is in progess", t => {
        t.test("player 1", t => {
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.playerOne.initialPieces = 5;
            gameState.board[10].isPlayerOne = true;
            gameState.board[10].numPieces = 3;
            gameState.board[23].isPlayerOne = true;
            gameState.board[23].numPieces = 1;
            
            t.equal(
                isGameOver(gameState),
                false,
                "the game is not over when player 1 still has initial pieces and pieces on the board"
            );
            
            gameState.playerOne.initialPieces = 0;
            gameState.playerOne.barPieces = 1;
            
            t.equal(
                isGameOver(gameState),
                false,
                "the game is not over when player 1 has a bar piece and pieces on the board"
            );
            
            gameState.playerOne.barPieces = 0;
            gameState.playerOne.winningPieces = 11;
            
            t.equal(
                isGameOver(gameState),
                false,
                "the game is not over when player 1 has fewer than 15 winning pieces and some pieces on the board"
            );
        });
        
        t.test("player 2", t => {
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.initialPieces = 5;
            gameState.board[10].isPlayerOne = false;
            gameState.board[10].numPieces = 3;
            gameState.board[0].isPlayerOne = false;
            gameState.board[0].numPieces = 1;
            
            t.equal(
                isGameOver(gameState),
                false,
                "the game is not over when player 2 still has initial pieces and pieces on the board"
            );
            
            gameState.playerTwo.initialPieces = 0;
            gameState.playerTwo.barPieces = 1;
            
            t.equal(
                isGameOver(gameState),
                false,
                "the game is not over when player 2 has a bar piece and pieces on the board"
            );
            
            gameState.playerTwo.barPieces = 0;
            gameState.playerTwo.winningPieces = 11;
            
            t.equal(
                isGameOver(gameState),
                false,
                "the game is not over when player 2 has fewer than 15 winning pieces and some pieces on the board"
            );                       
        });              
    });
    
    t.test("games is over", t => {
        t.test("player 1", t => {
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.playerOne.initialPieces = 0;
            gameState.playerOne.winningPieces = 15;
            
            t.equal(
                isGameOver(gameState),
                true,
                "the game is over when player 1 has fifteen winning pieces and no pieces are on the bar or board"
            );
            
            gameState.playerOne.barPieces = 3;
            
            t.equal(isGameOver(gameState), false, "the game is not over when player 1 has an extra piece on the bar");
            
            gameState.playerOne.barPieces = 0;
            gameState.board[15].isPlayerOne = true;
            gameState.board[15].numPieces = 1;
            
            t.equal(isGameOver(gameState), false, "the game is not over when player 1 has an extra piece on the board");
            
        });
        
        t.test("player 2", t => {
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.initialPieces = 0;
            gameState.playerTwo.winningPieces = 15;
            
            t.equal(
                isGameOver(gameState),
                true,
                "the game is over when player 2 has fifteen winning pieces and no pieces are on the bar or board"
            );
            
            gameState.playerTwo.barPieces = 3;
            
            t.equal(isGameOver(gameState), false, "the game is not over when player 2 has an extra piece on the bar");
            
            gameState.playerTwo.barPieces = 0;
            gameState.board[15].isPlayerOne = false;
            gameState.board[15].numPieces = 1;
            
            t.equal(
                isGameOver(gameState),
                false,
                "the game is not over when player 2 has an extra piece on the board"
            );            
        });              
    });
});