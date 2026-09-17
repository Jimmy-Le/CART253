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
    stroke(0,0,0);
    ellipse(250, 150, 200, 190);           
    push();

    // Eye Circles
    fill(255,255,255);
    stroke(255,255,255);
    ellipse(195,160,80,120);
    ellipse(305,160,80,120);
    ellipse(250,200,150,65);
    pop();
    // Eyes
    fill(70,80,200);
    ellipse(195,150, 20, 40);
    ellipse(305,150, 20, 40);

    // Pupils
    fill(0,0,0);
    ellipse(195,150,10,20);
    ellipse(305,150,10,20);

    // Eye Shine

    fill(255,255,255);
    ellipse(198,140,10,10);
    ellipse(308,140,10,10);




    
    // Nose
    
    fill(80,135,255);
    beginShape();

    vertex(250, 150);       // Middle
    vertex(260, 160);
    vertex(265, 150);       // Top Left
    vertex(265, 180);       // Bottom Left
    vertex(235, 180);       // Bottom Right
    vertex(235, 150);       // Top Right
    vertex(240, 160);
    endShape(CLOSE);
    






}