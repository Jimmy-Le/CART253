/**
 * Circle Master
 * Jimmy Le
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

// Speed attribute
let speed = 1
// Direction x and y of the puck
let xDirection = 0;
let yDirection = 0;

// Acceleration of the puck
let acceleration = 0;
let maxAcceleration = 1.5;

// Decceleration rate of the puck
let decceleration = 0.05;


// puck properties
const puck = {
  x: 200,
  y: 200,
  size: 50,
  fill: "#070101"
};

// User properties
const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 25,
  fill: "#3f3bad"
};

// Target properties
const target = {
  x: -50, // will be mouseX
  y: 200, // will be mouseY
  size: 200,
  fill: "#57cc6e",
  baseFill: "#57cc6e",
  goalFill: "#f084fe"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  // Draw the user and puck
  drawTarget();
  drawUser();
  drawPuck();
  movePuck();
  checkTarget();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

/**
 * Displays the target circle
 */
function drawTarget() {
  push();
  drawingContext.setLineDash([4, 4]); 
  stroke(255,255,255);
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}

/***
 * This function will move the puck if the user intersects with it
 * it will move in the opposite direction of the user
 * and decelerate over time
 */
function movePuck()
{


  // Calculate distance between circles' centres
  const d = dist(user.x, user.y, puck.x, puck.y);
  // Check if that distance is smaller than their two radii, 
  // because if it is, they are overlapping by the amazing
  // power of geometry!
  const overlap = (d < user.size/2 + puck.size/2);

  // Reset Acceleration and set the direction based on whether they overlap
  if (overlap) {
    acceleration = maxAcceleration;

    if(puck.x < user.x)
    {
      xDirection = -1;
    }
    else if (puck.x > user.x)
    {
      xDirection = 1;
    }
    else{
      xDirection = 0;
    }

    if(puck.y < user.y)
    {
      yDirection = -1;
    }
    else if (puck.y > user.y)
    {
      yDirection = 1;
    }
    else
    {
      yDirection = 0;
    }
  }

  // Update the x and y direction
  puck.x += xDirection * speed * acceleration;
  puck.y += yDirection * speed * acceleration;

  // Decelerate over time and constrain it so it doesnt go in the negatives
  acceleration -= decceleration;
  acceleration = constrain(acceleration, 0, maxAcceleration);
}

/***
 * This function will check if the puck overlaps with the target 
 * and change its color whether it is touching or not
 */
function checkTarget()
{
  // Calculate distance between circles' centres
  const d = dist(target.x, target.y, puck.x, puck.y);
  // Check if that distance is smaller than their two radii, 
  // because if it is, they are overlapping by the amazing
  // power of geometry!
  const overlap = (d < target.size/2 + puck.size/2);

  // If the it overlaps, fill it with the goal color, otherwise, set it back to the base color
  if(overlap)
  {
    target.fill = target.goalFill;
  }
  else{
    target.fill = target.baseFill;
  }
}