"use strict";

const isValidMove = require("./is-valid-move");
const makeMove = require("./make-move");
const _ = require("lodash");
const getAceyDeucey = require("./get-acey-deucey");
const checkForWinner = require("./check-for-winner");
const findAvailableSpaces = require("./find-available-spaces");

function isValidTurn(gameState, diceRoll, proposedMoves) {
    function proposedMovesMatchDice() {
        if (diceRoll.length > 2) {
                      
            const aceyDeucey = getAceyDeucey(diceRoll);
            if (aceyDeucey.isAceyDeucey === false) {
                return false;
            }
            
            const sortedAceyDeuceyRoll = _.sortBy(diceRoll);
            _(3).range().forEach(() => sortedAceyDeuceyRoll.push(aceyDeucey.doublesVal));

            if (!_(proposedMoves).take(2).map("numberOfSpaces").sortBy().isEqual([1, 2])) {
                if (proposedMoves.length === 0) {
                    const aceySpaces = findAvailableSpaces(gameState, 1);
                    const deuceySpaces = findAvailableSpaces(gameState, 2);
                
                    return !aceySpaces.length && !deuceySpaces.length;
                }
                let newGameState = gameState;
                proposedMoves.forEach(move => {
                    if (isValidMove(newGameState, move)) {
                        newGameState = makeMove(newGameState, move);
                    }
                });
                const nextRoll = proposedMoves[0] === 1 ? 2 : 1;
                const nextAvailableSpaces = findAvailableSpaces(newGameState, nextRoll);
                if (!nextAvailableSpaces.length) {
                    return true;
                }
                return false;
            }
            
            if (proposedMoves.length < sortedAceyDeuceyRoll.length) {
                let newGameState = gameState;
                proposedMoves.forEach(move => {
                    if (isValidMove(newGameState, move)) {
                        newGameState = makeMove(newGameState, move);
                    }
                });
                const availableDoublesSpaces = findAvailableSpaces(newGameState, aceyDeucey[2]);
                if (!availableDoublesSpaces.length) {
                    return true;
                }
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
            if (proposedMoves.length < 4){
                let newGameState = gameState;
                proposedMoves.forEach(function(move) {
                    if (isValidMove(newGameState, move)) {
                        newGameState = makeMove(newGameState, move);
                    }
                });
                const availableSpaces = findAvailableSpaces(newGameState, diceRoll[0]);
                if (!availableSpaces.length) {
                    return true;
                }
            }
            
            if (proposedMoves.length > 4) {
                return false;
            }
             
            return _(proposedMoves).map("numberOfSpaces").uniq().isEqual([diceRoll[0]]);
        }
        
        if (diceRoll.length !== proposedMoves.length) {
            if (proposedMoves.length === 1 && isValidMove(gameState, proposedMoves[0])) {
                const newGameState = makeMove(gameState, proposedMoves[0]);
                if (checkForWinner(newGameState) === newGameState.isPlayerOne) {
                    return true;
                }

                const numberOfSpaces = proposedMoves[0].numberOfSpaces === diceRoll[0] ? diceRoll[1] : diceRoll[0];
                
                const availableSpaces = findAvailableSpaces(newGameState, numberOfSpaces);
                if (!availableSpaces.length) {
                    return true;
                }
            }
            
            if (!proposedMoves.length) {
                const firstRoll = diceRoll[0];
                const secondRoll = diceRoll[1];
                
                const firstAvailableSpaces = findAvailableSpaces(gameState, firstRoll);
                const secondAvailableSpaces = findAvailableSpaces(gameState, secondRoll);
                
                if (!firstAvailableSpaces.length && !secondAvailableSpaces.length) {
                    return true;
                }
            }
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