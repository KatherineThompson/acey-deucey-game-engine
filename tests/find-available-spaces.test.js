"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;
const findAvailableSpaces = aceyDeuceyGameEngine.findAvailableSpaces;

test("find available spaces", t => {
    t.test("available move from start", t => {
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            const numberOfSpaces = 5;
            
            const availableSpaces = [-1];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 1 has a move onto the board"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            const numberOfSpaces = 5;
            
            const availableSpaces = [24];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 2 has a move onto the board"
            );            
        });
    });
    
    t.test("available move from piece on board", t => {
        t.test("player 1", t => {
            t.plan(2);
            const gameState = getInitialGameState();
            gameState.playerOne.initialPieces = 0;
            gameState.board[12].isPlayerOne = true;
            gameState.board[12].numberPieces = 2;
            const numberOfSpaces = 2;
            
            const availableSpaces = [12];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 1 has a move for a piece already on the board"
            );
            
            gameState.board[18].isPlayerOne = true;
            gameState.board[18].numberPieces = 2;
            
            const multipleSpaces = [12, 18];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                multipleSpaces,
                "the correct spaces are returned when player 1 has multiple moves for a piece already on the board"
            );
        });
        
        t.test("player 2", t => {
            t.plan(2);
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.initialPieces = 0;
            gameState.board[12].isPlayerOne = false;
            gameState.board[12].numberPieces = 2;
            const numberOfSpaces = 2;
            
            const availableSpaces = [12];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 2 has a move for a piece already on the board"
            );
            gameState.board[6].isPlayerOne = false;
            gameState.board[6].numberPieces = 2;
            
            const multipleSpaces = [6, 12];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                multipleSpaces,
                "the correct spaces are returned when player 2 has multiple moves for a piece already on the board"
            );                                    
        });
    });
    
    t.test("available move off board", t => {
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.playerOne.initialPieces = 0;
            gameState.board[22].isPlayerOne = true;
            gameState.board[22].numPieces = 1;
            const numberOfSpaces = 4;
            
            const availableSpaces = [22];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 1 has a move off the board"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.initialPieces = 0;
            gameState.board[1].isPlayerOne = false;
            gameState.board[1].numPieces = 1;
            const numberOfSpaces = 4;
            
            const availableSpaces = [1];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 2 has a move off the board"
            );            
        });
    });
    
    t.test("no available move", t => {
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.playerOne.initialPieces = 0;
            gameState.board[10].isPlayerOne = true;
            gameState.board[10].numPieces = 1;
            gameState.board[16].isPlayerOne = false;
            gameState.board[16].numPieces = 2;
            const numberOfSpaces = 6;
            
            const availableSpaces = [];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "no spaces are returned when player 1 cannot make a move"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.initialPieces = 0;
            gameState.board[10].isPlayerOne = true;
            gameState.board[10].numPieces = 2;
            gameState.board[16].isPlayerOne = false;
            gameState.board[16].numPieces = 1;
            const numberOfSpaces = 6;
            
            const availableSpaces = [];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "no spaces are returned when player 2 cannot make a move"
            );            
        });
    });
    
    t.test("available move from bar", t => {
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.playerOne.initialPieces = 0;
            gameState.playerOne.barPieces = 1;
            const numberOfSpaces = 1;
            
            const availableSpaces = [-1];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 1 has a piece on the bar"
            );
        });
        
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.initialPieces = 0;
            gameState.playerTwo.barPieces = 1;
            const numberOfSpaces = 1;
            
            const availableSpaces = [24];
            
            t.deepEqual(
                findAvailableSpaces(gameState, numberOfSpaces),
                availableSpaces,
                "the correct spaces are returned when player 2 has a piece on the bar"
            );            
        });        
    });
});