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

// The amount of pixels for each movement
let steps = 100;

// The Tolerance for finding the distance between the coin and the player
let tolerance = 20;     

// The amount of coins the player has
let counter = 0;

// Named Colors
let white = "#FFFFFF"
let black = "#000000"

// Tile object
let squareTile = 
{
  x: 0,
  y: 0,
  size: 100
}

// Player Object
let player =
{
  x: 25,
  y: 25,
  size: 50,
  color: "#FF0000"
}

// Coin Object
let coin =
{
  x: 130,
  y: 130,
  size: 40,
  color: "#FFFF00"

}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(maxX, maxY);
}

/**
 * Draw and update the position of the player and coin
 */
function draw() {
  drawTiles();

  // Draw Coin
  push()
  fill(coin.color);
  rect(coin.x,coin.y, coin.size, coin.size);
  pop();

  // Draw Player
  push()
  fill(player.color);
  rect(player.x, player.y, player.size, player.size);
  pop()

  push()
  fill("#0000FF");
  textSize(20);
  text("Coins: " + counter, 10, 20);
  pop()

  // Check if the player is on the coin
  eatCoin();
}

/***
 * This function will generate a grid of square tiles with alternating colors
 */
function drawTiles()
{
  let counter = 0;
  for (let i = 0; i < width; i += squareTile.size)
  {
    for(let j = 0; j < height; j += squareTile.size)
    {
      push()
    
      // If it is even numbered position, give it a white background
      if(counter % 2 == 0)
      {
        fill(white);
      }
      // If it is odd, give it a black background
      else 
      {
        fill(black);
      }
      
      // Draw the tile
      rect(squareTile.x + i, squareTile.y + j, squareTile.size, squareTile.size);
      
      pop();
      // Increment the counter to keep track of odd and even numbers
      counter++;
    }
  }
}

/***
 * Event function, waits for player movement input and sends the player in the corresponding direction if possible.
 */
function keyPressed()
{
  switch (key)
  {
    case "w":                             // Move Up
      if(checkMovement(0,-1))
      {
        player.y -= steps;
      }
      break;
    case "s":                             // Move Down
      if(checkMovement(0,1))
      {
        player.y += steps;
      }
      break;
    case "a":                             // Move Left
      if(checkMovement(-1,0))
      {
        player.x -= steps;
      }
      break;  
    case "d":                             // Move
      if(checkMovement(1,0))
      {
        player.x += steps;
      }
      break;
    default:
      break;     
  }
}

/***
 * This function checks if the movement of the player towards a given direction is feasible or not
 */
function checkMovement(xDirection = 0, yDirection = 0)
{
  if(xDirection > 0)                        // Move to the Right
  {
    return player.x + steps < width;
  }
  else if (xDirection < 0)                  // Move to the Left
  {
    return player.x - steps > 0;
  }

  if(yDirection > 0)                        // Move Down
  {
    return player.y + steps < height;
  } 
  else if (yDirection < 0)                  // Move Up
  {
    return player.y - steps > 0;
  }
}

/***
 * This function will check if the player is on top of the coin by checking the distance between them (with some tolerance accounted for)
 * And change the position of the coin towards a feasible position adjacent to the player.
 * Also increment the coin counter
 */
function eatCoin()
{
  if(dist(player.x, player.y, coin.x, coin.y) < tolerance)
  {
    let newCoordinate = randomPositionFromPlayer();     // Find a new feasible position 
    moveCoin(newCoordinate[0], newCoordinate[1]);       // Update position
    counter++;                                          // Update Counter
  }
}

/***
 * This function will in theory trigger when the player is stepping on the coin, making their positions on the board the same.
 * Thus all movement relative to the player will be relative to the coin
 * Multiplying the steps by the value will also result in negatives, 0 or positive value of the steps.
 */
function moveCoin(x, y)
{
  coin.x += steps * x;
  coin.y += steps * y;
}



/***
 * This function finds a random position from the player that is valid
 * aka not outside the acceptable bounds (canvas)
 */
function randomPositionFromPlayer()
{
  let valid = false;

  let xOrY;
  let positiveOrNegative;

  do{

    xOrY = Math.floor(random(0,2));                                                               // Randomly choose the vertical or horizontal movement of the player
    positiveOrNegative = Math.floor(random(0,2));                                                 // Randomly choose to go in the negative direction or positive direction

    // If xOrY is zero, change the x values
    if(xOrY % 2 === 0)
    {
      valid = positiveOrNegative ? checkMovement(1,0) : checkMovement(-1,0);          // verify if that new position is a valid position. check the positive / negative movement depending on the randomly selected value.
      if(valid)
      {
        return positiveOrNegative ? [1,0] : [-1,0]                                    // If the position is valid, return the "coordinates"
      }
    }
    // If xOrY is 1 or other, change the Y values
    else 
    {
      valid = positiveOrNegative ? checkMovement(0,1) : checkMovement(0,-1);          // verify if that new position is a valid position. check the positive / negative movement depending on the randomly selected value.

      if(valid)
      {
        return positiveOrNegative ? [0,1] : [0,-1]                                    // If the position is valid, return the "coordinates"
      }

    }
  } while(!valid)                                                                     // If movement is invalid, then try again.
  
}











