"use strict";

module.exports = {
    getInitialGameState: require("./lib/get-initial-game-state"),
    isValidTurn: require("./lib/is-valid-turn"),
    isValidMove: require("./lib/is-valid-move"),
    makeMove: require("./lib/make-move"),
    makeTurn: require("./lib/make-turn"),
    checkForWinner: require("./lib/check-for-winner"),
    getAceyDeucey: require("./lib/get-acey-deucey"),
    findAvailableSpaces: require("./lib/find-available-spaces"),
    canMoveOffBoard: require("./lib/can-move-off-board"),
    canMoveToSpace: require("./lib/can-move-to-space")
};
