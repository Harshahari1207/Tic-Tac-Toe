const resetButton = document.querySelector("#reset");
const playerchange = document.querySelector(".display-player");
const announcer = document.querySelector(".announcer");


resetButton.addEventListener("click", resetAll);


let board;
const playerX = 'X';
const playerO = 'O';
let curPlayer = playerX;
let gameOver = false;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
        // creatiing div tag that we need to store input
        // <div id=0-0></div>
        let tile = document.createElement("div");
        tile.id = i.toString() + "-" + j.toString();
        tile.classList.add("tile");
        if(i === 0 || i === 1){
            tile.classList.add("horizontal-line");
        }
        if(j === 0 || j === 1){
            tile.classList.add("vertical-line");
        }
        tile.addEventListener("click", setTile);
        document.getElementById("box").append(tile);
    }
}
}


function setTile(){
    if(gameOver)
        return;

    let coards = this.id.split("-");
    let i = parseInt(coards[0]);
    let j = parseInt(coards[1]);

    if(board[i][j] != ''){
        return;
    }

    board[i][j] = curPlayer;
    this.innerText = curPlayer;


    if(curPlayer === playerX){
        curPlayer = playerO;
        playerchange.innerText = "O";
    }else{
        curPlayer = playerX;
        playerchange.innerText = "X";
    }


    checkWinner();
}

function checkWinner(){
    // Horizontally

    for(let i=0; i<3; i++){
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != ''){
            for(let j=0; j<3; j++){
                let tile = document.getElementById(i.toString() + "-" + j.toString());
                tile.classList.add("winner");
            }
            if(curPlayer === "O"){
                announcer.innerText = "Player 'X' has Won the Game";
            }else{
                announcer.innerText = "Player 'O' has Won the Game";
            }

            gameOver = true;
            return;
        }
    }
    // Vertically

    for(let i=0; i<3; i++){
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != ''){
            for(let j=0; j<3; j++){
                let tile = document.getElementById(j.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            if(curPlayer === "O"){
                announcer.innerText = "Player 'X' has Won the Game";
            }else{
                announcer.innerText = "Player 'O' has Won the Game";
            }
            gameOver = true;
            return;
        }
    }


    // Diagonal

    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] != ''){
        for(let i=0; i<3; i++){
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        if(curPlayer === "O"){
            announcer.innerText = "Player 'X' has Won the Game";
        }else{
            announcer.innerText = "Player 'O' has Won the Game";
        }
        gameOver = true;
        return;
    }

    // anti-diagonal
    if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != ''){
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        tile = document.getElementById("2-0");
        tile.classList.add("winner");

        if(curPlayer === "O"){
            announcer.innerText = "Player 'X' has Won the Game";
        }else{
            announcer.innerText = "Player 'O' has Won the Game";
        }
        gameOver = true;
        return;
    }
}

function resetAll(){
    window.location.reload();
}