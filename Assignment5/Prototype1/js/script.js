/**
 * Rock Stacker
 * Jimmy Le
 *
 * Stack the rocks! You can stack them mid-air and remove the bottom one to place on top!
 * 
 */

// Conditions to check if the mouse is currently touching those rocks
let mouseIsTouchRockA = false;
let mouseIsTouchRockB = false;
let mouseIsTouchRockC = false;

"use strict";
// Canvas Size
let maxX = 700;
let maxY = 500;

// The speed at which the rocks fall
let gravity = 2;

// Rock A's Property
let rockA = {
  x: 100,
  y: 300,
  w: 100,
  h: 50,
  speed: 1,
  color: "#66eeec",
}

// Rock B's Property
let rockB = {
  x: 200,
  y: 200,
  w: 50,
  h: 75,
  speed: 1,
  color: "#3bf76a",
}

// Rock C's Property
let rockC = {
  x: 300,
  y: 300,
  w: 75,
  h: 75,
  speed: 1,
  color: "#f76571",
}


/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
}

/**
 * Draw and update the position of the rocks
 */
function draw() {
  background(0, 0, 0);

  // Setup rock A
  push();
  fill(rockA.color);
  rect(rockA.x,rockA.y,rockA.w,rockA.h);
  pop();


  // Setup rock B
  push()
  fill(rockB.color);
  rect(rockB.x,rockB.y,rockB.w,rockB.h);
  pop()

  // Setup rock C
  push()
  fill(rockC.color);
  rect(rockC.x,rockC.y,rockC.w,rockC.h);
  push();
  
  // TODO: Call the fall method, which makes the rocks fall down, unless they are colliding with eachother or are dragged
  fall();
}

/***
 * This function makes the rocks fall down, except if they are touching eachother or are getting dragged by the mouse
 */
function fall()
{

  // Make Rock A fall
  if(!mouseIsTouchRockA && !checkCollision(rockA,rockB) && !checkCollision(rockA, rockC))
  {
    rockA.y += gravity;
    rockA.y = constrain(rockA.y, 0, maxY - rockA.h);
    rockA.x = constrain(rockA.x, 0, maxX - rockA.w);
  }

  // Make Rock B fall
  if(!mouseIsTouchRockB && !checkCollision(rockA,rockB) && !checkCollision(rockB, rockC))
  {
    rockB.y += gravity;
    rockB.y = constrain(rockB.y, 0, maxY - rockB.h);
    rockB.x = constrain(rockB.x, 0, maxX - rockB.w);
  }

  // Make Rock C fall
  if(!mouseIsTouchRockC && !checkCollision(rockC,rockA) && !checkCollision(rockC, rockB))
  {
    rockC.y += gravity;
    rockC.y = constrain(rockC.y, 0, maxY - rockC.h);
    rockC.x = constrain(rockC.x, 0, maxX - rockC.w);
  }

}

/***
 * This is an event function that checks if the mouse is on one of the rocks when getting pressed.
 * If this is the case, the mouseIsTouchRockX is set to true.
 */
function mousePressed()
{
  mouseIsTouchRockA = (mouseX >= rockA.x && mouseX <= rockA.x + rockA.w) && (mouseY >= rockA.y && mouseY <= rockA.y + rockA.h);
  mouseIsTouchRockB = (mouseX >= rockB.x && mouseX <= rockB.x + rockB.w) && (mouseY >= rockB.y && mouseY <= rockB.y + rockB.h);
  mouseIsTouchRockC = (mouseX >= rockC.x && mouseX <= rockC.x + rockC.w) && (mouseY >= rockC.y && mouseY <= rockC.y + rockC.h);
}

/***
 * This is an event function that checks if the mouse is being dragged.
 * If the mouse was clicked on a rock, make that rock follow the mouse.
 */
function mouseDragged()
{
  // If Rock A was clicked
  if(mouseIsTouchRockA)
  {
    rockA.x = mouseX - rockA.w /2;
    rockA.y = mouseY - rockA.h /2;
  } 
  // If Rock B was clicked
  else if (mouseIsTouchRockB)
  {
    rockB.x = mouseX - rockB.w /2;
    rockB.y = mouseY - rockB.h /2;
  } 
  // If Rock C was clicked
  else if (mouseIsTouchRockC)
  {
    rockC.x = mouseX - rockC.w /2;
    rockC.y = mouseY - rockC.h /2;
  }
}

/***
 * This is an event function that sets mouseIsTouchX to false for all rocks when the mouse gets released
 */
function mouseReleased()
{
  mouseIsTouchRockA = false;
  mouseIsTouchRockB = false;
  mouseIsTouchRockC = false;
}

/***
 * This helper function checks if two rocks are touching each other
 */
function checkCollision(rock1, rock2)
{
  let touchX = (rock1.x < rock2.x + rock2.w && rock1.x + rock1.w > rock2.x);      // Check the x values are within range
  let touchY = (rock1.y < rock2.y + rock2.h && rock1.y + rock1.h > rock2.y);      // Check the y values are within range

  return touchX && touchY;                                                        // Return true if both are true
}







