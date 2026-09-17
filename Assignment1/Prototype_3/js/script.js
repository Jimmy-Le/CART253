/**
 * RANDOM RICE
 * Jimmy
 * 
 */

"use strict";

let wipeTime;
let timer;


/**
 * This function sets up the canvas, background color, and the timer for the animations.
*/
function setup() {
    createCanvas(500, 500);
    background(0);
    frameRate(5);

    wipeTime = 5000;
    timer = 0;
}

/**
 * This function will call the display function until it reaches a certain time
 * where it will erase the canvas and start again
*/
function draw() {

    if(timer <= wipeTime)
    {
        display();
        timer = timer + deltaTime;
    }
    else
    {
        background(0);
        timer = 0;
    }
}

/**
 * This function draws a rice shaped shape with random colors and position.
 */
function display()
{
    stroke(color(random(0,255),random(0,255),random(0,255)))
    fill(color(random(0,255),random(0,255),random(0,255)))
    ellipse(random(70, 430), random(10,490), 70, 10);
}