"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;

const isValidTurn = aceyDeuceyGameEngine.isValidTurn;

test.only("isValidTurn", t => {
    t.test("moving one piece", t => {
        t.test("player 1", t => {
            t.plan(5);
            
            const diceRoll = [2, 4];
            
            const proposedMovesForOnePiece = [
                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 8, numberOfSpaces: diceRoll[1], isBar: false}
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
            
            const tooManyValidMoves = [
                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 8, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 12, numberOfSpaces: diceRoll[0], isBar: false}
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, tooManyValidMoves),
                false,
                "the turn is invalid when player 1 has too many moves"
            );
            
            const tooManyDice = [2, 4, 6];
            
            t.equal(
                isValidTurn(gameState, tooManyDice, proposedMovesForOnePiece),
                false,
                "the turn is invalid when there are too many dice"
            );
        });
        
        t.test("player 2", t => {
            t.plan(5);                
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[15].isPlayerOne = false;
            gameState.board[15].numPieces = 1;
            
            const diceRoll = [2, 4];
            
            const proposedMovesForOnePiece = [
                {currentPosition: 15, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 13, numberOfSpaces: diceRoll[1], isBar: false}
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
            
            const tooManyValidMoves = [
                {currentPosition: 15, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 13, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 9, numberOfSpaces: diceRoll[0], isBar: false}
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, tooManyValidMoves),
                false,
                "the turn is invalid when player 2 has too many moves"
            );
        
            const tooManyDice = [2, 4, 6];
            
            t.equal(
                isValidTurn(gameState, tooManyDice, proposedMovesForOnePiece),
                false,
                "the turn is invalid when there are too many dice"
            );                                
        });
    });
    
    t.test("moving two pieces", t => {
        t.test("player 1", t => {
            t.plan(1);
            
            const diceRoll = [6, 1];
                        
            const proposedMovesForTwoPieces = [
                {currentPosition: 12, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 2, numberOfSpaces: diceRoll[0], isBar: false}
            ];
            
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
            
            const diceRoll = [6, 1];
            
            const proposedMovesForTwoPieces = [
                {currentPosition: 21, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 18, numberOfSpaces: diceRoll[0], isBar: false}
            ];
                                   
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
    
    t.test("doubles", t => {
        t.test("player 1", t => {
            t.plan(3);
            
            const diceRoll = [4, 4];
            
            const proposedDoublesMoves = [
                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false}
            ];
            
            const gameState = getInitialGameState();
            gameState.board[proposedDoublesMoves[0].currentPosition].isPlayerOne = true;
            gameState.board[proposedDoublesMoves[0].currentPosition].numPieces = 1;
            gameState.board[proposedDoublesMoves[1].currentPosition].isPlayerOne = true;
            gameState.board[proposedDoublesMoves[1].currentPosition].numPieces = 2;
            gameState.board[proposedDoublesMoves[3].currentPosition].isPlayerOne = true;
            gameState.board[proposedDoublesMoves[3].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedDoublesMoves),
                true,
                "the turn is valid when player 1 moves four times for doubles"
            );
            
            const notAllDoublesMoves = [
                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: 5, isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false}                
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, notAllDoublesMoves),
                false,
                "the turn is not valid player 1 proposes four moves that aren't all the same number of spaces"
            );
            
            const tooManyDoubles = [
                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 6, numberOfSpaces: diceRoll[1], isBar: false}
            ];
            
            gameState.board[tooManyDoubles[4].currentPosition].isPlayerOne = true;
            gameState.board[tooManyDoubles[4].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, diceRoll, tooManyDoubles),
                false,
                "the turn is not valid when player 1 proposes five moves"
            );            
        });
        
        t.test("player 2", t=> {
            t.plan(3);
            
            const diceRoll = [4, 4];
            
            const proposedDoublesMoves = [
                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false}
            ];
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[proposedDoublesMoves[0].currentPosition].isPlayerOne = false;
            gameState.board[proposedDoublesMoves[0].currentPosition].numPieces = 1;
            gameState.board[proposedDoublesMoves[1].currentPosition].isPlayerOne = false;
            gameState.board[proposedDoublesMoves[1].currentPosition].numPieces = 2;
            gameState.board[proposedDoublesMoves[3].currentPosition].isPlayerOne = false;
            gameState.board[proposedDoublesMoves[3].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, diceRoll, proposedDoublesMoves),
                true,
                "the turn is valid when player 2 moves four times for doubles"
            );
            
            const notAllDoublesMoves = [
                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: 2, isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false}                
            ];
            
            t.equal(
                isValidTurn(gameState, diceRoll, notAllDoublesMoves),
                false,
                "the turn is not valid player 2 proposes four moves that aren't all the same number of spaces"
            );            
            
            const tooManyDoubles = [
                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[0], isBar: false},
                {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false},
                {currentPosition: 6, numberOfSpaces: diceRoll[1], isBar: false}
            ];
            
            gameState.board[tooManyDoubles[4].currentPosition].isPlayerOne = false;
            gameState.board[tooManyDoubles[4].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, diceRoll, tooManyDoubles),
                false,
                "the turn is not valid when player 2 proposes five moves"
            );            
        });
    });
    
    t.test("acey deucey", t => {
        t.test("player 1", t => {
            t.plan(5);
            
            const aceyDeuceyRoll = [1, 2, 6];
            
            const proposedAceyDeuceyMoves = [
                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
            ];
            
            const gameState = getInitialGameState();
            gameState.board[proposedAceyDeuceyMoves[0].currentPosition].isPlayerOne = true;
            gameState.board[proposedAceyDeuceyMoves[0].currentPosition].numPieces = 1;
            gameState.board[proposedAceyDeuceyMoves[1].currentPosition].isPlayerOne = true;
            gameState.board[proposedAceyDeuceyMoves[1].currentPosition].numPieces = 1;
            gameState.board[proposedAceyDeuceyMoves[2].currentPosition].isPlayerOne = true;
            gameState.board[proposedAceyDeuceyMoves[2].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, aceyDeuceyRoll, proposedAceyDeuceyMoves),
                true,
                "the turn is valid when player 1 moves a one, a two, and four of another number"
            );
            
            const notEnoughMoves = [
                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
            ];
            
             t.equal(
                 isValidTurn(gameState, aceyDeuceyRoll, notEnoughMoves),
                 false,
                 "the turn is not valid when player 1 proposes only 5 moves"
             );            

            const notEnoughDoubles = [
                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 16, numberOfSpaces: 2, isBar: false}
            ];            
            
            t.equal(
                isValidTurn(gameState, aceyDeuceyRoll, notEnoughDoubles),
                false,
                "the turn is not valid when player 1 does not have the correct number of spaces"
            );
            
            const notAceyDeucey = [3, 2, 5];
            
            t.equal(
                isValidTurn(gameState, notAceyDeucey, proposedAceyDeuceyMoves),
                false,
                "the turn is not valid when the dice roll is not an acey deucey"
            );
            
            const doublesFirstMove = [
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},                
            ];
            
            t.equal(
                isValidTurn(gameState, aceyDeuceyRoll, doublesFirstMove),
                false,
                "the turn is not valid when player 1 does not move the one and two first"
            );
        });
        
        t.test("player 2", t => {
            t.plan(5);
            
            const aceyDeuceyRoll = [1, 2, 6];
            
            const proposedAceyDeuceyMoves = [
                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 21, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
            ];
            
            const gameState = getInitialGameState();
            gameState.isPlayerOne = false;
            gameState.board[proposedAceyDeuceyMoves[0].currentPosition].isPlayerOne = false;
            gameState.board[proposedAceyDeuceyMoves[0].currentPosition].numPieces = 1;
            gameState.board[proposedAceyDeuceyMoves[1].currentPosition].isPlayerOne = false;
            gameState.board[proposedAceyDeuceyMoves[1].currentPosition].numPieces = 1;
            gameState.board[proposedAceyDeuceyMoves[2].currentPosition].isPlayerOne = false;
            gameState.board[proposedAceyDeuceyMoves[2].currentPosition].numPieces = 1;
            
            t.equal(
                isValidTurn(gameState, aceyDeuceyRoll, proposedAceyDeuceyMoves),
                true,
                "the turn is valid when player 2 moves a one, a two, and four of another number"
            );
            
            const notEnoughMoves = [
                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 23, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
            ];
            
             t.equal(
                 isValidTurn(gameState, aceyDeuceyRoll, notEnoughMoves),
                 false,
                 "the turn is not valid when player 2 proposes only 5 moves"
             );            

            const notEnoughDoubles = [
                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 23, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 13, numberOfSpaces: 2, isBar: false}
            ];            
            
            t.equal(
                isValidTurn(gameState, aceyDeuceyRoll, notEnoughDoubles),
                false,
                "the turn is not valid when player 2 does not have the correct number of spaces"
            );
            
            const notAceyDeucey = [3, 2, 5];
            
            t.equal(
                isValidTurn(gameState, notAceyDeucey, proposedAceyDeuceyMoves),
                false,
                "the turn is not valid when the dice roll is not an acey deucey"
            );
            
            const doublesFirstMove = [
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                {currentPosition: 21, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},                
            ];
            
            t.equal(
                isValidTurn(gameState, aceyDeuceyRoll, doublesFirstMove),
                false,
                "the turn is not valid when player 2 does not move the one and two first"
            );
                                    
        });        
    });
});