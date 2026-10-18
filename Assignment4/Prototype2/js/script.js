/**
 * Power Pong
 * Jimmy Le
 *
 * A game of pong where the player controls the left paddle and the computer controls the right paddle. The ball will bounce off the paddles and walls, and will reset if it goes out of bounds.
 * The player can move the paddle wherever and must try to overpower the computer
 * 
 */

"use strict";
// Canvas Size
let maxX = 700;             
let maxY = 500;

// Space away from the middle (for positioning the paddles)
let spacing = 250;

let ballAcceleration = 1;
let baseBallAcceleration = 1;
let ballAccelerationIncrement = 0.1;
let maxBallAcceleration = 10;

// Left Paddle Object
let leftPaddle = 
{
  x: maxX/2 - spacing,
  y: maxY/2 - 50,
  directionX: 0,
  directionY: 1,
  height: 100,
  width: 30,
  offset: 15,
  speed: 2,
  color:
  {
    r: 255,
    g: 255,
    b: 0
  }
}

//Right Paddle Object
let rightPaddle = 
{
  x: maxX/2 + spacing,
  y: maxY/2 - 50,
  directionX: 0,
  directionY: 1,
  height: 100,
  width: 30,
  offset: 15,
  speed: 2,
  color:
  {
    r: 0,
    g: 255,
    b: 255
  }
}

// Ball Object
let ball  =
{
  x:250,
  y:250,
  height: 30,
  width: 30,
  offset: 15,
  directionX: -1,
  directionY: -1,
  speed: 2,
  color:
  {
    r: 255,
    g: 0,
    b: 255
  }

}


/**
 * Create the canvas
 */
function setup() { 
  createCanvas(maxX, maxY);
  background(255,255,255)
}

/**
 * Draw and update the paddles and ball
 */
function draw() {
  background(0,0,0)
  push()
  // Instantiate Left Paddle
  fill(leftPaddle.color.r,leftPaddle.color.g,leftPaddle.color.b);
  rect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height)

  // Instantiate Right Paddle
  fill(rightPaddle.color.r,rightPaddle.color.g,rightPaddle.color.b);
  rect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)
  
  // Instantiate Ball
  fill(ball.color.r,ball.color.g,ball.color.b);
  rect(ball.x, ball.y, ball.width, ball.height)

  pop()

  // Move everything
  moveBall();
  movePaddle();
  moveRedPaddle();

}


/***
 * This function will move the red paddle based on the mouse position
 */
function moveRedPaddle()
{

  leftPaddle.x = mouseX - leftPaddle.width/2;
  leftPaddle.x = constrain(leftPaddle.x, 0, maxX - leftPaddle.width);

  leftPaddle.y = mouseY - leftPaddle.height/2;
  leftPaddle.y = constrain(leftPaddle.y, 0, maxY - leftPaddle.height);
}

/***
 * This function will move the ball and randomize the y direction whenever it hits a paddle
 * It will also reset the position of the ball if it goes out of bounds
 * And it will bounce off the upper and lower bounds.
 */
function moveBall()
{
  // Move the ball in the X and Y direction, based on its direction and speed
  ball.x += ball.directionX * ball.speed * ballAcceleration;
  ball.y += ball.directionY * ball.speed;


  // If the ball hits the left paddle
  let leftXCondition = ball.x - ball.offset <= leftPaddle.x + leftPaddle.offset && ball.x + ball.offset >= leftPaddle.x;
  let leftYCondition = ball.y + ball.height >= leftPaddle.y && ball.y <= leftPaddle.y +  leftPaddle.height;

  // If the ball hits the right paddle
  let rightXCondition = ball.x + ball.offset >= rightPaddle.x - rightPaddle.offset;
  let rightYCondition = ball.y + ball.height >= rightPaddle.y && ball.y <= rightPaddle.y +  rightPaddle.height;

  // If the ball is at the left paddle, change its direction to move to the right
  // Also accelerate the ball to make it faster
  if(leftXCondition && leftYCondition)
  {
      ballAcceleration += ballAccelerationIncrement;
      ballAcceleration = constrain(ballAcceleration, baseBallAcceleration, maxBallAcceleration);

      ball.directionX = 1;
      ball.directionY = ball.directionY * Math.ceil(random(0,2)) == 1 ? 1 : -1;
      
  } 
  // If the ball is at the right paddle, change its direction to move to the left
  // Also accelerate the ball to make it faster
  else if (rightXCondition && rightYCondition)
  {
      ballAcceleration += ballAccelerationIncrement;
      ballAcceleration = constrain(ballAcceleration, baseBallAcceleration, maxBallAcceleration);

      ball.directionX = -1;
      ball.directionY = ball.directionY * Math.floor(random(0,2)) == 1 ? 1 : -1;
  }

  // Bounce the ball on the top and bottom border
  if(ball.y <= 0  || ball.y + ball.height >= maxY)
  {
    ball.directionY = ball.directionY * -1;
  }
  // In case the ball escapes, reset it back
  // the paddle and ball move at the same speed to avoid going out of bounds
  else if(ball.x <= 0 || ball.x + ball.width >= maxX)
  {
      resetBall()
  }

}






/***
 * This function moves the paddles
 * It will attempt to follow the ball
 */
function movePaddle()
{
  // Move Paddle
  rightPaddle.y += rightPaddle.directionY * rightPaddle.speed;

  // Adjust the paddles directions based on the current y location of the ball
  rightPaddle.directionY = rightPaddle.y + rightPaddle.height/2  < ball.y  + ball.offset? 1 : -1;


  // Constrain the paddles so they don't go past the borders
  rightPaddle.y = constrain(rightPaddle.y, 0, maxY - rightPaddle.height);
}

/***
 * Reset the balls position if it goes out of bounds
 * Also reset the ball acceleration back to its base value
 */
function resetBall()
{
  ball.x = maxX/2;
  ball.y = maxY/2;
  ballAcceleration = baseBallAcceleration;
  background(0,0,0);
}


