var blockSize = 25;
var rows = 15;
var cols = 15;
var board;
var context;


const scarySound = new Audio('assets/Jumpscare Sound Effect.mp3');

//Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;


window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000 / 10);
}

function jumpScare() {
   
    const jumpScareImg = document.createElement('img');
    jumpScareImg.src = 'assets/SmazePhoto.jpg';
    jumpScareImg.style.position = 'fixed';
    jumpScareImg.style.top = '0';
    jumpScareImg.style.left = '0';
    jumpScareImg.style.width = '100%';
    jumpScareImg.style.height = '100%';
    jumpScareImg.style.objectFit = 'cover';
    jumpScareImg.style.zIndex = '-1';
    document.body.appendChild(jumpScareImg);
    
    
    setTimeout(() => {
      
      document.body.removeChild(jumpScareImg);
    }, 3000);

    
  }

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over
    if (snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1) {
        gameOver = true;
        jumpScare();
        scarySound.play();

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            jumpScare();
            scarySound.play();
            
        }
    }


}




function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}
