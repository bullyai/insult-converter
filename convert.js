const fs = require('fs');
const { generate } = require('shortid');
const { join } = require('path');
let data = {};

const saveData = () => {
  fs.writeFile('data.json', JSON.stringify(data, null, 2), () => {
    console.log('Saved!');
  });
}

const isDirectory = (source) => fs.lstatSync(source).isDirectory();
const isFile = (source) => !isDirectory(source);
const getDirectories = (source) => 
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const getFiles = (source) =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isFile);

getDirectories('trainingData').forEach(directory => {
  
  let files = getFiles(directory);

  if (files.length > 0) {
    files
      .forEach(location => { 
        let file = fs.readFileSync(location).toString();
        let category = location.split('/')[location.split('/').length - 1];
        let gender = directory.split('/')[directory.split('/').length - 1];

        file.split('\n').map(insult => {

          if (!data[category]) {
            data[category] = [];
          }

          data[category].push({ id: generate(), insult: insult, gender: gender,  })

        });
      });
  }
});

saveData();