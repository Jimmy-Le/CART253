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
    strokeWeight(1);

}


/**
*/
function draw() {
   
    // Body
    fill(150,200,255);
    ellipse(250,275,175,150);


    // Chest
    fill(255,255,255);
    ellipse(210,270,30,40);
    ellipse(290,270,30,40);

    // Arms

    fill(150,200,255)
    spline(185,210, 160,260, 165, 310, 220, 230);
    spline(315,210, 340,260, 330, 310, 280, 230);

    generateHead();




}

function generateHead()
{
    // Head
    
    fill(50,80,190);
    stroke(0,0,0);
    ellipse(250, 150, 205, 185);   

    // Neck
    ellipse(220,210,70,100);
    ellipse(280,210,70,100);        
    push();

    // Eye Circles
    fill(255,255,255);
    stroke(255,255,255);
    ellipse(195,160,80,120);
    ellipse(305,160,80,120);
    ellipse(250,200,160,70);
    pop();

    // Eyes
    fill(0,0,0);
    ellipse(195,170, 20, 40);
    ellipse(305,170, 20, 40);

    // Eye Shine
    stroke(255,255,255);
    fill(255,255,255);
    ellipse(200,160,15,15);
    ellipse(310,160,15,15);


    // Nose
   
    stroke(150,200,255)
    fill(150,200,255);
    beginShape();

    vertex(250, 140);       // Middle
    vertex(260, 160);
    vertex(267, 140);       // Top Left
    vertex(265, 180);       // Bottom Left
    vertex(235, 180);       // Bottom Right
    vertex(233, 140);       // Top Right
    vertex(240, 160);
    endShape(CLOSE);
    stroke(0,0,0)
    // Beak

    fill(255,240,0);
    ellipse(250,190,40,35);
    line(230,190, 270,190);
}