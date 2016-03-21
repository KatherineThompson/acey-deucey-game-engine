"use strict";
const isValidMove = require("./is-valid-move");
const makeMove = require("./make-move");
const _ = require("lodash");
const getAceyDeucey = require("./get-acey-deucey");

function isValidTurn(gameState, diceRoll, proposedMoves) {
    function proposedMovesMatchDice() {
        if (diceRoll.length > 2) {
                      
            const aceyDeucey = getAceyDeucey(diceRoll);
            if (aceyDeucey.isAceyDeucey === false) {
                return false;
            }

            if (!_(proposedMoves).take(2).map("numberOfSpaces").sortBy().isEqual([1, 2])) {
                return false;
            }
            
            const sortedAceyDeuceyRoll = _.sortBy(diceRoll);
            _(3).range().forEach(() => sortedAceyDeuceyRoll.push(aceyDeucey.doublesVal));

            if (sortedAceyDeuceyRoll.length !== proposedMoves.length) {
                return false;
            }
            return _(proposedMoves)
                .map("numberOfSpaces")
                .sortBy()
                .isEqual(sortedAceyDeuceyRoll);
        }
        if (!_(diceRoll).every(roll => roll > 0 && roll < 7)) {
            return false;
        }
        
        if (diceRoll[0] === diceRoll[1]) {
            if (proposedMoves.length !== 4){
                return false;
            } 
            return _(proposedMoves).map("numberOfSpaces").uniq().isEqual([diceRoll[0]]);
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

module.exports = isValidTurn;