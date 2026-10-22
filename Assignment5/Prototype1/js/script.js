/**
 * Rock Stacker
 * Jimmy Le
 *
 * Stack the rocks! You can stack them mid-air and remove the bottom one to place on top!
 * 
 */

let maxX = 500;
let maxY = 500;

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







