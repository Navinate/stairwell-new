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

function preload() {
	star_1 = loadImage('../assets/star.png');
	star_2 = loadImage('../assets/star2.png');
	star_1_blur = loadImage('../assets/star_blurred.png');
	star_2_blur = loadImage('../assets/star2_blurred.png');
}

function setup() {
	createCanvas(windowWidth + 1, windowHeight);
	frameRate(24);
}

function draw() {
	// background
	background(0);
	space(width, height, star_size);
	console.log(scroll_direction);
	scroll_direction = 0; // welcome.js
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function makeStars(star_count) {
	// small stars
	for (let i = 0; i <= star_count - 1; i++) {
		star_x[i] = randomGaussian(windowWidth / 2, windowWidth / 2);
		star_y[i] = randomGaussian(windowHeight / 2, windowHeight / 2);
		stars_made = true;
	}

	//big stars
	if (!document.getElementsByClassName("first-page")[0].style.display != "none") {
		for (let i = 0; i < Math.floor(Math.random() * 5) + 8; i++) {
			big_stars_size[i] = abs(random(10, 20));
			big_stars_x[i] = Math.floor(random(0, windowWidth));
			big_stars_y[i] = Math.floor(random(0, windowHeight));
			big_stars_img[i] = Math.floor(Math.random() * 2) ? star_1 : star_2;
		}
	}
}

function drawStars() {
	for (let i = 0; i < big_stars_size.length; i++) {
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
