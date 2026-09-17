/**
 * Circle Illusion
 * Jimmy
 * 
 */

"use strict";


// Border of the canvas
let maxX;
let maxY;

// Space between each dot
let interval;

// Colors
let red;
let blue;

/**
 * This function sets up the canvas
 * background color
 * stroke weight
 * define colors
 * and variables
*/
function setup() {
    createCanvas(500, 500);
    background(255,255,255);
    strokeWeight(5);

    red = color(255,0,0);
    blue = color(0,0,255);

    interval = 10;

    maxX = 500;
    maxY = 500;
}


/**
 * This function will generate the different type of dots
*/
function draw() {
    generateDots(blue, interval + 1);
    generateDots(red, interval);
}

/**
 * This function will generate a series of dots based on a given color and interval.
 * @param {color} color 
 * @param {int} offset 
 */
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
