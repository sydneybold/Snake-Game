function main() {
  frames += 1

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCheckeredBackground(canvas.width, canvas.height, 0, 0);

  if (snake.hasGameStarted() == false) {
    beforeGame();
  }
  if ((snake.hasGameEnded() == false) && (snake.hasGameStarted() == true)) {
    snake.drawSnake();
    apple.drawApple();
    if (frames % 15 == 0) {
      snake.moveSnake();
    }
    if (apple.checkAppleCollision(snake) == true) {
      apple.moveApple();
    }

  }
  window.requestAnimationFrame(main);
}


// Set up the canvas and context objects
context = setUpContext();

// Create instance of Snake object
let snake = new Snake ([ {x: 200, y: 320}, {x: 160, y: 320}, {x: 120, y: 320} ]);
let apple = new Apple (480, 320);

var frames = 0;

document.addEventListener("keydown", snake.changeDirection);

// Fire up the animation engine
window.requestAnimationFrame(main);
