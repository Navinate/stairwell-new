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
    console.log("angle: " + angle)
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
      console.log("WARP: Y to Low");
    } 
    else if (this.pos.y <= -50) {
      this.pos.y = height + 50;
      this.y2 = this.pos.y;
      this.y3 = this.pos.y;
      console.log("WARP: Y to High");
    }

    if (this.pos.x >= width + 50) {
      this.pos.x = - 50;
      this.x2 = this.pos.x;
      this.x3 = this.pos.x;
      console.log("WARP: X to Low");
    } 
    else if (this.pos.x <= -50) {
      this.pos.x = width + 50;
      this.x2 = this.pos.x;
      this.x3 = this.pos.x;
      console.log("WARP: X to High");
    }

    //console.log("X: " + this.pos.x + " Y: " + this.pos.y);
    //console.log("Width: " + width + " Height: " + height);
    //console.log("I Width: " + innerWidth + " I Height: " + innerHeight);
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

////////////////////////////////////////////////////////////////
// boid
////////////////////////////////////////////////////////////////

/*
class Boid {

    setup() {
      createCanvas(640, 360);
      createP("Drag the mouse to generate new boids.");
    
      flock = new Flock();
      // Add an initial set of boids into the system
      for (let i = 0; i < 100; i++) {
        let b = new Boid(width / 2,height / 2);
        flock.addBoid(b);
      }
    }
    
     draw() {
      background(51);
      flock.run();
    }
  // Flock object
  // Does very little, simply manages the array of all the boids

  Flock() {
    // An array for all the boids
    this.boids = []; // Initialize the array
  }

  Flock.prototype.run = () {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
    }
  }

  Flock.prototype.addBoid = (b) {
    this.boids.push(b);
  }

  // Boid class
  // Methods for Separation, Cohesion, Alignment added

   Boid(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  prototype.run = (boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce = (force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  Boid.prototype.flock = (boids) {
    let sep = this.separate(boids);   // Separation
    let ali = this.align(boids);      // Alignment
    let coh = this.cohesion(boids);   // Cohesion
    // Arbitrarily weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  // Method to update location
  Boid.prototype.update = () {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  Boid.prototype.seek = (target) {
    let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }

  Boid.prototype.render = () {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + radians(90);
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  // Wraparound
  Boid.prototype.borders = () {
    if (this.position.x < -this.r)  this.position.x = width + this.r;
    if (this.position.y < -this.r)  this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  // Separation
  // Method checks for nearby boids and steers away
  Boid.prototype.separate = (boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position,boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        steer.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  Boid.prototype.align = (boids) {
    let neighbordist = 50;
    let sum = createVector(0,0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position,boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  Boid.prototype.cohesion = (boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position,boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);  // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
}
*/