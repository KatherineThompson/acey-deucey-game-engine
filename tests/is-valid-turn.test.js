"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getInitialGameState = aceyDeuceyGameEngine.getInitialGameState;

const isValidTurn = aceyDeuceyGameEngine.isValidTurn;

test("isValidTurn", t => {
    t.test("proposed moves are each valid", t => {
        t.test("proposed moves are valid", t => {
            t.test("player 1", t => {
                t.plan(1);
                const diceRoll = [5, 1];
                
                const proposedMoves = [
                    {currentPosition: 3, numberOfSpaces: diceRoll[1], isBar: false},
                    {currentPosition: 8, numberOfSpaces: diceRoll[0], isBar: false}
                ];
                
                const gameState = getInitialGameState();
                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                
                t.equal(
                    isValidTurn(gameState, diceRoll, proposedMoves),
                    true,
                    "the turn is valid when player 1 make 2 moves that are each valid on a normal roll"
                );
            });
            t.test("player 2", t => {
                t.plan(1);
                const diceRoll = [5, 1];
                
                const proposedMoves = [
                    {currentPosition: 13, numberOfSpaces: diceRoll[1], isBar: false},
                    {currentPosition: 18, numberOfSpaces: diceRoll[0], isBar: false}
                ];
                
                const gameState = getInitialGameState();
                gameState.isPlayerOne = false;
                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                
                t.equal(
                    isValidTurn(gameState, diceRoll, proposedMoves),
                    true,
                    "the turn is valid when player 2 make 2 moves that are each valid on a normal roll"
                );
            });
        });
        t.test("proposed moves are invalid", t => {
            t.test("player 1", t => {
                t.plan(1);
                const diceRoll = [5, 1];
                const gameState = getInitialGameState();
                
                const proposedMoves = [
                    {currentPosition: 3, numberOfSpaces: diceRoll[1], isBar: false},
                    {currentPosition: 8, numberOfSpaces: diceRoll[0], isBar: false}
                ];  
                              
                t.equal(
                    isValidTurn(gameState, diceRoll, proposedMoves),
                    false,
                    "the turn is valid when player 1 make 2 moves that are not each valid on a normal roll"
                );
            });
            t.test("player 2", t => {
                t.plan(1);
                const diceRoll = [5, 1];
                
                const proposedMoves = [
                    {currentPosition: 13, numberOfSpaces: diceRoll[1], isBar: false},
                    {currentPosition: 18, numberOfSpaces: diceRoll[0], isBar: false}
                ];          
                
                const gameState = getInitialGameState();
                gameState.isPlayerOne = false;
                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                                      
                t.equal(
                    isValidTurn(gameState, diceRoll, proposedMoves),
                    false,
                    "the turn is invalid when player 2 make 2 moves that are not each valid on a normal roll"
                );
                
            });
        });
    });
    
    t.test("proposed moves match dice", t => {
        t.test("dice are invalid", t => {
            t.test("dice have the wrong value", t => {
                t.plan(1);
                const diceRoll = [-1, 12];
                
                const proposedMoves = [
                    {currentPosition: 3, numberOfSpaces: diceRoll[0], isBar: false},
                    {currentPosition: 6, numberOfSpaces: diceRoll[1], isBar: false}
                ];
                
                const gameState = getInitialGameState();
                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                
                t.equal(
                    isValidTurn(gameState, diceRoll, proposedMoves),
                    false,
                    "the turn is not valid when the dice values are not within the range 1-6"
                );
                
            });            
            t.test("too many dice", t => {
                t.plan(1);
                const diceRoll = [2, 3, 4, 5];
                
                const proposedMoves = [
                    {currentPosition: 3, numberOfSpaces: diceRoll[0], isBar: false},
                    {currentPosition: 6, numberOfSpaces: diceRoll[1], isBar: false},
                    {currentPosition: 9, numberOfSpaces: diceRoll[2], isBar: false},
                    {currentPosition: 12, numberOfSpaces: diceRoll[3], isBar: false}
                ];
                
                const gameState = getInitialGameState();
                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                gameState.board[proposedMoves[2].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[2].currentPosition].numPieces = 1;

                t.equal(
                    isValidTurn(gameState, diceRoll, proposedMoves),
                    false,
                    "the turn is not valid when there are too many dice"
                );
            });            
            t.test("too few dice", t => {
                t.plan(1);
                const diceRoll = [6];
                
                const proposedMoves = [{currentPosition: 3, numberOfSpaces: diceRoll[0], isBar: false}];
                
                const gameState = getInitialGameState();
                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                
                t.equal(
                    isValidTurn(gameState, diceRoll, proposedMoves),
                    false,
                    "the turn is not valid when there are too few dice"
                );
            });            
        });
        t.test("acey deucey rolls", t => {
            t.test("three dice but not an acey deucey roll", t => {
                t.test("player 1", t => {
                    t.plan(1);
                    const notAceyDeucey = [3, 2, 5];
            
                    const proposedAceyDeuceyMoves = [
                        {currentPosition: 4, numberOfSpaces: notAceyDeucey[0], isBar: false},
                        {currentPosition: 8, numberOfSpaces: notAceyDeucey[1], isBar: false},
                        {currentPosition: 10, numberOfSpaces: notAceyDeucey[2], isBar: false},
                        {currentPosition: 10, numberOfSpaces: notAceyDeucey[2], isBar: false},
                        {currentPosition: 16, numberOfSpaces: notAceyDeucey[2], isBar: false},
                        {currentPosition: 16, numberOfSpaces: notAceyDeucey[2], isBar: false},
                    ];
                    
                    const gameState = getInitialGameState();
                    gameState.board[proposedAceyDeuceyMoves[0].currentPosition].isPlayerOne = true;
                    gameState.board[proposedAceyDeuceyMoves[0].currentPosition].numPieces = 1;
                    gameState.board[proposedAceyDeuceyMoves[1].currentPosition].isPlayerOne = true;
                    gameState.board[proposedAceyDeuceyMoves[1].currentPosition].numPieces = 1;
                    gameState.board[proposedAceyDeuceyMoves[2].currentPosition].isPlayerOne = true;
                    gameState.board[proposedAceyDeuceyMoves[2].currentPosition].numPieces = 1;
                    
                    t.equal(
                        isValidTurn(gameState, notAceyDeucey, proposedAceyDeuceyMoves),
                        false,
                        "the turn is not valid when the dice roll is not an acey deucey"
                    );
                });
                t.test("player 2", t => {
                    t.plan(1);
                    const notAceyDeucey = [3, 2, 5];
            
                    const proposedAceyDeuceyMoves = [
                        {currentPosition: 18, numberOfSpaces: notAceyDeucey[0], isBar: false},
                        {currentPosition: 21, numberOfSpaces: notAceyDeucey[1], isBar: false},
                        {currentPosition: 19, numberOfSpaces: notAceyDeucey[2], isBar: false},
                        {currentPosition: 19, numberOfSpaces: notAceyDeucey[2], isBar: false},
                        {currentPosition: 13, numberOfSpaces: notAceyDeucey[2], isBar: false},
                        {currentPosition: 13, numberOfSpaces: notAceyDeucey[2], isBar: false},
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
                        isValidTurn(gameState, notAceyDeucey, proposedAceyDeuceyMoves),
                        false,
                        "the turn is not valid when the dice roll is not an acey deucey"
                    );
                });
            });
            t.test("no proposed moves", t => {
                t.test("valid", t => {
                    t.test("player 1", t => {
                        t.plan(1);
                        const aceyDeuceyRoll = [2, 1, 5];
                        
                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.playerOne.initialPieces = 0;
                        gameState.board[6].isPlayerOne = true;
                        gameState.board[6].numPieces = 1;
                        gameState.board[7].isPlayerOne = false;
                        gameState.board[7].numPieces = 2;
                        gameState.board[8].isPlayerOne = false;
                        gameState.board[8].numPieces = 2;

                        
                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            true,
                            "the turn is valid when player 1 cannot move a 1 or 2"
                        );                        
                    });
                    t.test("player 2", t => {
                        t.plan(1);
                        const aceyDeuceyRoll = [2, 1, 5];
                        
                        const proposedMoves = [];  
                                              
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.playerTwo.initialPieces = 0;
                        gameState.board[9].isPlayerOne = false;
                        gameState.board[9].numPieces = 1;
                        gameState.board[7].isPlayerOne = true;
                        gameState.board[7].numPieces = 2;
                        gameState.board[8].isPlayerOne = true;
                        gameState.board[8].numPieces = 2;

                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            true,
                            "the turn is valid when player 2 cannot move a 1 or 2"
                        );    
                    });
                }); 
                t.test("invalid", t => {
                    t.test("player 1", t => {
                        t.plan(1);
                        const aceyDeuceyRoll = [2, 1, 5];
                        
                        const proposedMoves = []; 
                                               
                        const gameState = getInitialGameState();
                        gameState.playerOne.initialPieces = 0;
                        gameState.board[6].isPlayerOne = true;
                        gameState.board[6].numPieces = 1;
                        gameState.board[7].isPlayerOne = false;
                        gameState.board[7].numPieces = 2;
                        
                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 1 can move a 1 or 2"
                        );          
                    });
                   
                    t.test("player 2", t => {
                        t.plan(1);
                        const aceyDeuceyRoll = [2, 1, 5];
                        
                        const proposedMoves = [];             
                                   
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.playerTwo.initialPieces = 0;
                        gameState.board[9].isPlayerOne = false;
                        gameState.board[9].numPieces = 1;
                        gameState.board[7].isPlayerOne = true;
                        gameState.board[7].numPieces = 2;

                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 2 can move a 1 or 2"
                        );        
                    });
                }); 
            });
            t.test("1 proposed move", t => {
                t.test("number of spaces is not 1 or 2", t => {
                    t.test("player 1", t => {
                        t.plan(1);
                        
                        const aceyDeuceyRoll = [1, 2, 3];
                        
                        const proposedMoves = [{currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}];
                        
                        const gameState = getInitialGameState();
                        gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                        gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                        
                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 1 has 1 proposed move and it doesn't move 1 or 2 spaces"
                        );
                    });
                    
                    t.test("player 2", t => {
                        t.plan(1);
                        const aceyDeuceyRoll = [1, 2, 3];
                        
                        const proposedMoves = [{currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}];
                        
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                        gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                        
                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 2 has 1 proposed move and it doesn't move 1 or 2 spaces"
                        );
                    });
                });
                               
                t.test("number of spaces is 1 or 2", t => {
                    t.test("valid", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 3];
                        
                            const proposedMoves = [
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[14].isPlayerOne = false;
                            gameState.board[14].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 1 proposed move, it moves" + 
                                    " 1 or 2 spaces, and there are no more available spaces"
                            );
                        });
                        
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 3];
                        
                            const proposedMoves = [
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[8].isPlayerOne = true;
                            gameState.board[8].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 has 1 proposed move, it moves" + 
                                    " 1 or 2 spaces, and there are no more available spaces"
                            );
                        });
                    });
                                   
                    t.test("invalid", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 3];
                        
                            const proposedMoves = [
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;

                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 1 has 1 proposed move, it moves" + 
                                    " 1 or 2 spaces, and there are still available spaces"
                            );
                            
                        });
                        
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 3];
                        
                            const proposedMoves = [
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;

                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 2 has 1 proposed move, it moves" + 
                                    " 1 or 2 spaces, and there are still available spaces"
                            );
                            
                        });
                    });               
                });               
            });
            t.test("2 proposed moves", t => {
                t.test("only 1 or 2", t => {
                    t.test("player 1", t => {
                        t.plan(1);
                        const aceyDeuceyRoll = [2, 1, 4];
                        
                        const proposedMoves = [
                            {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                            {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[0], isBar: false}
                        ];
                        
                        const gameState = getInitialGameState();
                        gameState.playerOne.initialPieces = 0;
                        gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                        gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                        gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                        gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                        gameState.board[23].isPlayerOne = false;
                        gameState.board[23].numPieces = 2;
                        gameState.board[19].isPlayerOne = false;
                        gameState.board[19].numPieces = 2;
                        
                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 1 has 2 proposed moves and they do not have a 1 and 2"
                        );
                    });
                    t.test("player 2", t => {
                        t.plan(1);
                        const aceyDeuceyRoll = [2, 1, 4];
                        
                        const proposedMoves = [
                            {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                            {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[0], isBar: false}
                        ];
                        
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.playerTwo.initialPieces = 0;
                        gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                        gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                        gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                        gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                        gameState.board[13].isPlayerOne = true;
                        gameState.board[13].numPieces = 2;
                        
                        t.equal(
                            isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 2 has 2 proposed moves and they do not have a 1 and 2"
                        );
                    });
                });
                t.test("1 and 1", t => {
                    t.test("moving off board", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [2, 1, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 23, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 23, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;

                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 2 proposed moves that are moving off the board" + 
                                    " and they have a 1 and 1"
                            );
                            
                        });
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [2, 1, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 0, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 0, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 has 2 proposed moves that are moving off the board" + 
                                    " and they have a 1 and 1"
                            );
                        });
                    });
                    
                    t.test("not moving off board", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [2, 1, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 2, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 3, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[7].isPlayerOne = false;
                            gameState.board[7].numPieces = 2;
                            gameState.board[8].isPlayerOne = false;
                            gameState.board[8].numPieces = 2;

                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is valid when player 1 has 2 proposed moves that are not moving off the" + 
                                    " board and they have a 1 and 1"
                            );
                        });
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [2, 1, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 17, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[11].isPlayerOne = false;
                            gameState.board[11].numPieces = 2;
                            gameState.board[12].isPlayerOne = false;
                            gameState.board[12].numPieces = 2;

                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is valid when player 2 has 2 proposed moves that are not moving off the" + 
                                    " board and they have a 1 and 1"
                            );
                        });
                    });
                });
                t.test("1 and 2", t => {
                    t.test("valid", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[21].isPlayerOne = false;
                            gameState.board[21].numPieces = 2;
                            gameState.board[22].isPlayerOne = false;
                            gameState.board[22].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 2 moves with a 1 and 2 and there are no" +
                                    " available spaces"
                            );
                        });
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[11].isPlayerOne = true;
                            gameState.board[11].numPieces = 2;
                            gameState.board[10].isPlayerOne = true;
                            gameState.board[10].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 has 2 moves with a 1 and 2 and there are no" +
                                    " available spaces"
                            );
                        });
                    });
                    
                    t.test("invalid", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[21].isPlayerOne = false;
                            gameState.board[21].numPieces = 2;

                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is valid when player 1 has 2 moves with a 1 and 2 and there are still" +
                                    " available spaces"
                            );
                        });
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[11].isPlayerOne = true;
                            gameState.board[11].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is valid when player 2 has 2 moves with a 1 and 2 and there are still" +
                                    " available spaces"
                            );
                        });
                    });
                });
            });
            t.test("3-5 proposed moves", t => {
                t.test("valid", t => {
                     t.test("no available spaces", t => {
                         t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [2, 1, 3];
                            
                            const proposedMoves = [
                                {currentPosition: 5, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 12, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 5, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[10].isPlayerOne = false;
                            gameState.board[10].numPieces = 2;
                            gameState.board[16].isPlayerOne = false;
                            gameState.board[16].numPieces = 2;
                            gameState.board[11].isPlayerOne = false;
                            gameState.board[11].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 3 proposed moves and there are no available spaces"
                            );
                         });
                         t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [2, 1, 3];
                            
                            const proposedMoves = [
                                {currentPosition: 17, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 17, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 14, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[proposedMoves[2].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                            gameState.board[12].isPlayerOne = true;
                            gameState.board[12].numPieces = 2;
                            gameState.board[13].isPlayerOne = true;
                            gameState.board[13].numPieces = 2;
                            gameState.board[8].isPlayerOne = true;
                            gameState.board[8].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 has 3 proposed moves and there are no available spaces"
                            );
                         });
                     });
                     
                     t.test("moving off with unmatching dice", t => {
                         t.test("player 1", t => {
                             t.plan(1);
                             const aceyDeuceyRoll = [2, 1, 4];
                             
                             const proposedMoves = [
                                 {currentPosition: 22, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                 {currentPosition: 23, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                 {currentPosition: 21, numberOfSpaces: 3, isBar: false}
                             ];
                             
                             const gameState = getInitialGameState();
                             gameState.playerOne.initialPieces = 0;
                             gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                             gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                             gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                             gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                             gameState.board[proposedMoves[2].currentPosition].isPlayerOne = true;
                             gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                             
                             t.equal(
                                 isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                 true,
                                 "the turn is valid when player 1 has 3 moves moving off the board and the number of" +
                                    " spaces don't match the dice"
                             );                             
                         }); 
                         
                         t.test("player 2", t => {
                             t.plan(1);
                             const aceyDeuceyRoll = [2, 1, 4];
                             
                             const proposedMoves = [
                                 {currentPosition: 0, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                 {currentPosition: 0, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                 {currentPosition: 3, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                             ];
                             
                             const gameState = getInitialGameState();
                             gameState.isPlayerOne = false;
                             gameState.playerTwo.initialPieces = 0;
                             gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                             gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                             gameState.board[proposedMoves[2].currentPosition].isPlayerOne = false;
                             gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                             
                             t.equal(
                                 isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                 true,
                                 "the turn is valid when player 2 has 3 moves moving off the board and the number of" +
                                    " spaces don't match the dice"
                             );                             
                         }); 
                         
                     });
                });    
                t.test("invalid", t => {
                    t.test("available spaces", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 6];
                            
                            const proposedMoves = [
                                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[2].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 1 proposes only 5 moves and there are available" +
                                    " spaces left"
                            );            
                        });
                        
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 6];
                            
                            const proposedMoves = [
                                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 23, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[2].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 1 proposes only 5 moves and there are available" +
                                    " spaces left"
                            );    
                        });
                    });
                    
                    t.test("dice don't match number of spaces and are not winning", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 6];
                            
                            const proposedMoves = [
                                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 16, numberOfSpaces: 2, isBar: false}
                            ];     
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[2].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 1 does not have the correct number of spaces and" +
                                    " is not moving off the board"
                            );
                        });
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 6];
                            
                            const proposedMoves = [
                                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 23, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 13, numberOfSpaces: 2, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[2].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 2 does not have the correct number of spaces and" +
                                    " is not moving off the board"
                            );
                        });
                    });
                    
                    t.test("1 and 2 are not moved first", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 6];
                            
                            const proposedMoves = [
                                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 6, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[2].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                            gameState.board[11].isPlayerOne = false;
                            gameState.board[11].numPieces = 2;
                            gameState.board[14].isPlayerOne = false;
                            gameState.board[14].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 1 does not move the one and two first"
                            );
                        });
                        t.test("player 2", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 6];
                            
                            const proposedMoves = [
                                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 21, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}  
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[2].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                            gameState.board[11].isPlayerOne = true;
                            gameState.board[11].numPieces = 2;
                            gameState.board[7].isPlayerOne = true;
                            gameState.board[7].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 2 does not move the one and two first"
                            );                            
                        });
                    });
                });    
            });
            t.test("6 proposed moves", t => {
                t.test("valid", t => {
                    t.test("normal acey deucey", t => {
                        t.test("player 1", t => {
                            t.plan(1);
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
                        });
                        t.test("player 2", t => {
                            t.plan(1);
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
                        });
                    });
                    
                    t.test("dice don't match and pieces moving off", t => {
                        t.test("player 1", t => {
                           t.plan(1); 
                           const aceyDeuceyRoll = [2, 1, 5];
                           
                           const proposedMoves = [
                               {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                               {currentPosition: 20, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                               {currentPosition: 15, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                               {currentPosition: 15, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                               {currentPosition: 15, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                               {currentPosition: 21, numberOfSpaces: 3, isBar: false},
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.playerOne.initialPieces = 0;
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           gameState.board[proposedMoves[2].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[2].currentPosition].numPieces = 3;
                           
                           t.equal(
                               isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                               true,
                               "the turn is valid when player 1 is moving off the board and moves fewer spaces" +
                                " than are on the dice"
                           );
                        });
                        t.test("player 1", t => {
                           t.plan(1); 
                           const aceyDeuceyRoll = [2, 1, 5];
                           
                           const proposedMoves = [
                               {currentPosition: 5, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                               {currentPosition: 3, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                               {currentPosition: 9, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                               {currentPosition: 9, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                               {currentPosition: 9, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                               {currentPosition: 2, numberOfSpaces: 3, isBar: false},
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.isPlayerOne = false;
                           gameState.playerTwo.initialPieces = 0;
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           gameState.board[proposedMoves[2].currentPosition].isPlayerOne = false;
                           gameState.board[proposedMoves[2].currentPosition].numPieces = 3;
                           
                           t.equal(
                               isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                               true,
                               "the turn is valid when player 2 is moving off the board and moves fewer spaces" +
                                " than are on the dice"
                           );
                        });
                    });
                    
                    t.test("doubles 1s and 2s", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 1];
                            
                            const proposedMoves = [
                                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 5, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 5, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 6, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 7, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 chooses doubles 1s"
                            );
                        });
                        t.test("player 1", t => {
                            t.plan(1);
                            const aceyDeuceyRoll = [1, 2, 2];
                            
                            const proposedMoves = [
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                                {currentPosition: 15, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                                {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 14, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 chooses doubles 1s"
                            );
                        });
                    });
                });

                t.test("invalid", t => {
                    t.test("1 and 2 aren't used first", t => {
                        t.test("player 1", t => {
                           t.plan(1); 
                           const aceyDeuceyRoll = [1, 2, 5];
                           
                           const proposedMoves = [
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 21, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},    
                                {currentPosition: 21, numberOfSpaces: aceyDeuceyRoll[0], isBar: false}    
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                           
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 1 moves a doubles roll first"
                            );                           
                        });
                        t.test("player 2", t => {
                           t.plan(1); 
                           const aceyDeuceyRoll = [1, 2, 5];
                           
                           const proposedMoves = [
                                {currentPosition: 17, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 17, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 12, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 12, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 7, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},    
                                {currentPosition: 7, numberOfSpaces: aceyDeuceyRoll[0], isBar: false}    
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.isPlayerOne = false;
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                           
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 2 moves a doubles roll first"
                            );                           
                        });
                    });
                    t.test("dice don't match and pieces aren't moving off", t => {
                        t.test("player 1", t => {
                           t.plan(1); 
                           const aceyDeuceyRoll = [1, 2, 5];
                           
                           const proposedMoves = [
                                {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},    
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},    
                                {currentPosition: 12, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 12, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 17, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 17, numberOfSpaces: 6, isBar: false}    
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                           
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 1 has a move that does not match the dice and is" +
                                    "not moving off"
                            );                           
                        });
                        t.test("player 2", t => {
                           t.plan(1); 
                           const aceyDeuceyRoll = [1, 2, 5];
                           
                           const proposedMoves = [
                                {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},    
                                {currentPosition: 17, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},    
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 11, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},    
                                {currentPosition: 11, numberOfSpaces: 1, isBar: false}    
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.isPlayerOne = false;
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                           gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                           
                            t.equal(
                                isValidTurn(gameState, aceyDeuceyRoll, proposedMoves),
                                false,
                                "the turn is not valid when player 2 has a move that does not match the dice and is" +
                                    "not moving off"
                            );                           
                        });
                    });
                });
            });
            t.test("6+ proposed moves", t => {
                t.test("player 1", t => {
                    t.plan(1);
                    const aceyDeuceyRoll = [1, 2, 6];

                    const proposedAceyDeuceyMoves = [
                        {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                        {currentPosition: 8, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                        {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 10, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 16, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 4, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                    ];
                    
                    const gameState = getInitialGameState();
                    gameState.board[proposedAceyDeuceyMoves[0].currentPosition].isPlayerOne = true;
                    gameState.board[proposedAceyDeuceyMoves[0].currentPosition].numPieces = 2;
                    gameState.board[proposedAceyDeuceyMoves[1].currentPosition].isPlayerOne = true;
                    gameState.board[proposedAceyDeuceyMoves[1].currentPosition].numPieces = 1;
                    gameState.board[proposedAceyDeuceyMoves[2].currentPosition].isPlayerOne = true;
                    gameState.board[proposedAceyDeuceyMoves[2].currentPosition].numPieces = 1;
                    
                    t.equal(
                        isValidTurn(gameState, aceyDeuceyRoll, proposedAceyDeuceyMoves),
                        false,
                        "the turn is invalid when player 1 has too many valid moves"
                    );                    
                });
                
                t.test("player 2", t => {
                    t.plan(1);
                    const aceyDeuceyRoll = [1, 2, 6];
                    
                    const proposedAceyDeuceyMoves = [
                        {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[0], isBar: false},
                        {currentPosition: 21, numberOfSpaces: aceyDeuceyRoll[1], isBar: false},
                        {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 19, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 13, numberOfSpaces: aceyDeuceyRoll[2], isBar: false},
                        {currentPosition: 18, numberOfSpaces: aceyDeuceyRoll[2], isBar: false}
                    ];
                    
                    const gameState = getInitialGameState();
                    gameState.isPlayerOne = false;
                    gameState.board[proposedAceyDeuceyMoves[0].currentPosition].isPlayerOne = false;
                    gameState.board[proposedAceyDeuceyMoves[0].currentPosition].numPieces = 2;
                    gameState.board[proposedAceyDeuceyMoves[1].currentPosition].isPlayerOne = false;
                    gameState.board[proposedAceyDeuceyMoves[1].currentPosition].numPieces = 1;
                    gameState.board[proposedAceyDeuceyMoves[2].currentPosition].isPlayerOne = false;
                    gameState.board[proposedAceyDeuceyMoves[2].currentPosition].numPieces = 1;
                    
                    t.equal(
                        isValidTurn(gameState, aceyDeuceyRoll, proposedAceyDeuceyMoves),
                        false,
                        "the turn is valid when player 2 has too many valid moves"
                    );                       
                });
            });
        });
        t.test("doubles rolls", t => {
            t.test("no moves", t => {
                t.test("no available spaces", t => {
                    t.test("player 1", t => {
                        t.plan(1);
                        const diceRoll = [3, 3]; 
                        
                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.playerOne.initialPieces = 0;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            true,
                            "the turn is valid when player 1 has no moves and there are no available spaces"
                        );
                    }); 
                    
                    t.test("player 2", t => {
                        t.plan(1); 
                        const diceRoll = [3, 3]; 
                        
                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.playerTwo.initialPieces = 0;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            true,
                            "the turn is valid when player 2 has no moves and there are no available spaces"
                        );
                    }); 
                });
                t.test("available spaces", t => {
                    t.test("player 1", t => {
                        t.plan(1); 
                        const diceRoll = [3, 3]; 
                        
                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.playerOne.initialPieces = 1;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 1 has no moves and there are available spaces"
                        );
                    }); 
                    
                    t.test("player 2", t => {
                        t.plan(1); 
                        const diceRoll = [3, 3]; 
                        
                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.playerTwo.initialPieces = 1;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 2 has no moves and there are available spaces"
                        );
                    }); 
                });
            });
            
            t.test("1-3  moves", t => {
                t.test("valid", t => {
                    t.test("no available spaces", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[14].isPlayerOne = false;
                            gameState.board[14].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 2 moves and there are no available spaces"
                            ); 
                        }); 
                        
                        t.test("player 2", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[5].isPlayerOne = true;
                            gameState.board[5].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 has 1 move and there are no available spaces"
                            ); 
                        }); 
                    });
                    
                    t.test("dice don't match and pieces moving off", t => {
                        t.test("player 1", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 20, numberOfSpaces: diceRoll[0], isBar: false},
                                {currentPosition: 22, numberOfSpaces: 2, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
 
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 2 moves that are moving off and the dice don't" +
                                    " match"
                            ); 
                        }); 
                        
                        t.test("player 2", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 2, numberOfSpaces: 3, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 has 1 move that is moving off and doesn't match" +
                                    " the dice"
                            ); 
                        }); 
                    });
                });
                
                t.test("invalid", t => {
                    t.test("available spaces", t => {
                        t.test("player 1", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;

                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 1 has 2 moves and there are available spaces"
                            );                             
                        }); 
                        
                        t.test("player 2", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 2 has 1 move and there are available spaces"
                            );                             
                        }); 
                    });
                    
                    t.test("dice don't match", t => {
                        t.test("player 1", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                                {currentPosition: 6, numberOfSpaces: 6, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                            gameState.board[14].isPlayerOne = false;
                            gameState.board[14].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 1 has 2 moves that are not moving off the board and" +
                                    " the dice don't match"
                            );                             
                        }); 
                        
                        t.test("player 2", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 13, numberOfSpaces: 1, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[5].isPlayerOne = true;
                            gameState.board[5].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 2 has 1 moves that are not moving off the board and" +
                                    " the dice don't match"
                            );
                        }); 
                    });
                });
            });
            
            t.test("4+ moves", t => {
                t.test("player 1", t => {
                   t.plan(1); 
                   const diceRoll = [2, 2];
                   
                   const proposedMoves = [
                       {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 8, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 10, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 12, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 14, numberOfSpaces: diceRoll[0], isBar: false}
                   ];
                   
                   const gameState = getInitialGameState();
                   gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true; 
                   gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                   
                   t.equal(
                       isValidTurn(gameState, diceRoll, proposedMoves),
                       false,
                       "the turn is not valid when player 1 has more than 4 moves"
                    ); 
                });
                
                t.test("player ", t => {
                   t.plan(1); 
                   const diceRoll = [5, 5];
                   
                   const proposedMoves = [
                       {currentPosition: 22, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 22, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 17, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 17, numberOfSpaces: diceRoll[0], isBar: false},
                       {currentPosition: 12, numberOfSpaces: diceRoll[0], isBar: false}
                   ];
                   
                   const gameState = getInitialGameState();
                   gameState.isPlayerOne = false;
                   gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false; 
                   gameState.board[proposedMoves[0].currentPosition].numPieces = 2;
                   
                   t.equal(
                       isValidTurn(gameState, diceRoll, proposedMoves),
                       false,
                       "the turn is not valid when player 2 has more than 4 moves"
                    ); 
                });
            });
            
            t.test("4 moves", t => {
                t.test("valid", t => {
                    t.test("normal doubles", t => {
                        t.test("player 1", t => {
                            t.plan(1); 
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
                       }); 
                       
                       t.test("player 2", t => {
                            t.plan(1); 
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
                        }); 
                    });
                    
                    t.test("not matching dice and moving off", t => {
                       t.test("player 1", t => {
                          t.plan(1);
                          const diceRoll = [6, 6];
                          
                          const proposedMoves = [
                            {currentPosition: 4, numberOfSpaces: diceRoll[0], isBar: false},     
                            {currentPosition: 10, numberOfSpaces: diceRoll[0], isBar: false},     
                            {currentPosition: 16, numberOfSpaces: diceRoll[0], isBar: false},     
                            {currentPosition: 22, numberOfSpaces: 2, isBar: false}     
                          ];
                          
                          const gameState = getInitialGameState();
                          gameState.playerOne.initialPieces = 0;
                          gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true; 
                          gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                          
                          t.equal(
                              isValidTurn(gameState, diceRoll, proposedMoves),
                              true,
                              "the turn is valid when player 1 is moving off and the dice don't match"
                          );
                       }); 
                       
                       t.test("player 2", t => {
                          t.plan(1); 
                          const diceRoll = [3, 3];
                          
                          const proposedMoves = [
                            {currentPosition:10, numberOfSpaces: diceRoll[0], isBar: false},     
                            {currentPosition: 7, numberOfSpaces: diceRoll[0], isBar: false},     
                            {currentPosition: 4, numberOfSpaces: diceRoll[0], isBar: false},     
                            {currentPosition: 1, numberOfSpaces: 2, isBar: false}     
                          ];
                          
                          const gameState = getInitialGameState();
                          gameState.isPlayerOne = false;
                          gameState.playerTwo.initialPieces = 0;
                          gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false; 
                          gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                          
                          t.equal(
                              isValidTurn(gameState, diceRoll, proposedMoves),
                              true,
                              "the turn is valid when player 2 is moving off and the dice don't match"
                          );
                       }); 
                    });
                });
                
                t.test("invalid", t => {
                    t.test("not matching dice", t => {
                        t.test("player 1", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                          
                            const proposedMoves = [
                                    {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                                    {currentPosition: 5, numberOfSpaces: 5, isBar: false},
                                    {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                                    {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false}                
                                ];
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 2;
                                
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is not valid player 1 has four moves that aren't all the same number of" +
                                    " spaces"
                            );
                        }); 
                       
                        t.test("player 2", t => {
                            t.plan(1); 
                            const diceRoll = [4, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 13, numberOfSpaces: diceRoll[0], isBar: false},
                                {currentPosition: 5, numberOfSpaces: 2, isBar: false},
                                {currentPosition: 5, numberOfSpaces: diceRoll[1], isBar: false},
                                {currentPosition: 9, numberOfSpaces: diceRoll[1], isBar: false}                
                            ];
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is not valid player 2 has four moves that aren't all the same number of" +
                                    " spaces"
                            );            
                        }); 
                    });
                });
            });
        });
        t.test("normal rolls", t => {
            t.test("too many moves", t=> {
                t.test("player 1", t => {
                    t.plan(1); 
                    const diceRoll = [2, 4];
                    
                    const proposedMoves = [
                        {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                        {currentPosition: 8, numberOfSpaces: diceRoll[1], isBar: false},
                        {currentPosition: 12, numberOfSpaces: diceRoll[0], isBar: false}
                    ];
                    
                    const gameState = getInitialGameState();
                    gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                    gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                    gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                    gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                    gameState.board[proposedMoves[2].currentPosition].isPlayerOne = true;
                    gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                    
                    t.equal(
                        isValidTurn(gameState, diceRoll, proposedMoves),
                        false,
                        "the turn is invalid when player 1 has too many moves"
                    );
                });
                
                t.test("player 2", t => {
                    t.plan(1); 
                    const diceRoll = [2, 4];
                    
                    const proposedMoves = [
                        {currentPosition: 15, numberOfSpaces: diceRoll[0], isBar: false},
                        {currentPosition: 13, numberOfSpaces: diceRoll[1], isBar: false},
                        {currentPosition: 9, numberOfSpaces: diceRoll[0], isBar: false}
                    ];
                    
                    const gameState = getInitialGameState();
                    gameState.isPlayerOne = false;
                    gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                    gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                    gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                    gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                    gameState.board[proposedMoves[2].currentPosition].isPlayerOne = false;
                    gameState.board[proposedMoves[2].currentPosition].numPieces = 1;
                    
                    
                    t.equal(
                        isValidTurn(gameState, diceRoll, proposedMoves),
                        false,
                        "the turn is invalid when player 2 has too many moves"
                    );
                });
            });
            
            t.test("no moves", t => {
                t.test("no available spaces", t => {
                    t.test("player 1", t => {
                        t.plan(1);
                        const diceRoll = [4, 5];

                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.playerOne.initialPieces = 0;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            true,
                            "the turn is valid when player 1 has no available moves"
                        );
                    });
                    
                    t.test("player 2", t => {
                        t.plan(1);
                        const diceRoll = [4, 5];
                        
                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.playerTwo.initialPieces = 0;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            true,
                            "the turn is valid when player 2 has no available moves"
                        );
                    });
                });
                
                t.test("available spaces", t => {
                    t.test("player 1", t => {
                        t.plan(1);
                        const diceRoll = [4, 5];

                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.playerOne.initialPieces = 1;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 1 makes no moves but there are available spaces"
                        );
                    });
                    
                    t.test("player 2", t => {
                        t.plan(1);
                        const diceRoll = [4, 5];
                        
                        const proposedMoves = [];
                        
                        const gameState = getInitialGameState();
                        gameState.isPlayerOne = false;
                        gameState.playerTwo.initialPieces = 1;
                        
                        t.equal(
                            isValidTurn(gameState, diceRoll, proposedMoves),
                            false,
                            "the turn is invalid when player 1 makes no moves but there are available spaces"
                        );
                    });
                });
            });
            
            t.test("1 move", t => {
                t.test("valid", t => {
                    t.test("no available spaces", t => {
                        t.test("player 1", t => {
                           t.plan(1); 
                           const diceRoll = [3, 5];
                           
                           const proposedMoves = [
                               {currentPosition: 12, numberOfSpaces: diceRoll[0], isBar: false}
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.playerOne.initialPieces = 0;
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           gameState.board[20].isPlayerOne = false;
                           gameState.board[20].numberOfSpaces = 2;
                           
                           t.equal(
                               isValidTurn(gameState, diceRoll, proposedMoves),
                               true,
                               "the turn is valid when player 1 has 1 move and there are no available spaces"
                           );
                        });
                        
                        t.test("player 2", t => {
                           t.plan(1); 
                           const diceRoll = [3, 5];
                           
                           const proposedMoves = [
                               {currentPosition: 12, numberOfSpaces: diceRoll[1], isBar: false}
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.isPlayerOne = false;
                           gameState.playerTwo.initialPieces = 0;
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           gameState.board[4].isPlayerOne = true;
                           gameState.board[4].numberOfSpaces = 2;
                           
                           t.equal(
                               isValidTurn(gameState, diceRoll, proposedMoves),
                               true,
                               "the turn is valid when player 2 has 1 move and there are no available spaces"
                           );
                        });
                    });    
                    t.test("dice don't match and moving off", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const diceRoll = [3, 5];
                            
                            const proposedMoves = [
                                {currentPosition: 20, numberOfSpaces: 4, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 1 piece moving off and the dice don't match"
                            );
                        });
                        
                        t.test("player 2", t => {
                            t.plan(1);
                            const diceRoll = [3, 5];
                            
                            const proposedMoves = [
                                {currentPosition: 0, numberOfSpaces: 1, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 has 1 piece moving off and the dice don't match"
                            );
                        });
                    });
                    t.test("move with 1 and 2", t => {
                        t.test("player 1", t => {
                            t.plan(1);    
                            const diceRoll = [1, 2];
                            
                            const proposedMoves = [
                                {currentPosition: 8, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[11].isPlayerOne = false;
                            gameState.board[11].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when the roll has a 1 and 2 and player 1 can only move once"
                            );
                        });    
                        
                        t.test("player 2", t => {
                            t.plan(1);    
                            const diceRoll = [2, 1];
                            
                            const proposedMoves = [
                                {currentPosition: 8, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[5].isPlayerOne = true;
                            gameState.board[5].numPieces = 2;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when the roll has a 1 and 2 and player 2 can only move once"
                            );
                        });    
                    });                        
                });
                
                t.test("invalid", t => {
                    t.test("available spaces", t => {
                        t.test("player 1", t => {
                           t.plan(1); 
                           const diceRoll = [3, 5];
                           
                           const proposedMoves = [
                               {currentPosition: 12, numberOfSpaces: diceRoll[0], isBar: false}
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           
                           t.equal(
                               isValidTurn(gameState, diceRoll, proposedMoves),
                               false,
                               "the turn is invalid when player 1 has 1 move and there are available spaces"
                           );
                        });
                        
                        t.test("player 2", t => {
                           t.plan(1); 
                           const diceRoll = [3, 5];
                           
                           const proposedMoves = [
                               {currentPosition: 12, numberOfSpaces: diceRoll[1], isBar: false}
                           ];
                           
                           const gameState = getInitialGameState();
                           gameState.isPlayerOne = false;
                           gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                           gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                           
                           t.equal(
                               isValidTurn(gameState, diceRoll, proposedMoves),
                               false,
                               "the turn is invalid when player 2 has 1 move and there are available spaces"
                           );
                        });
                    });    
                    t.test("dice don't match", t => {
                        t.test("player 1", t => {
                            t.plan(1); 
                            const diceRoll = [3, 5];
                            
                            const proposedMoves = [
                                {currentPosition: 16, numberOfSpaces: 4, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.playerOne.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is valid when player 1 has 1 piece moving off and the dice don't match"
                            );
                        });
                        
                        t.test("player 2", t => {
                            t.plan(1); 
                            const diceRoll = [3, 5];
                            
                            const proposedMoves = [
                                {currentPosition: 6, numberOfSpaces: 1, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.playerTwo.initialPieces = 0;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is valid when player 1 has 1 piece moving off and the dice don't match"
                            );
                        });
                    });    
                });
            });
            
            t.test("normal move", t => {
                t.test("valid", t => {
                    t.test("moving 1 piece", t => {
                        t.test("player 1", t => {
                            t.plan(1);    
                            const diceRoll = [2, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 6, numberOfSpaces: diceRoll[0], isBar: false},
                                {currentPosition: 8, numberOfSpaces: diceRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 moves one piece twice"
                            );
                        });    
                        
                        t.test("player 2", t => {
                            t.plan(1);  
                            const diceRoll = [2, 4];
                            
                            const proposedMoves = [
                                {currentPosition: 15, numberOfSpaces: diceRoll[0], isBar: false},
                                {currentPosition: 13, numberOfSpaces: diceRoll[1], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 moves one piece twice"
                            );                              
                        });    
                    });
                    
                    t.test("moving 2 pieces", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const diceRoll = [6, 1];
                                        
                            const proposedMoves = [
                                {currentPosition: 12, numberOfSpaces: diceRoll[1], isBar: false},
                                {currentPosition: 2, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 1 moves two pieces"
                            );  
                        });    
                        
                        t.test("player 2", t => {
                            t.plan(1);
                            const diceRoll = [6, 1];
                            
                            const proposedMoves = [
                                {currentPosition: 21, numberOfSpaces: diceRoll[1], isBar: false},
                                {currentPosition: 18, numberOfSpaces: diceRoll[0], isBar: false}
                            ];
                                                
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;            
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                true,
                                "the turn is valid when player 2 moves two pieces"
                            );                                
                        });    
                    });
                    t.test("dice don't match and moving off", t => {
                        t.test("lower roll moving off", t => {
                            t.test("player 1", t => {
                                t.plan(1); 
                                const diceRoll = [3, 5];
                                
                                const proposedMoves = [
                                    {currentPosition: 23, numberOfSpaces: 1, isBar: false},
                                    {currentPosition: 20, numberOfSpaces: diceRoll[0], isBar: false}
                                ];
                                
                                const gameState = getInitialGameState();
                                gameState.playerOne.initialPieces = 0;
                                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                                
                                t.equal(
                                    isValidTurn(gameState, diceRoll, proposedMoves),
                                    true,
                                    "the turn is valid when player 1 moves off the board with the lower roll"
                                );
                            });
                            
                            t.test("player 2", t => {
                                t.plan(1); 
                                const diceRoll = [3, 5];
                                
                                const proposedMoves = [
                                    {currentPosition: 1, numberOfSpaces: 2, isBar: false},
                                    {currentPosition: 5, numberOfSpaces: diceRoll[0], isBar: false}
                                ];
                                
                                const gameState = getInitialGameState();
                                gameState.isPlayerOne = false;
                                gameState.playerTwo.initialPieces = 0;
                                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                                
                                t.equal(
                                    isValidTurn(gameState, diceRoll, proposedMoves),
                                    true,
                                    "the turn is valid when player 2 moves off the board with the lower roll"
                                );
                            });
                        });
                        t.test("higher roll moving off", t => {
                            t.test("player 1", t => {
                                t.plan(1); 
                                const diceRoll = [6, 1];
                                
                                const proposedMoves = [
                                    {currentPosition: 21, numberOfSpaces: diceRoll[1], isBar: false},
                                    {currentPosition: 19, numberOfSpaces: 5, isBar: false}
                                ];
                                
                                const gameState = getInitialGameState();
                                gameState.playerOne.initialPieces = 0;
                                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                                
                                t.equal(
                                    isValidTurn(gameState, diceRoll, proposedMoves),
                                    true,
                                    "the turn is valid when player 1 moves off the board with the higher roll"
                                );
                            });
                            
                            t.test("player 2", t => {
                                t.plan(1); 
                                const diceRoll = [6, 1];
                                
                                const proposedMoves = [
                                    {currentPosition: 3, numberOfSpaces: diceRoll[1], isBar: false},
                                    {currentPosition: 4, numberOfSpaces: 5, isBar: false}
                                ];
                                
                                const gameState = getInitialGameState();
                                gameState.isPlayerOne = false;
                                gameState.playerTwo.initialPieces = 0;
                                gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                                gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                                gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                                gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                                
                                t.equal(
                                    isValidTurn(gameState, diceRoll, proposedMoves),
                                    true,
                                    "the turn is valid when player 2 moves off the board with the higher roll"
                                );
                            });
                        });
                    });                    
                });
                    
                t.test("invalid", t => {
                    t.test("dice don't match", t => {
                        t.test("player 1", t => {
                            t.plan(1);
                            const diceRoll = [2, 3];
                            
                            const proposedMoves = [
                                {currentPosition: 20, numberOfSpaces: diceRoll[1], isBar: false},
                                {currentPosition: 5, numberOfSpaces: 6, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = true;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 1 is not moving off the board and the dice don't match"
                            );
                        });    
                        
                        t.test("player 2", t => {
                            t.plan(1);
                            const diceRoll = [2, 3];
                            
                            const proposedMoves = [
                                {currentPosition: 23, numberOfSpaces: diceRoll[1], isBar: false},
                                {currentPosition: 16, numberOfSpaces: 6, isBar: false}
                            ];
                            
                            const gameState = getInitialGameState();
                            gameState.isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[0].currentPosition].numPieces = 1;
                            gameState.board[proposedMoves[1].currentPosition].isPlayerOne = false;
                            gameState.board[proposedMoves[1].currentPosition].numPieces = 1;
                            
                            t.equal(
                                isValidTurn(gameState, diceRoll, proposedMoves),
                                false,
                                "the turn is invalid when player 2 is not moving off the board and the dice don't match"
                            );
                        });    
                    });
                });    
            });
        });
    });
});