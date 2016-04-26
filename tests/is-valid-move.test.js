"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");

const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;

const isValidMove = aceyDeuceyGameEngine.isValidMove;

test("isValidMove", t => {

    t.test("moving onto the board", t => {
        t.test("player 1", t => {
            t.plan(2);
            
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
            
            gameState.playerOne.initialPieces = 0;
            
            t.equal(
                isValidMove(gameState, proposedFirstMove),
                false,
                "the move is invalid when there are no remaining initial pieces off the board"  
            );
        });
        
        t.test("player 2", t => {
            t.plan(2);
            
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
            
            gameState.playerTwo.initialPieces = 0;
            
            t.equal(
                isValidMove(gameState, proposedFirstMove),
                false,
                "the move is invalid when there are no remaining initial pieces on the board"
            );            
        });
    }); 
     
    t.test("moving off the board", t => {
        t.test("player 1", t => {
            t.plan(3);

            const proposedMoveOffBoard = {
                currentPosition: 22,
                numberOfSpaces: 4,
                isBar: false    
            };
                        
            const gameState = getInitialGameState();
            gameState.board[proposedMoveOffBoard.currentPosition].isPlayerOne = true;
            
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
         
            const proposedMoveOffBoard = {
                currentPosition: 2,
                numberOfSpaces: 4,
                isBar: false    
            };
            
            const gameState = getInitialGameState();
            gameState.board[proposedMoveOffBoard.currentPosition].isPlayerOne = false;
            gameState.isPlayerOne = false;
            

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
            gameState.board[proposedMoveToEmptySpace.currentPosition].isPlayerOne = true;
            
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
            gameState.board[proposedMoveToEmptySpace.currentPosition].isPlayerOne = false;
            
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
            gameState.board[proposedMoveToOwnSpace.currentPosition].isPlayerOne = true;
            gameState.board[
                proposedMoveToOwnSpace.currentPosition + proposedMoveToOwnSpace.numberOfSpaces
            ].isPlayerOne = true;
            
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
            gameState.board[proposedMoveToOwnSpace.currentPosition].isPlayerOne = false;
            gameState.board[
                proposedMoveToOwnSpace.currentPosition - proposedMoveToOwnSpace.numberOfSpaces
            ].isPlayerOne = false;
            
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
            gameState.board[proposedMoveToOpposingSpace.currentPosition].isPlayerOne = true;
            gameState.board[
                proposedMoveToOpposingSpace.currentPosition + proposedMoveToOpposingSpace.numberOfSpaces
            ].isPlayerOne = false;
            gameState.board[
                proposedMoveToOpposingSpace.currentPosition + proposedMoveToOpposingSpace.numberOfSpaces
            ].numPieces = 1;            
            
            t.equal(
                isValidMove(gameState, proposedMoveToOpposingSpace),
                true,
                "the move is valid when player 1 moves to a space with one of player 2's pieces"
            );
            
            gameState.board[
                proposedMoveToOpposingSpace.currentPosition + proposedMoveToOpposingSpace.numberOfSpaces
            ].numPieces = 3;
            
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
            gameState.board[proposedMoveToOpposingSpace.currentPosition].isPlayerOne = false;
            gameState.board[
                proposedMoveToOpposingSpace.currentPosition - proposedMoveToOpposingSpace.numberOfSpaces
            ].isPlayerOne = true;
            gameState.board[
                proposedMoveToOpposingSpace.currentPosition - proposedMoveToOpposingSpace.numberOfSpaces
            ].numPieces = 1;

            t.equal(
                isValidMove(gameState, proposedMoveToOpposingSpace),
                true,
                "the move is valid when player 2 moves to a space with one of player 1's pieces"
            ); 
            
            gameState.board[
                proposedMoveToOpposingSpace.currentPosition - proposedMoveToOpposingSpace.numberOfSpaces
            ].numPieces = 3;
            
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
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.playerOne.barPieces = 1;
            gameState.board[proposedMoveNotFromBar.currentPosition].isPlayerOne = true;
            gameState.playerOne.initialPieces = 0;    
            
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
            
            gameState.playerOne.barPieces = 0;
            gameState.playerOne.initialPieces = 15;
                
            t.equal(
              isValidMove(gameState, proposedMoveFromBar),
              false,
              "the move is not valid when player 1 has no bar piece"  
            );
        });
        
        t.test("player 2", t => {
            t.plan(3);
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.playerTwo.barPieces = 1;
            gameState.board[proposedMoveNotFromBar.currentPosition].isPlayerOne = false;
            gameState.playerTwo.initialPieces = 0;
            
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
            
            gameState.playerTwo.barPieces = 0;
            gameState.playerTwo.initialPieces = 15;
                
            t.equal(
              isValidMove(gameState, proposedMoveFromBar),
              false,
              "the move is not valid when player 2 has no bar piece"  
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