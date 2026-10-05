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

// Left Eye properties
let eyeL = 
{
  x: maxX/2 - spacing,
  y: maxY/2,
  height: 80,
  width: 120,
}

// Right Eye properties
let eyeR = 
{
  x: maxX/2 + spacing,
  y: maxY/2,
  height: 80,
  width: 120,
}

// Left pupil properties
let pupilL = 
{
  x: maxX/2 - spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 50,
  width: 10,
}

// Right pupil properties
let pupilR = 
{
  x: maxX/2 + spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 50,
  width: 10,
}

// Left eye shine properties
let shineL = 
{
  x: maxX/2 - spacing,
  y: maxY/2,
  height: 5,
  width: 10,
  offset: 5,
}

// right eye shine properties
let shineR = 
{
  x: maxX/2 + spacing,
  y: maxY/2,
  height: 5,
  width: 10,
  offset: 5,
}

// Head coordinates
let head = 
{
  x1: maxX/2 - spacing*1.5,
  y1: maxY/2 - spacing*1.5,
  x2: 0,
  y2: 0,
  x3: maxX,
  y3: 0,
  x4: maxX/2 + spacing*1.5,
  y4: maxY/2 - spacing*1.5
}


/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
}

/**
 * Draw the head, eyes, pupil and eyeshine, and make the pupils follow the mouse
 */
function draw() {
  background(skyColor.fill.r, skyColor.fill.g, skyColor.fill.b);

  // Draw the Head
  push()
  noStroke()
  fill(255,255,0)
  quad(head.x1,head.y1,head.x2,head.y2,head.x3,head.y3,head.x4,head.y4);
  pop()

  // Draw the eye sockets
  push();
  fill(255,255,0);
  ellipse(eyeL.x, eyeL.y, eyeL.width, eyeL.height);
  ellipse(eyeR.x, eyeR.y, eyeR.width, eyeR.height);
  pop();

  // Draw the pupils
  push();
  fill(0,0,0);
  ellipse(pupilL.x, pupilL.y, pupilL.width, pupilL.height);
  ellipse(pupilR.x, pupilR.y, pupilR.width, pupilR.height);
  pop();

  // Draw the eye shine
  push();
  fill(255,255,255);
  noStroke();
  ellipse(pupilL.x + shineL.offset, pupilL.y, shineL.width, shineL.height);
  ellipse(pupilR.x + shineR.offset, pupilR.y, shineR.width, shineR.height);  
  pop();

  // Call the movePupil function to make pupil move
  movePupil();
}


/***
 * This function will make the pupil move towards the cursor.
 * Its movement are limited by its eye socket
 */
function movePupil()
{

  // Left pupil movement and constraint in the X direction
  pupilL.x += pupilL.directionX * constantSpeed;
  pupilL.x = constrain(pupilL.x, eyeL.x - eyeL.width/2 + pupilL.width/2, eyeL.x + eyeL.width/2 - pupilL.width/2)

  // Left pupil movement and constraint in the Y direction
  pupilL.y += pupilL.directionY * constantSpeed;
  pupilL.y = constrain(pupilL.y, eyeL.y - eyeL.height/2 , eyeL.y + eyeL.height/2 )

  // Right pupil movement and constraint in the X direction
  pupilR.x += pupilR.directionX * constantSpeed;
  pupilR.x = constrain(pupilR.x, eyeR.x - eyeR.width/2 + pupilR.width/2, eyeR.x + eyeR.width/2 - pupilR.width/2)
  
  // Right pupil movement and constraint in the Y direction
  pupilR.y += pupilR.directionY * constantSpeed;
  pupilR.y = constrain(pupilR.y, eyeR.y - eyeR.height/2, eyeR.y + eyeR.height/2)


  // Change the left pupil movement direction based on its current position compared to the mouse
  pupilL.directionX = pupilL.x < mouseX ? 1 : -1;
  pupilL.directionY = pupilL.y < mouseY ? 1 : -1;

  // Change the right pupil movement direction based on its current position compared to the mouse
  pupilR.directionX = pupilR.x < mouseX ? 1 : -1;
  pupilR.directionY = pupilR.y < mouseY ? 1 : -1;

}


