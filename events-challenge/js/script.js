/**
 * The Only Move Is Not To Play
 * Pippin Barr
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Track when if the user has went online and offline during a session
// If both are true, then the game is over
let online = false;
let offline = false;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);


  // This Event will make you lose if you click on a different tab
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      lose();
    } 
  });

  // Mouse events
  document.addEventListener("click", lose);
  document.addEventListener("mousemove", lose);
  document.addEventListener("contextmenu", lose);
  document.addEventListener("wheel", lose);
  document.addEventListener("mouseup", lose);
  document.addEventListener("mousedown", lose);

  // Keyboard Events
  document.addEventListener("keydown", lose);
  document.addEventListener("keyup", lose);
  document.addEventListener("keypress", lose);


  
}



/**
 * Update the score and display the UI
 */
function draw() {
  background("#87ceeb");
  
  // Only increase the score if the game is not over
  if (!gameOver) {
    // Score increases relatively slowly
    score += 0.05;
  }
  displayUI();

  // When the user went online or offline during this session, track it
  if (navigator.onLine) {
    online = true;
  } else {
    offline = true;
  }

  // if the user went offline and online during this session, GAME OVER
  if(online && offline){
    gameOver = true;
  }
}


/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You lose!", width/2, height/3);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width/2, height/2);
  pop();
}

/***
 * End the game
 */
function lose()
{
  gameOver = true;
}

/***
 * Lose when a key is pressed
 */
function keyPressed() {
  lose();
}

/***
 * Lose when a key is released
 */
function keyReleased() {
  lose();
} 

/***
 * Lose when a typed key is typed
 */
function keyTyped(){
  lose()
}

/***
 * Lose when the mouse is pressed
 */
function mousePressed() {
  lose();
}

/***
 * Lose when the mouse is released
 */
function mouseReleased() {
  lose();
}

/***
 * Lose when the mouse wheel moved
 */
function mouseWheel(event) {
  lose();
}

/***
 * Lose when the mouse is dragged
 */
function mouseDragged() {
  lose();
}

/***
 * Lose when the mouse moved
 */
function mouseMoved() {
  lose();
}

