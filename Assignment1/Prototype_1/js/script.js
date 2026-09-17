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
   
    // Body
    fill(150,200,255);
    ellipse(250,275,175,175);


    generateHead();




}

function generateHead()
{
    // Head
    
    fill(50,80,190);
    stroke(0,0,0);
    ellipse(250, 150, 205, 185);   
    ellipse(220,210,80,100);
    ellipse(280,210,80,100);        
    push();

    // Eye Circles
    fill(255,255,255);
    stroke(255,255,255);
    ellipse(195,160,80,120);
    ellipse(305,160,80,120);
    ellipse(250,200,160,70);
    pop();
    // Eyes
    fill(50,80,200);
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
    
    fill(150,200,255);
    beginShape();

    vertex(250, 140);       // Middle
    vertex(260, 160);
    vertex(265, 140);       // Top Left
    vertex(265, 180);       // Bottom Left
    vertex(235, 180);       // Bottom Right
    vertex(235, 140);       // Top Right
    vertex(240, 160);
    endShape(CLOSE);

    // Beak

    fill(255,240,0);
    ellipse(250,190,60,40);

    line(220,190, 280,190);
}