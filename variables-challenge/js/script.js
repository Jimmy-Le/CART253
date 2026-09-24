/**
 * Mr. Furious
 * Jimmy Le
 *
 * A guy who becomes visibly furious!
 * 
 * Starter Code by Pippin Barr
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  },

  baseX: 200,
  baseY: 200,
  variation: 0
};


// Attributes of the sky
let skyColor = {

    isIncrementing: false,
    fill:{
        r: 160,
        g: 180,
        b: 200
    },
    baseFill:
    {
        r: 160,
        g: 180,
        b: 200
    }
}

// Bird object
let bird = 
{
    x:200,
    y:150,
    size: 20,
    speed: 10,
    direction: 1,
    fill:
    {
        r:0,
        g:20,
        b:200
    }

}

let timer = 0;                              // Current Time (timer)
let maxTime = 10;                           // Maximum Time/Value that the variations will cap out at
let tick = 0.0005;                          // increments to the time, this is multiplied by deltaTime.

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(skyColor.fill.r, skyColor.fill.g, skyColor.fill.b);

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);                    
  pop();

  // Draw the bird as a colored circle
  push()
  fill(bird.fill.r, bird.fill.g, bird.fill.b);
  ellipse(bird.x, bird.y, bird.size);
  pop()



  // Functions that change values
  makeSkyDark();          // This makes the sky dark and back to light
  makeFuriousRed();       // This makes mr furious red and back to normal
  moveBird();             // This makes the bird move and change directions
  moveFurious();          // This makes mr furious shake

  // Update the timer 
  timer += tick * deltaTime;
}


/***
 * This function Decrease  the green and blue value of Mr.Furious, and reset it when it reaches 0.
 */
function makeFuriousRed()
{
    // Decrease the blue and green values when not at 0
    if(mrFurious.fill.b > 0 && mrFurious.fill.g > 0)
    {
        mrFurious.fill.b--;
        mrFurious.fill.g--;
    
    }
    // Otherwise, Reset the value back.
    else
    {
        mrFurious.fill.b = 225;
        mrFurious.fill.g = 225;
    }
}

/***
 * This function will make the sky go black and revert back to blue
 */
function makeSkyDark()
{
    // The amount to increment. This is determined by the current state of the sky
    let incrementation = skyColor.isIncrementing ? 1 : -1;

    // Increment / Decrement the sky colors based on the current state
    skyColor.fill.r += incrementation;
    skyColor.fill.b += incrementation;
    skyColor.fill.g += incrementation;

    // Constrain the sky colors so they don't go past 0 or the starting colors
    constrain(skyColor.fill.r, 0, skyColor.baseFill.r);
    constrain(skyColor.fill.g, 0, skyColor.baseFill.g);
    constrain(skyColor.fill.b, 0, skyColor.baseFill.b);

    // Since blue is the biggest value, I will use it to track when it reaches the edges to change states
    // When blue hits 0, the color should be black, so switch state to incrementing
    if(skyColor.fill.b == 0)
    {
        skyColor.isIncrementing = true;
    }
    // When blue hits its base value, this means all the other colors are at their base value. Start decrementing
    else if (skyColor.fill.b == skyColor.baseFill.b)
    {
        skyColor.isIncrementing = false;
    }


}

/***
 * This function changes the position of the bird, and handles it's direction once it reaches the edge
 */
function moveBird()
{
    // Increment the bird's position based on it's direction and speed
    bird.x += bird.direction * bird.speed;

    // If the bird reaches the border, flip its direction
    if(bird.x <= 0 || bird.x >= width)
    {
        bird.direction = bird.direction * -1;
    }
}

/***
 * This function will randomly change the position of Mr Furious by a variation.
 */
function moveFurious()
{
  // Randomly positions Mr Furious within a certain range, influced by a variation
  mrFurious.x = random(mrFurious.baseX - mrFurious.variation, mrFurious.baseX + mrFurious.variation);
  mrFurious.y = random(mrFurious.baseY - mrFurious.variation, mrFurious.baseY + mrFurious.variation);

  // Update the variation based on time, Capped out at maxTime
  mrFurious.variation = min(timer, maxTime);
}