class Creature {
  constructor(colorVar, agitatedness, speed, pointiness, size, sprites, x, y) {
    // chosen  by user
    this.color = colorVar;

    // decided by form
    this.agitatedness = agitatedness;
    this.maxSpeed = speed;
    this.pointiness = pointiness;
    this.size = size;
    this.sprites = sprites;

    // misc
    this.points = [];
    this.pos = createVector(x, y);
    this.vel = createVector(random(-4,4), random(-4,4));
    this.acc = createVector(0, 0);
    this.x1 = this.pos.x;
    this.x2 = this.x1;
    this.x3 = this.x1;
    this.y1 = this.pos.y;
    this.y2 = this.y1;
    this.y3 = this.y1;
  }

  // render() {
  //   stroke(this.color);
  //   noFill();
  //   push();
  //   //translate(this.pos.x, this.pos.y);
  //   beginShape();
  //   this.points.forEach((p) => {
  //     vertex(p.x, p.y);
  //   });
  //   endShape();
  //   pop();
  // }

  update() {
    this.doMovement();
    this.easeSegments();
    this.warpOffscreen()
  }

  // do the movement of the creatures head
  doMovement() {
    let angle = random(0, 360);

    let v = p5.Vector.fromAngle(angle);
    v.setMag(0.2);
    this.acc.add(v);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  // ease the other segments of the creature
  easeSegments() {
    // tx or ty is target pos
    // dx or dy is distance to pos
    let tx2, tx3, dx2, dx3;
    let ty2, ty3, dy2, dy3;

    // amount of easing, scaled by size
    let easing = 0.05 * (2 - this.size);

    // actual easing code
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
  }

  // warp offscreen creatures to the other side
  warpOffscreen() {
    if (this.pos.y >= height + 50) {
      this.pos.y = - 50;
      this.y2 = this.pos.y;
      this.y3 = this.pos.y;
    } 
    else if (this.pos.y <= -50) {
      this.pos.y = height + 50;
      this.y2 = this.pos.y;
      this.y3 = this.pos.y;
    }

    if (this.pos.x >= width + 50) {
      this.pos.x = - 50;
      this.x2 = this.pos.x;
      this.x3 = this.pos.x;
    } 
    else if (this.pos.x <= -50) {
      this.pos.x = width + 50;
      this.x2 = this.pos.x;
      this.x3 = this.pos.x;
    }
  }

  // actually draw creatures
  drawCreatures(time) {
    color(this.color);
    fill(this.color)
    push();

    tint(this.color);

    image(heads[this.sprites[0]], this.x3, this.y3, 60 * this.size, 60 * this.size);
    image(bodies[this.sprites[1]], this.x2, this.y2, 60 * this.size, 60 * this.size);
    image(heads[this.sprites[2]], this.x1, this.y1, 60 * this.size, 60 * this.size);

    pop();
  }
}

// for adding pointiness
// function star(x, y, radius1, radius2, npoints) {
//   let angle = TWO_PI / npoints;
//   let halfAngle = angle / 2.0;
//   beginShape();
//   for (let a = 0; a < TWO_PI; a += angle) {
//     let sx = x + cos(a) * radius2;
//     let sy = y + sin(a) * radius2;
//     vertex(sx, sy);
//     sx = x + cos(a + halfAngle) * radius1;
//     sy = y + sin(a + halfAngle) * radius1;
//     vertex(sx, sy);
//   }
//   endShape(CLOSE);
// }
