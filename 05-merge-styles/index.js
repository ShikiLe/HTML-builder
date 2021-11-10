import fs from 'fs/promises';
import path from 'path';
const dirPath = path.resolve('../HTML-builder/05-merge-styles/styles');
let stylesStr = '';



async function copyStyles () {
  await fs.writeFile(path.join('05-merge-styles', 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw err;
  });

  try {
    const files = await fs.readdir(dirPath, { encoding: 'utf-8', withFileTypes: true });
    for (let file of files) {
      if (file.isFile() && `${path.extname(file.name).slice(1)}` === 'css') {   
        const currFile =  await fs.readFile(path.join('05-merge-styles', 'styles', `${file.name}`), 'utf-8');
        stylesStr += currFile;
      }
    }
  } catch (err) {
    console.error(err);
  }
  await fs.appendFile(path.join('05-merge-styles', 'project-dist', 'bundle.css'), stylesStr,
    err => {
      if (err) throw err;
    });
    stylesStr = '';
}

copyStyles();



