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
    actualizeDir();
    })
    .catch((err) => {
      console.log(err);
    }); 
    
}

async function isFileExist (file) {
  try {
    await fs.access(file);
    return true;
  } catch (err) {
    return false;
  }
}

async function actualizeDir () {
   try {
    const files = await fs.readdir('./04-copy-directory/files-copy/', { encoding: 'utf-8', withFileTypes: true, recursive: true });
    for (let file of files) {
      let actualFile = await isFileExist(`./04-copy-directory/files/${file.name}`);
      let fileCopy = await isFileExist(`./04-copy-directory/files-copy/${file.name}`);
      if (!actualFile && fileCopy) {
        console.log('works')
          fs.unlink(`./04-copy-directory/files-copy/${file.name}`);
        }
    }
  } catch (err) {
    console.error(err)
  }       
}

copyDir();
