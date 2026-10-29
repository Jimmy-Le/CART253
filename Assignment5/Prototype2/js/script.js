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
  y: maxY/2,
  h: 100,
  w: 30
}

let branches = []

let leaves = []

/**
 * Create the canvas and set up the bell sound
 */
function setup() { 
  createCanvas(maxX, maxY);
  background(255,255,255);
}

/**
 * Draw and update the paddles and ball
 */
function draw() {
  background(0,0,0)
}


function createLeaf(newX, newY)
{
  let newLeaf = {
    x : newX,
    y : newY,
    h : 30,
    w: 40,
    color: "#51ff00"
  }

  leaves.push(newLeaf);
}











