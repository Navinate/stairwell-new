const socket = io("ws://127.0.0.1:3000"); //LOCAL TESTING

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
  translate(width / 2, height / 2);
  let index = 0;
  gests.forEach((g) => {
    g.update(t, index);
    g.wigglePoints(t, index);
    g.render();
    index++;
  });
  pop();

  t += 0.001;
}

socket.on("server to gesture", (color, points) => {
  console.log("recieved data");
  gests.push(
    new Gesture(
      random(99999),
      color,
      random(100) + 20,
      random(caps),
      random(joins),
      random(-width / 2, width / 2),
      random(-height / 2, height / 2)
    )
  );
  gests[gests.length - 1].points = [...points];
});

document.getElementById("add-dot").addEventListener("mousedown", () => {
  gests.push(
    new Gesture(
      random(99999),
      "#bb0000",
      random(20) + 20,
      random(caps),
      random(joins),
      random(-width / 2, width / 2),
      random(-height / 2, height / 2)
    )
  );
  gests[gests.length - 1].addPoint(0, 0);
  gests[gests.length - 1].addPoint(20, 20);
  gests[gests.length - 1].addPoint(40, 40);
  gests[gests.length - 1].addPoint(60, 60);
});
