"use strict"

module.exports = {
    getInitialGameState: require("./get-initial-game-state"),
    isValidTurn: require("./is-valid-turn"),
    isValidMove: require("./is-valid-move"),
    makeMove: require("./make-move"),
    makeTurn: require("./make-turn"),
    checkForWinner: require("./check-for-winner"),
    getAceyDeucey: require("./get-acey-deucey"),
    findAvailableSpaces: require("./find-available-spaces"),
    canMoveOffBoard: require("./can-move-off-board")
};
