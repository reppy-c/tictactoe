// This is a factory function, its a function, and returns an object
function createGame() {

    // Array to track gamestate
    let gameState = [[null,null,null],[null,null,null],[null,null,null]];

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

function createController(player1, player2) {

    let game = createGame();
    let currentPlayerTurn;
    let banner = document.querySelector('#winnerBanner');
    const dom_squares = document.querySelectorAll('.square');
    
    // Show winner banner
    function showWinner(winningPlayer) {
        let winnerName = document.querySelector('#winnerName');
        banner.style.display = 'flex';
        winnerName.innerHTML = winningPlayer.getName(); 
    }

    // Handles event mousedown, passes players and coordinates to the game object
    function tryMove(e) {
        if (e.type == 'mousedown') {

            let moveResult = game.move(currentPlayerTurn, this.dataset.row, this.dataset.col);
            renderGame();

            if(moveResult == -1) {
                console.log("maxed moves");
            } else if(moveResult != null) { // There's a winner}            
                removeEvents(); // Remove all square event handers
                showWinner(moveResult); // Display winner banner
            } else { // No winner, move onto next turn, change player
                nextTurn();
            }
        }    
    }

    // Attach event handlers to each square in DOM, this is an IIFE, runs when controller is created
    function attachEvents() {
        dom_squares.forEach((square) => {
            square.addEventListener("mousedown", tryMove);
        });
    }

    function removeEvents() {
        dom_squares.forEach((square) => {
            square.removeEventListener("mousedown", tryMove);
        });
    }

    // Renders current gamestate to board
    function renderGame() {

        let i = 0; // Since squares in HTML are in a flat array, we check which

        // Iterate through each row of the gamestate
        game.getGameState().forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {       
                
                let squareState = game.getGameState()[rowIndex][colIndex];

                if(squareState != null) {
                   dom_squares[i].classList.add(squareState.getClassName());
                   dom_squares[i].removeEventListener("mousedown", tryMove);
                }

                i++;
            });
        });
    }

    // Changes background of the winning line
    function highlightWinningLine() {
        // how to do this without hardcoding the lines??
    }
    
    // Toggle the next player
    function nextTurn() {
        if(currentPlayerTurn == player1) {
            currentPlayerTurn = player2;
        } else {
            currentPlayerTurn = player1;
        }
    }

    // Reset the game objects and DOM
    function resetGame() {
        
        // Remove remaining events from squares and add to every square
        removeEvents();
        attachEvents();

        // Create a new game instance
        game = createGame();

        // Remove existing Xs and Os        
        dom_squares.forEach((square) => {
            square.classList.remove("circle", "cross");
        });

        // Hide winning banner
        banner.style.display = 'none';

        // Set turn to player 1 again
        currentPlayerTurn = player1;

        renderGame();
    }
    

    return{tryMove, resetGame, nextTurn, attachEvents, renderGame, highlightWinningLine};
}

// This is an IIFE, basically the main loop
const main = (function () {

    // INITIATE GAME
    const player1 = createPlayer("Player 1", "circle");
    const player2 = createPlayer("Player 2", "cross");
    const controller = createController(player1, player2);
    
    let resetButton = document.querySelector('#reset');
    resetButton.addEventListener("mousedown", controller.resetGame);

    controller.resetGame();

    //console.log(controller.resetGame());
})();