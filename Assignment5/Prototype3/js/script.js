/**
 * Insomnia
 * Jimmy Le
 *
 * An eye that is very sensitive to mouse inputs.
 * 
 */

"use strict";

// Canvas Size
let maxX = 500;
let maxY = 500;

let maxH = 200;

let eyeCloseRate = 1;


// Eye Object
let eye  =
{
  x:maxX / 2,
  y:maxY / 2,
  h: 200,
  w: 500,
  color: "#ffefef"
}

// iris Object
let iris  =
{
  x:maxX / 2,
  y:maxY / 2,
  h: 200,
  w: 200,
  color: "#8ff3a0"
}

// pupil Object
let pupil = 
{
  x:maxX / 2,
  y:maxY / 2,
  h: 50,
  w: 50,
  color: "#000000"
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
  background(0);
  
  // Instantiate the eye
  push();
  fill(eye.color);
  ellipse(eye.x, eye.y, eye.w, eye.h);
  pop()

  // Instantiate the iris
  push();
  fill(iris.color);
  ellipse(iris.x, iris.y, iris.w, iris.h);
  pop();

  // Instantiate the pupil
  push();
  fill(pupil.color);
  ellipse(pupil.x, pupil.y, pupil.w, pupil.h);
  pop();

  // Start closing the eye
  closeEye();
}

/***
 * This function will slowly reduce the size of the eye and iris to simulate closing the eye
 */
function closeEye()
{
    // Reduce the height of the eyes and iris
    eye.h -= eyeCloseRate;
    iris.h -= eyeCloseRate;

    // Constrain the height so it doesn't go into the negatives
    eye.h = constrain(eye.h, 1, maxH);
    iris.h = constrain(iris.h, 1, maxH);
}

/***
 * This function will reset the height of the eye and iris to the original size
 */
function openEye()
{
  eye.h = maxH;
  iris.h = maxH;
}

/***
 * This event function will open the eye on mouse movement
 */
function mouseMoved()
{
  openEye();
}

/***
 * This event function will open the eye on mouse press
 */
function mousePressed()
{
  openEye();
}



  



