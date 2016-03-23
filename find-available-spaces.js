"use strict";

const canMoveOffBoard = require("./can-move-off-board.js");

function findAvailableSpaces(gameState, numberOfSpaces) {
    const availableSpaces = [];
    const isPlayerOne = gameState.isPlayerOne;
    const activePlayer = isPlayerOne ? gameState.playerOne : gameState.playerTwo;
    
    if (activePlayer.initialPieces) {
        const possibleSpace = isPlayerOne ?
            gameState.board[-1 + numberOfSpaces] :
            gameState.board[24 - numberOfSpaces];
        
        if (
            possibleSpace.isPlayerOne === isPlayerOne ||
            possibleSpace.isPlayerOne === null ||
            (
                possibleSpace.isPlayerOne === !isPlayerOne && // jshint ignore:line
                possibleSpace.numPieces === 1
            )
        ) {
            const startingPoint = isPlayerOne ? -1 : 24;
            availableSpaces.push(startingPoint);
        }
    }
    
    gameState.board.forEach(function(space, index) {
        const possibleSpace = isPlayerOne ?
            gameState.board[index + numberOfSpaces] :
            gameState.board[index - numberOfSpaces];
        if ((isPlayerOne && possibleSpace > 23) || (!isPlayerOne && possibleSpace < 0) && !canMoveOffBoard(gameState)) {
            return;
        }
        
        if (
            space.isPlayerOne === isPlayerOne &&
            possibleSpace &&
            (possibleSpace.isPlayerOne === isPlayerOne ||
                possibleSpace.isPlayerOne === null ||
                (possibleSpace.isPlayerOne === !isPlayerOne && // jshint ignore:line
                    possibleSpace.numPieces === 1))
        ) {
            availableSpaces.push(index);           
            }
    });
    return availableSpaces;
}

module.exports = findAvailableSpaces;