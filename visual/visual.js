// open child settings window to change options related to the visual
console.log("http://" + window.location.href.split('/')[2] + "/visual/settings.html");
if (window.location.href.split('/')[4] != "settings.html") {
	url = window.location.href.split('/')[1] + "/visual/settings.html"
	child_window = window.open(url, popup=false);
	settingsWindow = true;
}

// variables on settings page
let bg_width, bg_height = 0;
let bg = "gradient";

// scalars for gesture variables
//let girth_scalar = 1, maxSpeed_scalar = 1, wiggle_scalar = 1, smooth_scalar = 1;


const socket = connectToWebSocket();
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
	background(0);

	bg_width = width;
	bg_height = height;

	setBackground();

	push();
	//scale(0.5);
	translate(width / 2, height / 2);
	gests.forEach((g) => {
		g.update(t);
		g.drawBezier(t);
	});
	pop();

	t += 0.0005;
}

function updateGest(attribute, scalar) {
	maxSpeed_scalar, wiggle_scalar, smooth_scalar;
	switch (attribute) {
		case "girth":
			girth_scalar = scalar;
			console.log(girth_scalar);
			break;
		case "wiggle":
			wiggle_scalar = scalar;
			break;
		case "max_speed":
			max_speed_scalar = scalar;
			break;
		case "smooth":
			smooth_scalar = scalar;
			break;
	}
	//window.location.reload();
}

// function to change the background
function setBackground(bg_pram) {
	if (bg_pram != null) {
		bg = bg_pram
	}
	
	switch (bg) {
		case "gradient":
			setGradient(0, 0, width, height, color(134, 219, 216), color(38, 34, 98));
			break;
		case "space":
			space(width, height, 100, 2);
			break;
		default: 
			//setGradient(0, 0, width, height, color(134, 219, 216), color(38, 34, 98));
			console.log("Default Background Case. Check bg.")
	}
}

socket.on("server to gesture", (points, red, green, blue, alpha, girth, cap, join, speed, wiggle, smoothness) => {
	console.log("recieved data");
	if (gests.length > 20) {
		gests.shift();
	}
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
});

document.addEventListener("click", () => {
	if (gests.length > 20) {
		gests.shift();
	}
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

function setGradient(x, y, w, h, c1, c2) {
	noStroke();
	for (let i = y; i <= y + h; i += h / 10) {
		let inter = map(i, y, y + h, 0, 1);
		let c = lerpColor(c1, c2, inter);
		fill(c);
		rectMode(CORNERS);
		rect(x, i, x + w, i + h / 10);
	}
}


let star_x = [], star_y = [], stars_made = false;

function space(w, h, star_count, star_size) {
	noStroke();
	fill(0);
	rectMode(CORNERS);
	rect(0, 0, w, h);

	if (stars_made == false) {
		for (let i = 0; i <= star_count - 1; i++) {
			star_x[i] = randomGaussian(w/2, w/2);
			star_y[i] = randomGaussian(h/2, h/2);
			stars_made = true;
		}
	}

	for (let i = 0; i <= star_count - 1; i++) {
		fill(255);
		circle(star_x[i], star_y[i], star_size);
		star_y[i] += 0.1;
		if (abs(randomGaussian(0, 3) > 6)) {
		star_x[i] += randomGaussian(0, 1);
		}
		if (star_x[i] >= w || star_y[i] >= h) {
			star_x[i] = randomGaussian(w/2, w/2);
			star_y[i] = randomGaussian(h/2, h/2);
		}
	}
}
