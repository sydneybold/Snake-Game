class Snake {

  constructor(snakeList) {
    this.snake = snakeList;
    this._dx = 0;
    this._dy = 0;
    this.color = "#1d18b5";
  }

  get head() {
    return this.snake[0];
  }

  get list() {
    return this.snake;
  }

  get dx() {
    return this._dx;
  }

  set dx(newDX) {
    this._dx = newDX;
  }

  get dy() {
    return this._dy;
  }

  set dy(newDY) {
    this._dy = newDY;
  }

  hasGameStarted() {
    /*
      Purpose: Check if the game has started.
      Inputs: None.
      Returns: True if the game has started and false if the game hasn't started.
    */

    // The game hasn't started if the snake is not moving and the game hasn't ended
    if ((snake.dx == 0) && (snake.dy == 0) && (snake.hasGameEnded() == false)) {
      return false;
    }
    else {
      return true;
    }
  }

  startGame(event) {
    /*
      Purpose: To start the game once the user has pressed the space bar.
      Inputs: The event.
      Returns: None.
    */
    var keyPressed = event.keyCode;

    if (keyPressed == 32) {     // 32 is the keycode for the space bar
      snake.dx = 40;            // Starts the motion of the snake
    }
  }

  drawSnake() {
    /*
      Purpose: To draw the snake.
      Inputs: None.
      Returns: None.
    */
    this.snake.forEach(snake.drawSnakePart);
    snake.drawSnakeEyes(snake.head.x, snake.head.y);
  }

  drawSnakePart(snakePart) {
    /*
      Purpose: To draw each individual box of the snake.
      Inputs: The cordinates of the individual snake part.
      Returns: None.
    */
    context.fillStyle = "#1d18b5";
    context.fillRect(snakePart.x, snakePart.y, 40, 40);
  }

  drawSnakeEyes(x, y) {
    /*
      Purpose: To draw the eyes of the snake depending on the direction.
      Inputs: The x and y cordinates of the snake head.
      Returns: None.
    */

    // Created an array of each shift from the head of the snake depending on where the eyes are facing
    // positions = [left white eye x, right white eye x, left white eye y, right white eye y, left black eye x, right black eye x, left black eye y, right black eye y,]
    if ((snake.dx == 40) || (snake.hasGameStarted() == false) || (snake.hasGameEnded() == true)) {     // Right looking eyes
      var positions = [18, 18, 8, 32, 22, 22, 8, 32];
    }
    else if (snake.dx == -40) {    // Left looking eyes
      var positions = [18, 18, 8, 32, 14, 14, 8, 32];
    }
    else if (snake.dy == 40) {     // Down looking eyes
      var positions = [8, 32, 14, 14, 8, 32, 18, 18];
    }
    else if (snake.dy == -40) {      // Up looking eyes
      var positions = [8, 32, 22, 22, 8, 32, 18, 18];
    }

    // Draw the white part of the eyes
    context.beginPath();
    context.arc(x + positions[0], y + positions[2], 8, 0, 2 * Math.PI);
    context.arc(x + positions[1], y + positions[3], 8, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();

    // Draw the pupils of the eyes
    context.beginPath();
    context.arc(x + positions[4], y + positions[6], 3, 0, 2 * Math.PI);
    context.arc(x + positions[5], y + positions[7], 3, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
  }

  moveSnake() {
    /*
      Purpose: To move the snake.
      Inputs: None.
      Returns: None.
    */
    let newHead = {x: snake.head.x + snake.dx, y: snake.head.y + snake.dy};   // Add the x and y movement to the head of the snake
    this.snake.unshift(newHead);  // Add the new head to the front of the list
    // If the snake eats the apple, the snake grows and does not remove the last item
    if (apple.checkAppleCollision(snake) == false) {
      this.snake.pop();          // Removes the last item of the list
    }
  }

  changeDirection(event) {
    /*
      Purpose: To change the direction of the snake.
      Inputs: The event.
      Returns: None.
    */
    var keyPressed = event.keyCode;

    if (keyPressed == 37 && snake.dx == 0) {      // Left arrow key
      snake.dx = -40;
      snake.dy = 0;
    }

    if (keyPressed == 39 && snake.dx == 0) {      // Right arrow key
      snake.dx = 40;
      snake.dy = 0;
    }

    if (keyPressed == 38 && snake.dy == 0) {      // Up arrow key
      snake.dx = 0;
      snake.dy = -40;
    }

    if (keyPressed == 40 && snake.dy == 0) {      // Down arrow key
      snake.dx = 0;
      snake.dy = 40;
    }
  }

  hasGameEnded() {
    /*
      Purpose: To check if the game has ended.
      Inputs: None.
      Returns: True if the game has ended and false if the game hasn't ended.
    */
    let tailCollision = false;
    let boundaryCollision = false;
    // check for collision with the boundaries
    if ((snake.head.x >= gameBoardWidth + xShift) || (snake.head.x < xShift) || (snake.head.y >= gameBoardHeight + yShift) || (snake.head.y < yShift)) {
      boundaryCollision = true;
    }
    // check for collision with snake tail
    for (var i = 1; i < snake.list.length; i++) {
      if ((snake.head.x == snake.list[i].x) && (snake.head.y == snake.list[i].y)) {
        tailCollision = true;
      }
    }
    // check if either the snake collides with the boundaries or with the snake tail
    if (tailCollision == true || boundaryCollision == true) {
      return true;
    }
    else {
      return false;
    }
  }
}


class Apple {

  constructor(x, y) {
    this._x = x;
    this._y = y;
    this.eaten = false;
  }

  set x(newX) {
    this._x = newX;
  }

  set y(newY) {
    this._y = newY;
  }

  drawApple() {
    /*
      Purpose: To draw the apple.
      Inputs: None.
      Returns: None.
    */
    context.beginPath();
    context.arc(this._x + 20, this._y + 20, 15, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
  }

  checkAppleCollision() {
    /*
      Purpose: To check if the snake ate the apple.
      Inputs: None.
      Returns: True if the snake ate the apple and false if the snake didn't eat the apple.
    */
    if ((this._x == snake.head.x) && (this._y == snake.head.y)) {
      return true;
    }
    else {
      return false;
    }
  }

  moveApple() {
    /*
      Purpose: To move the apple to a new location.
      Inputs: None.
      Returns: None.
    */
    let validApple = false;               // Assumed new apple location is invalid
    while (validApple == false) {
      // Create a new x and y location for the apple
      var newX = (Math.round(Math.random() * 14)) * 40 + xShift;
      var newY = (Math.round(Math.random() * 14)) * 40 + yShift;
      var collisions = 0;     // Set the collisions between the apple and snake to 0
      for (var i = 1; i < snake.list.length; i++) {   // For each square in the snake...
        if ((newX == snake.list[i].x) && (newY == snake.list[i].y)) {
          collisions += 1;    // If the apple collides with the snake square, add one to the collisions
        }
      }
      if (collisions == 0) {    // If the apple never collides with a part of the snake, it is a valid apple location
        validApple = true;
        apple.x = newX;
        apple.y = newY;
      }
    }
  }
}


function setUpContext() {
  /*
    Purpose: To set up the context.
    Inputs: None.
    Returns: The context.
  */
  // Get the canvas
  canvas = document.getElementById("gameCanvas");
  canvas.style.border = "1px solid black";

  // Set up the context for the animation
  context = canvas.getContext("2d");
  return context;
}

function drawCheckeredBackground(x, y, width, height, size) {
  /*
    Purpose: To draw the checkerboard background.
    Inputs: The x and y cordinates of the top left corner, the width, the height,
    and the size of each square .
    Returns: None.
  */
  var rows = height / size;
  var columns = width / size;

  for (r = 0; r < rows; r++) {
    for (c = 0; c < columns; c++) {
      if (((r % 2 == 0) && (c % 2 == 0)) || ((r % 2 != 0) && (c % 2 != 0))) {
        context.fillStyle = "#bfe330";
      }
      else {
        context.fillStyle = "#a4db17";
      }
      context.fillRect((c * size) + x, (r * size) + y, size, size);
    }
  }
}

function drawScore() {
  /*
    Purpose: To draw the score.
    Inputs: None.
    Returns: None.
  */
  context.beginPath();
  context.arc(75, 75 / 2, 25, 0, 2 * Math.PI);
  context.fillStyle = "red";
  context.fill();

  context.font = "45px Comic Sans MS";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText(points, 135, 55)
}

function beforeGame() {
  /*
    Purpose: To draw the before game screen.
    Inputs: None.
    Returns: None.
  */
  commonElementsOfStartAndFinishScreens(0, "-- press space to start game --")

  // Draw the game name
  context.font = "45px Comic Sans MS";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText("Snake Game", 300 + xShift, 180 + yShift);

  // Set up event listener for when user presses a key down.
  document.addEventListener("keydown", snake.startGame);
}

function commonElementsOfStartAndFinishScreens(y_Shift, message) {
  /*
    Purpose: To draw the common elements of the before and after game screens
    Inputs: The y shift of the screes because some elements are shifted down depending
    on whether it is the begining or ending screen and the message for the user on
    the bottom of the screen.
    Returns: None.
  */

  // draw light blue rectangle
  context.beginPath();
  context.rect(159 + xShift, 120 + yShift, 282, 360);
  context.fillStyle = "#14a5de";
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = "black";
  context.stroke();

  // draw snake icon
  context.fillStyle = "#1d18b5";
  context.fillRect(180 + xShift, 240 + yShift + y_Shift, 120, 40);

  // draw snake icon's eyes
  snake.drawSnakeEyes(260 + xShift, 240 + yShift + y_Shift);

  // draw apple icon
  context.beginPath();
  context.arc(400 + xShift, 255 + yShift + y_Shift, 15, 0, 2 * Math.PI);
  context.fillStyle = "red";
  context.fill();

  // draw dark blue rectangle in bottom of larger light blue rectangle
  context.fillStyle = "#1d18b5";
  context.fillRect(170 + xShift, 390 + yShift + y_Shift, 260, 80 - y_Shift);

  // draw text
  context.font = "20px Comic Sans MS";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText(message, 300 + xShift, 440 + yShift, 260);

  // draw checkerboard strip
  drawCheckeredBackground(160 + xShift, 280 + yShift + y_Shift, 280, 100, 20);
}

function afterGame() {
  /*
    Purpose: To draw the end game screen.
    Inputs: None.
    Returns: None.
  */
  commonElementsOfStartAndFinishScreens(20, "-- press space to play again --")

  context.font = "50px Comic Sans MS";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText("Game Over", 300 + xShift, 175 + yShift);
  context.fillStyle = "#1d18b5";
  context.fillText("Score:", 275 + xShift, 240 + yShift);
  context.fillText(points, 375 + xShift, 240 + yShift);

  document.addEventListener("keydown", reloadPage);
}

function reloadPage(event) {
  /*
    Purpose: To reload the page so the user can play the game again.
    Inputs: The event.
    Returns: None.
  */
  var keyPressed = event.keyCode;

  if (keyPressed == 32) {
    window.location.reload();        // Reloads the page so the user can play again
  }
}
