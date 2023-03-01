//const socket = io(); //LOCAL TESTING
const socket = io("ws://127.0.0.1:3000"); //LIVE SERVER

const caps = ["ROUND", "SQUARE", "PROJECT"];
const joins = ["MITER", "BEVEL", "ROUND"];
let gests = [];

function setup() {
	//SET BACK TO FULL SIZE AFTER TESTING IS DONE
	createCanvas(windowWidth, windowHeight - 50);
	frameRate(20);
}
function draw() {
	background(33);
	push();
	translate(width / 2, height / 2);
	gests.forEach((g) => {
		g.render();
	});
	pop();
}

socket.on("server to gesture", (color, points) => {
	console.log("recieved data");
	gests.push(
		new Gesture(
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
