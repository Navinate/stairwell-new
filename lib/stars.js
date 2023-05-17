// stars
let star_x = [],
  star_y = [],
  stars_made = false;

function setup() {
    createCanvas(windowWidth + 1, windowHeight);
    frameRate(24);
}
  
function draw() {
    // background
    background(0);
    space(width, height, 200, 4);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

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
      star_y[i] += 0.8;
      if (abs(randomGaussian(0, 3) > 5)) {
        star_x[i] += randomGaussian(0, 1);
      }
      if (star_x[i] >= w || star_y[i] >= h) {
        star_x[i] = randomGaussian(w / 2, w / 2);
        star_y[i] = randomGaussian(h / 2, h / 2);
      }
    }
  }
