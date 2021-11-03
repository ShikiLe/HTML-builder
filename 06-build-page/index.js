import fs from 'fs/promises';
import path from 'path';
const taskFolder = './06-build-page';

async function createMainFolder () {
  await fs.mkdir(path.join('06-build-page', 'project-dist'), {recursive: true}, err => {
    if (err) throw err;
  });  
  await  fs.writeFile(path.join('06-build-page', 'project-dist', 'index.html'), '', (err) => {
    if (err) throw err; 
  });
  await fs.writeFile(path.join('06-build-page', 'project-dist', 'style.css'), '', (err) => {
    if (err) throw err; 
  });
}

async function addAssets () {
  const toPath = `${taskFolder}/project-dist/assets`;
  await copyDir(`${taskFolder}/assets`, toPath); 
} 

async function copyDir (fromPath, toPath) {
  await fs.mkdir(toPath, { recursive: true });
  
  const dir = await fs.readdir(fromPath, { encoding: 'utf-8', withFileTypes: true, recursive: true });
  for (let file of dir) {
    if (file.isDirectory()) {
      copyDir(`${fromPath}/${file.name}`, `${toPath}/${file.name}`);
    } else {
      fs.copyFile(`${fromPath}/${file.name}`, `${toPath}/${file.name}`);
    }
  }
}

async function fillProjectDist () {
  const components = await fs.readdir(`${taskFolder}/components`, { encoding: 'utf-8'}); 
  let templateHtml = await fs.readFile(`${taskFolder}/template.html`, 'utf-8');
  const styles = await fs.readdir(`${taskFolder}/styles`, { encoding: 'utf-8'}); 
  const projectStyle = `${taskFolder}/project-dist/style.css`;
  
  await fs.appendFile(`${taskFolder}/project-dist/index.html`, templateHtml);
  let projectHtml = await fs.readFile(`${taskFolder}/project-dist/index.html`, 'utf-8');

  for (let component of components) {
    const componentHtml = await fs.readFile(`${taskFolder}/components/${component}`, 'utf-8');
    const componentName = component.slice(0,-5);
    projectHtml = projectHtml.replace(`{{${componentName}}}`, componentHtml);
  }

  for (let style of styles) {
    const currStyle = await fs.readFile(`${taskFolder}/styles/${style}`, 'utf-8');
    fs.appendFile(projectStyle, currStyle);
  }

  fs.writeFile(`${taskFolder}/project-dist/index.html`, projectHtml);
}

async function init () {
  await createMainFolder();
  await addAssets();
  await fillProjectDist();
}
init();