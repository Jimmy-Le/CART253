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

let treeTrunk = {
  x: maxX/2,
  y: maxY/2 + 150,
  h: 300,
  w: 30
}

let leaves = []
let branches = []

let currentLeaf = 0;

/**
 * Create the canvas and set up the bell sound
 */
function setup() { 
  createCanvas(maxX, maxY);
  background(255,255,255);

  rectMode(CENTER);

  createBranches(maxX/2, maxY/2, maxX/2 - 75, maxY/2 - 150);
  createBranches(maxX/2, maxY/2, maxX/2 - 200, maxY/2 - 125);
  createBranches(maxX/2, maxY/2, maxX/2 + 200, maxY/2 - 50);
  createBranches(maxX/2 + 100, maxY/2 -30, maxX/2 + 150, maxY/2 - 100)

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

  rect(treeTrunk.x, treeTrunk.y, treeTrunk.w, treeTrunk.h);


  for(const branch of branches)
  {
    push()
    stroke(branch.color);
    strokeWeight(20)
    line(branch.x1, branch.y1, branch.x2, branch.y2);
    pop()
  }

  for(const leaf of leaves)
  {
    push()
    fill(leaf.color);
    ellipse(leaf.x, leaf.y, leaf.w, leaf.h);
    pop()

    if(leaf.isFalling)
    {
      fall(leaf);
    }
  }

}


function createLeaf(newX, newY)
{
  let newLeaf = {
    x : newX,
    y : newY,
    h : 50,
    w: 100,
    originX: newX,
    originY: newY,
    color: "#bdff9e",
    isFalling: false
  }
  leaves.push(newLeaf);
}

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


function fall(leaf)
{
  leaf.x -= random(-6,6);
  leaf.y -= random(-3, -2);
}

function mousePressed()
{
  currentLeaf = currentLeaf % leaves.length;
  let leaf = leaves[currentLeaf];

  if(leaf.isFalling)
  {
    leaf.x = leaf.originX;
    leaf.y = leaf.originY;
    leaf.isFalling = false;
  }
  else
  {
    leaves[currentLeaf].isFalling = true;
  }

  currentLeaf++;
}








