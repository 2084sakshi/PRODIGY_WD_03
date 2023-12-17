/*
const statusDisplay = document.querySelector('.status');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {   
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );
    
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
   
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    const winningConditions = [
       [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
    ];
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}    */
const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector(".status");
const restart = document.querySelector(".restart");

let player = "X";
let option = ["", "", "", "", "", "", "", "", ""];
let run = false;

let wincon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startgame();

function startgame() {
    cells.forEach(cell => cell.addEventListener("click", clicked));
    restart.addEventListener("click", restartgame);
    statustext.textContent = `${player}'s turn `;
    run = true;
}

function clicked(clickedcellevent) {
    const clickcell =  clickedcellevent.target;
    const index = parseInt(clickcell.getAttribute("data-cell-index"));
    if (option[index] !== "" || run == false) {
        return;
    }
    updatecell(this, index);
    checkwin();
    
}

function updatecell(cell, index) {
    option[index] = player;
    cell.textContent = player;
}

function swapplayer() {
    player = (player == "X") ? "O" : "X";
    statustext.textContent = `${player}'s turn`;
}

function checkwin() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
        const A = wincon[i];
        let a = option[A[0]];
        let b = option[A[1]];
        let c = option[A[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            win = true;
            break;
        }
    }
    if (win){
        statustext.style.color = "green";
        statustext.textContent = `${player} won the game`;
            run = false;
            return;
    }
    if (!option.includes("")) {
        statustext.style.color = "red";
        statustext.textContent = "Draw !!!";
        run = false;
        return;
    } 
        swapplayer();
    
}

function restartgame() {
    player = "X";
    option = ["", "", "", "", "", "", "", "", ""];
    statustext.style.color = "white";
    statustext.textContent = `${player}'s turn `;
    cells.forEach(cell => cell.textContent = "");
    run = true;
}

