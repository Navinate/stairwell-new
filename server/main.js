const minData = 5;
const redisKey = "stairwell";
//in ms
const maxInterval = 3000;
const minInterval = 1000;

const client = require("redis").createClient(); //database
const http = require("http").createServer(); //web server

let interval = maxInterval;
let timer;

//websocket setup
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

//we do a little bit of error checking
client.on("error", (err) => console.log("Redis Client Error", err));
async function init() {
  await client.connect();

  io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("form to server", (color, a, b, text) => {
      let data = { color: color, a: a, b: b };
      client.LPUSH(redisKey, JSON.stringify(data));
      if (text !== "") {
        client.LPUSH("thoughts", text);
      }
    });

    socket.on(
      "creature to server",
      (points, red, green, blue, alpha, pointiness, speed) => {
        let data = {
          points: points,
          red: red,
          green: green,
          blue: blue,
          alpha: alpha,
          pointiness: pointiness,
          speed: speed
        };
        client.LPUSH("creatures", JSON.stringify(data));
      }
    );
  });

  //launch web server
  http.listen(3000, () => console.log("Listening on port 3000"));

  //init starting interval
  timer = setInterval(popData, maxInterval);

  setInterval(popCreatues, 1000);
}

async function popData() {
  let dataCount = await client.LLEN(redisKey);

  if (dataCount > 0) {
    //grab data from database
    let data = JSON.parse(await client.RPOP(redisKey));
    //emit to clients
    io.emit("server to listener", data.color, data.a, data.b, data.c, data.d, data.e);
  }

  //adjust interval to match amount of data
  if (dataCount > minData) {
    interval = Math.max(minInterval, maxInterval - dataCount * 100);
  } else {
    interval = Math.min(maxInterval, interval + 100);
  }
  //reset timer
  clearInterval(timer);
  //create new timer
  timer = setInterval(popData, interval);
}

async function popCreatues() {
  let dataCount = await client.LLEN("creatures");
  if (dataCount > 0) {
    //grab data from database
    let data = JSON.parse(await client.RPOP("creatures"));
    //emit to clients
    io.emit(
      "server to creature",
      data.points,
      data.red,
      data.green,
      data.blue,
      data.alpha,
      data.pointiness,
      data.speed
    );
    console.log("send data to visual");
  }
}

init();
