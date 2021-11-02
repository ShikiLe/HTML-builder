import fs from 'fs/promises';
import path from 'path';

async function copyDir () {
  await fs.mkdir('./04-copy-directory/files-copy',{recursive: true})
    .then(() => {
      return;
    });

  await fs.readdir('./04-copy-directory/files', { encoding: 'utf-8', withFileTypes: true, recursive: true })
    .then((filenames) => {
      for (let filename of filenames) {
        fs.writeFile(
          path.join('./04-copy-directory/files-copy', `${filename.name}`),
          '',
          (err) => {
            if (err) throw err;
          });
        fs.copyFile(`./04-copy-directory/files/${filename.name}`, `./04-copy-directory/files-copy/${filename.name}`);
      }
    })
    .catch((err) => {
      console.log(err);
    }); 
}

copyDir();


