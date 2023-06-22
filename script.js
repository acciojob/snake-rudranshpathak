//your code here
// Generate Snake Body Pixels and Food
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementsByClassName("scoreBoard")[0];
const snakeBodyPixels = [];

// Add snake body pixels and food to the game container
for (let i = 1; i <= 40; i++) {
  for (let j = 1; j <= 40; j++) {
    const pixel = document.createElement("div");
    pixel.id = `pixel${i}-${j}`;
    pixel.className = "pixel";
    gameContainer.appendChild(pixel);

    if (i === 20 && j === 1) {
      pixel.classList.add("snakeBodyPixel");
      snakeBodyPixels.push(pixel);
    }
  }
}

// Generate food
const food = document.createElement("div");
food.className = "food";
food.id = "foodPixel";
gameContainer.appendChild(food);

// Set initial score
let score = 0;
scoreBoard.innerHTML = `Score: ${score}`;

// Set snake movement interval
let snakeInterval = setInterval(moveSnake, 100);

// Snake movement logic
let direction = "right";
let snakeHeadRow = 20;
let snakeHeadCol = 1;

function moveSnake() {
  // Calculate new head position based on the current direction
  if (direction === "up") {
    snakeHeadRow--;
  } else if (direction === "down") {
    snakeHeadRow++;
  } else if (direction === "left") {
    snakeHeadCol--;
  } else if (direction === "right") {
    snakeHeadCol++;
  }

  // Check for collision with walls or snake body
  if (
    snakeHeadRow < 1 ||
    snakeHeadRow > 40 ||
    snakeHeadCol < 1 ||
    snakeHeadCol > 40 ||
    snakeBodyPixels.some((pixel) => pixel.id === `pixel${snakeHeadRow}-${snakeHeadCol}`)
  ) {
    clearInterval(snakeInterval);
    alert("Game Over!");
    return;
  }

  // Move the snake
  const newHeadPixel = document.getElementById(`pixel${snakeHeadRow}-${snakeHeadCol}`);
  newHeadPixel.classList.add("snakeBodyPixel");
  snakeBodyPixels.push(newHeadPixel);

  // Check if the snake ate the food
  if (newHeadPixel.id === "foodPixel") {
    score++;
    scoreBoard.innerHTML = `Score: ${score}`;
    generateFood();
  } else {
    // Remove the tail pixel
    const tailPixel = snakeBodyPixels.shift();
    tailPixel.classList.remove("snakeBodyPixel");
  }
}

// Generate food at a random position
function generateFood() {
  const foodRow = Math.floor(Math.random() * 40) + 1;
  const foodCol = Math.floor(Math.random() * 40) + 1;
  const foodPixel = document.getElementById(`pixel${foodRow}-${foodCol}`);

  // Check if the generated position is not occupied by the snake body
  if (!snakeBodyPixels.some((pixel) => pixel.id === foodPixel.id)) {
    foodPixel.id = "foodPixel";
    foodPixel.classList.add("food");
  } else {
    // Try generating food again
    generateFood();
  }
}

// Handle arrow key presses to change the snake's direction
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

