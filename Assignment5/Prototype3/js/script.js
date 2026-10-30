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

let white = "#8186a3"
let focused = "#4a53ba"

let playState = false;

let onCooldown = false;


/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
  rectMode(CENTER);
  background(0,0,0);

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
 * Draw the buttons and handle drawing or erasing on the canvas
 */
function draw() {
  background(0);

  if(!playState){
    drawPlayButton();
  }
  else
  {
    drawPauseButton(-50);
    drawPauseButton(50);
  }

  for(const circle of circles)
  {
    push()
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size);
    pop();
  }
  
  if(playState)
  {
    if(!onCooldown)
    {
      onCooldown = true;
      setTimeout(cycle, 50)
    }
  }

}

function drawPauseButton(xOffset)
{
  push();
  rect(pauseBar.x + xOffset, pauseBar.y, pauseBar.w, pauseBar.h);
  pop();
}

function drawPlayButton()
{
  push();

  triangle(playButton.x1, playButton.y1, playButton.x2, playButton.y2, playButton.x3, playButton.y3);

  pop();

}

function mousePressed()
{
  playState = !playState;
}


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


function cycle()
{
  currentCircle = currentCircle % circles.length;
  let previousCircle = (currentCircle - 1 + circles.length) % circles.length;
  
  circles[currentCircle].color = focused;
  circles[previousCircle].color = white;

  
  currentCircle++;
  onCooldown = false;
}



