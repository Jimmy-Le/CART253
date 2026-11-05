/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";
let newColor = undefined;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("pink");

    let gradientIndex = 0;
    for(let i = 0; i < height; i++){
      newColor = lerpColor(color(255, 255, 0), color(0, 255,255), gradientIndex);
      stroke(newColor);
      line(0, i, width, i);
      gradientIndex += sin(i/100)/100;
    }    

    let increment = 0;

    while(increment < width){
      stroke(increment/2);
      line(increment, 0, increment, height);
      increment += 50;
    }

    for(let i = 0; i < height; i += 50){
      strokeWeight(i/50);
      stroke(255,0,255)
      line(0, 0, width, i);
    }

}