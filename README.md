# acey-deucey-game-engine
A game engine for the backgammon variant acey deucey
<!--add back ticks to true and false and headers and numbers-->

[![Build Status](https://travis-ci.org/KatherineThompson/acey-deucey-game-engine.svg?branch=master)](https://travis-ci.org/KatherineThompson/acey-deucey-game-engine)
##API
The following sections assume that you are familiar with the
[rules](http://www.bkgm.com/variants/AceyDeucey-American.html) of acey deucey. Note that there are variations
even within acey deucey and that this game engine was created to replicate the variant with which I am most familiar.

##Types

###`gameState`
An object containing the board and player information.

###`board`
An array of objects corresponding to each of the 24 spaces on a backgammon board.
Each space has the properties `isPlayerOne` and `numPieces`. `isPlayerOne`
shows which player, if either, has pieces on the space. It can have
the values `true`, `false`, and `null`. `true` corresponds to `player1`,
`false` to `player2`, and `null` to no player. `numPieces` corresponds to the
number of pieces on that space.

The indices `-1` and `24` do not exist in the array, but function as the areas
off the board. Information about how many pieces the player has off the board
is stored in the `gameState` object.

###`isPlayerOne`
A boolean indicating which player is currently taking their turn.

###`playerOne and playerTwo`
Objects containing `initialPieces`, `barPieces`, and `winningPieces`. `initialPieces`
are the pieces that are moved onto the board at the beginning of the game.
`barPieces` are pieces that have been hit by the other player and removed from the
board. `winningPieces` are the pieces that have been moved off the board at the end
of the game.

##Methods

###`aceyDeuceyGameEngine.canMoveOffBoard(gameState)`
Returns a boolean indicating whether a piece can be moved off the board.

###`aceyDeuceyGameEngine.canMoveToSpace(gameState, spaceIndex)`
`spaceIndex` is a number corresponding to the space on the board to be analyzed.

Returns an object with the properties `isActivePlayer` and `isAvailable`.
`isActivePlayer` is a boolean indicating whether the active or opposing player
has pieces on that space. A value of `null` indicates that the space is empty.
`isAvailable` is a boolean indicating whether the active player can move
a piece to that space.

###`aceyDeuceyGameEngine.checkForWinner(gameState)`
Returns a boolean if either player has won. `true` for `player1` and `false` for
`player2`. A return value of `null` indicates that the game is still in progress.

###`aceyDeuceyGameEngine.findAvailableSpaces(gameState, numberOfSpaces)`
`numberOfSpaces` is a number indicating the number of spaces that the player intends
to move their piece.

Returns an array of numbers that correspond to the indices of the spaces
(including `-1` and `24` which are not in the board array, but signify positions off the board)
that are available for the player to move to.

###`aceyDeuceyGameEngine.findPossibleMoves(gameState, selectedPieceIndex, diceRoll, isBar)`
`selectedPieceIndex` is a number indicating the index of a selected piece.
`diceRoll` is an array of numbers corresponding to the numbers rolled on the dice.
`isBar` is a boolean indicating whether the selected piece is on the bar.

Returns an array of numbers indicating the spaces that are available for the selected piece to be moved to.
If `diceRoll` is a doubles roll, the array will only contain a single value.
If no moves are available, the array will be empty.

###`aceyDeuceyGameEngine.getAceyDeucey(diceRoll)`
`diceRoll` is an array of numbers corresponding to the numbers rolled on the dice.

Returns an object indicating whether the `diceRoll` is an acey deucey roll. The object
will have a combination of the following properties: `hasOne`, `hasTwo`, `doublesVal`,
and `isAceyDeucey`. `hasOne` and `hasTwo` are set to `true` when a `1` and `2` are present in
the roll. `doublesVal` is the value that the player has chosen for the accompanying doubles.
`isAceyDeucey` is set to `false` when the `diceRoll` does not contain all the parts of an acey deucey.

###`aceyDeuceyGameEngine.getInitialGameState()`
Returns the `gameState` for the first time and initializes the board.

###`aceyDeuceyGameEngine.isValidMove(gameState, proposedMove)`
`proposedMove` is an object with three properties: `currentPosition`, `numberOfSpaces`, and
`isBar`. `currentPosition` is a number between `-1` and `24` indicating the position of the piece
to be moved. `numberOfSpaces` is a number showing how many spaces the piece is to be moved.
`isBar` is a boolean indicating whether the piece is on the bar and thus needs to be moved before pieces that
are not on the bar.

Returns a boolean corresponding to whether the move is valid.

###`aceyDeuceyGameEngine.isValidTurn(gameState, diceRoll, proposedMoves)`
`diceRoll` is an array of numbers corresponding to the numbers rolled on the dice.

`proposedMoves` is an array of objects representing the moves the player intends to make. Each move
object has the same properties (`currentPosition`, `numberOfSpaces`, `isBar`) as the 
`proposedMove` object in `isValidMove`.

Returns a boolean indicating whether all the moves are valid.

###`aceyDeuceyGameEngine.makeMove(oldGameState, proposedMove)`
Returns a new `gameState` object that reflects the changes that have occurred when the 
proposed move is made.

###`aceyDeuceyGameEngine.makeTurn(gameState, diceRoll, proposedMoves)`
Returns a new `gameState` object that reflects the changes that have occurred when all 
the proposed moves are made.

##Properties

###`aceyDeuceyGameEngine.constants`
A collection of information about the game board including number of pieces, spaces, and special space indices.

##Examples
Read the tests.

##Technologies Used
* JavaScript ES2015
    * [JSHint](http://jshint.com/)
    * [lodash](https://lodash.com/)
    * [Tape](https://www.npmjs.com/package/tape)
    * [Travis CI](https://travis-ci.org/)
    

##What I Learned
For this project, I used test driven development which was a new strategy for me. It provided an interesting
paradigm for figuring out which code to write next and overall was quite useful. This was my most
comprehensive use of unit tests yet and I liked having a reliable strategy for thinking through
and testing the different possible outcomes for each piece of functionality. I used tape for my tests
and enjoyed being able to write custom messages for each test and to nest my tests to create a more organized
structure. I also incorporated Travis CI into this project which added another layer of safety in terms of
testing. Additionally, it was nice to seamlessly see the status of my project before merging pull requests.

I used lodash for the first time on this project as well and it helped me simplify a lot of my code. Lodash provided
so many useful functions and helped me to think about data manipulation differently. When I would realize that perhaps
lodash had functionality that could help me simplify things, I also had to spend more time verbalizing what I needed
so I could look it up.

This was my first project to separate each major function into its own file. It was enormously helpful for organization
and made it easier to reason about each separate file. It was not a particularly difficult change, but made the whole
project feel more manageable.