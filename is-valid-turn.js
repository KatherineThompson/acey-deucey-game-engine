"use strict";
const isValidMove = require("./is-valid-move");
const makeMove = require("./make-move");
const _ = require("lodash");

function getAceyDeucey(diceRoll) {
    const aceyDeucey = {};
    diceRoll.forEach(function(roll, index) {
        if (roll === 1 && !aceyDeucey.hasOwnProperty("oneLocation")) {
            aceyDeucey.oneLocation = index; 
        } else if (roll === 2 && !aceyDeucey.hasOwnProperty("twoLocation")) {
            aceyDeucey.twoLocation = index;
        } else if (!aceyDeucey.hasOwnProperty("doublesLocation")) {
            aceyDeucey.doublesLocation = index;
        } else {
            aceyDeucey.isAceyDeucey = false;
        }
    });
    return aceyDeucey;
}

function isValidTurn(gameState, diceRoll, proposedMoves) {
   
    function proposedMovesMatchDice() {
        if (diceRoll.length > 2) {
                      
            const aceyDeucey = getAceyDeucey(diceRoll);
            if (aceyDeucey.isAceyDeucey === false) {
                return false;
            }

            if (
                !(proposedMoves[0].numberOfSpaces === 1 && proposedMoves[1].numberOfSpaces === 2) &&
                !(proposedMoves[0].numberOfSpaces === 2 && proposedMoves[1].numberOfSpaces === 1)
            ) {
                return false;
            }
            
            const sortedAceyDeuceyRoll = _.sortBy(diceRoll);
            for (let i = 0; i < 3; i++) {
                sortedAceyDeuceyRoll.push(diceRoll[aceyDeucey.doublesLocation]);
            }
            if (sortedAceyDeuceyRoll.length !== proposedMoves.length) {
                return false;
            }
            return _(proposedMoves)
                .map("numberOfSpaces")
                .sort()
                .every((numberOfSpaces, index) => numberOfSpaces === sortedAceyDeuceyRoll[index]);
        }
        if (!_(diceRoll).every(roll => roll > 0 && roll < 7)) {
            return false;
        }
        
        if (diceRoll[0] === diceRoll[1]) {
            if (proposedMoves.length !== 4){
                return false;
            } 
            return _(proposedMoves).map("numberOfSpaces").every(numberOfSpaces => numberOfSpaces === diceRoll[0]);
        }
        if (diceRoll.length !== proposedMoves.length) {
            return false;
        }
        const sortedDice = _.sortBy(diceRoll);
        return _(proposedMoves)
            .map("numberOfSpaces")
            .sort()
            .every((numberOfSpaces, index) => numberOfSpaces === sortedDice[index]);
    }
    
    function proposedMovesAreValid(gameState, proposedMoves) {
        if (!proposedMoves.length) {
            return true;
        }
        
        const firstMove = proposedMoves[0];
        
        if (!isValidMove(gameState, firstMove)) {
            return false;
        }
        
        const newProposedMoves = proposedMoves.slice(1);
        const newGameState = makeMove(gameState, firstMove);
        
        return proposedMovesAreValid(newGameState, newProposedMoves);
        
    }
    
    return proposedMovesMatchDice() && proposedMovesAreValid(gameState, proposedMoves);
}

module.exports = {isValidTurn: isValidTurn, getAceyDeucey: getAceyDeucey};