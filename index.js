"use strict"

module.exports = {
    getInitialGameState: require("./get-initial-game-state"),
    isValidTurn: require("./is-valid-turn").isValidTurn,
    isValidMove: require("./is-valid-move"),
    makeMove: require("./make-move"),
    makeTurn: require("./make-turn"),
    checkForWinner: require("./check-for-winner")
};
