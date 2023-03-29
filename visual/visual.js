const socket = io(); //connectToWebSocket();
console.log("connected to websocket");

const caps = ["ROUND", "SQUARE", "PROJECT"];
const joins = ["MITER", "BEVEL", "ROUND"];
let gests = [];
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}
function draw() {
  background(22);
  push();
  //scale(0.5);
  translate(width / 2, height / 2);
  let index = 0;
  gests.forEach((g) => {
    g.update(t, index);
    g.drawBezier(t, index);
    index++;
  });
  pop();

  t += 0.0005;
}

socket.on(
  "server to gesture",
  (points, red, green, blue, alpha, girth, cap, join, speed, wiggle, smoothness) => {
    console.log("recieved data");
    gests.push(
      //seed, colorVar, girth, cap, join, x, y, speed, wiggle, smoothness
      new Gesture(
        random(99999),
        color(red, green, blue, alpha),
        girth,
        cap,
        join,
        random(-width / 3, width / 3),
        random(-height / 3, height / 3),
        speed,
        wiggle,
        smoothness
      )
    );
    gests[gests.length - 1].points = [...points];
  }
);

document.addEventListener("click", () => {
  gests.push(
    new Gesture(
      //seed, hue, girth, cap, join, x, y, speed, wiggle, smoothness
      random(99999), // seed
      color(200, 10, 89, 128), // hue
      random(120) + 20, // girth
      random(caps), // cap
      random(joins), // join
      random(-width / 3, width / 3), // x
      random(-height / 3, height / 3), // y
      random(1, 5), // speed
      random(10, 400), //wiggle
      random(1, 10) //smoothness
    )
  );
  gests[gests.length - 1].addPoint(-10, 10);
  gests[gests.length - 1].addPoint(10, 10);
  gests[gests.length - 1].addPoint(20, 20);
  gests[gests.length - 1].addPoint(30, 30);
  gests[gests.length - 1].addPoint(100, -100);
  gests[gests.length - 1].addPoint(-100, 100);
});
