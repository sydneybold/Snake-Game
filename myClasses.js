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

  drawSnakePart(snakePart) {
    context.fillStyle = "#1d18b5";
    context.fillRect(snakePart.x, snakePart.y, 40, 40);
  }

  drawSnakeEyes() {
    if ((snake.dx == 40) || ((snake.dy == 0) && (snake.dx == 0))) {
      context.beginPath();
      context.arc(snake.head.x + 18, snake.head.y + 8, 8, 0, 2 * Math.PI);
      context.arc(snake.head.x + 18, snake.head.y + 32, 8, 0, 2 * Math.PI);
      context.fillStyle = "white";
      context.fill();

      context.beginPath();
      context.arc(snake.head.x + 22, snake.head.y + 8, 3, 0, 2 * Math.PI);
      context.arc(snake.head.x + 22, snake.head.y + 32, 3, 0, 2 * Math.PI);
      context.fillStyle = "black";
      context.fill();
    }

    if (snake.dx == -40) {
      context.beginPath();
      context.arc(snake.head.x + 18, snake.head.y + 8, 8, 0, 2 * Math.PI);
      context.arc(snake.head.x + 18, snake.head.y + 32, 8, 0, 2 * Math.PI);
      context.fillStyle = "white";
      context.fill();

      context.beginPath();
      context.arc(snake.head.x + 14, snake.head.y + 8, 3, 0, 2 * Math.PI);
      context.arc(snake.head.x + 14, snake.head.y + 32, 3, 0, 2 * Math.PI);
      context.fillStyle = "black";
      context.fill();
    }

    if (snake.dy == 40) {
      context.beginPath();
      context.arc(snake.head.x + 8, snake.head.y + 14, 8, 0, 2 * Math.PI);
      context.arc(snake.head.x + 32, snake.head.y + 14, 8, 0, 2 * Math.PI);
      context.fillStyle = "white";
      context.fill();

      context.beginPath();
      context.arc(snake.head.x + 8, snake.head.y + 18, 3, 0, 2 * Math.PI);
      context.arc(snake.head.x + 32, snake.head.y + 18, 3, 0, 2 * Math.PI);
      context.fillStyle = "black";
      context.fill();
    }

    if (snake.dy == -40) {
      context.beginPath();
      context.arc(snake.head.x + 8, snake.head.y + 22, 8, 0, 2 * Math.PI);
      context.arc(snake.head.x + 32, snake.head.y + 22, 8, 0, 2 * Math.PI);
      context.fillStyle = "white";
      context.fill();

      context.beginPath();
      context.arc(snake.head.x + 8, snake.head.y + 18, 3, 0, 2 * Math.PI);
      context.arc(snake.head.x + 32, snake.head.y + 18, 3, 0, 2 * Math.PI);
      context.fillStyle = "black";
      context.fill();
    }
  }

  drawSnake() {
    this.snake.forEach(snake.drawSnakePart);
    snake.drawSnakeEyes();
  }

  moveSnake() {
    let newHead = {x: snake.head.x + snake.dx, y: snake.head.y + snake.dy};
    this.snake.unshift(newHead);  // add the head to the front of the list
    if (apple.checkAppleCollision(snake) == false) {
      this.snake.pop();          // removes the last item of the list
    }
  }

  changeDirection(event) {
    var keyPressed = event.keyCode;

    if (keyPressed == 37 && snake.dx == 0) {
      console.log("left");
      snake.dx = -40;
      snake.dy = 0;
    }

    if (keyPressed == 39 && snake.dx == 0) {
      console.log("right");
      snake.dx = 40;
      snake.dy = 0;
    }

    if (keyPressed == 38 && snake.dy == 0) {
      console.log("up");
      snake.dx = 0;
      snake.dy = -40;
    }

    if (keyPressed == 40 && snake.dy == 0) {
      console.log("down");
      snake.dx = 0;
      snake.dy = 40;
    }
  }

  hasGameEnded() {
    let tailCollision = false;
    let boundaryCollision = false;
    // check for collision with the boundaries
    if ((snake.head.x >= canvas.width) || (snake.head.x < 0) || (snake.head.y >= canvas.width) || (snake.head.y < 0)) {
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

  hasGameStarted() {
    if ((snake.dx == 0) && (snake.dy == 0) && snake.hasGameEnded() == false) {
      return false;
    }
    else {
      return true;
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
    context.beginPath();
    context.arc(this._x + 20, this._y + 20, 15, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
  }

  moveApple() {
    var newX = (Math.round(Math.random() * 15)) * 40;
    var newY = (Math.round(Math.random() * 15)) * 40;
    apple.x = newX;
    apple.y = newY;
  }

  checkAppleCollision(snake) {
    if ((this._x == snake.head.x) && (this._y == snake.head.y)) {
      console.log("EAT APPLE")
      return true;
    }
    else {
      return false;
    }
  }
}

function beforeGame() {
  context.fillStyle = "#14a5de";
  context.fillRect(160, 80, 280, 360);
  context.strokeStyle = "black";
  context.stroke();

  context.fillStyle = "#1d18b5";
  context.fillRect(180, 360, 240, 60);

  context.font = "40px Comic Sans MS";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText("Start", 300, 400)

  drawCheckeredBackground(280, 100, 160, 240);
}


function drawCheckeredBackground(width, height, x, y) {
  if ((width == canvas.width) && (height == canvas.height)) {
    var rows = 15;
    var columns = 15;
  }
  else {
    var rows = 5;
    var columns = 14;
  }

  var rowHeight = height / rows;
  var columnWidth = width / columns;

  console.log("Row Height:", rowHeight);
  console.log("Column Width:", columnWidth);

  for (r = 0; r < rows; r++) {
    for (c = 0; c < columns; c++) {
      if (((r % 2 == 0) && (c % 2 == 0)) || ((r % 2 != 0) && (c % 2 != 0))) {
        context.fillStyle = "#bfe330";
      }
      else {
        context.fillStyle = "#a4db17";
      }
      context.fillRect((c * columnWidth) + x, (r * rowHeight) + y, rowHeight, columnWidth);
    }
  }
}

function setUpContext() {
  // Get the canvas
  canvas = document.getElementById("gameCanvas");
  canvas.style.border = "1px solid black";

  // Set up the context for the animation
  context = canvas.getContext("2d");
  return context;
}
