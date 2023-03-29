const socket = connectToWebSocket();
console.log("connected to websocket");

let maxPoints = 10;

let radios = document.querySelectorAll("input");
radios[Math.floor(Math.random() * radios.length)].setAttribute("checked", "checked");
radios.forEach((rb) => {
  rb.style.backgroundColor = rb.value;
});

const caps = ["ROUND", "SQUARE", "PROJECT"];
const joins = ["MITER", "BEVEL", "ROUND"];
let gest, gest2;
let cnv;

function setup() {
  cnv = createCanvas(800, 800);
  frameRate(60);
  // seed, hue, girth, cap, join, x, y, alpha, speed, wiggle, smoothness
  gest = new Gesture(100, color(0), 20, "ROUND", "ROUND", 0, 0, 255, 5, 5, 5);
  gest2 = new Gesture(0, color(255, 0, 0), 10, "ROUND", "ROUND", 0, 0, 255, 0, 0, 0);
}
let index = 0;
function draw() {
  background(255);
  if (mouseIsPressed && gest2.points.length < maxPoints) {
    if (pmouseX < width && pmouseX > 0) {
      if (pmouseY < height && pmouseY > 0) {
        gest.addPoint(pmouseX, pmouseY);
        if (frameCount % 6 == 0) {
          gest2.addPoint(pmouseX, pmouseY);
          index++;
          if (index > maxPoints) {
            index = 0;
          }
        }
      }
    }
  }

  gest.render();
  gest2.drawBezier();
}
let submitGest = document.getElementById("submit-gest");
submitGest.addEventListener("mousedown", () => {
  if (gest.points.length > 0) {
    sendData();
  }
});

function mousePressed() {
  gest.points = [];
  gest2.points = [];
}

function sendData() {
  let colorValue = document.querySelector("input:checked").value;
  gest2.normalizePoints();
  socket.emit("gesture to server", colorValue, gest2.points);
}
