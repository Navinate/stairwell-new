// regex expression
const re = new RegExp("\(?<=href=\"\/assets\/sprites\/)(.*?)(?=\.png)", 'g');
var i = 0;

// get file names
function loadFile(filePath) {
    var name;
    var filenames = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      while (i < 2) {
        name = ([...new Set(re.exec(xmlhttp.responseText))].toString());
        filenames.push(name);
        i++;
      }
    }
  return filenames;
}
