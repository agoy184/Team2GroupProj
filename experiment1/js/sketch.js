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
    neptuneRevolution = 20;   

let mercurySpeed = 0.008,    // Revolution speed
    venusSpeed = 0.006,
    earthSpeed = 0.005,
    marsSpeed = 0.004,
    jupiterSpeed = 0.003,
    saturnSpeed = 0.002,
    uranusSpeed = 0.0015,
    neptuneSpeed = 0.001;

let mercuryDistance = 300,  // Distance from Sun
    venusDistance = 450,
    earthDistance = 600, 
    marsDistance = 800, 
    jupiterDistance = 1200, 
    saturnDistance = 1800, 
    uranusDistance = 2400, 
    neptuneDistance = 3500;
      
let sun,                    // Texture
    mercury, 
    venus, 
    earth, moon, 
    mars, 
    jupiter, 
    saturn, 
    uranus, 
    neptune;

let camX, camY, camZ = 700; // Camera pos
let pano;
function preload() {
 pano = loadImage('assets/stars.jpeg');
 sun = loadImage("assets/sun.jpeg");
 // mercury = loadImage("assets/");
 // venus = loadImage("assets/");
 // earth = loadImage("assets/");
 // moon = loadImage("assets/");
 // mars = loadImage("assets/");
 // jupiter = loadImage("assets/");
 // saturn = loadImage("assets/");
 // uranus = loadImage("assets/");
 // neptune = loadImage("assets/");
}
 
function setup() {
 createCanvas(windowWidth, windowHeight, WEBGL);
 zoomSlider = createSlider(-16000, 16000, 800);
 zoomSlider.position(10, 10);
 zoomSlider.style('width', '750px');
}


 
function draw() {

  camZ = zoomSlider.value();
  panorama(pano);
  setLight();
  drawMercury();
  drawSun();
  drawVenus()
  drawEarth();
  drawMoon();
  drawMars();
  drawJupiter();
  drawSaturn();
  drawUranus();
  drawNeptune();

  

  rotationAngle += 0.01;
  
  // Camera 
  camX = (mouseX - width / 2) / 10;
  camY = (mouseY - height / 2) / 10;
  camera(camX, camY-1500 , camZ+4500, 0, 0, 0, 0, 1, 0);
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
  torus(mercuryDistance, 0.7, 240);
  pop();

  // Venus orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(venusDistance, 0.7, 240);
  pop();

  // Earth orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(earthDistance, 0.7, 240);
  pop();

  // Mars orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(marsDistance, 0.7, 240);
  pop();

  // Jupiter orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(jupiterDistance, 0.7, 240);
  pop();
  
  // Saturn orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(saturnDistance, 0.7, 240);
  pop();

  // Uranus orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(uranusDistance, 0.7, 240);
  pop();

  // Neptune orbit
  push();
  translate(x0, y, z0);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(neptuneDistance, 0.7, 240);
  pop();
}

function drawMercury() {
    x1 = x0 + mercuryDistance * cos(mercuryRevolution);
    z1 = z0 + mercuryDistance * sin(mercuryRevolution);
    push();
    translate(x1, y, z1);
    rotateY(rotationAngle);
    //texture(mercury);
    sphere(20);
    pop();
    mercuryRevolution += mercurySpeed;
}
 
function drawVenus() {
    x2 = x0 + venusDistance * cos(venusRevolution);
    z2 = z0 + venusDistance * sin(venusRevolution);
    push();
    translate(x2, y, z2);
    rotateY(rotationAngle);
    //texture(venus);
    sphere(40);
    pop();
    venusRevolution += venusSpeed;
}

function drawEarth() {
  x3 = x0 + earthDistance * cos(earthRevolution);
  z3 = z0 + earthDistance * sin(earthRevolution);
  push();
  translate(x3, y, z3);
  rotateY(earthRevolution);
  //texture(earth);
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
  //texture(moon);
  sphere(10);
  pop();
}

function drawMars() {
    x4 = x0 + marsDistance * cos(marsRevolution);
    z4 = z0 + marsDistance * sin(marsRevolution);
    push();
    translate(x4, y, z4);
    rotateY(rotationAngle);
    //texture(mars);
    sphere(30);
    pop();
    marsRevolution += marsSpeed;
}

function drawJupiter() {
  x5 = x0 + jupiterDistance * cos(jupiterRevolution);
  z5 = z0 + jupiterDistance * sin(jupiterRevolution);
  push();
  translate(x5, y, z5);
  rotateY(rotationAngle);
  //texture(jupiter);
  sphere(150);
  pop();
  jupiterRevolution += jupiterSpeed;

}

function drawSaturn() {
  x6 = x0 + saturnDistance * cos(saturnRevolution);
  z6 = z0 + saturnDistance * sin(saturnRevolution);
  push();
  translate(x6, y, z6);
  rotateY(rotationAngle);
  //texture(saturn);
  sphere(110);
  pop();

  // Saturn ring
  for(let i=0; i<15; i++) {
   push();
   translate(x6, y, z6);
   rotateX((PI / 180) * 90);
   rotateY(10)
   
   // 3 colors ring: white, brown, gray
   if(i<5)
    fill(255);
   else if(i>=5 && i<10)
    fill(102, 51, 51);
   else if(i>=10 && i<15)
    fill(128);

   torus(130+i*5, 0.7, 240);
   pop();
  }

  saturnRevolution += saturnSpeed;
}

function drawUranus() {
  x7 = x0 + uranusDistance * cos(uranusRevolution);
  z7 = z0 + uranusDistance * sin(uranusRevolution);
  push();
  translate(x7, y, z7);
  // Uranus‘ special direction of rotation 
  rotateX(rotationAngle);
  //texture(uranus);
  sphere(80);
  pop();
  uranusRevolution += uranusSpeed;
}

function drawNeptune() {
  x8 = x0 + neptuneDistance * cos(neptuneRevolution);
  z8 = z0 + neptuneDistance * sin(neptuneRevolution);
  push();
  translate(x8, y, z8);
  rotateY(rotationAngle);
  //texture(neptune);
  sphere(80);
  pop();
  neptuneRevolution += neptuneSpeed;
}
 
function setLight() {
 directionalLight(255, 255, 255, 0, 0, -1)
 directionalLight(255, 255, 255, 0, 1, -1)
}
 
/*function mouseWheel(event) {
  if (event.deltaY > 0) {
    camZ += 50; 
  } else {
    camZ -= 50;
  }
}*/

function keyPressed() {
  if (keyCode == LEFT_ARROW){
    mercurySpeed, venusSpeed, earthSpeed, marsSpeed *= 1.5;
  }
}