/**
 * Portait
 * Jimmy
 * 
 */

"use strict";

// Stored Colors for easy reuse and change
let yellow;
let white;
let lightBlue;
let blue;
let black;


/**
 * This function sets up the canvas and background color
*/
function setup() {
    createCanvas(500, 500);
    background(0,20,20);
    strokeWeight(1);

    // Set Colors
    yellow = color(255,220,50);
    white = color(255,255,255);
    lightBlue = color(150,210,255);
    blue = color(70,110,190);
    black = color(0,0,0);

}


/**
 * This function will draw out all the body parts
*/
function draw() {
   
    noFill();
    stroke(yellow)
    square(0,0, 500);
    fill(0,60,50);
    rect(50,200, 400, 300);

    stroke(black);
    fill(0,0,40,80)

    ellipse(250,300,190,180)

    generateFeet();
    generateBody();
    generateHead();
}

/**
 * This function will draw the following
 * Head
 * Neck
 * Face (Eye Circle)
 * Eyes 
 * Eye Shine
 * Beak
 */
function generateHead()
{
    // Head
    fill(blue);
    stroke(0,0,0);
    ellipse(250, 150, 205, 185);   

    // Neck
    ellipse(220,210,70,100);
    ellipse(280,210,70,100);        
    push();

    // Eye Circles
    fill(white);
    stroke(white);
    ellipse(195,160,80,120);
    ellipse(305,160,80,120);
    ellipse(250,200,160,70);
    pop();

    // Eyes
    fill(black);
    ellipse(195,170, 20, 40);
    ellipse(305,170, 20, 40);

    // Eye Shine
    stroke(white);
    fill(white);
    ellipse(200,160,15,15);
    ellipse(310,160,15,15);

    // Nose
    stroke(lightBlue)
    fill(lightBlue);
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
    fill(yellow);
    ellipse(250,190,40,35);
    line(230,190, 270,190);
}

/**
 * This function will draw the following
 * Body
 * Chest Details
 * Arms
 */
function generateBody()
{
    // Body
    fill(lightBlue);
    ellipse(250,275,175,150);

    // Chest
    fill(white);
    ellipse(210,270,30,40);
    ellipse(290,270,30,40);

    // Arms
    fill(lightBlue)
    spline(185,210, 160,260, 165, 310, 220, 230);
    spline(315,210, 340,260, 330, 310, 280, 230);
}

/**
 * This function will draw feet and grippers.
 */
function generateFeet()
{
    // Feet
    fill(yellow);
    ellipse(210,340,30,50);
    ellipse(290,340,30,50);

    // Left Toes
    fill(black)
    line(205,350, 205,363);
    line(215,355, 215,363);

    // Right Toes
    line(285,355, 285,363);
    line(295,350, 295,363);
}