// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, collideRectCircle, ellipse, fill, height, keyCode, rect,
 *    strokeWeight, text, textSize, width, random
 *    UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW
 */

let backgroundColor, art, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = 250;
  frogY = 450;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  art=random(0, 255)
}

function draw() {
  background(backgroundColor);
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  fill(art, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if(lives>0){
    if (keyCode === UP_ARROW) {
      frogY -= 10;
    } else if (keyCode === LEFT_ARROW) {
      frogX -= 10;
    } else if (keyCode === RIGHT_ARROW) {
      frogX += 10;
    } else if (keyCode === DOWN_ARROW) {
      frogY += 10;
    }
  }
}

function moveCars() {
  // Move the car...
  car1X += car1V;
  // and reset if it moves off screen
  if (car1X >= width) {
    car1X = -30;
     car1Y = random(100, 400);
  }
}

function drawCars() {
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
}

function checkCollisions() {
  // Check for Car 1 collision, and if so...
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)) {
    console.log("collided with Car 1");
    // ...reset frog and subtract a life.
    frogY = 450;
    lives -= 1;
  }
  if (lives <= 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  if (frogY <= 50) {
    score += 1;
    frogY = 450;
    if(score===1){
    car1V+=2;
  }
  if(score===2){
    car1V+=2;
  }
  if(score===3){
    car1V+=2;
  }
  if(score===4){
    car1V+=2;
  }
  }
}

function displayScores() {
  textSize(12);
  // Display Lives
  fill(0);
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  fill(0);
  text(`Score: ${score}`, 10, 38);
  // Display game over message
  if (gameIsOver) {
    textSize(60);
    text("GAME OVER", 70, height/2);
    }
  else if(score === 5){
    textSize(60);
    text("YOU WIN!", 70, height/2);
  }
  }