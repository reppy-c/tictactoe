// This is a factory function, its a function, and returns an object
function createGame() {

    // Array to track gamestate
    let gameState = [[{},{},{}],[{},{},{}],[{},{},{}]];

    // Track number of moves, if this hits 9 with no winner, its a tie
    let noOfMoves = 0;

    // Debug function to output the array
    function logGameState() {
        console.log(gameState);
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
                return(player);                
            }
            // Check verticals
            if((gameState[0][i] == player) && (gameState[1][i] == player) && (gameState[2][i] == player)) {
                return(player);
            }
        }
        
        // Check left diagonal
        if((gameState[0][0] == player) && (gameState[1][1] == player) && (gameState[2][2] == player)) {
            return(player);
        }

        // Check right diagonal
        if((gameState[2][0] == player) && (gameState[1][1] == player) && (gameState[0][2] == player)) {
            return(player);
        }

        if(noOfMoves==9)
            return -1;
    }

    // The object returned can have methods and variables in it (no variables here, so they're "private")
    return {gameState, logGameState, move};
}

function createPlayer(name) {

    // Arrow function to return the name
    const getName = () => name;

    return {getName};    
}

// This is an IIFE, basically the main loop
const gameController = (function () {

    // Creating an instance from the createGame factory function
    const game = createGame();

    const player1 = createPlayer("rachel");
    const player2 = createPlayer("clara");

    // do while here alternating players
    console.log(game.move(player1,0,0));
    console.log(game.move(player1,0,2));
    console.log(game.move(player1,0,1));

    // after the loop, result should have non null.. either a player or -1 for too many moves
    let result = player1;

    // when winner is assigned to winner
    console.log("the winner is: " + player1.getName() + "!");

})();