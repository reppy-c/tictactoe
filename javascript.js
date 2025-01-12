// This is a factory function, its a function, and returns an object
function createGame() {

    // Array to track gamestate
    let gameState = [[{},{},{}],[{},{},{}],[{},{},{}]];

    // Track number of moves, if this hits 9 with no winner, its a tie
    let noOfMoves = 0;

    // Contain the game result if there's a winner, 1-8 indicates which line won
    let gameResult;

    function getGameState() {
        return(gameState);
    }

    // Put the player in the actual array slot
    // Let the front-end handle error handling (not ideal, but quicker)
    // Returns player if there's a winner
    function move(player, x, y) {
        
        noOfMoves++;
        gameState[x][y] = player;

        // Check to see if player won after placing that
        for(let i=0; i<3; i++) {
            // Check horizontals
            if((gameState[i][0] == player) && (gameState[i][1] == player) && (gameState[i][2] == player)) {
                gameResult = i+1;
                return(player);                
            }
            // Check verticals
            if((gameState[0][i] == player) && (gameState[1][i] == player) && (gameState[2][i] == player)) {
                gameResult = i+4;
                return(player);
            }
        }
        
        // Check left diagonal
        if((gameState[0][0] == player) && (gameState[1][1] == player) && (gameState[2][2] == player)) {
            gameResult = 7;
            return(player);
        }

        // Check right diagonal
        if((gameState[2][0] == player) && (gameState[1][1] == player) && (gameState[0][2] == player)) {
            gameResult = 8;
            return(player);
        }

        if(noOfMoves==9)
            return -1;
    }

    function getWinningLine() {
        return(gameResult);
    }

    // The object returned can have methods and variables in it (no variables here, so they're "private")
    return {getWinningLine, getGameState, move};
}

function createPlayer(name, className) {

    // Arrow function to return the name
    const getName = () => name;
    const getClassName = () => className;

    return {getName, getClassName};    
}

function createController(game) {

    const dom_gameBoard = document.querySelector('#gameBoard');

    // Renders current gamestate to board
    function renderGame() {
        game.getGameState().forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if(game[rowIndex][colIndex] != null) {

                }
            });
        });
    }

    // Changes background of the winning line
    function highlightWinningLine() {
        // how to do this without hardcoding the squares??
    }
    
    return{renderGame, highlightWinningLine};
}

// This is an IIFE, basically the main loop
const main = (function () {

    // Creating an instance from the createGame factory function
    const game = createGame();
    const controller = createController(game);

    const player1 = createPlayer("rachel", "circle");
    const player2 = createPlayer("clara", "cross");

    //controller.clearBoard();
    controller.renderGame();

    // do while here alternating players
    console.log(game.move(player1,0,0));
    console.log(game.move(player1,0,2));
    console.log(game.move(player1,0,1));

    // after the loop, result should have non null.. either a player or -1 for too many moves
    let result = player1;

    // when winner is assigned to winner
    console.log("the winner is: " + player1.getName() + "!");

})();