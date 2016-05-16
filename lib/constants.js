const firstBoardSpace = 0,
    lastBoardSpace = 23,
    playerOneStartSpace = firstBoardSpace - 1,
    playerOneEndSpace = lastBoardSpace + 1;

module.exports = {
    NUMBER_OF_GAME_PIECES: 15,
    NUMBER_OF_BOARD_SPACES: lastBoardSpace + 1,
    PLAYER_ONE_START_SPACE: playerOneStartSpace,
    PLAYER_ONE_END_SPACE: playerOneEndSpace,
    PLAYER_TWO_START_SPACE: playerOneEndSpace,
    PLAYER_TWO_END_SPACE: playerOneStartSpace,
    FIRST_BOARD_SPACE: firstBoardSpace,
    LAST_BOARD_SPACE: lastBoardSpace
};