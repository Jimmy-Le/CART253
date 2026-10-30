/**
 * Pause/Play
 * Jimmy Le
 *
 * An eye that is very sensitive to mouse inputs.
 * 
 */

"use strict";

// Canvas Size
let maxX = 500;
let maxY = 500;

let playButton =
{
  x1: maxX/2 - 50,
  y1: maxY/2 - 50,
  x2: maxX/2 - 50,
  y2: maxY/2 + 50,
  x3: maxX/2 + 50,
  y3: maxY/2
}

let pauseBar = 
{
  x: maxX/2,
  y: maxY/2,
  w: 50,
  h: 100
}

let circles = []
let currentCircle = 0;

let white = "#FFFFFF"
let focused = "#4a53ba"


/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
  background(0,0,0);
}

/**
 * Draw the buttons and handle drawing or erasing on the canvas
 */
function draw() {
  background(0);
  

}

function drawPauseButton(xOffset)
{
  push();
  rect(pauseBar.x + xOffset, pauseBar.y, pauseBar.w, pauseBar.h);
  pop();
}





  



