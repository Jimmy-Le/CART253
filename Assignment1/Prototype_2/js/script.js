/**
 * IDK what the title is
 * Jimmy
 * 
 * This project is for an in-class challenge with a focus on 
 * drawing shapes to make pictures.
 */

"use strict";


let maxX;
let maxY;

let interval;

let red;
let blue;
let white;

/**
 * This function sets up the canvas and background color
*/
function setup() {
    createCanvas(500, 500);
    background(255,255,255);
    strokeWeight(5);

    red = color(255,0,0);
    white = color(255,255,255);
    blue = color(0,0,255);

    interval = 10;

    maxX = 500;
    maxY = 500;
}


/**

*/
function draw() {
    generateDots(blue, interval + 1);
    generateDots(red, interval);
}

function generateDots(color, offset)
{
    stroke(color);

    for(let y = 0; y <= maxY; y += offset)
    {
        for(let x = 0; x <= maxX; x += offset)
        {
            point(x,y);
        }
    }
}
