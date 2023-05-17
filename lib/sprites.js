// regex expression for sprites filepath
const re = new RegExp('(?<=href="/assets/sprites/)(.*?)(?=.png)', "g");

// get file names
function loadSprites(filePath, option) {
  var filenames = [];
  var files = [];
  var xmlhttp = new XMLHttpRequest();

  // get the number of sprites
  var count = (str) => {
    return ((str || "").match(re) || []).length + 1;
  };

  // check given directories and get files and put in "filenames" array
  xmlhttp.open("GET", filePath + option, false);
  xmlhttp.send();
  count = count(xmlhttp.responseText);

  if (xmlhttp.status == 200) {
    for (var i = 0; i <= count; i++) {
      filenames.push([...new Set(re.exec(xmlhttp.responseText))].toString());
      i++;
    }
  }

  // populate array
  filenames.forEach((name) => {
    files.push(loadImage("../assets/sprites/" + name + ".png"));
    //console.log("../assets/sprites/" + name + option + ".png");
  });

  // return array of sprites
  return files;
}
