// regex expression for sprites filepath
const re = new RegExp("\(?<=href=\"\/assets\/sprites\/)(.*?)(?=\.png)", 'g');
let sprites = [];

// get file names
function loadSprites(filePath) {
  var filenames = [];
  var xmlhttp = new XMLHttpRequest();

  // get the number of sprites
  var count = (str) => {
    return (((str || '').match(re) || []).length)  + 1;
  }

  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  count = count(xmlhttp.responseText);

  if (xmlhttp.status==200) {
    for (var i = 0; i <= count; i++) {
      filenames.push(([...new Set(re.exec(xmlhttp.responseText))].toString()));
      i++;
    }
  }

  filenames.forEach((name) => {
    sprites.push(loadImage('../assets/sprites/' + name + '.png'));
  });
}
