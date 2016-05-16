"use strict";

const isValidMove = require("./is-valid-move");
const makeMove = require("./make-move");
const _ = require("lodash");
const getAceyDeucey = require("./get-acey-deucey");
const findAvailableSpaces = require("./find-available-spaces");
const constants = require("./constants");

function isValidTurn(gameState, diceRoll, proposedMoves) {
    const winningIndex = gameState.isPlayerOne ? constants.PLAYER_ONE_END_SPACE : constants.PLAYER_TWO_END_SPACE;
    const playerMultiplier = gameState.isPlayerOne ? 1 : -1;
    
    function areWinningMoves(moves) {
        return _(moves)
            .map(move => _.clamp(
                move.currentPosition + (move.numberOfSpaces * playerMultiplier),
                constants.PLAYER_TWO_END_SPACE,
                constants.PLAYER_ONE_END_SPACE
            ))
            .includes(winningIndex);
    }
    
    function checkAceyDeuceyDice() {
        // three dice and not an acey deucey
        const aceyDeucey = getAceyDeucey(diceRoll);
        if (aceyDeucey.isAceyDeucey === false) {
            return false;
        }

        // dice don't match number of proposed moves and need to be checked against [1, 2]
        // if there are no moves, there should not be available spaces for 1 or 2
        if (!proposedMoves.length) {
            return thereAreNotAvailableSpaces([1, 2]);
        }
        // if there is one move, it needs to be 1 or 2 spaces and there can't be available spaces for the second number
        if (proposedMoves.length === 1) {
            if (!_([1, 2]).includes(proposedMoves[0].numberOfSpaces)) {
                return false;
            }
            const aceyOrDeucey = proposedMoves[0].numberOfSpaces === 1 ? 2 : 1;
            return thereAreNotAvailableSpaces([aceyOrDeucey]);
        }
            
        const firstTwoProposedMoves = _.take(proposedMoves, 2);
        function firstTwoProposedMovesInclude(nums) {
            return _(firstTwoProposedMoves).map("numberOfSpaces").sortBy().isEqual(nums);
        }    
            
        // one and two have not been moved first
        if (!firstTwoProposedMovesInclude([1,2])) {
            if (!areWinningMoves(firstTwoProposedMoves) || !firstTwoProposedMovesInclude([1, 1])) {
                return false;
            }
        }
        
        const sortedAceyDeuceyRoll = createSortedExtendedRoll(3, aceyDeucey.doublesVal);
        
        // number of rolls doesn't match number of proposed moves but the 1 and 2 have been used
        
        const noAceyOrDeucey = _.drop(proposedMoves, 2);
        const numDoublesToAdd = proposedMoves.length - 2;
        const doublesRollsToCheck = getExtension(numDoublesToAdd, aceyDeucey.doublesVal);
        if (proposedMoves.length < sortedAceyDeuceyRoll.length) {
            if (proposedMoves.length === 2) {
                return thereAreNotAvailableSpaces([sortedAceyDeuceyRoll[2]]);
            }
            return thereAreNotAvailableSpaces([sortedAceyDeuceyRoll[2]]) &&
                areDiceAndMovesEqual(doublesRollsToCheck, noAceyOrDeucey);
        }
        
        // the number of moves exceeds the number of rolls
        if (proposedMoves.length > sortedAceyDeuceyRoll.length) {
            return false;
        }
        // the numbers match
        return areDiceAndMovesEqual(doublesRollsToCheck, noAceyOrDeucey);
    }
    
    function checkDoublesDice() {
        // number of moves is less than the number of rolls
        if (proposedMoves.length === 0) {
            return thereAreNotAvailableSpaces(diceRoll);
        }
        
        if (proposedMoves.length < 4) {
            const numDoublesToAdd = proposedMoves.length;
            const usedDoublesRoll = getExtension(numDoublesToAdd, diceRoll[0]);
            return thereAreNotAvailableSpaces([diceRoll[0]]) && areDiceAndMovesEqual(usedDoublesRoll, proposedMoves);
        }
        
        if (proposedMoves.length > 4) {
            return false;
        }
        
        const doublesRoll = createSortedExtendedRoll(2, diceRoll[0]);
        return areDiceAndMovesEqual(doublesRoll, proposedMoves);
    }
    
    function getExtension(numToExtend, rollNum) {
        return _(numToExtend).range().map(() => rollNum).value();
    }
    
    function createSortedExtendedRoll(numToExtend, rollNum) {
        return _.sortBy(diceRoll.concat(getExtension(numToExtend, rollNum)));
    }
    
    function areDiceAndMovesEqual(diceRoll, moves) {
        function checkWinningMoves(diceRoll, moves) {
            return _(moves)
                .sortBy("numberOfSpaces")
                .every((move, index) => {
                    const proposedSpace = move.currentPosition + (move.numberOfSpaces * playerMultiplier);
                    if (proposedSpace === winningIndex) {
                        return move.numberOfSpaces <= diceRoll[index];
                    } else {
                        return move.numberOfSpaces === diceRoll[index];
                    }
                });
        }
        if (areWinningMoves(moves)) {
            if (diceRoll.length === 2 && diceRoll[0] !== diceRoll[1]) {
                const firstProposedSpace = moves[0].currentPosition + (moves[0].numberOfSpaces * playerMultiplier);
                if (firstProposedSpace === winningIndex) {
                    const reversedDice = _(diceRoll).clone().reverse();
                    return checkWinningMoves(diceRoll, moves) || checkWinningMoves(reversedDice, moves);
                }
            }
            return checkWinningMoves(diceRoll, moves);
        }
        return _(moves)
            .map("numberOfSpaces")
            .sortBy()
            .isEqual(diceRoll);
    }
    
    function thereAreNotAvailableSpaces(rollToCheck) {
        if (proposedMoves.length === 0) {
            return !_.some(rollToCheck, roll => findAvailableSpaces(gameState, roll).length);         
        }
        
        let newGameState = gameState;
        for (const move of proposedMoves) {
            if (isValidMove(newGameState, move)) {
                newGameState = makeMove(newGameState, move);
            } else {
                break;                    
            }
        }
        return !findAvailableSpaces(newGameState, rollToCheck[0]).length;
    }
    
    function proposedMovesMatchDice() {
        // dice aren't valid
        if (!_(diceRoll).every(roll => _.inRange(roll, 1, 7)) || diceRoll.length > 3 || diceRoll.length < 2) {
            return false;
        }
        
        // acey deucey roll
        if (diceRoll.length === 3) {
            return checkAceyDeuceyDice();
        }   
        
        // doubles roll
        if (diceRoll[0] === diceRoll[1]) {
            return checkDoublesDice();
        }
        
        // normal roll
        if (proposedMoves.length > 2) {
            return false;
        }
        
        if (proposedMoves.length === 0) {
            return thereAreNotAvailableSpaces(diceRoll);
        }
        
        if (proposedMoves.length === 1) {
            // number of spaces doesn't match dice
            if (!_.includes(diceRoll, proposedMoves[0].numberOfSpaces)) {
                const proposedSpace = _.clamp(
                    proposedMoves[0].currentPosition + proposedMoves[0].numberOfSpaces * playerMultiplier,
                    constants.PLAYER_TWO_END_SPACE,
                    constants.PLAYER_ONE_END_SPACE
                );
                const isWinningSpace = winningIndex === proposedSpace;
                    
                return isWinningSpace && _.some(diceRoll, roll => roll > proposedMoves[0].numberOfSpaces);
            }
            const unusedRoll = proposedMoves[0].numberOfSpaces === diceRoll[0] ? diceRoll[1] : diceRoll[0];
            return thereAreNotAvailableSpaces([unusedRoll]);
        }
        
        const sortedDice = _.sortBy(diceRoll);
        return areDiceAndMovesEqual(sortedDice, proposedMoves);
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