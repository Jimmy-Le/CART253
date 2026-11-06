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
let snapShot = undefined;                    // Snapshot of the player position when the attack is triggered

let timer = 120;                        // 120 seconds
let startTime;
let timeLimit = 120;                    // 120 seconds

let isGameOver = false;                 // The current Game State
let isWin = false;                      // Did the player win or lose

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
  pos: undefined,
  size: 32,
  speed: 5,
  isInvincible: false,
}

/**
 * Create the canvas
 */
async function setup() {
  createCanvas(maxX, maxY);
  // Set the starting time
  startTime = millis();

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

  // Initialize Player
  player.pos = createVector(maxX/2, maxY/2);

  // Setup the attack patterns
  setupAttacks();

  
}

/**
 * Draw and update the position of the player and coin
 */
function draw() {
  background(0);

  if(timer >= 0 && !isGameOver){
    timer = Math.floor(timeLimit - (millis() - startTime) / 1000);
  } else {
    isGameOver = true;
  }

  // Draw the player
  image(currentSprite, player.pos.x, player.pos.y, player.size, player.size);
  movePlayer();


  
  if(!isGameOver && timer % 2 === 0 && timer !== 0){

    snapShot = createVector(player.pos.x, player.pos.y);
    triggerLineAttack(snapShot);
  }
  // triggerLineAttack();


  drawHeader();
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
    player.pos.y -= player.speed;       
  } 
  else if(keyIsDown(DOWN_ARROW) || keyIsDown('s') || keyIsDown('S')){
    player.pos.y += player.speed;
  }

  if(keyIsDown(LEFT_ARROW) || keyIsDown('a') || keyIsDown('A')){
    player.pos.x -= player.speed;
  }
  else if(keyIsDown(RIGHT_ARROW) || keyIsDown('d') || keyIsDown('D')){
    player.pos.x += player.speed ;
  }

  player.pos.x = constrain(player.pos.x, 0 + player.size/2, maxX - player.size/2);        // Constrain the player to the canvas
  player.pos.y = constrain(player.pos.y, 0 + player.size/2 + header.height, maxY - player.size/2);
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
  let distance = dist(player.pos.x, player.pos.y, object.x, object.y);
  if(distance < player.size/2 + object.size/2){
    return true;
  }
  return false;
}


function triggerAttackCollision(attack){
  if(checkCollision(attack)){
    takeDamage();
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

function triggerLineAttack(currentSnapShot){



  for(const lineAttack of lineAttacks){
    push();
    fill(lineAttack.color);
    rect(currentSnapShot.x + random(-50, 50), lineAttack.y, lineAttack.width, lineAttack.height);
    pop();

    setTimeout(() => {
      push()
      lineAttack.color = lineAttack.attackColor;
      lineAttack.width = 30;
      triggerAttackCollision(lineAttack);
      // resetLineAttack(lineAttack);
      pop();
    }, 1500);
  }
}

function resetLineAttack(attack){
    attack.color = "#ff0000";
    attack.width = 10;
}









