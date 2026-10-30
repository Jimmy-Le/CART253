/**
 * Fall
 * Jimmy Le
 * 
 * Click mouse to make the leaves fall
 */

"use strict";
// Canvas Size
let maxX = 700;             
let maxY = 500;

// Tree trunk object
let treeTrunk = {
  x: maxX/2,
  y: maxY/2 + 150,
  h: 300,
  w: 30
}

// Array of leaves
let leaves = []

// Array of branches
let branches = []

// Current Leaf index
let currentLeaf = 0;

/**
 * Create the canvas and set up the tree leaves and branches
 */
function setup() { 
  createCanvas(maxX, maxY);
  background(255,255,255);

  // Make rectangles calculate from the center
  rectMode(CENTER);

  // Create branches
  createBranches(maxX/2, maxY/2, maxX/2 - 75, maxY/2 - 150);
  createBranches(maxX/2, maxY/2, maxX/2 - 200, maxY/2 - 125);
  createBranches(maxX/2, maxY/2, maxX/2 + 200, maxY/2 - 50);
  createBranches(maxX/2 + 100, maxY/2 -30, maxX/2 + 150, maxY/2 - 100)

  // Create leaves
  createLeaf(maxX/2 - 100, maxY/2 - 150);
  createLeaf(maxX/2 - 225, maxY/2 - 125);
  createLeaf(maxX/2 + 225, maxY/2 - 50);
  createLeaf(maxX/2 + 170, maxY/2 - 100);
}

/**
 * Draw and update the paddles and ball
 */
function draw() {
  background(0,0,0)

  // Draw tree trunk
  rect(treeTrunk.x, treeTrunk.y, treeTrunk.w, treeTrunk.h);


  // Draw each branch
  for(const branch of branches)
  {
    push()
    stroke(branch.color);
    strokeWeight(20)
    line(branch.x1, branch.y1, branch.x2, branch.y2);
    pop()
  }

  // Draw each leaves
  for(const leaf of leaves)
  {
    push()
    fill(leaf.color);
    ellipse(leaf.x, leaf.y, leaf.w, leaf.h);
    pop()

    // If the leaf is set to fall, make it fall
    if(leaf.isFalling)
    {
      fall(leaf);
    }
  }

}

/***
 * This function dynamically creates a new leaf and adds it to an array of leaves
 */
function createLeaf(newX, newY)
{
  let newLeaf = {
    x : newX,
    y : newY,
    h : 50,
    w: 100,
    originX: newX,
    originY: newY,
    color: "#f87f53",
    isFalling: false
  }
  leaves.push(newLeaf);
}

/***
 * This function dynamically creates a new branch and add its to an array of branches
 */
function createBranches(newX1, newY1, newX2, newY2)
{
  let newBranch = {
    x1 : newX1,
    y1 : newY1,
    x2 : newX2,
    y2 : newY2,

    color: "#ffffff"
  }
  branches.push(newBranch);
}

/***
 * This function takes a given leaf and makes it fall down and oscillate(?) left and right like a real leaf
 * Once the leaf goes off screen + a random amount of pixels, it will reset back to its orriginal position
 */
function fall(leaf)
{
  leaf.x -= random(-6,6);
  leaf.y += random(3, 2);


  // Reset back to original position after going off screen vertically
  if(leaf.y >= maxY + leaf.h + random(100, 400))
  {
    leaf.x = leaf.originX;
    leaf.y = leaf.originY;
    leaf.isFalling = false;
  }
}

/***
 * This event function cycles through the array of leaves on click 
 * and set the associated leaf's "isFalling" parameter to true if it isn't already.
 */
function mousePressed()
{
  currentLeaf = currentLeaf % leaves.length;
  let leaf = leaves[currentLeaf];

  if(!leaf.isFalling)
  {
    leaves[currentLeaf].isFalling = true;
  }

  currentLeaf++;
}








