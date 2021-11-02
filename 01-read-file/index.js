import fs from 'fs';

const stream = fs.createReadStream('./01-read-file/text.txt');
const stdout = process.stdout;

stream.on('data', (data) =>
  stdout.write(data.toString().trim())
);