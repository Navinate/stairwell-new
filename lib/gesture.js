class Gesture {
  constructor(hue, girth, cap, join, x, y) {
    this.points = [];
    this.hue = hue;
    this.girth = girth;
    this.cap = cap;
    this.join = join;
    this.pos = createVector(x, y);
  }

  addPoint(x, y) {
    let newPoint = createVector(x, y);
    this.points.push(newPoint);
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

  normalizePoints() {
    for (let i = 1; i < this.points.length; i++) {
      this.points[i].x -= this.points[0].x;
      this.points[i].y -= this.points[0].y;
    }
    this.points[0].x = 0;
    this.points[0].y = 0;
  }
}
