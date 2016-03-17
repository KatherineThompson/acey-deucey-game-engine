"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;
const makeMove = aceyDeuceyGameEngine.makeMove;

test("makeMove", t => {
    
    t.test("moving to an empty space", t => {
        const moveToEmptySpace = {
            currentPosition: 10,
            numberOfSpaces: 3,
            isBar: false
        };
        
        t.test("player 1", t => { 
            t.test("moving from space with 1 piece", t => {
                t.plan(1);
                const oldGameState = getInitialGameState();
                oldGameState.board[moveToEmptySpace.currentPosition].isPlayerOne = true;
                oldGameState.board[moveToEmptySpace.currentPosition].numPieces = 1;
                
                const newGameState = getInitialGameState();
                newGameState.board[13].isPlayerOne = true;
                newGameState.board[13].numPieces = 1;
                
                t.deepEqual(
                    makeMove(oldGameState, moveToEmptySpace),
                    newGameState,
                    "the correct game state is returned when player 1 moves from a space with 1 piece to an empty space"
                );
            });          
            
            t.test("moving from space with 2 pieces", t => {
                t.plan(1);
                const oldGameState = getInitialGameState();
                oldGameState.board[moveToEmptySpace.currentPosition].isPlayerOne = true;
                oldGameState.board[moveToEmptySpace.currentPosition].numPieces = 2;
                
                const newGameState = getInitialGameState();
                newGameState.board[10].isPlayerOne = true;
                newGameState.board[10].numPieces = 1;
                newGameState.board[13].isPlayerOne = true;
                newGameState.board[13].numPieces = 1;
                
                t.deepEqual(
                    makeMove(oldGameState, moveToEmptySpace),
                    newGameState,
                    "the correct game state is returned when player 1 moves" + 
                        "from a space with 2 pieces to an empty space"
                );
            });
        });
        
        t.test("player 2", t => { 
            t.test("moving from space with 1 piece", t => {
                t.plan(1);
                const oldGameState = getInitialGameState();
                oldGameState.isPlayerOne = false;
                oldGameState.board[moveToEmptySpace.currentPosition].isPlayerOne = false;
                oldGameState.board[moveToEmptySpace.currentPosition].numPieces = 1;
                
                const newGameState = getInitialGameState();
                newGameState.isPlayerOne = false;
                newGameState.board[7].isPlayerOne = false;
                newGameState.board[7].numPieces = 1;
                
                t.deepEqual(
                    makeMove(oldGameState, moveToEmptySpace),
                    newGameState,
                    "the correct game state is returned when player 2 moves from a space with 1 piece to an empty space"
                );
            });          
            
            t.test("moving from space with 2 pieces", t => {
                t.plan(1);
                const oldGameState = getInitialGameState();
                oldGameState.board[moveToEmptySpace.currentPosition].isPlayerOne = false;
                oldGameState.board[moveToEmptySpace.currentPosition].numPieces = 2;
                oldGameState.isPlayerOne = false;
                
                const newGameState = getInitialGameState();
                newGameState.isPlayerOne = false;
                newGameState.board[10].isPlayerOne = false;
                newGameState.board[10].numPieces = 1;
                newGameState.board[7].isPlayerOne = false;
                newGameState.board[7].numPieces = 1;
                
                t.deepEqual(
                    makeMove(oldGameState, moveToEmptySpace),
                    newGameState,
                    "the correct game state is returned when player 2 moves" + 
                        "from a space with 2 pieces to an empty space"
                );
            });
        });
    });
    
    t.test("moving to the player's own space", t => {
        const moveToOwnSpace = {
            currentPosition: 13,
            numberOfSpaces: 6,
            isBar: false
        };
        t.test("player 1", t => {
            t.plan(1);
            
            const oldGameState = getInitialGameState();
            oldGameState.board[moveToOwnSpace.currentPosition].isPlayerOne = true;
            oldGameState.board[moveToOwnSpace.currentPosition].numPieces = 1;
            oldGameState.board[
                moveToOwnSpace.currentPosition + moveToOwnSpace.numberOfSpaces
            ].isPlayerOne = true;
            oldGameState.board[
                moveToOwnSpace.currentPosition + moveToOwnSpace.numberOfSpaces
            ].numPieces = 1;
            
            const newGameState = getInitialGameState();
            newGameState.board[19].isPlayerOne = true;
            newGameState.board[19].numPieces = 2;
            
            t.deepEqual(
                makeMove(oldGameState, moveToOwnSpace),
                newGameState,
                "the correct game state is returned when player 1 moves to a space occupied by their piece"
            );            
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const oldGameState = getInitialGameState();
            oldGameState.isPlayerOne = false;
            oldGameState.board[moveToOwnSpace.currentPosition].isPlayerOne = false;
            oldGameState.board[moveToOwnSpace.currentPosition].numPieces = 1;
            oldGameState.board[
                moveToOwnSpace.currentPosition - moveToOwnSpace.numberOfSpaces
            ].isPlayerOne = false;
            oldGameState.board[
                moveToOwnSpace.currentPosition - moveToOwnSpace.numberOfSpaces
            ].numPieces = 1;
            
            const newGameState = getInitialGameState();
            newGameState.isPlayerOne = false;
            newGameState.board[7].isPlayerOne = false;
            newGameState.board[7].numPieces = 2;
            
            t.deepEqual(
                makeMove(oldGameState, moveToOwnSpace),
                newGameState,
                "the correct game state is returned when player 2 moves to a space occupied by their piece"
            );
        });        
    });
    
    t.test("moving on the board", t => {
       t.test("player 1", t => {
          t.plan(1);
          
          const moveOnBoard = {
            currentPosition: -1,
            numberOfSpaces: 4,
            isBar: false    
          };
          
          const oldGameState = getInitialGameState();
          
          const newGameState = getInitialGameState();
          newGameState.playerOne.initialPieces = 14;
          newGameState.board[3].isPlayerOne = true;
          newGameState.board[3].numPieces = 1;
          
          t.deepEqual(
              makeMove(oldGameState, moveOnBoard),
              newGameState,
              "the correct game state is returned when player one moves a piece onto the board"
          ); 
       });
       
       t.test("player 2", t => {
           t.plan(1);
           
            const moveOnBoard = {
                currentPosition: 24,
                numberOfSpaces: 4,
                isBar: false    
            };
            
            const oldGameState = getInitialGameState();
            oldGameState.isPlayerOne = false;
            
            const newGameState = getInitialGameState();
            newGameState.isPlayerOne = false;
            newGameState.playerTwo.initialPieces = 14;
            newGameState.board[20].isPlayerOne = false;
            newGameState.board[20].numPieces = 1;
            
            t.deepEqual(
                makeMove(oldGameState, moveOnBoard),
                newGameState,
                "the correct game state is returned when player 2 moves a piece onto the board"
            ); 
       }); 
    });
    
    t.test("moving off the board", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const moveOffBoard = {
                currentPosition: 22,
                numberOfSpaces: 3,
                isBar: false
            };
            
            const oldGameState = getInitialGameState();
            oldGameState.board[moveOffBoard.currentPosition].isPlayerOne = true;
            oldGameState.board[moveOffBoard.currentPosition].numPieces = 1;
            oldGameState.board[20].isPlayerOne = true;
            oldGameState.board[20].numPieces = 2;
            oldGameState.playerOne.winningPieces = 12;
            oldGameState.playerOne.initialPieces = 0;
            
            const newGameState = getInitialGameState();
            newGameState.board[20].isPlayerOne = true;
            newGameState.board[20].numPieces = 2;
            newGameState.playerOne.winningPieces = 13;
            newGameState.playerOne.initialPieces = 0;
            
            t.deepEqual(
                makeMove(oldGameState, moveOffBoard),
                newGameState,
                "the correct game state is returned when player 1 move a piece off the board"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            const moveOffBoard = {
                currentPosition: 1,
                numberOfSpaces: 3,
                isBar: false    
            };
            
            const oldGameState = getInitialGameState();
            oldGameState.isPlayerOne = false;
            oldGameState.board[moveOffBoard.currentPosition].isPlayerOne = false;
            oldGameState.board[moveOffBoard.currentPosition].numPieces = 1;
            oldGameState.board[3].isPlayerOne = false;
            oldGameState.board[3].numPieces = 2;
            oldGameState.playerTwo.initialPieces = 0;
            oldGameState.playerTwo.winningPieces = 12;
            
            const newGameState = getInitialGameState();
            newGameState.isPlayerOne = false;
            newGameState.board[3].isPlayerOne = false;
            newGameState.board[3].numPieces = 2;
            newGameState.playerTwo.initialPieces = 0;
            newGameState.playerTwo.winningPieces = 13;
            
            t.deepEqual(
                makeMove(oldGameState, moveOffBoard),
                newGameState,
                "the correct game state is returned when player 2 moves a piece off the board"
            );         
        });
    });
    
    t.test("moving to the other player's space", t => {
        const moveToOpposingSpace = {
            currentPosition: 16,
            numberOfSpaces: 2,
            isBar: false
        };
        
        t.test("player 1", t => {
            t.plan(1);
            
            const oldGameState = getInitialGameState();
            oldGameState.board[moveToOpposingSpace.currentPosition].isPlayerOne = true;
            oldGameState.board[moveToOpposingSpace.currentPosition].numPieces = 1;
            oldGameState.board[
                moveToOpposingSpace.currentPosition + moveToOpposingSpace.numberOfSpaces
            ].isPlayerOne = false;
            oldGameState.board[
                moveToOpposingSpace.currentPosition + moveToOpposingSpace.numberOfSpaces
            ].numPieces = 1;
            
            const newGameState = getInitialGameState();
            newGameState.board[18].isPlayerOne = true;
            newGameState.board[18].numPieces = 1;
            newGameState.playerTwo.barPieces = 1;
            
            t.deepEqual(
                makeMove(oldGameState, moveToOpposingSpace),
                newGameState,
                "the correct game state is returned when player 1 moves to a space with one of player 2's pieces"
            );
        });
        
        t.test("player 2", t => {
            t.plan(1);
            
            const oldGameState = getInitialGameState();
            oldGameState.isPlayerOne = false;
            oldGameState.board[moveToOpposingSpace.currentPosition].isPlayerOne = false;
            oldGameState.board[moveToOpposingSpace.currentPosition].numPieces = 1;
            oldGameState.board[
                moveToOpposingSpace.currentPosition - moveToOpposingSpace.numberOfSpaces
            ].isPlayerOne = true;
            oldGameState.board[
                moveToOpposingSpace.currentPosition - moveToOpposingSpace.numberOfSpaces
            ].numPieces = 1;
            
            const newGameState = getInitialGameState();
            newGameState.isPlayerOne = false;
            newGameState.board[14].isPlayerOne = false;
            newGameState.board[14].numPieces = 1;
            newGameState.playerOne.barPieces = 1;
            
            t.deepEqual(
                makeMove(oldGameState, moveToOpposingSpace),
                newGameState,
                "the correct game state is returned when player 2 moves to a space with one of player 1's pieces"
            );
        });    
    });
    
    t.test("moving off the bar", t => {
        t.test("player 1", t => {
            t.plan(1);
           
            const moveOffBar = {
               currentPosition: -1,
               numberOfSpaces: 5,
               isBar: true
            };
            
            const oldGameState = getInitialGameState();
            oldGameState.playerOne.barPieces = 1;
            
            const newGameState = getInitialGameState();
            newGameState.board[4].isPlayerOne = true;
            newGameState.board[4].numPieces = 1;
            
            t.deepEqual(
                makeMove(oldGameState, moveOffBar),
                newGameState,
                "the correct game state is returned when player 1 moves a piece off the bar"
            );    
       });
       
        t.test("player 2", t => {
            t.plan(1);
            
            const moveOffBar = {
                currentPosition: 24,
                numberOfSpaces: 5,
                isBar: true    
            };
            
            const oldGameState = getInitialGameState();
            oldGameState.isPlayerOne = false;
            oldGameState.playerTwo.barPieces = 1;
            
            const newGameState = getInitialGameState();
            newGameState.isPlayerOne = false;
            newGameState.board[19].isPlayerOne = false;
            newGameState.board[19].numPieces = 1;
            
            t.deepEqual(
                makeMove(oldGameState, moveOffBar),
                newGameState,
                "the correct game state is returned when player 2 moves a piece off the bar"
            ); 
       }); 
    });
    
    t.test("throws an error", t => {
       t.plan(2);
       
       const invalidMove = {
          currentPosition: 12,
          numberOfSpaces: 2,
          isBar: false 
       };
       
       const oldGameState = getInitialGameState();
       
       try {
           makeMove(oldGameState, invalidMove);
           t.fail("makeMove should have thrown an error for an invalid move");
       } catch (error) {
           t.equal(error.proposedMove, invalidMove, "error.proposedMove is the same as the invalid move");
           t.equal(error.gameState, oldGameState, "error.gameState is the same as the gameState");
       }
        
    });
    
    t.test("new game state is not the same as old game state", t => {
        t.plan(2);
       
        const oldGameState = getInitialGameState();
        oldGameState.isPlayerOne = false;
        
        const proposedMove = {
            currentPosition: 24,
            numberOfSpaces: 3,
            isBar: false
        };
       
       const newGameState = makeMove(oldGameState, proposedMove);
       
       t.equal(newGameState === oldGameState, false, "the function returns a new game state");
       t.equal(
           oldGameState.board[21].isPlayerOne === null && oldGameState.board[21].numPieces === 0,
           true,
           "the old game state is not changed"
        ); 
    });  
});            