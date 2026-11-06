/**
 * Eating Coins
 * Jimmy Le
 *
 * Run around and eat coins!
 * 
 */

// Canvas Size
let maxX = 500;
let maxY = 500;

let heartImages = [];
let lives = 3;


let header = {
  x: maxX/2,
  y: 50,
  width: maxX,
  height: 100,
  color: "#686464"
}


/**
 * Create the canvas
 */
async function setup() {
  createCanvas(maxX, maxY);

  rectMode(CENTER);
  imageMode(CENTER);


  let heartPic = await loadImage("assets/images/Heart_0.png");
  let heartPic2 = await loadImage("assets/images/Heart_1.png");
  heartImages.push(heartPic);
  heartImages.push(heartPic2);
  
}

/**
 * Draw and update the position of the player and coin
 */
function draw() {
  background(0);

  // Header
  push();
  fill(header.color);
  rect(header.x, header.y, header.width, header.height);
  pop();

  // Spawn Hearts based on the amount of lives left
  let increment = 50;                                     // Increment the amount of space between each heart
  for(let i = 0; i < lives; i++){
    image(heartImages[0], 40 + i * increment, 50);
  }

  
}











