/**
 * Rock Stacker
 * Jimmy Le
 *
 * Stack the rocks! You can stack them mid-air and remove the bottom one to place on top!
 * 
 */

let maxX = 500;
let maxY = 500;

let steps = 100;
let tolerance = 20;

let white = "#FFFFFF"
let black = "#000000"

let squareTile = 
{
  x: 0,
  y: 0,
  size: 100
}

let player =
{
  x: 25,
  y: 25,
  size: 50,
  color: "#FF0000"
}

let coin =
{
  x: 30,
  y: 30,
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
 * Draw and update the position of the rocks
 */
function draw() {
  drawTiles();

  push()
  fill(player.color);
  rect(player.x, player.y, player.size, player.size);
  pop()

  push()
  fill(coin.color);
  rect(coin.x,coin.y, coin.size, coin.size);
  pop();

  // console.log(dist(player.x, player.y, coin.x, coin.y));
}


function drawTiles()
{
  let counter = 0;
  for (let i = 0; i < width; i += squareTile.size)
  {
    for(let j = 0; j < height; j += squareTile.size)
    {
      push()
    
      if(counter % 2 == 0)
      {
        fill(white);
      }
      else 
      {
        fill(black);
      }
      
      rect(squareTile.x + i, squareTile.y + j, squareTile.size, squareTile.size);
      
      pop();
      counter++;
    }
  }
}

function keyPressed()
{
  switch (key)
  {
    case "w":
      if(checkMovement(0,-1))
      {
        player.y -= steps;
      }
      break;
    case "s":
      if(checkMovement(0,1))
      {
        player.y += steps;
      }
      break;
    case "a":
      if(checkMovement(-1,0))
      {
        player.x -= steps;
      }
      break;
    case "d":
      if(checkMovement(1,0))
      {
        player.x += steps;
      }
      break;
    default:
      console.log(key);
      break;     
  }
}


function checkMovement(xDirection = 0, yDirection = 0)
{
  if(xDirection > 0)
  {
    return player.x + steps < width;
  }
  else if (xDirection < 0)
  {
    return player.x - steps > 0;
  }

  if(yDirection > 0)
  {
    return player.y + steps < height;
  } 
  else if (yDirection < 0)
  {
    return player.y - steps > 0;
  }


}

function eatCoin()
{
  if(dist(player.x, player.y, coin.x, coin.y) < tolerance)
  {
    let newCoordinate = randomPositionFromPlayer();
  }
}

function randomPositionFromPlayer()
{
  let valid = false;

  let xOrY;
  let positiveOrNegative;

  do{

    xOrY = random(0,2);                                                               // Randomly choose the vertical or horizontal movement of the player
    positiveOrNegative = random(0,2);                                                 // Randomly choose to go in the negative direction or positive direction

    // If xOrY is zero, change the x values
    if(xOrY === 0)
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











