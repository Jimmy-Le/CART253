/**
 * Bouncy DVD
 * Jimmy Le
 *
 * Watch the ball bounce on the walls, maybe it hits the corner!
 * 
 */

"use strict";
// Canvas Size
let maxX = 700;
let maxY = 500;

// Ball Properties
let ball = {
  x: 67,
  y: 300,
  size: 50,
  offset: 25,
  directionX: 1,
  directionY: -1,
  speed: 1,
  color:
    {
      r: 20,
      g: 200,
      b: 200
    }
  
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
}

/**
 * Draw and update the position of the ball
 */
function draw() {
  background(0, 0, 0);

  // Setup the ball color and draw the shape
  push();
  fill(ball.color.r, ball.color.g, ball.color.b)
  ellipse(ball.x, ball.y, ball.size, ball.size);
  pop();
  

  // Move the ball 
  // moveBall();
}


/***
 * This function will move the ball and change its direction once it hits a border
 * This function will also call the changeColor function as well.
 */
function moveBall()
{
  // Move the ball in the X and Y direction, based on its direction and speed
  ball.x += ball.directionX * ball.speed;
  ball.y += ball.directionY * ball.speed;

  // If the ball hits the left or right wall of the canvas (including its own size)
  // Change the X direction and randomize its color
  if(ball.x <= 0 + ball.offset || ball.x >= maxX - ball.offset )
  {
      ball.directionX = ball.directionX * -1;
      changeColor();
  }

  // If the ball hits the top or bottom wall of the canvas (including its own size)
  // Change the Y direction and randomize its color
  if(ball.y <= 0 + ball.offset || ball.y >= maxY - ball.offset )
  {
      ball.directionY = ball.directionY * -1;
      changeColor();
  }
}

/***
 * This function will randomize the stored color values of the Ball object
 */
function changeColor()
{
  ball.color.r = random(0,255);
  ball.color.g = random(0,255);
  ball.color.b = random(0,255);
}

