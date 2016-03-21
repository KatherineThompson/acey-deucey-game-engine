"use strict";

function findAvailableSpaces(gameState, numberOfSpaces) {
    const availableSpaces = [];
    const isPlayerOne = gameState.isPlayerOne;
    
    gameState.board.forEach(function(space, index) {
        const possibleSpace = gameState.board[index + numberOfSpaces];
        // need to change for moving off board
        if (
            space.isPlayerOne === isPlayerOne &&
            possibleSpace &&
            (possibleSpace.isPlayerOne === isPlayerOne ||
                (possibleSpace.isPlayerOne === !isPlayerOne && // jshint ignore:line
                    possibleSpace.numPieces === 1))
        ) {
            availableSpaces.push(index);           
            }
    });
    
    return availableSpaces;
}

module.exports = findAvailableSpaces;