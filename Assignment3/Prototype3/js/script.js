/**
 * I see you
 * Jimmy Le
 *
 * A  Cat that follows your mouse
 */

"use strict";

// Canvas Size
let maxX = 500;
let maxY = 500;
// Space between the left and right objects
let spacing = 100;

// Movement speed of the pupils
let constantSpeed = 1;

// Attributes of the sky
let skyColor = {
    fill:{
        r: 0,
        g: 0,
        b: 0
    }
}

// Ball Object
let ball  =
{
  x:250,
  y:250,
  height: 25,
  width: 25,
}

let resetButton = {
  x: 10,
  y: 10,
  width: 100,
  height: 50,
  color:
  {
    r: 255,
    g: 0,
    b: 0
  }
}

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
 * Draw the head, eyes, pupil and eyeshine, and make the pupils follow the mouse
 */
function draw() {

  push()
  rect(resetButton.x, resetButton.y, resetButton.width, resetButton.height);
  text("Reset", resetButton.x + 10, resetButton.y + resetButton.height/2 + 5);
  pop()

  push()
  stroke(255,0,0);
  fill(toggleColorButton.currentColor);
  rect(toggleColorButton.x, toggleColorButton.y, toggleColorButton.width, toggleColorButton.height);

  fill(toggleColorButton.isWhite ? 0 : 255);
  text(toggleColorButton.isWhite ? "Erase" : "Draw", toggleColorButton.x + 10, toggleColorButton.y + toggleColorButton.height/2 + 5);
  pop()

  spawnBall();
}



function spawnBall(){
  if(mouseIsPressed){
    push()
    noStroke();
    ball.x = mouseX;
    ball.y = mouseY;
    fill(toggleColorButton.currentColor);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    pop()
  }
}

function mousePressed(){
  if(mouseX > resetButton.x && mouseX < resetButton.x + resetButton.width && mouseY > resetButton.y && mouseY < resetButton.y + resetButton.height){
    background(0,0,0);
  } else if(mouseX > toggleColorButton.x && mouseX < toggleColorButton.x + toggleColorButton.width && mouseY > toggleColorButton.y && mouseY < toggleColorButton.y + toggleColorButton.height){
    toggleColor();
  } 
}

function toggleColor(){
  toggleColorButton.isWhite = !toggleColorButton.isWhite;
  toggleColorButton.currentColor = toggleColorButton.isWhite ? toggleColorButton.white : toggleColorButton.black;
}

  



