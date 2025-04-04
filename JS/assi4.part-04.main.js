// Set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape Class (base class for Ball and EvilCircle)
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball Class
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY); 
    this.color = color;
    this.size = size;
    this.exists = true; 
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) { 
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
       
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle Class 
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); 
    this.color = "white";
    this.size = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3; 
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke(); 
  }

  checkBounds() {
    // Prevent the evil circle from going off-screen
    if (this.x + this.size >= width) {
      this.x = width - this.size;
    }
    if (this.x - this.size <= 0) {
      this.x = this.size;
    }
    if (this.y + this.size >= height) {
      this.y = height - this.size;
    }
    if (this.y - this.size <= 0) {
      this.y = this.size;
    }
  }

  collisionDetect() {
   
    for (const ball of balls) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size && ball.exists) {
        ball.exists = false; 
        updateBallCount(); 
      }
    }
  }
}

// Key event listener to move evil circle
window.addEventListener("keydown", (e) => {
  const controlledEvilCircle = evilCircle;
  
  switch (e.key) {
    case "a":
      controlledEvilCircle.x -= controlledEvilCircle.velX;
      break;
    case "d":
      controlledEvilCircle.x += controlledEvilCircle.velX;
      break;
    case "w":
      controlledEvilCircle.y -= controlledEvilCircle.velY;
      break;
    case "s":
      controlledEvilCircle.y += controlledEvilCircle.velY;
      break;
  }
});

// Array to store balls
const balls = [];


while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// Create an instance of EvilCircle
const evilCircle = new EvilCircle(100, 100); 

// Ball count display
const ballCountElement = document.createElement("p");
ballCountElement.style.position = "absolute";
ballCountElement.style.top = "35px";
ballCountElement.style.right = "5px";
ballCountElement.style.color = "#aaa";
document.body.appendChild(ballCountElement);

// Function to update the ball count
function updateBallCount() {
  const aliveBalls = balls.filter(ball => ball.exists);
  ballCountElement.textContent = `Ball count: ${aliveBalls.length}`;
}

//  loop to draw, update, and detect collisions for each ball and the evil circle
function loop() {
 
  ctx.fillStyle = "rgba(21, 15, 43, 0.25)";
  ctx.fillRect(0, 0, width, height);

  //  check collisions for each ball
  for (const ball of balls) {
    if (ball.exists) { 
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Draw and update the evil circle
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  // Continue the animation
  requestAnimationFrame(loop);
}


loop();

