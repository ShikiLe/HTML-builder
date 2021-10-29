const fs = require('fs');

const stream = fs.createReadStream('./01-read-file/text.txt');
const stdout = process.stdout;

stream.on('data', (data) =>
  // console.log(data.toString())
  stdout.write(data.toString().trim())
);