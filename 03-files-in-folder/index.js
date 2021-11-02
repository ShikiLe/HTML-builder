import fs from 'fs/promises';
import path from 'path';
const dirPath = '/RSSchool/HTML-builder/03-files-in-folder/secret-folder';

fs.readdir(dirPath, { encoding: 'utf-8', withFileTypes: true })
  .then((filenames) => {
    for (let filename of filenames) {
      if (filename.isFile()) {
        fs.stat(`${dirPath}/${filename.name}`)
          .then((stats) => {
            console.log(`${filename.name.split('.')[0]} - ${path.extname(filename.name).slice(1)} - ${stats.size / 1000}kb`
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
