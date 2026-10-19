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

let gravity = 2;


let force = 50;

// Left Paddle Object
let platform = 
{
  x: maxX/2 - 35,
  y: 100,
  directionX: 0,
  directionY: 1,
  height: 300,
  width: 100,
  offset: 15,
  speed: 2,
  color: "#ecc61d"
}

// Left Paddle Object
let line = 
{
  x: maxX/2 + 12.5,
  y: 110,
  directionX: 0,
  directionY: 1,
  height: 300,
  width: 5,
  offset: 15,
  speed: 2,
  color: "#ffffff"
}

let base = 
{
  x: maxX/2 - 45,
  y: 400,
  directionX: 0,
  directionY: 1,
  height: 50,
  width: 120,
  offset: 15,
  speed: 2,
  color: "#f8981b"
}



// Ball Object
let ball  =
{
  x:maxX/2,
  y:400,
  originY: 400,
  height: 30,
  width: 30,
  offset: 15,
  directionX: -1,
  directionY: -1,
  speed: 2,
  color: "#ff0000"

}// Bell Object
let bell  =
{
  x:maxX/2 - 10.5,
  y:110,
  height: 50,
  width: 50,
  offset: 15,
  directionX: -1,
  directionY: -1,
  speed: 2,
  color: "#ffffff"

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
  fill(platform.color);
  rect(platform.x, platform.y, platform.width, platform.height)

  fill(line.color);
  rect(line.x, line.y, line.width, line.height)

  fill(base.color);
  rect(base.x, base.y, base.width, base.height)

  // Instantiate Ball
  fill(ball.color);
  rect(ball.x, ball.y, ball.width, ball.height)

  fill(bell.color);
  rect(bell.x, bell.y, bell.width, bell.height)

  pop()

  fall();

}


/***
 * This function makes the rocks fall down, except if they are touching eachother or are getting dragged by the mouse
 */
function fall()
{

  ball.y += gravity;
  ball.y = constrain(ball.y, bell.y + bell.height, ball.originY);

}

function keyPressed()
{ 
  if(keyCode === 32)
  {
      ball.y -= force;
      ball.y = constrain(ball.y, bell.y + bell.height, ball.originY);
  }
}





