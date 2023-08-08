const socket = connectToWebSocket();
console.log("connected to websocket");

// array of creatues
let creatures = [];

// arrays of sprites
let tails = [];
let bodies = [];
let heads = [];

// stars
let star_x = [],
  star_y = [],
  stars_made = false;

// preload images
function preload() {
  for (let i = 0; i < 2; i++) {
  heads[i] = loadSprites("../assets/sprites/heads/", i);
  bodies[i] = loadSprites("../assets/sprites/bodies/", i);
  tails[i] = loadSprites("../assets/sprites/tails/", i);
  }
}

// setup canvas and framerate before drawing
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}

// run every tick; draws background, space, and creatures
function draw() {

  // background
  background(0);
  space(width, height, 200, 2);

  // draw each creature
  push();
  creatures.forEach((g) => {
    g.update();
    g.drawCreatures();
  });
  pop();

}

// draw creatures from DB
socket.on(
  "server to gesture",
  (points, red, green, blue, alpha, size, speed) => {
    console.log("recieved data");
    if (creatures.length > 20) {
      creatures.shift();
    }
    creatures.push(
      new Creature(
        random(99999),
        color(red, green, blue, alpha),
        pointiness,
        random(-width / 3, width / 3),
        random(-height / 3, height / 3),
        size,
        speed
      )
    );
    creatures[creatures.length - 1].points = [...points];
  }
);

// click to add creatues for debugging
document.addEventListener("click", () => {
  if (creatures.length > 20) {
    creatures.shift();
  }
  creatures.push(
    new Creature(
      color(
        floor(random(0, 255)),
        floor(random(0, 255)),
        floor(random(0, 255)),
        floor(random(200, 255))
      ), // hue
      random(0.0, 1.0), // agitatedness
      random(0.5, 2), // speed
      floor(random(1, 15)), // pointiness
      random(0.25, 2), // size
      [floor(random(0, 2)), floor(random(0, 2)), floor(random(0, 2))], // sprites
      random(-width / 3, width / 3), // x
      random(-height / 3, height / 3) // y
    )
  );
});

// draw space background
function space(w, h, star_count, star_size) {
  noStroke();
  fill(0);
  rectMode(CORNERS);
  rect(0, 0, w, h);

  if (stars_made == false) {
    for (let i = 0; i <= star_count - 1; i++) {
      star_x[i] = randomGaussian(w / 2, w / 2);
      star_y[i] = randomGaussian(h / 2, h / 2);
      stars_made = true;
    }
  }

  for (let i = 0; i <= star_count - 1; i++) {
    fill(255);
    circle(star_x[i], star_y[i], star_size);
    star_y[i] += 0.1;
    if (abs(randomGaussian(0, 3) > 6)) {
      star_x[i] += randomGaussian(0, 1);
    }
    if (star_x[i] >= w || star_y[i] >= h) {
      star_x[i] = randomGaussian(w / 2, w / 2);
      star_y[i] = randomGaussian(h / 2, h / 2);
    }
  }
}
