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
