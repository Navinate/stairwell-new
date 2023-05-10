let inc = 0.02;
let scl = 10;

class Creature {
  constructor(seed, colorVar, pointiness, x, y, size, speed) {
    this.seed = seed;
    this.points = [];
    this.color = colorVar;
    this.size = size;
    this.pointiness = pointiness;
    this.pos = createVector(x, y);
    this.vel = createVector(random(-4,4), random(-4,4));
    this.acc = createVector(0, 0);
    this.maxSpeed = speed;
    this.x1 = this.pos.x;
    this.x2 = this.x1;
    this.x3 = this.x1;
    this.y1 = this.pos.y;
    this.y2 = this.y1;
    this.y3 = this.y1;
  }

  render() {
    stroke(this.color);
    noFill();
    push();
    //translate(this.pos.x, this.pos.y);
    beginShape();
    this.points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape();
    pop();
  }

  update(time) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);

    let angle = random(0, 360);
    //console.log("angle: " + angle)
    let v = p5.Vector.fromAngle(angle);
    v.setMag(0.2);
    this.acc.add(v);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // easing code
    let tx2, tx3, dx2, dx3;
    let ty2, ty3, dy2, dy3;

    let easing = 0.05 * (2 - this.size);

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.x1 = this.pos.x;

    tx2 = this.x1;
    dx2 = tx2 - this.x2;
    this.x2 += dx2 * easing;

    tx3 = this.x2;
    dx3 = tx3 - this.x3;
    this.x3 += dx3 * easing;

    this.y1 = this.pos.y;
    
    ty2 = this.y1;
    dy2 = ty2 - this.y2;
    this.y2 += dy2 * easing;
    
    ty3 = this.y2;
    dy3 = ty3 - this.y3;
    this.y3 += dy3 * easing;

    // fix offscreen
    if (this.pos.y >= height + 50) {
      this.pos.y = - 50;
      this.y2 = this.pos.y;
      this.y3 = this.pos.y;
      //console.log("WARP: Y to Low");
    } 
    else if (this.pos.y <= -50) {
      this.pos.y = height + 50;
      this.y2 = this.pos.y;
      this.y3 = this.pos.y;
      //console.log("WARP: Y to High");
    }

    if (this.pos.x >= width + 50) {
      this.pos.x = - 50;
      this.x2 = this.pos.x;
      this.x3 = this.pos.x;
      //console.log("WARP: X to Low");
    } 
    else if (this.pos.x <= -50) {
      this.pos.x = width + 50;
      this.x2 = this.pos.x;
      this.x3 = this.pos.x;
      //console.log("WARP: X to High");
    }
  }

  drawCreatures(time) {
    color(this.color);
    fill(this.color)
    push();

    //console.log("Size: " + this.size);

    tRing(this.x1, this.y1, 20 * this.size, 30 * this.size, this.pointiness);
    star(this.x2, this.y2, 20 * this.size, 30 * this.size, this.pointiness);
    star(this.x3, this.y3, 20 * this.size, 30 * this.size, this.pointiness);

    pop();
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function tRing(x, y, radius1, radius2, points) {
  let angle = 0;

  //points = 10 - floor((((millis() * 10) % 1000) / 10));

  let angleStep = 180.0 / points;


  strokeWeight(5);
  color(255,255,255);

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= points; i++) {
    let px = x + cos(radians(angle)) *  (radius2 * 1.2);
    let py = y + sin(radians(angle)) *  (radius2 * 1.2);
    angle += angleStep;
    vertex(px, py);
    px = x + cos(radians(angle)) * (radius1 * 1.2);
    py = y + sin(radians(angle)) * (radius1 * 1);
    vertex(px, py);
    angle += angleStep;
  }
  endShape();
}
