const PLAYER_O = "O";
const PLAYER_X = "X";

let board;
let currentPlayer;
let gameOver;

let scoreO = 0;
let scoreX = 0;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restart");

initGame();

restartButton.addEventListener("click", initGame);

function initGame(){

    board = [
        [" "," "," "],
        [" "," "," "],
        [" "," "," "]
    ];

    currentPlayer = PLAYER_O;
    gameOver = false;

    boardElement.innerHTML = "";

    statusElement.textContent = `Player ${currentPlayer} Turn`;

    for(let r = 0; r < 3; r++){

        for(let c = 0; c < 3; c++){

            const tile = document.createElement("div");

            tile.id = `${r}-${c}`;
            tile.classList.add("tile");

            tile.addEventListener("click", handleMove);

            boardElement.appendChild(tile);
        }
    }
}

function handleMove(){

    if(gameOver) return;

    const [r,c] = this.id.split("-").map(Number);

    if(board[r][c] !== " ") return;

    board[r][c] = currentPlayer;

    this.textContent = currentPlayer;
    this.classList.add("pop");

    if(checkWinner()){
        return;
    }

    if(checkDraw()){
        return;
    }

    currentPlayer =
        currentPlayer === PLAYER_O
        ? PLAYER_X
        : PLAYER_O;

    statusElement.textContent =
        `Player ${currentPlayer} Turn`;
}

function checkWinner(){

    const lines = [

        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],

        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],

        [[0,0],[1,1],[2,2]],
        [[0,2],[1,1],[2,0]]
    ];

    for(const line of lines){

        const [[a,b],[c,d],[e,f]] = line;

        const value = board[a][b];

        if(
            value !== " " &&
            value === board[c][d] &&
            value === board[e][f]
        ){

            line.forEach(([r,col])=>{
                document
                .getElementById(`${r}-${col}`)
                .classList.add("winner");
            });

            announceWinner(value);

            return true;
        }
    }

    return false;
}

function announceWinner(player){

    gameOver = true;

    statusElement.textContent =
        `${player} Wins!`;

    if(player === PLAYER_O){
        scoreO++;
        document.getElementById("score-o").textContent = scoreO;
    }else{
        scoreX++;
        document.getElementById("score-x").textContent = scoreX;
    }
}

function checkDraw(){

    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            if(board[r][c] === " "){
                return false;
            }
        }
    }

    gameOver = true;

    statusElement.textContent =
        "It's a Draw!";

    document
    .querySelectorAll(".tile")
    .forEach(tile=>{
        tile.classList.add("draw");
    });

    return true;
}