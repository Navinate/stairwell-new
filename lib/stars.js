// stars
let star_count = 200,
	star_size = 4,
	star_x = [],
	star_y = [],
	stars_made = false,
	big_stars_x = [],
	big_stars_y = [],
	big_stars_size = [],
	big_stars_img = [];
	big_stars = [];

// scrolling
var scroll_direction = 0; // 0 no scroll, 1 down, 2 up, 3 sideways
lastScrollTop = 0;

// page location
var loc = window.location;

// progress
progress = 0;

function preload() {
	star_1 = loadImage('../assets/star.png');
	star_1_gray = loadImage('../assets/star.png');
	star_2 = loadImage('../assets/star2.png');
	star_1_blur = loadImage('../assets/star_blurred.png');
	star_2_blur = loadImage('../assets/star2_blurred.png');
}

function setup() {
	// make things draw from center coords for lining stuff up
	rectMode(CENTER);
	imageMode(CENTER);
	ellipseMode(CENTER);

	if (loc.pathname == "/creation/index.html") {
		slider = createSlider(0, 5, 0);
		slider.position(10, 10);
	}

	star_1_gray.filter(GRAY);
	createCanvas(windowWidth + 1, windowHeight);
	frameRate(24);
}

function draw() {
	// background
	background(0);
	space(width, height, star_size);
	scroll_direction = 0; // welcome.js

	if (loc.pathname == "/creation/index.html") {
		progress = slider.value();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	star_count = 200,
	star_size = 4,
	star_x = [],
	star_y = [],
	stars_made = false,
	big_stars_x = [],
	big_stars_y = [],
	big_stars_size = [],
	big_stars_img = [];
	big_stars = [];
}

function makeStars(star_count) {
	// small stars
	for (let i = 0; i <= star_count - 1; i++) {
		star_x[i] = randomGaussian(windowWidth / 2, windowWidth / 2);
		star_y[i] = randomGaussian(windowHeight / 2, windowHeight / 2);
		stars_made = true;
	}

	//big stars
	if (loc.pathname != "/creation/index.html") {
		for (let i = 0; i < Math.floor(Math.random() * 5) + 8; i++) {
			big_stars_size[i] = abs(random(10, 20));
			big_stars_x[i] = Math.floor(random(0, windowWidth));
			big_stars_y[i] = Math.floor(random(0, windowHeight));
			big_stars_img[i] = Math.floor(Math.random() * 2) ? star_1 : star_2;
		}
	}
	else {
		let height  = 0

		for (let i = 0; i < 6; i++) {
			height = 
			big_stars_size[i] = abs(random(8, 10));
			big_stars_x[i] = Math.floor((windowWidth / 2) + random(-80, 80));
			big_stars_y[i] = (windowHeight / 6) + (i * 120);
			big_stars_img[i] = star_1;
		}
	}
}

function drawStars() {
	for (let i = 0; i < big_stars_size.length; i++) {
		if (loc.pathname == "/creation/index.html") {
			stroke(255);
			strokeWeight(2);
			line(big_stars_x[i], big_stars_y[i], big_stars_x[i + 1], big_stars_y[i + 1]);
			if (progress < i) {
				big_stars_img[i] = star_1_gray;
			}
			else {
				big_stars_img[i] = star_1;
			}
			fill(255, 255, 255, 4);
			noStroke();
			circle(big_stars_x[progress], big_stars_y[progress], 150);
			circle(big_stars_x[progress], big_stars_y[progress], 100);
			circle(big_stars_x[progress], big_stars_y[progress], 50);
			fill(255);
			textSize(18);
			text('Progress: ' + (progress + 1), 190, 24);
		}

		if (scroll_direction == 0) {
			image(big_stars_img[i], big_stars_x[i], big_stars_y[i],
				big_stars_img[i].width / big_stars_size[i], big_stars_img[i].height / big_stars_size[i]);
		}
		else {
			if (big_stars_img[i] == star_1) {
				image(star_1_blur, big_stars_x[i], big_stars_y[i],
					big_stars_img[i].width / big_stars_size[i], big_stars_img[i].height / big_stars_size[i]);
			}
			else {
				image(star_2_blur, big_stars_x[i], big_stars_y[i],
					big_stars_img[i].width / big_stars_size[i], big_stars_img[i].height / big_stars_size[i]);
			}
		}
	}

	noStroke();

	for (let i = 0; i <= star_count - 1; i++) {
		fill(255);
		circle(star_x[i], star_y[i], star_size);
		star_y[i] += 0.8;
		if (abs(randomGaussian(0, 3) > 5)) {
			star_x[i] += randomGaussian(0, 1);
		}
		if (star_x[i] >= windowWidth || star_y[i] >= windowHeight) {
			star_x[i] = randomGaussian(windowWidth / 2, windowWidth / 2);
			star_y[i] = randomGaussian(windowHeight / 2, windowHeight / 2);
		}
	}
}

function fixOffscreenBigStars() {
	for (let i = 0; i < big_stars_size.length; i++) {
		if (big_stars_y[i] >= windowHeight + 10) {
			big_stars_y[i] = 0;
		}
		else if (big_stars_y[i] <= -10) {
			big_stars_y[i] = windowHeight;
		}
	}
}

function moveBigStars() {
	if (scroll_direction == 1) {
		for (let i = 0; i < big_stars_size.length; i++) {
			// for (let j = 0; j < 100; j++) {
			// 	big_stars_y[i]--;
			// }
			big_stars_y[i] -= 100;
		}
	}
	else if (scroll_direction == 2) {
		for (let i = 0; i < big_stars_size.length; i++) {
			// for (let j = 0; j < 100; j++) {
			// 	big_stars_y[i]++;
			// }
			big_stars_y[i] += 150;
		}
	}
}

function space(w, h, star_size) {
	noStroke();
	fill(0);
	rectMode(CORNERS);
	rect(0, 0, w, h);

	if (stars_made == false) {
		makeStars(star_count);
	}

	drawStars();
	fixOffscreenBigStars();
	moveBigStars();
}

document.addEventListener("scroll", function () {
	var st = window.scrollY || document.documentElement.scrollTop;

	if (st > lastScrollTop) { // scrolling down
		console.log("scrolling down");
		scroll_direction = 1;
	}
	else if (st < lastScrollTop) { // scrolling up
		console.log("scrolling up");
		scroll_direction = 2;
	}
	else { // scrolling horizontal
		console.log("scrolling sizeways");
		scroll_direction = 3;
	}

	lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
