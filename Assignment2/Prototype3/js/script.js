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
let constantSpeed = 1;

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

let eyeL = 
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

let eyeR = 
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


let pupilL = 
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

let pupilR = 
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

let shineL = 
{
  x: maxX/2 - spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 5,
  width: 10,
  offset: 5,
  speed: 2,
  color:
  {
    r: 255,
    g: 0,
    b: 0
  }
}

let shineR = 
{
  x: maxX/2 + spacing,
  y: maxY/2,
  directionX: 0,
  directionY: 1,
  height: 5,
  width: 10,
  offset: 5,
  speed: 2,
  color:
  {
    r: 255,
    g: 0,
    b: 0
  }
}

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
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(skyColor.fill.r, skyColor.fill.g, skyColor.fill.b);

  push()
  noStroke()
  fill(255,255,0)
  quad(head.x1,head.y1,head.x2,head.y2,head.x3,head.y3,head.x4,head.y4);

  pop()

  push();
  fill(255,255,0);
  ellipse(eyeL.x, eyeL.y, eyeL.width, eyeL.height);
  ellipse(eyeR.x, eyeR.y, eyeR.width, eyeR.height);
  pop();

  push();
  fill(0,0,0);
  ellipse(pupilL.x, pupilL.y, pupilL.width, pupilL.height);
  // fill(0,255,0)
  ellipse(pupilR.x, pupilR.y, pupilR.width, pupilR.height);
  pop();

  push();
  fill(255,255,255);
  noStroke();
  ellipse(pupilL.x + shineL.offset, pupilL.y, shineL.width, shineL.height);
  ellipse(pupilR.x + shineR.offset, pupilR.y, shineR.width, shineR.height);  
  pop();


  movePupil();
}


function movePupil()
{

  pupilL.x += pupilL.directionX * constantSpeed;
  pupilL.x = constrain(pupilL.x, eyeL.x - eyeL.width/2 + pupilL.width/2, eyeL.x + eyeL.width/2 - pupilL.width/2)

  pupilL.y += pupilL.directionY * constantSpeed;
  pupilL.y = constrain(pupilL.y, eyeL.y - eyeL.height/2 , eyeL.y + eyeL.height/2 )

  pupilR.x += pupilR.directionX * constantSpeed;
  pupilR.x = constrain(pupilR.x, eyeR.x - eyeR.width/2 + pupilR.width/2, eyeR.x + eyeR.width/2 - pupilR.width/2)

  pupilR.y += pupilR.directionY * constantSpeed;
  pupilR.y = constrain(pupilR.y, eyeR.y - eyeR.height/2, eyeR.y + eyeR.height/2)


  pupilL.directionX = pupilL.x < mouseX ? 1 : -1;
  pupilL.directionY = pupilL.y < mouseY ? 1 : -1;

  pupilR.directionX = pupilR.x < mouseX ? 1 : -1;
  pupilR.directionY = pupilR.y < mouseY ? 1 : -1;

}


