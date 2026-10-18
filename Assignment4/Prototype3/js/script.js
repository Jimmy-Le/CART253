/**
 * Canvas
 * Jimmy Le
 *
 * An empty canvas where the user can draw on the screen by clicking and dragging the mouse. The user can also reset the canvas to a blank state or toggle between drawing and erasing.
 */

"use strict";

// Canvas Size
let maxX = 500;
let maxY = 500;


// Ball Object
let ball  =
{
  x:250,
  y:250,
  height: 25,
  width: 25,
}

// Button to reset the canvas
let resetButton = {
  x: 10,
  y: 10,
  width: 100,
  height: 50,
}

// Toggle button to switch between drawing and erasing
let toggleColorButton = {
  x: maxX - 110,
  y: 10,
  width: 100,
  height: 50,
  currentColor: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000",
  isWhite: true
}

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

  // Draw the reset button
  push()
  rect(resetButton.x, resetButton.y, resetButton.width, resetButton.height);
  text("Reset", resetButton.x + 10, resetButton.y + resetButton.height/2 + 5);
  pop()

  // Draw the Toggle button and based on the current color selected, adjust the styling and text accordingly
  push()
  stroke(255,0,0);
  fill(toggleColorButton.currentColor);
  rect(toggleColorButton.x, toggleColorButton.y, toggleColorButton.width, toggleColorButton.height);

  // Change the text color based on the current color selected
  fill(toggleColorButton.isWhite ? 0 : 255);
  text(toggleColorButton.isWhite ? "Erase" : "Draw", toggleColorButton.x + 10, toggleColorButton.y + toggleColorButton.height/2 + 5);
  pop()

  // Call the spawn ball (drawing) function
  spawnBall();
}


/***
 * This function will spawn balls (draw) on the canvas where the mouse is.
 * A ball is spawned only if the mouse is pressed
 */
function spawnBall(){
  if(mouseIsPressed){

    // Set the ball position to match the mouses and draw it
    push()
    noStroke();
    ball.x = mouseX;
    ball.y = mouseY;
    fill(toggleColorButton.currentColor);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    pop()
  }
}

/***
 * This function is one of the event handlers that is called when the mouse is pressed.
 * If the mouse is pressed and the mouse is over the reset or toggle button, do the appropriate action
 */
function mousePressed(){
  // Reset the canvas by turning the background black
  if(mouseX > resetButton.x && mouseX < resetButton.x + resetButton.width && mouseY > resetButton.y && mouseY < resetButton.y + resetButton.height){
    background(0,0,0);

  } else if(mouseX > toggleColorButton.x && mouseX < toggleColorButton.x + toggleColorButton.width && mouseY > toggleColorButton.y && mouseY < toggleColorButton.y + toggleColorButton.height){
    // Call the toggleColor function to switch between drawing and erasing
    toggleColor();
  } 
}

/***
 * This function will toggle the color of the toggleColorButton, which affects the toggle button styling and the ball color.
 */
function toggleColor(){
  toggleColorButton.isWhite = !toggleColorButton.isWhite;
  toggleColorButton.currentColor = toggleColorButton.isWhite ? toggleColorButton.white : toggleColorButton.black;
}

  



