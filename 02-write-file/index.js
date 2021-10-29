const fs = require('fs').promises;
const path = require('path');

const stdout = process.stdout;
const stdin = process.stdin;

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
  });

stdout.write('Please, enter your message\n');

stdin.on('data', (data) => {
  if (data.includes('exit')) {
    process.exit(); 
  }
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
      if (err) throw err;
    });
});
process.on('SIGINT', function() {
  process.exit();
});
process.on('exit', () => stdout.write('Goodbye!'));


