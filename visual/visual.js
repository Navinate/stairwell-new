const socket = connectToWebSocket();
console.log("connected to websocket");

let creatures = [];
let t = 0;

function preload() {
	loadSprites("../assets/sprites/");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
}

function draw() {
	// background
	background(0);
	space(width, height, 200, 2);

	push();

	// display all images debug
	// for (var i = 0; i < sprites.length; i++) {
	// 	image(sprites[i], 50, 150 * i);
	// }

	creatures.forEach((g) => {
		g.update(t);
		g.drawCreatures(t);
	});

	pop();

	t += 0.0005;
}

socket.on("server to gesture", (points, red, green, blue, alpha, size, speed) => {
	console.log("recieved data");
	if (creatures.length > 20) {
		creatures.shift();
	}
	creatures.push(
		// seed, colorVar, pointiness, x, y, speed
		// old: seed, colorVar, girth, cap, join, x, y, speed, wiggle, smoothness
		new Creature(
			random(99999),
			color(red, green, blue, alpha),
			pointiness,
			random(-width / 3, width / 3),
			random(-height / 3, height / 3),
			size,
			speed
		)
	);
	creatures[creatures.length - 1].points = [...points];
});

document.addEventListener("click", () => {
	if (creatures.length > 20) {
		creatures.shift();
	}
	creatures.push(
		new Creature(
			// seed, colorVar, pointiness, x, y, size, speed
			//old: seed, hue, girth, cap, join, x, y, speed, wiggle, smoothness
			random(99999), // seed
			color(floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255)), floor(random(200, 255))), // hue
			floor(random(0, 20)), // pointiness
			random(-width / 3, width / 3), // x
			random(-height / 3, height / 3), // y
			random(.25, 2), // size
			random(.5, 2), // speed
		)
	);
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
