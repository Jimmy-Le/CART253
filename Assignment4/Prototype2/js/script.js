/**
 * Carnival
 * Jimmy Le
 *
 * Press space repeatedly and make the ball hit the bell to produce a sound!
 */

"use strict";
// Canvas Size
let maxX = 700;             
let maxY = 500;

// Variables that affect the movement of the ball
let gravity = 2;
let force = 50;

// Sound effect
let bellSound;

// The big platform thing
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

// The line in the middle which the ball follows
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

// The base of the platform
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

}

// Bell Object
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
 * Create the canvas and set up the bell sound
 */
function setup() { 
  createCanvas(maxX, maxY);
  background(255,255,255);

  bellSound = createAudio("assets/sounds/bark.wav");
  bellSound.volume(0.2);
}

/**
 * Draw and update the paddles and ball
 */
function draw() {
  background(0,0,0)

  push()
  fill("#FFFFFF");
  text("Press Space!", maxX/2 - 20, 470, 100, 50);
  pop()


  push()
  // Instantiate Platform
  fill(platform.color);
  rect(platform.x, platform.y, platform.width, platform.height)

  // Instantiate the Line
  fill(line.color);
  rect(line.x, line.y, line.width, line.height)

  // Instantiate the base
  fill(base.color);
  rect(base.x, base.y, base.width, base.height)

  // Instantiate Ball
  fill(ball.color);
  rect(ball.x, ball.y, ball.width, ball.height)

  // Instantiate the bell
  fill(bell.color);
  rect(bell.x, bell.y, bell.width, bell.height)
  pop()

  // Apply gravity to the ball
  fall();

}


/***
 * This function makes the ball fall down
 */
function fall()
{
  ball.y += gravity;
  ball.y = constrain(ball.y, bell.y + bell.height, ball.originY - ball.height);   // Limit it between the originY and the bottom of the bell

}

/***
 * This event function triggers when a key is pressed.
 * It checks if the space button (code 32) is pressed and moves the ball upwards
 * If the ball hits the bell, play a sound
 */
function keyPressed()
{ 
  // If the player presses space
  if(keyCode === 32)
  {
    // Apply an upward force to the ball
    ball.y -= force;
    ball.y = constrain(ball.y, bell.y + bell.height, ball.originY - ball.height);
    

    // Play sound when ball hits the bell
    if(ball.y === bell.y + bell.height)
    {
      bellSound.play();
    }
  }
}






