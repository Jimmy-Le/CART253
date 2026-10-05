/**
 * Yo Yoyo
 * Jimmy Le
 *
 * Watch the yoyo yoyo around 
 * 
 */

"use strict";
// Canvas Size
let maxX = 700;
let maxY = 500;

// Ball Properties
let ball = {
  x: 100,
  y: 300,
  startX: 100,
  startY: 0,
  finalX: maxX - 100,
  finalY: maxY,
  size: 50,
  offset: 25,
  directionX: 1,
  directionY: 1,
  speed: 1,
  color: "#47f2ef",
  baseColor: "#FFFFFF",
  touchColor: "#ffc338",
  outlineColor: "#FFFFFF"
}

// String Properties
let string =
{
  x1: maxX/2,
  y1: 0,
  x2: ball.x,
  y2: ball.y,
  color: "#FFFFFF",
  baseColor: "#FFFFFF",
  touchColor: "#ffc338",
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
}

/**
 * Draw and update the position of the ball and string
 */
function draw() {
  background(0, 0, 0);

  // Setup the string color and draw the shape
  push();
  stroke(string.color);
  line(string.x1, string.y1, string.x2, string.y2);
  pop();

  // Setup the ball color and draw the shape
  push();
  stroke(ball.outlineColor);
  fill(ball.color);
  ellipse(ball.x, ball.y, ball.size, ball.size);
  pop();
  

  // Move the ball 
  moveBall();
  changeColor();
}


/***
 * This function will move the ball and change its direction once it hits a the set limit
 * The ball will also change vertical direction if it hits the center of the canvas
 */
function moveBall()
{
  // Move the ball in the X and Y direction, based on its direction and speed
  ball.x += ball.directionX * ball.speed;
  ball.y += ball.directionY * ball.speed * 2.5;
  ball.y = constrain(ball.y, ball.startY - ball.size, ball.finalY - ball.offset);

  // Update the string position to follow the ball
  string.x2 = ball.x;
  string.y2 = ball.y;

  // If the ball hits the left or right limit, change its direction in both X and Y
  if(ball.x <= ball.startX || ball.x >= ball.finalX)
  {
    ball.directionX *= -1;
    ball.directionY *= -1;
  }

  // If the ball is at the center of the canvas, change its vertical direction
  if(ball.x + ball.offset === maxX/2 ){
    ball.directionY *= -1;
  }
}

/***
 * This function will change the color of the ball and string if the ball is touching the bottom of the canvas
 * If the ball is not touching the bottom of the canvas, it will change the color back to its base color
 */
function changeColor()
{
  ball.outlineColor = ball.y + ball.offset >= ball.finalY ? ball.touchColor : ball.baseColor;
  string.color = ball.y + ball.offset >= ball.finalY ? string.touchColor : string.baseColor;
}

