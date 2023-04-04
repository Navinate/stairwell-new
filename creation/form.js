const socket = connectToWebSocket();
console.log("connected to websocket");

let maxPoints = 10;
let noDraw = false;

let gest, gest2;
let cnv;
let hex;

//setup of canvas and 2 gests
function setup() {
	cnv = createCanvas(800, 800);
	frameRate(24);

	hex = document.querySelector('input[name="colors"]:checked').value;
	//                 seed, hue, girth, cap, join, x, y, alpha, speed, wiggle, smoothness
	gest = new Gesture(
		100,
		color(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b),
		15,
		"ROUND",
		"ROUND",
		0,
		0,
		255,
		5,
		5,
		5
	);
	gest2 = new Gesture(
		0,
		color(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b),
		10,
		"ROUND",
		"ROUND",
		0,
		0,
		255,
		0,
		0,
		0
	);
}

let index = 0;

function draw() {
	background(255);
	if (!noDraw) {
		if (pmouseX < width && pmouseX > 0) {
			if (pmouseY < height && pmouseY > 0) {
				if (mouseIsPressed && gest2.points.length < maxPoints) {
					gest.addPoint(pmouseX, pmouseY);
					if (frameCount % 2 == 0) {
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
	} else {
		//gest2.update();
		gest2.drawBezier(frameCount * 0.001, 0);
	}
}

/* let submitGest = document.getElementById("submit-gest");
submitGest.addEventListener("mousedown", () => {
  if (gest.points.length > 0) {
    sendData();
  }
}); */

function updateColor() {
	hex = document.querySelector('input[name="colors"]:checked').value;
	gest.color = color(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
}

//handles reset
function mousePressed() {
	if (!noDraw) {
		if (pmouseX < width && pmouseX > 0) {
			if (pmouseY < height && pmouseY > 0) {
				gest.points = [];
				gest2.points = [];
			}
		}
	}
}

//sends data
function sendData() {
	gest2.normalizePoints();
	socket.emit(
		"gesture to server",
		gest2.points,
		red(gest2.color),
		green(gest2.color),
		blue(gest2.color),
		alpha(gest2.color),
		gest2.girth,
		gest2.cap,
		gest2.join,
		gest2.speed,
		gest2.wiggle,
		gest2.smoothness
	);
	cyclePages();
}

//STORY LOGIC

//randomly select a color and set grid backgrounds to color
let radios = document.querySelectorAll('input[type="radio"]');
radios[Math.floor(Math.random() * radios.length)].setAttribute("checked", "checked");
radios.forEach((rb) => {
	rb.style.backgroundColor = rb.value;
});

const caps = ["ROUND", "SQUARE", "PROJECT"];
const joins = ["MITER", "BEVEL", "ROUND"];

let pageIndex = 0;

//seed, hue, girth, cap, join, x, y, alpha, speed, wiggle, smoothness
let seed = 0;
let girth = 20;
let cap = "ROUND";
let join = "ROUND";
let alphaVar = 255;
let speed = 5;
let wiggle = 250;
let smoothness = 5;

//Hide all but first page
let pages = document.querySelectorAll(".page");
for (let i = 1; i < pages.length; i++) {
	pages[i].style.display = "none";
}

let goNext = document.querySelector(".go-next");
goNext.addEventListener("click", () => {
	cyclePages();
	updateGesture();
});
goNext.addEventListener("touchStart", () => {
	cyclePages();
	updateGesture();
});

let sendtoVisual = document.querySelector(".go-visual");
sendtoVisual.addEventListener("click", sendData);
sendtoVisual.addEventListener("touchStart", sendData);

function cyclePages() {
	if (gest2.points.length > 0) {
		pages.forEach((p) => {
			p.style.display = "none";
		});
		pageIndex++;

		pages[pageIndex].style.display = "flex";
		if (pageIndex >= pages.length - 1) {
			goNext.style.display = "none";
		}

		if (pageIndex == 8) {
			document.querySelector(".go-next").style.display = "none";
		} else {
			//document.querySelector(".go-next").style.display = "block";
		}

		if (pageIndex == 9) {
			document.querySelector(".p5Canvas").style.display = "none";
		}
	}
}

function updateGesture() {
	colorResult = hexToRgb(document.querySelector('input[type="radio"]:checked').value);
	girth = map(document.querySelector("#a").value, 0, 100, 5, 150);
	alphaVar = map(document.querySelector("#b").value, 0, 100, 128, 255);
	speed = map(document.querySelector("#c").value, 0, 100, 1, 10);
	wiggle = map(document.querySelector("#d").value, 0, 100, 10, 400);
	smoothness = map(document.querySelector("#e").value, 0, 100, 1, 10);
	//seed, hue, girth, cap, join, x, y, alpha, speed, wiggle, smoothness
	gest2.color = color(colorResult.r, colorResult.g, colorResult.b, alphaVar);
	gest2.girth = girth;
	gest2.cap = cap;
	gest2.join = join;
	gest2.speed = speed;
	gest2.wiggle = wiggle;
	gest2.smoothness = smoothness;
	if (!noDraw) {
		//gest2.normalizePoints();
	}
	noDraw = true;
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
}
