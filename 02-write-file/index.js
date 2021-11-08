import fs from 'fs/promises';
import path from 'path';

const stdout = process.stdout;
const stdin = process.stdin;

stdout.write('Please, enter your message\n');
await fs.writeFile(
      path.join('02-write-file/', 'text.txt'),
      '');

stdin.on('data', async (data) => {
  if (data.includes('exit')) {
    process.exit(); 
  }
  await fs.appendFile(
      path.join('02-write-file/', 'text.txt'),
      data);

});

process.on('SIGINT', function() {
  process.exit();
});
process.on('exit', () => stdout.write('Goodbye!'));


