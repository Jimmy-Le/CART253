/**
 * Eating Coins
 * Jimmy Le
 *
 * Run around and eat coins!
 * 
 */

// Canvas Size
let maxX = 1000;
let maxY = 1000;

let heartImages = [];                   // Array of the different heart images
let lives = 3;                          // Lives left
let timer = 120;                        // 120 seconds

// UI Header
let header = {
  x: maxX/2,
  y: 50,
  width: maxX,
  height: 100,
  color: "#311111"
}

// Timer Text Box
let timerText = {
  x: maxX - 300,
  y: 64,
  size: 32,
  color: "#ffffff"
}


/**
 * Create the canvas
 */
async function setup() {
  createCanvas(maxX, maxY);

  rectMode(CENTER);
  imageMode(CENTER);
  textFont("Silkscreen");


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

  // Timer Text
  push();
  fill(timerText.color);
  textSize(timerText.size);
  text("Time Left: " + timer, timerText.x, timerText.y);
  pop();

}











