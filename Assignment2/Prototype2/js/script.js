/**
 * Auto Pong
 * Jimmy Le
 *
 * A guy who becomes visibly furious!
 * 
 * Starter Code by Pippin Barr
 */

"use strict";

let maxX = 700;
let maxY = 500;
let spacing = 200;


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
    g: 0,
    b: 0
  }
}

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
    r: 255,
    g: 0,
    b: 0
  }
}

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
    r: 0,
    g: 255,
    b: 0
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
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(0,0,0)
  push()
  fill(255,0,0);
  rect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height)
  rect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)
  rect(ball.x, ball.y, ball.width, ball.height)

  pop()

  moveBall();
  movePaddle();

}

function moveBall()
{
  // Move the ball in the X and Y direction, based on its direction and speed
  ball.x += ball.directionX * ball.speed;
  ball.y += ball.directionY * ball.speed;


  // If the ball hits left
  let leftXCondition = ball.x - ball.offset <= leftPaddle.x + leftPaddle.offset;
  let leftYCondition = ball.y + ball.height >= leftPaddle.y && ball.y <= leftPaddle.y +  leftPaddle.height
  let rightXCondition = ball.x + ball.offset >= rightPaddle.x - rightPaddle.offset

  if(leftXCondition && leftYCondition)
  {
      ball.directionX = ball.directionX * -1;
      ball.directionY = ball.directionY * Math.ceil(random(0,2)) == 1 ? 1 : -1;
  }

    if(rightXCondition && ball.y + ball.height >= rightPaddle.y && ball.y <= rightPaddle.y +  rightPaddle.height)
  {
      ball.directionX = ball.directionX * -1;
      ball.directionY = ball.directionY * Math.ceil(random(0,2)) == 1 ? 1 : -1;
  }


  if(ball.y <= 0  || ball.y + ball.height >= maxY)
  {
    // ball.directionX = ball.directionX * -1;
    ball.directionY = ball.directionY * -1;
  }

  // If the ball hits the left or right wall of the canvas (including its own size)
  // Change the X direction and randomize its color
  if(ball.x <= 0|| ball.x >= maxX)
  {
      resetBall()
  }


}

function movePaddle()
{
  // Move Paddles
  leftPaddle.y += leftPaddle.directionY * leftPaddle.speed;
  rightPaddle.y += rightPaddle.directionY * rightPaddle.speed;


  leftPaddle.directionY = leftPaddle.y + leftPaddle.height/2 < ball.y + ball.offset ? 1 : -1;
  rightPaddle.directionY = rightPaddle.y + rightPaddle.height/2  < ball.y  + ball.offset? 1 : -1;


  leftPaddle.y = constrain(leftPaddle.y, 0, maxY - leftPaddle.height);
  rightPaddle.y = constrain(rightPaddle.y, 0, maxY - rightPaddle.height);
}

function resetBall()
{
  ball.x = maxX/2;
  ball.y = maxY/2;
  background(0,0,0);
}

