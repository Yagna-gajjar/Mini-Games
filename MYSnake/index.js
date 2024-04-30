//Game Constants & variable
let inputDir = { x: 0, y: 0 }
let speed = 10;
let score = 0;
let lastpaintTime = 0;
let snakearr = [
    { x: 13, y: 15 },
]

let food = { x: 10, y: 5 }
//Game Function
function main(Ctime) {
    window.requestAnimationFrame(main);
    if ((Ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = Ctime;
    GameEngine();

}
function isColide(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true;
        }
        if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0) {
            return true;
        }
    }
    return false;
}

function GameEngine() {

    document.getElementById('score').innerHTML = "Your score</br>" + score;
    //part 1: Updating the snake array
    if (isColide(snakearr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over, press ok to play again");
        snakearr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //if snake eaten the food , icreament the score and regrnerate the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        score++;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y })
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    // part 2: Display the snake and food
    //Display the snake
    ground.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        ground.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    ground.appendChild(foodElement);
}

//main logic starts
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 }
    switch (e.key) {

        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        default:
            break;
    }
});