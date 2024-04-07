// 1. Initialize Game Environment
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }]; // Snake starting position
let food = { x: 300, y: 300 }; // Food starting position
let direction = { x: 0, y: 0 }; // Snake movement direction
let gameSpeed = 100; // Game speed in milliseconds
let score = 0;

// 2. Draw Game Elements
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Move the snake
    moveSnake();

    // Check for game over
    if (isGameOver()) {
        ctx.fillText("Game Over!", 150, 200);
        return;
    }

    // Repeat
    setTimeout(drawGame, gameSpeed);
}

// 3. Game Mechanics
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    snake.unshift(newHead); // Add new head to the front of the snake

    // Check if snake eats the food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        placeFood();
    } else {
        snake.pop(); // Remove the tail of the snake
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * canvas.width / 10) * 10;
    food.y = Math.floor(Math.random() * canvas.height / 10) * 10;
}

function isGameOver() {
    // Check if snake hits the walls
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }

    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Event listener for snake direction
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp': direction = { x: 0, y: -1 }; break;
        case 'ArrowDown': direction = { x: 0, y: 1 }; break;
        case 'ArrowLeft': direction = { x: -1, y: 0 }; break;
        case 'ArrowRight': direction = { x: 1, y: 0 }; break;
    }
});

// Start the game
drawGame();
