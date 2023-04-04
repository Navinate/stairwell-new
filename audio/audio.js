const socket = connectToWebSocket();
console.log("connected to websocket");

let inLaterHalf = false;
let fadeValue = 3;

let id = null;

//files
let base, entry, cello, glacier, tundra, blurosti, chords, bubbles, pingpong;
let randomSounds = [];
let readyToListen = false;
let loadingStatus = document.getElementById("audio-status");

async function loadSongs() {

  let i = 0;

  base = new Pizzicato.Sound({ source: "file", options: { path: "../assets/base.mp3", loop: true } }, () => i++);
  entry = new Pizzicato.Sound("../assets/entry.mp3", () => i++);
  cello = new Pizzicato.Sound("../assets/one/cello.mp3", () => i++);
  glacier = new Pizzicato.Sound("../assets/one/glacier.mp3", () => i++);
  tundra = new Pizzicato.Sound("../assets/one/tundra.mp3", () => i++);
  blurosti = new Pizzicato.Sound({ source: "file", options: { path: "../assets/two/blurosti.mp3", loop: true } }, () => i++);
  chords = new Pizzicato.Sound({source: "file",options: { path: "../assets/two/chords.mp3", loop: true }, }, () => i++);
  randomSounds[1] = new Pizzicato.Sound("../assets/random/1.mp3", () => i++);
  randomSounds[2] = new Pizzicato.Sound("../assets/random/2.mp3", () => i++);
  randomSounds[3] = new Pizzicato.Sound("../assets/random/3.mp3", () => i++);
  randomSounds[4] = new Pizzicato.Sound("../assets/random/4.mp3", () => i++);
  randomSounds[5] = new Pizzicato.Sound("../assets/random/5.mp3", () => i++);
  randomSounds[6] = new Pizzicato.Sound("../assets/random/6.mp3", () => i++);
  randomSounds[7] = new Pizzicato.Sound("../assets/random/7.mp3", () => i++);
  randomSounds[8] = new Pizzicato.Sound("../assets/random/8.mp3", () => i++);
  randomSounds[9] = new Pizzicato.Sound("../assets/random/9.mp3", () => i++);
  randomSounds[10] = new Pizzicato.Sound("../assets/random/10.mp3", () => i++);
  randomSounds[11] = new Pizzicato.Sound("../assets/random/11.mp3", () => i++);
  randomSounds[12] = new Pizzicato.Sound("../assets/random/12.mp3", () => i++);
  randomSounds[13] = new Pizzicato.Sound("../assets/random/13.mp3", () => i++);
  randomSounds[14] = new Pizzicato.Sound("../assets/random/14.mp3", () => i++);
  randomSounds[15] = new Pizzicato.Sound("../assets/random/15.mp3", () => i++);
  bubbles = new Pizzicato.Sound("../assets/one/bubbles.mp3", () => i++);
  pingpong = new Pizzicato.Sound("../assets/pingpong.mp3", () => i++);

  while (true) {
    await new Promise(r => setTimeout(r, 100));
    loadingStatus.innerHTML = Math.floor((100 / 24) * i);

    if (i == 24) {
      init();
      break;
    }
  }
}

async function init() {
  console.log("done loading");
  loadingStatus.innerHTML = "✅";
  //start base
  base.play();
  blurosti.play();
  chords.play();
  //mute phase two bases
  blurosti.volume = 0;
  chords.volume = 0;

  //ready to accept websocket data
  readyToListen = true;

  setInterval(toggleHalf, 168000); //168000 ms is half of base track
}

function toggleHalf() {
  inLaterHalf = !inLaterHalf;
}

/* WHO5 DISTINCT CALC -- SAVE FOR LATER
let avgWhoFive = (a + b + c + d + e) / 5;
    let dA = Math.abs(a - avgWhoFive);
    let dB = Math.abs(b - avgWhoFive);
    let dC = Math.abs(c - avgWhoFive);
    let dD = Math.abs(d - avgWhoFive);
    let dE = Math.abs(e - avgWhoFive);
    let biggestDiff = Math.max(dA, dB, dC, dD, dE);
*/

socket.on(
  "server to gesture",
  (points, red, green, blue, alpha, girth, cap, join, speed, wiggle, smoothness) => {
    if (readyToListen) {
      entry.volume = 1;
      entry.play();
      let rgb = hexToRgb(color);
      let maxRGB = Math.max(red, green, blue);
      let minRGB = Math.min(red, green, blue);
      let lum = 0.5 * (maxRGB + minRGB);
      let sat = (maxRGB - minRGB) / (1 - Math.abs(2 * lum - 1));

      let avgWhoFive = (alpha + girth + speed + wiggle + smoothness) / 5;
      let dA = Math.abs(alpha - avgWhoFive);
      let dB = Math.abs(girth - avgWhoFive);
      let dC = Math.abs(speed - avgWhoFive);
      let dD = Math.abs(wiggle - avgWhoFive);
      let dE = Math.abs(smoothness - avgWhoFive);
      let biggestDiff = Math.max(dA, dB, dC, dD, dE);
      //cello is b
      //glacier is d
      //tundra is nothing
      if (!inLaterHalf) {
        let songToPlay = cello; // CHANGE

        //a
        if (dA === biggestDiff) {
          songToPlay = bubbles;
        } else if (dB === biggestDiff) {
          songToPlay = cello;
        } else if (dC === biggestDiff) {
          songToPlay = bubbles;
        } else if (dD === biggestDiff) {
          songToPlay = glacier;
        } else {
          songToPlay = pingpong;
          playRandomNotes();
        }

        songToPlay.play();
      } else {
        if (dA === biggestDiff) {
          blurosti.volume = 1;
          chords.volume = 0;
        } else if (dB === biggestDiff) {
          blurosti.volume = 0;
          chords.volume = 1;
        } else if (dC === biggestDiff) {
          blurosti.volume = 1;
          chords.volume = 0;
        } else if (dD === biggestDiff) {
          blurosti.volume = 0;
          chords.volume = 1;
        } else {
          playRandomNotes();
        }
      }
    }
  }
);

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

function fadeIn(song) {
  if (song.volume < 1) {
    song.volume += 0.005;
    console.log(song.volume);
    id = window.requestAnimationFrame(() => {
      fadeIn(song);
    });
  } else {
    window.cancelAnimationFrame(id);
    return;
  }
}

async function playRandomNotes() {
  console.log("playing random notes");
  let numNotes = Math.round(Math.random() * 13 + 1);
  console.log("playing a total of " + numNotes + " notes");
  for (let i = 0; i < numNotes; i++) {
    let index = Math.floor(Math.random() * randomSounds.length);
    let delay = Math.random() * 1000 + 100;
    randomSounds[index].play();
    console.log("playing note " + index + " and waiting for " + delay + "ms");
    await sleep(delay);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
