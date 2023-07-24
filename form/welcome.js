var lastScrollTop = 0;
var scroll_direction = 0; // 0 no scroll, 1 down, 2 up, 3 sideways

//Hide all but first page
let pages = document.querySelectorAll(".page");
for (let i = 1; i < pages.length; i++) {
	pages[i].style.display = "none";
}

let buttons = document.querySelectorAll(".go-next");
buttons.forEach((b) => {
	b.addEventListener("click", cyclePages);
});

let buttons2 = document.querySelectorAll(".btn");
buttons2.forEach((b) => {
	b.addEventListener("click", cyclePages);
});

let pageIndex = 0;
function cyclePages() {
	pages.forEach((p) => {
		p.style.display = "none";
	});
	pageIndex++;

	pages[pageIndex].style.display = "flex";
	if (pageIndex >= 6) {
		goNext.style.display = "none";
	}
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
