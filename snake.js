let minutes = 0;
let seconds = 0;
let points = 0;
const TEN = 10;

function startGame() {
    document.getElementById('start').style.visibility = 'hidden';
    counter = setInterval(timer, 1000);
    gameSpeed = setInterval(drawGame, 1000 / 8);
}

function timer() {
    if (seconds < 59) {
        ++seconds;
    } else {
        ++minutes;
        seconds = 0;
    }
    if (seconds < TEN) {
        document.getElementById('time').innerHTML = minutes + ':0' + seconds;
    } else {
        document.getElementById('time').innerHTML = minutes + ':' + seconds;
    }
}

const canvas = document.getElementById('gameTable');
const context = canvas.getContext('2d');
const cellSize = 20;
const max = 29;

function drawGame() {
    changeHeadPosition();
    if (gameOver()) {
        clearInterval(counter);
        clearInterval(gameSpeed);
        return;
    }
    clearMatrix();
    eatApple();
    drawApple();
    drawSnake();
}

function clearMatrix() {
    context.fillStyle = 'rgb(46, 1, 31)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

let appleLine = Math.floor(Math.random() * max);
let appleColumn = Math.floor(Math.random() * max);

function drawApple() {
    context.fillStyle = 'red';
    context.fillRect(appleColumn * cellSize, appleLine * cellSize, cellSize, cellSize);
}

let headLine = 15;
let headColumn = 15;
let snakeLength = 3;
class snakePart {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
}
let snakeParts = [];

function drawSnake() {
    context.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; ++i) {
        let part = snakeParts[i];
        context.fillRect(part.column * cellSize, part.line * cellSize, cellSize, cellSize);
    }
    snakeParts.push(new snakePart(headLine, headColumn));
    if (snakeParts.length > snakeLength) {
        snakeParts.shift();
    }
    context.fillStyle = 'rgb(228, 103, 20)';
    context.fillRect(headColumn * cellSize, headLine * cellSize, cellSize, cellSize);
}

let direction = [0, 1];

function changeHeadPosition() {
    headLine += direction[0];
    headColumn += direction[1];
}

document.body.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode == 38 && direction[0] != 1) { //up
        direction = [-1, 0];
    }
    if (event.keyCode == 40 && direction[0] != -1) { //down
        direction = [1, 0]
    }
    if (event.keyCode == 37 && direction[1] != 1) { //left
        direction = [0, -1]
    }
    if (event.keyCode == 39 && direction[1] != -1) { //rigth
        direction = [0, 1]
    }
}

function eatApple() {
    if (headLine == appleLine && headColumn == appleColumn) {
        appleLine = Math.floor(Math.random() * max);
        appleColumn = Math.floor(Math.random() * max);
        ++points;
        ++snakeLength;
        document.getElementById('points').innerHTML = points + '&#127822';
    }
}

function gameOver() {
    let gameOver = false;
    if (headLine < 0 || headColumn < 0 || headLine > max || headColumn > max) {
        gameOver = true;
    }
    for (let i = 0; i < snakeParts.length; ++i) {
        if(headLine == snakeParts[i].line && headColumn == snakeParts[i].column) {
            gameOver = true;
        }
    }
    if (gameOver == true) {
        context.fillStyle = "white";
        context.font = "50px Verdana";
        context.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
        document.getElementById('restart').style.visibility = 'visible';
    }
    return gameOver;
}
