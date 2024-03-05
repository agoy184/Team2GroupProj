let x0 = 0, y = 0, z0 = 0,   // Sun pos
    x1 = 0,        z1 = 0,   // Mercury pos
    x2 = 0,        z2 = 0;   // Venus pos
    x3 = 0,        z3 = 0,   // Earth pos
    mx = 0,        mz = 0    // Moon pos
    x4 = 0,        z4 = 0;   // Mars pos
    x5 = 0,        z5 = 0,   // Jupiter pos
    x6 = 0,        z6 = 0;   // Saturn pos
    x7 = 0,        z7 = 0,   // Uranus pos
    x8 = 0,        z8 = 0;   // Neptunr pos 

let rotationAngle = 0;       // Self rotation
let mercuryRevolution = 20,  // Orbital revolution
    venusRevolution = 20,
    earthRevolution = 20,
    marsRevolution = 20,
    jupiterRevolution = 20,
    saturnRevolution = 20,
    uranusRevolution = 20,
    neptunrRevolution = 20;   

let mercurySpeed = 0.008,
    venusSpeed = 0.006,
    earthSpeed = 0.005,
    marsSpeed = 0.004,
    jupiterSpeed = 0,
    saturnSpeed = 0,
    uranusSpeed = 0,
    neptunrSpeed = 0;  
      
let sun;                     // Texture
let camX, camY, camZ = 700;  // Camera pos

 
function preload() {
 sun = loadImage("assets/sun_cropped.jpg");
}
 
function setup() {
 createCanvas(windowWidth, windowHeight, WEBGL);
}
 
function draw() {
  clear();
  background(0);
  setLight();
  drawMercury();
  drawSun();
  drawVenus()
  drawEarth();
  drawMoon();
  drawMars();
  
  rotationAngle += 0.01;
  
  // Camera 
  camX = (mouseX - width / 2) / 10;
  camY = (mouseY - height / 2) / 10;
  camera(camX, camY-1500 , camZ+1000, 0, 0, 0, 0, 1, 0);
  noStroke();

  if (keyIsDown(RIGHT_ARROW)){
    mercurySpeed *= 1.05, venusSpeed *= 1.05, earthSpeed *= 1.05, marsSpeed *= 1.05;
  }

  if (keyIsDown(LEFT_ARROW)){
    mercurySpeed /= 1.05, venusSpeed /= 1.05, earthSpeed /= 1.05, marsSpeed /= 1.05;
  }

  else {
    if (mercurySpeed > 0.008) {
      mercurySpeed /= 1.02,
      venusSpeed /= 1.02,
      earthSpeed /= 1.02,
      marsSpeed /= 1.02;
    }

    if (mercurySpeed < 0.008) {
      mercurySpeed *= 1.05,
      venusSpeed *= 1.05,
      earthSpeed *= 1.05,
      marsSpeed *= 1.05;
    }
  }
}

 
function drawSun() {
  push();
  translate(x0, y, z0);
  texture(sun);
  rotateY(rotationAngle / 5);
  sphere(200);
  pop();
 
  // Mercury orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(300, 0.7, 240);
  pop();

  // Venus orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(450, 0.7, 240);
  pop();

  // Earth orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(600, 0.7, 240);
  pop();

  // Mars orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(800, 0.7, 240);
  pop();
}

function drawMercury() {
    x1 = x0 + 300 * cos(mercuryRevolution);
    z1 = z0 + 300 * sin(mercuryRevolution);
    push();
    translate(x1, y, z1);
    rotateY(rotationAngle);
    //texture();
    sphere(20);
    pop();
    mercuryRevolution += mercurySpeed;
}
 
function drawVenus() {
    x2 = x0 + 450 * cos(venusRevolution);
    z2 = z0 + 450 * sin(venusRevolution);
    push();
    translate(x2, y, z2);
    rotateY(rotationAngle);
    //texture();
    sphere(40);
    pop();
    venusRevolution += venusSpeed;
}

function drawEarth() {
  x3 = x0 + 600 * cos(earthRevolution);
  z3 = z0 + 600 * sin(earthRevolution);
  push();
  translate(x3, y, z3);
  rotateY(earthRevolution);
  //texture();
  sphere(40);
  pop();
  
  // Moon orbit
  push();
  translate(x3, y, z3);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(60, 0.7, 240);
  pop();
  earthRevolution += earthSpeed;
}
 
function drawMoon() {
  mx = x3 + 60 * cos(earthRevolution * 5);
  mz = z3 + 60 * sin(earthRevolution * 5);
  push();
  translate(mx, y, mz);
  rotateY(-rotationAngle);
  //texture();
  sphere(10);
  pop();
}

function drawMars() {
    x4 = x0 + 800 * cos(marsRevolution);
    z4 = z0 + 800 * sin(marsRevolution);
    push();
    translate(x4, y, z4);
    rotateY(rotationAngle);
    //texture();
    sphere(30);
    pop();
    marsRevolution += marsSpeed;
}
 
 
function setLight() {
 directionalLight(255, 255, 255, 0, 0, -1)
 directionalLight(255, 255, 255, 0, 1, -1)
}
 
function mouseWheel(event) {
  if (event.deltaY > 0) {
    camZ += 20; 
  } else {
    camZ -= 20;
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW){
    mercurySpeed, venusSpeed, earthSpeed, marsSpeed *= 1.5;
  }
}