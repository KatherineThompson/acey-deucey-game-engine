"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const constants = aceyDeuceyGameEngine.constants;

test("constants", t => {
    t.plan(1);
    
    const expectedConstants = {
        NUMBER_OF_GAME_PIECES: 15,
        NUMBER_OF_BOARD_SPACES: 24,
        PLAYER_ONE_START_SPACE: -1,
        PLAYER_ONE_END_SPACE: 24,
        PLAYER_TWO_START_SPACE: 24,
        PLAYER_TWO_END_SPACE: -1,
        FIRST_BOARD_SPACE: 0,
        LAST_BOARD_SPACE: 23
    };
    
    t.deepEqual(constants, expectedConstants, "the constants have the correct values");
});