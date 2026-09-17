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
    createCanvas(700, 700);
    background(75,100,250);

}


/**
 * This function will draw
 * 1. A small yellow land
 * 2. A set of Blue tents on the land
 * 3. 2 Hills surrounding the camp
 * 4. A moon and a sun
 * 5. Birds
 * 6. Floating people
*/
function draw() {

    // Background Tent
    fill(200,240,255);
    stroke(0,0,0);
    triangle(200,350, 150,650, 450, 650);
    triangle(500,350, 250,650, 650, 650);

    // Hills
    fill(255,255,255);
    stroke(0,0,0);
    ellipse(50, 500, 400, 600);
    ellipse(650, 500, 400, 600);

    // Sun
    fill(255,255,0);
    ellipse(650, 500, 100, 100);
    fill(255,255,255);
    ellipse(675, 475, 25, 25);

    // Moon
    fill(0,0,55);
    ellipse(50, 500, 100, 100);
    fill(255,255,255);
    stroke(255,255,255);
    ellipse(85, 450, 100, 100);
    
    // Tents
    fill(200,240,255);
    stroke(0,0,0);
    triangle(350,350, 200,650, 500, 650);

    // Tent Door
    fill(0,50,150);
    stroke(0,0,0);
    triangle(350,550, 300, 650, 400, 650);


    // Land
    stroke(0,0,0);
    fill(255,240,0);
    ellipse(350, 700, 350, 200);

    // --- Birds ---
    stroke(0,0,0);
    fill(0,0,0);

    // Bird 1
    arc(50, 100, 40, 7, PI, 0);
    arc(90, 100, 40, 7, PI, 0);
    arc(70, 100, 20, 20, 0, PI);

    // Bird 2
    arc(90, 80, 40, 7, PI, 0);
    arc(130, 80, 40, 7, PI, 0);
    arc(100, 80, 20, 20, 0, PI);

    // Bird 3
    arc(130, 100, 40, 7, PI, 0);
    arc(170, 100, 40, 7, PI, 0);
    arc(140, 100, 20, 20, 0, PI);

    // --- People ---
    stroke(0,0,0);
    fill(0,0,0);
    line(550, 120, 630, 120);       // Floor for the people

    // Person 1
    line(550, 100, 550, 120);
    line(570, 100, 570, 120);
    rect(550, 80, 20, 30);
    rect(555, 70, 10, 20);

    // Person 2
    line(580, 70, 580, 120);
    line(600, 70, 600, 120);
    rect(580, 50, 20, 30);
    rect(585, 40, 10, 20);

    // Person 3
    line(610, 100, 610, 120);
    line(630, 100, 630, 120);
    rect(610, 80, 20, 30);
    rect(615, 70, 10, 20);


}