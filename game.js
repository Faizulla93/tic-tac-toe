let game = document.querySelector(".game");
let playerInput = document.getElementById("player1");
let playerInput2 = document.getElementById("player2");
let changeBtn = document.querySelector(".change-btn");
let changeBtn2 = document.getElementById("change-btn2");
let winInfo = document.querySelector(".win-info");
let gameModal = document.querySelector(".game-modal");
let audio = document.querySelector("audio");

// Event listeners

changeBtn.addEventListener("click", ()=>{
    playerInput.disabled = !playerInput.disabled;
    if(playerInput.disabled){
        changeBtn.innerText = "Change";
    }
    else {
        changeBtn.innerHTML = "Save";
    }
});

changeBtn2.addEventListener("click", ()=>{
    playerInput2.disabled = !playerInput2.disabled;
    if(playerInput2.disabled){
        changeBtn2.innerText = "Change";
    }
    else {
        changeBtn2.innerHTML = "Save";
    }
});

let modalBtns = document.querySelectorAll(".modal-btn").
forEach(btn => {
    if(btn.innerHTML === "Restart"){
        btn.addEventListener("click", restart);
    }
    else if(btn.innerHTML === "Close"){
        btn.addEventListener("click", close);
    }
});


// Инициализация массива
let cells = [["","",""],["","",""],["","",""]];
// Начала игры
gameStart();
// Функция для начала игры
function gameStart(){
for (let i = 0; i < cells.length; i++) {
    for(let j = 0; j < cells.length; j++) {
    let cell = document.createElement('div');
    cell.classList.add("cell");
    cell.dataset.x = i;
    cell.dataset.y = j;
    cell.addEventListener("click", playerDraw);
    game.append(cell);
        }
    }
}

let cellItems = document.querySelectorAll(".cell");
let player1IsWin = false;
let player2IsWin = false;
let isDraw = false;
let counter = 0;
function check(){
    let row = '';
    let column = '';
    let diagonal1 = '';
    let diagonal2 = '';

    for(let i = 0; i < cells.length; i++){
        for(let j = 0; j < cells.length; j++){
            row += cells[i][j];
            column += cells[j][i];
            diagonal1 = cells[0][0] + cells[1][1] + cells[2][2];
            diagonal2 = cells[0][2] + cells[1][1] + cells[2][0];
            if(row === "XXX" || row === "OOO"){
                if(row == "XXX"){
                    player1IsWin = true;
                    gameOver();
                }
                else {
                    player2IsWin = true;
                    gameOver();
                }
            }
            if(column === "XXX" || column === "OOO") {
                if(column == "XXX"){
                    player1IsWin = true;
                    gameOver();
                }
                else {
                    player2IsWin = true;
                    gameOver();
                }
            }
            if(diagonal1 == "XXX" || diagonal1 == "OOO"){
                if(diagonal1 == "XXX"){
                    player1IsWin = true;
                    gameOver();
                }
                else {
                    player2IsWin = true;
                    gameOver();
                }
            }
            if(diagonal2 == "XXX" || diagonal2 == "OOO"){
                if(diagonal2 == "XXX"){
                    player1IsWin = true;
                    gameOver();
                }
                else {
                    player2IsWin = true;
                    gameOver();
                }
            }
            if(counter == 9)
            {   
                gameOver();
                isDraw = true;
            }
        }
        row = '';
        column = '';
        diagonal1 = '';
        diagonal2 = '';
    }
}

let player1 = true;
let player2 = false;

function draw(){
    for(let i = 0; i < cells.length; i++){
            for(let j = 0; j < cells.length; j++){
                if(cells[i][j] == 'X') {
                    cellItems.forEach(item => {
                        if(item.dataset.x == i && item.dataset.y == j){
                            item.classList.add("mark-1");
                        }
                    })
                }
                if(cells[i][j] == 'O') {
                    cellItems.forEach(item => {
                        if(item.dataset.x == i && item.dataset.y == j){
                            item.classList.add("mark-2");
                        }
                    })
                }
            }
        }
}

function playerDraw(e){
    if(!player1) return;
    let x = parseInt(e.target.dataset.x);
    let y = parseInt(e.target.dataset.y);
    if(cells[x][y] == ''){
    counter++;
    cells[x][y] = 'X';
    draw();
    player1 = false;
    player2 = true;
    if(counter > 4){
    check();
}
    if(player1IsWin == true || player2IsWin == true || isDraw == true) return;
    computer();
    } else return;
}


function computer(){
    if(!player2) return;
    else {
    let rndRow = Math.round(Math.random()*2);
    let rndColumn = Math.round(Math.random()*2);
    if(cells[rndRow][rndColumn] == ''){
        cells[rndRow][rndColumn] = 'O';
        player2 = false;
        player1 = true;
        counter++;
        draw();
        if(counter > 4){
        check();
        }
    } else {
        computer();
        }
    }
}


function gameOver(){
    gameModal.style.display = 'flex';
    if(player1IsWin) {
        winInfo.innerHTML = `${playerInput.value} is win!`;
    } else if(player2IsWin) {
        winInfo.innerHTML = `${playerInput2.value} is win!`;
    } else {
        winInfo.innerHTML = "Draw!"
    }
}

function restart(){
    counter = 0;
    gameModal.style.display = "none";
    for(let i = 0; i < cells.length; i++){
        for(let j = 0; j < cells.length; j++){
            cells[i][j] = '';
        }
    }
    if(!player1) player1 = true;
    else player2 = true;
    game.innerHTML = "";
    player1IsWin = false;
    player2IsWin = false;
    isDraw = false;
    gameStart();
    cellItems = document.querySelectorAll(".cell");
}

function close(){
    gameModal.style.display = "none";
}