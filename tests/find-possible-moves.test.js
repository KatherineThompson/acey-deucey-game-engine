"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;
const findPossibleMoves = aceyDeuceyGameEngine.findPossibleMoves;

test("find possible moves from a space", t => {
    t.test("available move from start", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            const selectedPieceIndex = -1;
            const diceRoll = [2, 3];
            
            const possibleMoves = [1, 2];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 1 has a move on the board"
            );
            
        });
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            const selectedPieceIndex = 24;
            const diceRoll = [2, 3];
            
            const possibleMoves = [22, 21];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 2 has a move onto the board"
            );
        });
    });
    
    t.test("available move from on board", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            const selectedPieceIndex = 14;
            gameState.board[selectedPieceIndex].isPlayerOne = true;
            gameState.board[selectedPieceIndex].numPieces = 1;
            const diceRoll = [1, 4];
            
            const possibleMoves = [15, 18];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 1 has a move from on the board"
            );
            
        });
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            const selectedPieceIndex = 14;
            gameState.board[selectedPieceIndex].isPlayerOne = false;
            gameState.board[selectedPieceIndex].numPieces = 1;
            const diceRoll = [1, 4];
            
            const possibleMoves = [13, 10];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 2 has a move from on the board"
            );
        });
    });
    
    t.test("available move from bar", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.playerOne.barPieces = 1;
            const diceRoll = [5, 2];
            
            const possibleMoves = [4, 1];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, true),
                possibleMoves,
                "the correct moves are returned when player 1 has a move from on the bar"
            );
            
        });
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.barPieces = 1;
            const diceRoll = [5, 2];
            
            const possibleMoves = [19, 22];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, true),
                possibleMoves,
                "the correct moves are returned when player 2 has a move from on the bar"
            );
        });
    });
    
    t.test("available move off board", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            const selectedPieceIndex = 20;
            gameState.board[selectedPieceIndex].isPlayerOne = true;
            gameState.board[selectedPieceIndex].numPieces = 1;
            const diceRoll = [6, 3];
            gameState.playerOne.initialPieces = 0;
            
            const possibleMoves = [24, 23];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 1 has a move off the board"
            );
            
        });
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            const selectedPieceIndex = 3;
            gameState.board[selectedPieceIndex].isPlayerOne = false;
            gameState.board[selectedPieceIndex].numPieces = 1;            
            const diceRoll = [6, 3];
            gameState.playerTwo.initialPieces = 0;
            
            const possibleMoves = [-1, 0];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 2 has a move off the board"
            );
            
        });
    });
    
    t.test("doubles move", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            const selectedPieceIndex = 17;
            gameState.board[selectedPieceIndex].isPlayerOne = true;
            gameState.board[selectedPieceIndex].numPieces = 1;
            const diceRoll = [3, 3];
            
            const possibleMoves = [20];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 1 has a doubles move"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            const selectedPieceIndex = 17;
            gameState.board[selectedPieceIndex].isPlayerOne = false;
            gameState.board[selectedPieceIndex].numPieces = 1;
            const diceRoll = [3, 3];
            
            const possibleMoves = [14];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 2 has a doubles move"
            );
        });
    });
    
    t.test("no available moves", t => {
        t.test("player 1", t => {
            t.plan(2);
            
            const gameState = getInitialGameState();
            const selectedPieceIndex = 20;
            gameState.board[selectedPieceIndex].isPlayerOne = true;
            gameState.board[selectedPieceIndex].numPieces = 1;
            const diceRoll = [5, 6];
            
            const possibleMoves = [];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 1 cannot move off the board"
            );
            
            const blockedIndex = 10;
            gameState.board[blockedIndex].isPlayerOne = true;
            gameState.board[blockedIndex].numPieces = 1;
            gameState.board[blockedIndex + diceRoll[0]].isPlayerOne = false;
            gameState.board[blockedIndex + diceRoll[0]].numPieces = 3;
            gameState.board[blockedIndex + diceRoll[1]].isPlayerOne = false;
            gameState.board[blockedIndex + diceRoll[1]].numPieces = 3;
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, blockedIndex),
                possibleMoves,
                "the correct moves are returned when player 1 is blocked"
            );
            
        });
            
        t.test("player 2", t => {
            t.plan(2);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            const selectedPieceIndex = 4;
            gameState.board[selectedPieceIndex].isPlayerOne = false;
            gameState.board[selectedPieceIndex].numPieces = 1;
            const diceRoll = [5, 6];
            
            const possibleMoves = [];
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, selectedPieceIndex),
                possibleMoves,
                "the correct moves are returned when player 2 cannot move off the board"
            );
            
            const blockedIndex = 10;
            gameState.board[blockedIndex].isPlayerOne = false;
            gameState.board[blockedIndex].numPieces = 1;
            gameState.board[blockedIndex - diceRoll[0]].isPlayerOne = true;
            gameState.board[blockedIndex - diceRoll[0]].numPieces = 3;
            gameState.board[blockedIndex - diceRoll[1]].isPlayerOne = true;
            gameState.board[blockedIndex - diceRoll[1]].numPieces = 3;
            
            t.deepEqual(
                findPossibleMoves(gameState, diceRoll, false, blockedIndex),
                possibleMoves,
                "the correct moves are returned when player 2 is blocked"
            );
        });
    });
});