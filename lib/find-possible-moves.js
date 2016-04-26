"use strict";

const isValidMove = require("./is-valid-move");
const constants = require("./constants");
const _ = require("lodash");

function findPossibleMoves(gameState, diceRoll, isBar, selectedPieceIndex) {
    
    function checkRoll(numberOfSpaces) {
        const proposedMove = {
            numberOfSpaces: numberOfSpaces,
            isBar: isBar
        };
        
        if (isBar) {
            proposedMove.currentPosition = gameState.isPlayerOne ?
                constants.PLAYER_ONE_START_SPACE : constants.PLAYER_TWO_START_SPACE;
        } else {
            proposedMove.currentPosition = selectedPieceIndex;
        }
            
        if (isValidMove(gameState, proposedMove)) {
            let possibleMoveIndex = null;
            if (gameState.isPlayerOne) {
                possibleMoveIndex = proposedMove.currentPosition + numberOfSpaces;
            } else {
                possibleMoveIndex = proposedMove.currentPosition - numberOfSpaces;
            }
            possibleMoveIndex = _.clamp(
                possibleMoveIndex,
                constants.PLAYER_ONE_START_SPACE,
                constants.PLAYER_TWO_START_SPACE
            );
            return possibleMoveIndex;
        }
    }
    
   return _(diceRoll).map(checkRoll).without(undefined).uniq().value();
    
}

module.exports = findPossibleMoves;