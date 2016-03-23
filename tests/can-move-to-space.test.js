"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../lib");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;
const canMoveToSpace = aceyDeuceyGameEngine.canMoveToSpace;

test("can move to space", t => {
    t.test("own space", t => {
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            const spaceIndex = 5;
            gameState.board[spaceIndex].isPlayerOne = true;
            gameState.board[spaceIndex].numPieces = 1;
            
            const spaceInfo = {isAvailable: true, isActivePlayer: true};
            
            t.deepEqual(
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 1 moves to their own space"
            );
            
        });
        
        t.test("player 2", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            const spaceIndex = 5;
            gameState.isPlayerOne = false;
            gameState.board[spaceIndex].isPlayerOne = false;
            gameState.board[spaceIndex].numPieces = 1;
            
            const spaceInfo = {isAvailable: true, isActivePlayer: true};
            
            t.deepEqual(
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 2 moves to their own space"
            );            
        });
    });
    
    t.test("empty space", t => {
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            const spaceIndex = 8;
            
            const spaceInfo = {isAvailable: true, isActivePlayer: null};
            
            t.deepEqual(
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 1 moves to an empty space"
            );            
        });
        
        t.test("player 2", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            const spaceIndex = 8;
            gameState.isPlayerOne = false;
            
            const spaceInfo = {isAvailable: true, isActivePlayer: null};
            
            t.deepEqual(
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 2 moves to an empty space"
            );                
        });
    });
    
    t.test("opposing space", t => {
        t.test("player 1", t => {
            t.plan(2);
            const gameState = getInitialGameState();
            const spaceIndex = 15;
            gameState.board[spaceIndex].isPlayerOne = false;
            gameState.board[spaceIndex].numPieces = 1;
            
            const spaceInfo = {isAvailable: true, isActivePlayer: false};
            
            t.deepEqual(
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 1 moves to an opposing space with one piece"
            );
            
            gameState.board[spaceIndex].numPieces = 3;
            spaceInfo.isAvailable = false;
            
            t.deepEqual(
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 1 moves to an opposing space with multiple pieces"
            );
        });
        
        t.test("player 2", t => {
            t.plan(2);
            const gameState = getInitialGameState();
            const spaceIndex = 13;
            gameState.isPlayerOne = false;
            gameState.board[spaceIndex].isPlayerOne = true;
            gameState.board[spaceIndex].numPieces = 1;
            
            const spaceInfo = {isAvailable: true, isActivePlayer: false};
            
            t.deepEqual(
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 2 moves to an opposing space with one piece"
            );
            
            gameState.board[spaceIndex].numPieces = 3;
            spaceInfo.isAvailable = false;
            
            t.deepEqual (
                canMoveToSpace(gameState, spaceIndex),
                spaceInfo,
                "returns the correct object when player 2 moves to an opposing space with multiple pieces"
            );
        });
    });       
});