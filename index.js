"use strict"

module.exports = {
    getInitialGameState: require("./get-initial-game-state"),
    isValidTurn: require("./is-valid-turn").isValidTurn,
    isValidMove: require("./is-valid-move"),
    makeMove: require("./make-move"),
    isGameOver: require("./is-game-over"),
    makeTurn: require("./make-turn")
};
