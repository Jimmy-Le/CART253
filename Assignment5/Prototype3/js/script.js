/**
 * Pause/Play
 * Jimmy Le
 *
 * Pause and play to see buffering
 * 
 */

"use strict";

// Canvas Size
let maxX = 500;
let maxY = 500;

// Play button object
let playButton =
{
  x1: maxX/2 - 50,
  y1: maxY/2 - 50,
  x2: maxX/2 - 50,
  y2: maxY/2 + 50,
  x3: maxX/2 + 50,
  y3: maxY/2
}

// Pause Bar template
let pauseBar = 
{
  x: maxX/2,
  y: maxY/2,
  w: 50,
  h: 100
}

// Array of circles
let circles = []

// Current circle index
let currentCircle = 0;

// Colors
let white = "#8186a3"
let focused = "#4a53ba"

// Current game state
let playState = false;

// Cooldown mutex lock
let onCooldown = false;


/**
 * Create the canvas and circles
 */
function setup() {
  createCanvas(maxX, maxY);

  // Make pause bars centered
  rectMode(CENTER);

  background(0,0,0);

  // Set up circle position
  createCircle(maxX/2, maxY/2 - 175);
  createCircle(maxX/2 + 125, maxY/2 - 125);
  createCircle(maxX/2 + 175, maxY/2);
  createCircle(maxX/2 + 125, maxY/2 + 125);
  createCircle(maxX/2, maxY/2 + 175);
  createCircle(maxX/2 - 125, maxY/2 + 125);
  createCircle(maxX/2 - 175, maxY/2);
  createCircle(maxX/2 - 125, maxY/2 - 125);

}

/**
 * Draw circles, and conditionally draw the play or pause icon
 * If the game is in the play state, change the color of the circles to simulate a loading animation every 0.05 seconds
 */
function draw() {
  background(0);

  // Conditionally draw either the play or pause button
  if(!playState){
    drawPlayButton();
  }
  else
  {
    drawPauseButton(-50);
    drawPauseButton(50);
  }

  // Loop through the list of circles and draw / color them
  for(const circle of circles)
  {
    push()
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size);
    pop();
  }
  
  // If it is currently on Play mode, it will call the cycle function every 0.5 seconds to update the color of the current focused circle.
  if(playState)
  {
    if(!onCooldown)
    {
      onCooldown = true;
      setTimeout(cycle, 50)
    }
  }

}

/***
 * This function draws the pause button, and takes in an offsest to modify the x position
 * This is used to set a distance between them
 */
function drawPauseButton(xOffset)
{
  push();
  rect(pauseBar.x + xOffset, pauseBar.y, pauseBar.w, pauseBar.h);
  pop();
}

/***
 * This function draws the play button
 */
function drawPlayButton()
{
  push();
  triangle(playButton.x1, playButton.y1, playButton.x2, playButton.y2, playButton.x3, playButton.y3);
  pop();

}

/***
 * When the mouse is pressed, change states
 */
function mousePressed()
{
  playState = !playState;
}

/***
 * This function creates a circle with a new position and adds it to the circles array
 */
function createCircle(newX,newY)
{
  let newCircle = 
  {
    x: newX,
    y: newY,
    size: 50,
    color: white
  }
  circles.push(newCircle);
}

/***
 * This function changes the current circle's color according the currentCircle index to the focused color
 * while it changes the previous one back to white
 */
function cycle()
{
  // Use modulus to keep it in bounds
  currentCircle = currentCircle % circles.length;

  // Add the whole circle length to the calculation to avoid negative numbers, then mod it by the length to get the previous index
  let previousCircle = (currentCircle - 1 + circles.length) % circles.length;
  
  // Set the colors 
  circles[currentCircle].color = focused;
  circles[previousCircle].color = white;

  // Increment the index
  currentCircle++;

  // Set the cooldown to false to let the other parts know that the code is done.
  onCooldown = false;
}



