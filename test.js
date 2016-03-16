"use strict";

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

const isValidMove = require("./is-valid-move");

test("isValidMove", t => {

    t.test("moving onto the board", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState(); 
            const proposedFirstMove = {
                currentPosition: -1,
                numberOfSpaces: 4,
                isBar: false
            };
            
            t.equal(
                isValidMove(gameState, proposedFirstMove), 
                true, 
                "the move is valid when player 1 moves a piece onto an empty board"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
             
            const proposedFirstMove = {
                currentPosition: 24,
                numberOfSpaces: 4,
                isBar: false
            };
            
            t.equal(
                isValidMove(gameState, proposedFirstMove),
                true,
                "the move is valid when player 2 move a piece onto an empty board"
            );            
        });
    }); 
     
    t.test("moving off the board", t => {
        t.test("player 1", t => {
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.board[22].isPlayerOne = true;
            
            const proposedMoveOffBoard = {
                currentPosition: 22,
                numberOfSpaces: 4,
                isBar: false    
            };
            
            t.equal(
                isValidMove(gameState, proposedMoveOffBoard),
                false,
                "the move off the board is not valid when player 1 has initial pieces"
            );
        
            gameState.board[3].isPlayerOne = true;
            gameState.playerOne.initialPieces = 0;
            
            t.equal(
                isValidMove(gameState, proposedMoveOffBoard),
                false,
                "the move off the board is not valid when player 1 has pieces that are not in the last quarter"
            );
        
            gameState.board[3].isPlayerOne = null;
        
            t.equal(
                isValidMove(gameState, proposedMoveOffBoard),
                true,
                "the move off the board is valid when player 1 does not have pieces in the first 3/4 of the board"
            );        
        });
        
        t.test("player 2", t => {
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.board[2].isPlayerOne = false;
            gameState.isPlayerOne = false;
            
            const proposedMoveOffBoard = {
                currentPosition: 2,
                numberOfSpaces: 4,
                isBar: false    
            };
            t.equal(
                isValidMove(gameState, proposedMoveOffBoard),
                false,
                "the move off the board is not valid when player 2 has initial pieces"
            );
            
            gameState.board[18].isPlayerOne = false;
            gameState.playerTwo.initialPieces = 0;
            
            t.equal(
                isValidMove(gameState, proposedMoveOffBoard),
                false,
                "the move off the board is not valid when player 2 has pieces that are not in the last quarter"
            );
            
            gameState.board[18].isPlayerOne = null;
            
            t.equal(
                isValidMove(gameState, proposedMoveOffBoard),
                true,
                "the move off the board is valid when player 2 does not have pieces in the first 3/4 of the board"
            );               
        });
          
    });
    
    t.test("moving to an empty space", t => {
        
        const proposedMoveToEmptySpace = {
            currentPosition: 5,
            numberOfSpaces: 3,
            isBar: false
        };
        
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.board[5].isPlayerOne = true;
            
            t.equal(
                isValidMove(gameState, proposedMoveToEmptySpace),
                true,
                "the move is valid when player one moves to an empty space"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[5].isPlayerOne = false;
            
            t.equal(
                isValidMove(gameState, proposedMoveToEmptySpace),
                true,
                "the move is valid when player two moves to an empty space"
            );
        });     
    });
    
    t.test("moving to player's own space", t => {
        const proposedMoveToOwnSpace = {
            currentPosition: 10,
            numberOfSpaces: 2,
            isBar: false    
        };
        
        t.test("player 1", t => {
            t.plan(1);
            
            const gameState = getInitialGameState();
            gameState.board[10].isPlayerOne = true;
            gameState.board[12].isPlayerOne = true;
            
            t.equal(
                isValidMove(gameState, proposedMoveToOwnSpace),
                true,
                "the move is valid when player 1 moves to their own space"
            );
        });

        t.test("player 2", t => {
            t.plan(1);
           
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[10].isPlayerOne = false;
            gameState.board[8].isPlayerOne = false;
            
            t.equal(
                isValidMove(gameState, proposedMoveToOwnSpace),
                true,
                "the move is valid when player 2 moves to their own space"
            );
        });        
    });
    
    t.test("moving to an occupied space", t => {
        const proposedMoveToOpposingSpace = {
            currentPosition: 16,
            numberOfSpaces: 4,
            isBar: false
        };
        
        t.test("player 1", t => {
            t.plan(2);
            
            const gameState = getInitialGameState();
            gameState.board[16].isPlayerOne = true;
            gameState.board[20].isPlayerOne = false;
            gameState.board[20].numPieces = 1;            
            
            t.equal(
                isValidMove(gameState, proposedMoveToOpposingSpace),
                true,
                "the move is valid when player 1 moves to a space with one of player 2's pieces"
            );
            
            gameState.board[20].numPieces = 3;
            
            t.equal(
                isValidMove(gameState, proposedMoveToOpposingSpace),
                false,
                "the move is not valid when player 1 moves to a space with three of player 2's pieces"
            );
        });
        
        t.test("player 2", t => {
            t.plan(2);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[16].isPlayerOne = false;
            gameState.board[12].isPlayerOne = true;
            gameState.board[12].numPieces = 1;

            t.equal(
                isValidMove(gameState, proposedMoveToOpposingSpace),
                true,
                "the move is valid when player 2 moves to a space with one of player 1's pieces"
            ); 
            
            gameState.board[12].numPieces = 3;
            
            t.equal(
                isValidMove(gameState, proposedMoveToOpposingSpace),
                false,
                "the move is not valid when player 2 moves to a space with 3 of player 1's pieces"
            );             
        });
});
    
    t.test("moving when a piece is on the bar", t => {    
        const proposedMoveNotFromBar = {
            currentPosition: 11,
            numberOfSpaces: 6,
            isBar: false
        };
        
        t.test("player 1", t => {
            t.plan(2);
            
            const gameState = getInitialGameState();
            gameState.playerOne.barPieces = 1;
            gameState.board[11].isPlayerOne = true;    
            
            const proposedMoveFromBar = {
                currentPosition: -1,
                numberOfSpaces: 2,
                isBar: true
            };
            
            t.equal(
                isValidMove(gameState, proposedMoveFromBar),
                true,
                "the move is valid when player 1 moves a piece from the bar"
            );
        
            t.equal(
                isValidMove(gameState, proposedMoveNotFromBar),
                false,
                "the move is not valid when player 1 has a piece on the bar but does not move it"
            ); 
        });
        
        t.test("player 2", t => {
            t.plan(2);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.barPieces = 1;
            gameState.board[11].isPlayerOne = false;
            
            const proposedMoveFromBar = {
                currentPosition: 24,
                numberOfSpaces: 2,
                isBar: true
            };
            
            t.equal(
                isValidMove(gameState, proposedMoveFromBar),
                true,
                "the move is valid when player 2 moves a piece from the bar"
            );
        
            t.equal(
                isValidMove(gameState, proposedMoveNotFromBar),
                false,
                "the move is not valid when player 2 has a piece on the bar but does not move it"
            );  
        });  

    });
    
    t.test("piece exists", t => {
        const proposedMoveFromEmptySpace = {
            currentPosition: 8,
            numberOfSpaces: 1,
            isBar: false    
        };
        
        t.test("player 1", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            t.equal(
                isValidMove(gameState, proposedMoveFromEmptySpace),
                false,
                "the move is not valid when player 1 does not have a piece on the current space"
            );            
        });
        
        t.test("player 2", t => {
            t.plan(1);
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            t.equal(
                isValidMove(gameState, proposedMoveFromEmptySpace),
                false,
                "the move is not valid when player 2 does not have a piece on the current space"
            );
        });
    });           
});

const isValidTurn = require("./").isValidTurn;

test("isValidTurn", t => {
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
                "the move is valid when player two moves one piece twice"
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