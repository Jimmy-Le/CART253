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
let currentSprite = undefined;          // Current Player Sprite (Red Heart Image)
let lives = 3;                          // Lives left
let timer = 120;                        // 120 seconds
let isGameOver = false;                 // The current Game State
let isWin = false;                      // Did the player win or lose

// This will store the snapshotted coordinates of the player right before an attack
let snapShot =
{
  x: maxX/2,
  y: maxY/2,
}

// Attack Patterns
let lineAttacks = [];

// UI Header
let header = {
  x: maxX/2,
  y: 50,
  width: maxX,
  height: 100,
  color: "#000000",
  borderColor: "#ffffff"
}

// Timer Text Box
let timerText = {
  x: maxX/2,
  y: 64,
  size: 32,
  color: "#ffffff"
}

let gameStateText = {
  x: maxX/2,
  y: maxY/2,
  size: 50,
  color: "#ffffff",
  win: "You Win!",
  lose: "You Lose!"
}

let player = {
  x: maxX/2,
  y: maxY/2,
  size: 32,
  speed: 5,
  isInvincible: false,
}

/**
 * Create the canvas
 */
async function setup() {
  createCanvas(maxX, maxY);

  // Set up the drawing modes 
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);

  // Set the font
  textFont("Silkscreen");


  // Setup the sprites
  let heartPic = await loadImage("assets/images/Heart_0.png");
  let heartPic2 = await loadImage("assets/images/Heart_1.png");
  heartImages.push(heartPic);
  heartImages.push(heartPic2);
  currentSprite = heartImages[0];

  // Setup the attack patterns
  setupAttacks();
  
}

/**
 * Draw and update the position of the player and coin
 */
function draw() {
  background(0);
  drawHeader();


  // Draw the player
  image(currentSprite, player.x, player.y, player.size, player.size);
  movePlayer();

  // triggerLineAttack();

}


function drawHeader(){
  // Header
  push();
  fill(header.color);
  stroke(header.borderColor);
  rect(header.x, header.y, header.width, header.height);
  pop();

  // Spawn Hearts based on the amount of lives left
  let increment = 50;                                     // Increment the amount of space between each heart
  for(let i = 0; i < lives; i++){
    image(heartImages[0], 50 + i * increment, 50, 50,50);
  }

  // Timer Text
  push();
  fill(timerText.color);
  textSize(timerText.size);
  text("Time Left: " + timer, timerText.x, timerText.y);
  pop();

  // Game State Text
  if(isGameOver){
    push();
    fill(gameStateText.color);
    textSize(gameStateText.size);
    text(isWin ? gameStateText.win: gameStateText.lose, gameStateText.x, gameStateText.y);        // If the player won, display "You Win!" otherwise display "You Lose!"
    pop();
    
  }
}


function movePlayer(){

  if(keyIsDown(UP_ARROW) || keyIsDown('w') || keyIsDown('W')){                        // Include capital letters in case caps lock is on
    player.y -= player.speed;       
  } 
  else if(keyIsDown(DOWN_ARROW) || keyIsDown('s') || keyIsDown('S')){
    player.y += player.speed;
  }

  if(keyIsDown(LEFT_ARROW) || keyIsDown('a') || keyIsDown('A')){
    player.x -= player.speed;
  }
  else if(keyIsDown(RIGHT_ARROW) || keyIsDown('d') || keyIsDown('D')){
    player.x += player.speed ;
  }

  player.x = constrain(player.x, 0 + player.size/2, maxX - player.size/2);        // Constrain the player to the canvas
  player.y = constrain(player.y, 0 + player.size/2 + header.height, maxY - player.size/2);
}


function takeDamage(damage = 1){
  if(!player.isInvincible){
    lives -= damage;
    player.isInvincible = true;
    currentSprite = heartImages[1];

    setTimeout(() => {
      player.isInvincible = false;
      currentSprite = heartImages[0];
    }, 1000);
  }
}


function checkCollision(object)
{
  let distance = dist(player.x, player.y, object.x, object.y);
  console.log(distance);
  if(distance < player.size/2 + object.size/2){
    return true;
  }
  return false;
}


function triggerAttackCollision(listOfAttacks){
  for(const attack of listOfAttacks){
    if(checkCollision(attack)){
      takeDamage();
    }
  }
}



function setupAttacks(){

  // Setup the line attack pattern
  let lineAmount = 10;

  // Create vertical Line Attacks
  for(let i = 0; i < lineAmount; i++){
    let lineAttack = {
      x: maxX/2,
      y: maxY/2,
      width: 10,
      height: maxY,
      color: "#ff0000",
      attackColor: "#FFFFFF"
    }
    lineAttacks.push(lineAttack);
  }
}

function triggerLineAttack(){
  for(const lineAttack of lineAttacks){
    push();
    fill(lineAttack.color);
    rect(snapShot.x + random(-50, 50), lineAttack.y, lineAttack.width, lineAttack.height);
    pop();

    setTimeout(() => {
      lineAttack.color = lineAttack.attackColor;
      lineAttack.width = 30;
      triggerAttackCollision(lineAttacks);
    }, 1500);
  }
}









