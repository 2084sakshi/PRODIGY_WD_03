
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

