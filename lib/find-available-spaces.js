// jshint ignore:start
"use strict";

const canMoveOffBoard = require("./can-move-off-board.js");
const canMoveToSpace = require("./can-move-to-space.js");

function findAvailableSpaces(gameState, numberOfSpaces) {
    const availableSpaces = [];
    const isPlayerOne = gameState.isPlayerOne;
    const activePlayer = isPlayerOne ?
        {
            playerObject: gameState.playerOne,
            startSpace: require("./constants").PLAYER_ONE_START_SPACE,
            endSpace: require("./constants").PLAYER_ONE_END_SPACE,
            possibleSpaceIndex: this.startSpace + numberOfSpaces
        } :
        {
            playerObject: gameState.playerTwo,
            startSpace: require("./constants").PLAYER_TWO_START_SPACE,
            endSpace: require("./constants").PLAYER_TWO_END_SPACE,
            possibleSpaceIndex: this.startSpace - numberOfSpaces            
        };

    if (activePlayer.playerObject.initialPieces) {
        
        const possibleSpace = gameState.board[activePlayer.possibleSpaceIndex];
        
        if (canMoveToSpace(gameState, activePlayer.possibleSpaceIndex).isAvailable) {
            availableSpaces.push(activePlayer.startSpace);
        }
    }
    
    gameState.board.forEach(function(space, index) {
        // try filter
        const possibleSpace = isPlayerOne ?
            gameState.board[index + numberOfSpaces] :
            gameState.board[index - numberOfSpaces];
            // extract index
        if ((isPlayerOne && possibleSpace > 23) || (!isPlayerOne && possibleSpace < 0) && !canMoveOffBoard(gameState)) {
            return;
            // add to availableSpaces if canMoveOffBoard is true
            // change if statement
        }
        // simplify if statement
        
        if (
            space.isPlayerOne === isPlayerOne &&
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

// check bar pieces