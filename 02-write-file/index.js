import fs from 'fs/promises';
import path from 'path';

const stdout = process.stdout;
const stdin = process.stdin;

async function isFileExist (file) {
  try {
    await fs.access(file);
    return true;
  } catch (err) {
    return false;
  }
}

stdout.write('Please, enter your message\n');

stdin.on('data', async (data) => {
  if (data.includes('exit')) {
    process.exit(); 
  }
  if (await !isFileExist('02-write-file/text.txt')) {
    await fs.writeFile(
      path.join('02-write-file/', 'text.txt'),
      data);
  } else {
    await fs.appendFile(
      path.join('02-write-file/', 'text.txt'),
      data);
  }
});

process.on('SIGINT', function() {
  process.exit();
});
process.on('exit', () => stdout.write('Goodbye!'));


