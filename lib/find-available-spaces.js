"use strict";

const canMoveOffBoard = require("./can-move-off-board.js");
const canMoveToSpace = require("./can-move-to-space.js");
const _ = require("lodash");
const constants = require("./constants");

function findAvailableSpaces(gameState, numberOfSpaces) {
    const isPlayerOne = gameState.isPlayerOne;
    const activePlayer = isPlayerOne ?
        {
            playerObject: gameState.playerOne,
            startSpace: constants.PLAYER_ONE_START_SPACE,
            endSpace: constants.PLAYER_ONE_END_SPACE,
            possibleStartSpaceIndex: constants.PLAYER_ONE_START_SPACE + numberOfSpaces
        } :
        {
            playerObject: gameState.playerTwo,
            startSpace: constants.PLAYER_TWO_START_SPACE,
            endSpace: constants.PLAYER_TWO_END_SPACE,
            possibleStartSpaceIndex: constants.PLAYER_TWO_START_SPACE - numberOfSpaces            
        };
    
    const availableSpaces = gameState.board.map((space, index) => {
        const possibleSpaceIndex = index + numberOfSpaces * (isPlayerOne ? 1 : -1);
        const possibleSpaceIsOffBoard = isPlayerOne && possibleSpaceIndex > 23 ||
            !isPlayerOne && possibleSpaceIndex < 0;
        const currentSpace = gameState.board[index];
        if (currentSpace.isPlayerOne === isPlayerOne && possibleSpaceIsOffBoard) {
            if (!canMoveOffBoard(gameState)) {
                return;
            }
            return index;
        }
        
        if (currentSpace.isPlayerOne === isPlayerOne && canMoveToSpace(gameState, possibleSpaceIndex).isAvailable) {
            return index;
        }
    });
    
    const availablePiecesOffBoard = activePlayer.playerObject.initialPieces || activePlayer.playerObject.barPieces; 
    if (
        availablePiecesOffBoard &&
        canMoveToSpace(gameState, activePlayer.possibleStartSpaceIndex).isAvailable
    ) {
            availableSpaces.push(activePlayer.startSpace);
    }
    
    return _.without(availableSpaces, undefined);
}

module.exports = findAvailableSpaces;