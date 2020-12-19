function main() {
  // Add one to the frames
  frames += 1;

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw green rectangle for background
  context.fillStyle = "#45B053";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawCheckeredBackground(xShift, yShift, gameBoardWidth, gameBoardHeight, 40);   // Draws the checkerboard background on board
  drawScore();                // Displays the user's score

  if (snake.hasGameStarted() == false) {
    beforeGame();             // Screen before the game that allows the user to start the game
  }
  if (snake.hasGameEnded() == true) {
    afterGame();              // Screen after the game that displays points and allows the user to restart
  }
  if ((snake.hasGameEnded() == false) && (snake.hasGameStarted() == true)) {
    snake.drawSnake();        // Draws the snake
    apple.drawApple();        // Draws the apple
    if (frames % 15 == 0) {   // Only moves the snake every 15 frames
      snake.moveSnake();
    }
    if (apple.checkAppleCollision() == true) {
      points += 1;            // Add one to the user's score because the snake ate the apple
      apple.moveApple();      // Move the apple to a new location
    }
  }
  window.requestAnimationFrame(main);
}


// Set up the canvas and context objects
context = setUpContext();

// Set the game board width as 600 x 600
var gameBoardWidth = canvas.width - 50;
var gameBoardHeight = canvas.height - 100;

// All elements on the game board will be shifted because the board in centered on the canvas
var xShift = 25
var yShift = 75

// Create instance of Snake object
let snake = new Snake ([ {x: 200 + xShift, y: 320 + yShift}, {x: 160 + xShift, y: 320 + yShift}, {x: 120 + xShift, y: 320 + yShift} ]);
let apple = new Apple (480 + xShift, 320 + yShift);

// Set frames variable that will be used to only draw on certain frames
var frames = 0;

// Set user's points
var points = 0;

// Set up event listener for when user presses a key down.
// It then calls the function snake.changeDirection, passing it an event object.
document.addEventListener("keydown", snake.changeDirection);

// Fire up the animation engine
window.requestAnimationFrame(main);
