"use strict"

function getInitialGameState() {
    const gameState = {
        board: [],
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
    
    for (let i = 0; i < 24; i++){
        gameState.board.push({isPlayerOne: null, numPieces: 0});
    }
    
    return gameState;
}

module.exports = getInitialGameState;