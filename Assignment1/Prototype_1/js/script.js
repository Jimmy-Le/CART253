/**
 * IDK what the title is
 * Jimmy
 * 
 * This project is for an in-class challenge with a focus on 
 * drawing shapes to make pictures.
 */

"use strict";

/**
 * This function sets up the canvas and background color
*/
function setup() {
    createCanvas(500, 500);
    background(50,50,50);

}


/**
*/
function draw() {
   
    // Head
    fill(50,80,180);
    ellipse(250, 150, 200, 190);           

    // Eye Circles
    fill(255,255,255);
    beginShape();


    endShape();
    

    
    // Nose
    fill(80,135,255);
    beginShape();

    vertex(250, 150);
    vertex(260, 160);
    vertex(270, 150);
    vertex(260, 180);
    vertex(240, 180);
    vertex(230, 150);
    vertex(240, 160);
    endShape(CLOSE);
    






}