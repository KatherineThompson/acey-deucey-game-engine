# acey-deucey-game-engine
A game engine for the backgammon variant acey deucey

[![Build Status](https://travis-ci.org/KatherineThompson/acey-deucey-game-engine.svg?branch=master)](https://travis-ci.org/KatherineThompson/acey-deucey-game-engine)
```
Game state object = {
    
    board: array of 24 objects with the keys isPlayerOne and numPieces
        isPlayerOne will be null if there are no pieces on that space
        
    isPlayerOne: boolean keeping track of whose turn it is
    
    playerOne and playerTwo: objects with the keys initialPieces, barPieces, andWinningPieces
        initialPieces are the pieces off the board at the beginning of the game. The initial value is 15.
        barPieces are pieces that have been hit by the opposing player and must be placed immediately
        winningPieces are the pieces that have been moved off the board at the end of the game
}

Proposed move object = {
    
    currentPosition: number from -1 to 24. 0-23 are spaces on the board.
        -1 and 24 are not spaces in the array.
        Player one begins with pieces off the board at -1 and ends by moving pieces off the board to 24.
        Player two moves from 24 to -1.
        
    numberOfSpaces: the number of spaces to move the piece.
    
    isBar: boolean that describes whether the piece being moved is coming off the bar
}
```