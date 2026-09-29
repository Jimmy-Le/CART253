/**
 * Mr. Furious
 * Jimmy Le
 *
 * A guy who becomes visibly furious!
 * 
 * Starter Code by Pippin Barr
 */

"use strict";

let maxX = 500;
let maxY = 500;
let spacing = 100;

// Attributes of the sky
let skyColor = {

    isIncrementing: false,
    fill:{
        r: 0,
        g: 0,
        b: 0
    },
    baseFill:
    {
        r: 160,
        g: 180,
        b: 200
    }
}

let leftEye = 
{
  x: maxX/2 - spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 80,
  width: 120,
  offset: 15,
  speed: 2,
  color:
  {
    r: 255,
    g: 0,
    b: 0
  }
}

let rightEye = 
{
  x: maxX/2 + spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 80,
  width: 120,
  offset: 15,
  speed: 2,
  color:
  {
    r: 255,
    g: 0,
    b: 0
  }
}

let rightPupil = 
{
  x: maxX/2 + spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 50,
  width: 10,
  offset: 15,
  speed: 2,
  color:
  {
    r: 255,
    g: 0,
    b: 0
  }
}

let leftPupil = 
{
  x: maxX/2 - spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 50,
  width: 10,
  offset: 15,
  speed: 2,
  color:
  {
    r: 255,
    g: 0,
    b: 0
  }
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(skyColor.fill.r, skyColor.fill.g, skyColor.fill.b);
  fill(255,255,0)
  ellipse(leftEye.x, leftEye.y, leftEye.width, leftEye.height);
  ellipse(rightEye.x, rightEye.y, rightEye.width, rightEye.height);

  fill(0,0,0);
  ellipse(leftPupil.x, leftPupil.y, leftPupil.width, leftPupil.height);
  ellipse(rightPupil.x, rightPupil.y, rightPupil.width, rightPupil.height);

}
