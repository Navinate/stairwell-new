let inc = 0.05;

class Gesture {
  constructor(seed, hue, girth, cap, join, x, y) {
    this.seed = seed;
    this.points = [];
    this.hue = hue;
    this.girth = girth;
    this.cap = cap;
    this.join = join;
    this.wiggle = 5;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.wiggle = 5;
    this.scl = 50;
  }

  addPoint(x, y) {
    let newPoint = createVector(x, y);
    this.points.push(newPoint);
  }

  wigglePoints(time, index) {
    for (let i = 0; i < this.points.length; i++) {
      console.log(sin(time));
      this.points[i].x += map(
        noise(sin(time * 50 + i), index),
        0,
        1,
        -this.wiggle,
        this.wiggle
      );
    }
  }

  render() {
    stroke(this.hue);
    strokeWeight(this.girth);
    switch (this.cap) {
      case "ROUND":
        strokeCap(ROUND);
        break;
      case "SQUARE":
        strokeCap(SQUARE);
        break;
      case "PROJECT":
        strokeCap(PROJECT);
        break;
    }
    switch (this.join) {
      case "MITER":
        strokeJoin(MITER);
        break;
      case "BEVEL":
        strokeJoin(BEVEL);
        break;
      case "ROUND":
        strokeJoin(ROUND);
        break;
    }
    noFill();
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    this.points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape();
    pop();
  }

  update(time, index) {
    let x = floor(this.pos.x / this.scl);
    let y = floor(this.pos.y / this.scl);
    noiseSeed(this.seed);
    let angle = noise(x * inc, y * inc, time) * TWO_PI * 4;
    let v = p5.Vector.fromAngle(angle);
    v.setMag(1);
    this.acc.add(v);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > width / 2 + 10) {
      this.pos.x = -width / 2 - 5;
    }
    if (this.pos.x < -width / 2 - 10) {
      this.pos.x = width / 2 + 5;
    }
    if (this.pos.y > height / 2 + 10) {
      this.pos.y = -height / 2 - 5;
    }
    if (this.pos.y < -height / 2 - 10) {
      this.pos.y = height / 2 + 5;
    }
  }

  normalizePoints() {
    for (let i = 1; i < this.points.length; i++) {
      this.points[i].x -= this.points[0].x;
      this.points[i].y -= this.points[0].y;
    }
    this.points[0].x = 0;
    this.points[0].y = 0;
  }
}
