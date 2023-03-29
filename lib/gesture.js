let inc = 0.05;

class Gesture {
  constructor(seed, colorVar, girth, cap, join, x, y, speed, wiggle, smoothness) {
    this.seed = seed;
    this.points = [];
    this.color = colorVar;
    this.girth = girth;
    this.cap = cap;
    this.join = join;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = speed;
    this.wiggle = wiggle;
    this.smooth = smoothness;
    this.scl = 50;
  }

  addPoint(x, y) {
    let newPoint = createVector(x, y);
    this.points.push(newPoint);
  }

  render() {
    stroke(this.color);
    strokeWeight(this.girth);
    editStrokeAttributes(this.cap, this.join);
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
      this.points[i].x = this.points[i].x;
      this.points[i].y = this.points[i].y;
    }
    this.points[0].x = 0;
    this.points[0].y = 0;
  }

  drawBezier(time, index) {
    stroke(this.color);
    strokeWeight(this.girth);
    editStrokeAttributes(this.cap, this.join);
    noFill();
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    //draw first point if points exist
    if (this.points.length > 0) {
      let offsetX0 = map(noise(sin(time * 20), index), 0, 1, -this.wiggle, this.wiggle);
      let offsetY0 = map(noise(cos(time * 20), index), 0, 1, -this.wiggle, this.wiggle);
      vertex(this.points[0].x + offsetX0, this.points[0].y + offsetY0);
    }
    //iterate through the rest of the points and calc control points and add bezier
    for (let i = 1; i < this.points.length - 2; i += 2) {
      let offsetX = map(
        noise(sin(time * 20 + i), index),
        0,
        1,
        -this.wiggle,
        this.wiggle
      );
      let offsetY = map(
        noise(cos(time * 20 + i), index),
        0,
        1,
        -this.wiggle,
        this.wiggle
      );
      let x1 = (this.points[i].x + this.points[i + 1].x) / 2;
      let y1 = (this.points[i].y + this.points[i + 1].y) / 2;
      let x2 = (this.points[i + 1].x + this.points[i + 2].x) / 2;
      let y2 = (this.points[i + 1].y + this.points[i + 2].y) / 2;
      let x3 = this.points[i + 2].x;
      let y3 = this.points[i + 2].y;
      bezierVertex(
        x1 + offsetX,
        y1 + offsetY,
        x2 + offsetX,
        y2 + offsetY,
        x3 + offsetX,
        y3 + offsetY
      );
    }
    endShape();
    pop();
  }
}

function editStrokeAttributes(cap, join) {
  switch (cap) {
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
  switch (join) {
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
}
