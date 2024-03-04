// Controls
// Scroll Wheel = Zoom In/Out
// Arrow Keys = Pan Scene
// I used arrow keys to pan the scene instead of the mouse because we might use the mouse to interact with the scene

let sunRadius = 50;
let rings = [];
let panX, panY;
let zoom;
let dragging = false;
let startX, startY;
let leftArrowPressed = false;
let rightArrowPressed = false;
let upArrowPressed = false;
let downArrowPressed = false;
let stars = []; // Background Stars

function setup() {
  createCanvas(1920, 1080, WEBGL); // Use WEBGL for 3D rendering
  panX = 0;
  panY = 0;

  // Calculate initial zoom to fit the entire solar system
  let maxRingRadius = 1000; // Assuming the largest ring radius is 1000
  let maxDistance = dist(0, 0, maxRingRadius, maxRingRadius); // Distance from center to the farthest ring
  let maxZoom = min(width, height) / maxDistance; // Maximum zoom to fit the entire solar system
  zoom = maxZoom * 0.9; // Adjusting to have a slight margin around the edges

  // Define each ring separately with comments indicating their positions
  rings.push(new Ring(150)); // Ring 1
  rings.push(new Ring(250)); // Ring 2
  rings.push(new Ring(320)); // Ring 3
  rings.push(new Ring(410)); // Ring 4
  rings.push(new Ring(600)); // Ring 5 (Asteroid belt), increased radius to make the gap larger
  rings.push(new Ring(800)); // Ring 6
  rings.push(new Ring(1000)); // Ring 7
  rings.push(new Ring(1200)); // Ring 8
  rings.push(new Ring(1400)); // Ring 9

  // Create Stars
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: 0,
      y: 0,
      offset: Math.random() * 360,
      orbit: (Math.random() + 0.01) * max(width, height),
      radius: Math.random() * 2,
      vx: Math.floor(Math.random() * 10) - 5,
      vy: Math.floor(Math.random() * 10) - 5,
    });
  }
}

function mouseWheel(event) {
  zoom += event.delta * 0.01;
  zoom = constrain(zoom, 0.1, 3); // Limit zoom range
  return false;
}

function keyPressed() {
  // Set flag based on which arrow key is pressed
  if (keyCode === LEFT_ARROW) {
    leftArrowPressed = true;
  } else if (keyCode === RIGHT_ARROW) {
    rightArrowPressed = true;
  } else if (keyCode === UP_ARROW) {
    upArrowPressed = true;
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = true;
  }
}

function keyReleased() {
  // Reset flag when arrow key is released
  if (keyCode === LEFT_ARROW) {
    leftArrowPressed = false;
  } else if (keyCode === RIGHT_ARROW) {
    rightArrowPressed = false;
  } else if (keyCode === UP_ARROW) {
    upArrowPressed = false;
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = false;
  }
}

function updatePan() {
  let panSpeed = 10; // Adjust as needed
  if (leftArrowPressed) {
    panX += panSpeed;
  } else if (rightArrowPressed) {
    panX -= panSpeed;
  }
  if (upArrowPressed) {
    panY += panSpeed;
  } else if (downArrowPressed) {
    panY -= panSpeed;
  }
}

function drawStars() {
  colorMode(RGB, 255, 255, 255, 1);
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    push();
    translate(s.x - width / 2, s.y - height / 3, -1000);
    sphere(5);
    pop();
  }
  updateStars();
}
function updateStars() {
  let originX = width / 2;
  let originY = height / 2;
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    let rad = (frameCount * (1 / (s.orbit * 2 + s.offset)) + s.offset) % TAU;
    s.x = originX + cos(rad) * (s.orbit * 2);
    s.y = originY + sin(rad) * s.orbit;
  }
}

function draw() {
  clear();
  updatePan(); // Update pan based on arrow key status
  background(0);
  
  // DrawStars
  drawStars();
  
  // Apply pan and zoom transformations
  translate(panX, panY);
  scale(zoom);

  // Apply perspective to create a 3D view
  let fov = PI / 3; // Field of view
  let cameraZ = (height / 2.0) / tan(fov / 2.0);
  perspective(fov, width / height, cameraZ / 10.0, cameraZ * 10.0);

  // Set rotation angles for the scene
  let rx = QUARTER_PI; // Rotate backward along the x-axis
  rotateX(rx);

  // Temporary Sun
  fill(255, 255, 0);
  stroke(252, 252, 3);
  sphere(90);
  //ellipse(0, 0, sunRadius * 2);

  // Draw rings
  for (let i = 0; i < rings.length; i++) {
    rings[i].show();
  }
}

class Ring {
  constructor(radius) {
    this.radius = radius;
  }

  show() {
    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(0, 0, this.radius * 2);
  }
}
