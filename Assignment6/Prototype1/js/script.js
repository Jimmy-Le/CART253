/**
 * Overtale
 * Jimmy Le
 *
 * Survive or be destroyed!
 * 
 */

// Canvas Size
let maxX = 1000;
let maxY = 1000;

// Images
let heartImages = [];                   // Array of the different heart images
let currentSprite = undefined;          // Current Player Sprite (Red Heart Image)
let lives = 3;                          // Lives left

// Time
let timer = 120;                        // Time being kept track of
let startTime;                          // Initial time, used to subtract from the timer
let timeLimit = 120;                    // 120 seconds, the inital time to survive
let lastTriggerSecond = -1;             // The time to keep track of so that the functions don't trigger multiple time within a single second

// Game States
let isGameOver = false;                 // The current Game State
let isWin = false;                      // Did the player win or lose

// Attack Patterns
let lineAttacks = [];                   // Array of lines for the Line Attack
let ballAttacks = [];                   // Array of balls for the ball attack

//Line Attack Properties:
let baseLineSize = 2;                   // the base size of a line indicator
let growLineSize = 30;                  // The size that the lines grow to during the attack


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

// GameState Text Box
let gameStateText = {
  x: maxX/2,
  y: maxY/2,
  size: 50,
  color: "#ffffff",
  win: "You Win!",
  lose: "You Lose!"
}

// Player Object
let player = {
  pos: undefined,                   // Apparently we need to use vectors to easily snapshot the player's position
  size: 32,
  speed: 5,
  isInvincible: false,              // Invincibility State
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
  setupLines();

  
}

/**
 * Draw and update the position of the player and coin
 */
function draw() {
  background(0);

  // If the time did not run out yet or the game is not over, reduce the game timer
  // Otherwise, the game is over and determine if the win condition is acheived by checking the amount of lives left
  if(timer >= 0 && !isGameOver){
    timer = Math.floor(timeLimit - (millis() - startTime) / 1000);
  } else {
    isGameOver = true;
    isWin = lives > 0;
  }

  // Draw the player
  image(currentSprite, player.pos.x, player.pos.y, player.size, player.size);

  // Move the player
  movePlayer();


  // Initiate the line attack every 2 seconds while the game is not over, and make sure that it triggers once in that second  
  if(!isGameOver && timer % 2 === 0 && timer !== 0 && lastTriggerSecond !== timer ){
    initiateLineAttack();                  // Snapshot the players position and initialize the lines attributes
    lastTriggerSecond = timer;             // Make sure that it only calls the function once during that second (instead of 60 times or # of frames) 

  }

  // If the game is not over, draw the lines from the line attack
  if(!isGameOver)
  {
    drawLineAttack();
  }
  
  // Draw out the UI
  drawHeader();
}

// ---------------------------------------------- Player Functions -------------------------------------

/***
 * This function handles the movement input for players
 */
function movePlayer(){

  // If the player presses up or down
  if(keyIsDown(UP_ARROW) || keyIsDown('w') || keyIsDown('W')){                        // Include capital letters in case caps lock is on
    player.pos.y -= player.speed;       
  } 
  else if(keyIsDown(DOWN_ARROW) || keyIsDown('s') || keyIsDown('S')){
    player.pos.y += player.speed;
  }

  // If the player presses left or right
  if(keyIsDown(LEFT_ARROW) || keyIsDown('a') || keyIsDown('A')){
    player.pos.x -= player.speed;
  }
  else if(keyIsDown(RIGHT_ARROW) || keyIsDown('d') || keyIsDown('D')){
    player.pos.x += player.speed ;
  }

  // Constrain the player movements to inside the canvas and under the UI Header
  player.pos.x = constrain(player.pos.x, 0 + player.size/2, maxX - player.size/2);        // Constrain the player to the canvas
  player.pos.y = constrain(player.pos.y, 0 + player.size/2 + header.height, maxY - player.size/2);
}

/***
 * This function makes the player lose a life (or more) and sets them in the invincible state for a set duration
 * While in the invicible state, the player changes color and won't take any damage for the duration
 * If the player's hp reaches 0 or below, they lose the game
 */
function takeDamage(damage = 1){

  // If the player is not invincible, take damage
  if(!player.isInvincible){
    player.isInvincible = true;                     // Set the player to invincible
    lives -= damage;
    
    currentSprite = heartImages[1];                 // Set the player sprite to the yellow heart


    // If the player runs out of lives, set the isGameOver flag to true and immediately return
    if(lives <= 0)       
    {
      isGameOver = true;
      return;
    }

    // After a certain amount of time, the player will no longer be invincible and set its sprite back to the red heart
    setTimeout(() => {
      player.isInvincible = false;
      currentSprite = heartImages[0];
    }, 1500);
  }
}

// ---------------------------------- Line Attack --------------------------------

/***
 * This function setups the lines and attacks into their respective attack array.
 */
function setupLines(){

  // Setup the line attack pattern
  let lineAmount = 10;

  // Create the amount of lines needed and set up its basic attributes
  for(let i = 0; i < lineAmount; i++)
  {
    let newLine = {
      x: -100,
      y: maxY/2,
      color: "#FF0000",
      width: baseLineSize,
      height: maxY,
      attackColor: "#FFFFFF",
      target: player.pos.copy(),
      spawnTime: millis(),
      mode: 0
    }

    lineAttacks.push(newLine);              // Push each new line into the lineAttacks Array
  }

}

/***
 * This function snapshots the players current position and stores them in the lines.
 * It also randomly chooses to set the lines horizontally or vertically and sets the lines attributes appropriately
 */
function initiateLineAttack(){
  let currentSnapShot = player.pos.copy();                          // Snapshot the player's position before spawning

  let randomMode = Math.floor(random(0,2));                         // Randomly choose to make the lines vertical or horizontal
  
  // Update the attributes of all the lines in the line attack
  for(const lineAttack of lineAttacks) {
    // Lock the attack to the player's static X coordinate at this exact moment
    lineAttack.target = currentSnapShot;

    // Reset properties to warning phase
    lineAttack.color = "#FF0000";                                 // Initial red color
    lineAttack.width = randomMode === 0 ? baseLineSize : maxX;      // Set the size of the width based on if it is vertical or horizontal
    lineAttack.height = randomMode === 0 ? maxY: baseLineSize;      // Set the size of the height based on if it is vertical or horizontal
    lineAttack.spawnTime = millis();                                // Record when this attack started
    lineAttack.mode = randomMode;                                   // Remember which mode it is set to (vertical / horizontal)
  }

}

/***
 * This function draws the lines from the lineAttacks on screen
 * After an initial line has been draw, after a certain period of time from its creation, it will activate, becoming bigger and deal damage to players on contact
 */
function drawLineAttack(){

  // Draw each line
  for(const lineAttack of lineAttacks){
    
    let timeElapsed = millis() - lineAttack.spawnTime;                          // find the amount of time that has passed since the lines have been spawned in 

    // If the lines are in mode 0 (vertical), make its x be at the player's snapshotted x position and y in the middle of the screen
    if(lineAttack.mode === 0){
      lineAttack.x = lineAttack.target.x + random(-50,50);
      lineAttack.y = maxY/2;
    }
    // Otherwise, it is in mode 1 (horizontal), make its y be at the player's snapshotted y position and x in the middle of the screen
    else {
      lineAttack.x = maxX/2;
      lineAttack.y = lineAttack.target.y + random(-50,50);
    }

    // If the line is still young, keep it in red indicator mode (harmless)
    if(timeElapsed < 750)
    {
      push();
      fill(lineAttack.color);
      rect(lineAttack.x, lineAttack.y, lineAttack.width, lineAttack.height);
      pop();
    }
    // Otherwise, make it into attack mode, which changes its appearance and damages the player on collision
    else {
      push()
      lineAttack.color = lineAttack.attackColor;
      lineAttack.width = lineAttack.mode === 0? growLineSize : maxX;
      lineAttack.height = lineAttack.mode === 0? maxY: growLineSize;
      fill(lineAttack.color);
      rect(lineAttack.x, lineAttack.y, lineAttack.width, lineAttack.height);

      pop()

      triggerAttackCollision(lineAttack);                 // Check if there is a collision between a line and player

    }
  }
}





// ----------------------------------------- Ball Attacks ------------------------------
function setupBalls()
{
  // Setup the ball attack pattern
  let ballAmount = 3;

  // Create the amount of balls needed and set up its basic attributes
  for(let i = 0; i < ballAmount; i++)
  {
    let newBall = {
      x: -100,
      y: maxY/2,
      color: "#ffffff",
      width: 100,
      height: 100,
      attackColor: "#FFFFFF",
      target: player.pos.copy(),
      velocityX: 0,
      velocityY: 0,
      speed: random(2, 5)
    }

    ballAttacks.push(ballLine);              // Push each new ball into the ballAttacks Array
  }
}

function initiateBallAttack(ballAttack){
  let currentSnapShot = player.pos.copy();                          // Snapshot the player's position before spawning

  ballAttack.target = currentSnapShot;
  ballAttack.x = random(ballAttack.width, maxX - ballAttack.width);
  ballAttack.y = random(ballAttack.height + header.height, maxY - ballAttack.height);

  let direction = p5.Vector.sub(ballAttack.target, createVector(ballAttack.x, ballAttack.y).normalize()); // This apparently will find the x / y direction towards the player
  ballAttack.velocityX = direction.x;
  ballAttack.velocityY = direction.y;


}

/***
 * This function draws the lines from the lineAttacks on screen
 * After an initial line has been draw, after a certain period of time from its creation, it will activate, becoming bigger and deal damage to players on contact
 */
function drawBallAttack(){

  // Draw each line
  for(const ballAttack of ballAttacks){
    
    if(ballAttack.x < -200 || ballAttack.x > maxX + 200 || ballAttack.y < -200 + header.height || ballAttack.y > maxY + 200){
      initiateBallAttack(ballAttack)
    }

    ballAttack.x += ballAttack.velocityX * ballAttack.speed;
    ballAttack.y += ballAttack.velocityY * ballAttack.speed;

  }
}


// ------------------------------ Helper Functions ----------------------------

/***
 * This function checks if an object (with a width and height) intersects with a player
 */
function checkCollision(object) {
  const nearestX = constrain( player.pos.x, object.x - object.width / 2, object.x + object.width / 2);    // finds the side of the object that is closest to the player (left or right)
  const nearestY = constrain(player.pos.y, object.y - object.height / 2, object.y + object.height / 2);   // finds the side of the object that is closest to the player (top or bottom)


  return dist(player.pos.x, player.pos.y, nearestX, nearestY) <= player.size / 2;                         // Returns whether the distance between the player and the closests points of the object is within the player's "body"
}


/***
 * This function deals damage to the player when an attack collides with them
 */
function triggerAttackCollision(attack){
  if(checkCollision(attack)){
    takeDamage();                               // Take damage if the player is not invincible
  }
}


// ---------------------------------------------- UI -----------------------------------

/***
 * This function will draw out the UI elements
 */
function drawHeader(){
  // Header
  push();
  fill(header.color);
  stroke(header.borderColor);
  rect(header.x, header.y, header.width, header.height);
  pop();

  // Spawn Hearts based on the amount of lives left
  let increment = 50;                                           // Increment the amount of space between each heart
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







