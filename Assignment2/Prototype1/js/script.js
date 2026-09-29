/**
 * Mr. Furious
 * Jimmy Le
 *
 * A guy who becomes visibly furious!
 * 
 * 
 */

"use strict";

let maxX = 700;
let maxY = 500;

let ball = {
  x: 67,
  y: 300,
  size: 50,
  offset: 25,
  directionX: 1,
  directionY: -1,
  speed: 2,
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
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(0, 0, 0);

  push();
  fill(ball.color.r, ball.color.g, ball.color.b)
  ellipse(ball.x, ball.y, ball.size, ball.size);
  pop();
  

  moveBall();

}

function moveBall()
{
  ball.x += ball.directionX * ball.speed;
  ball.y += ball.directionY * ball.speed;

  if(ball.x <= 0 + ball.offset || ball.x >= maxX - ball.offset )
  {
      ball.directionX = ball.directionX * -1;
  }

  if(ball.y <= 0 + ball.offset || ball.y >= maxY - ball.offset )
  {
    ball.directionY = ball.directionY * -1;
  }
}

