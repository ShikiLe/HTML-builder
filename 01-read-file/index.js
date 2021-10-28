const fs = require('fs');
const path = require('path');

path.resolve('/d/RSSchool/HTML-builder/01-read-file/index.js');

let stream = fs.createReadStream('./01-read-file/text.txt');

stream.on('data', (data) =>
  console.log(data.toString())
);