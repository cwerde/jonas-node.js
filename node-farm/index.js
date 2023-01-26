const fs = require('fs');

// Blocking, synchronous way
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.
Created on ${Date(Date.now()).toString()}`;

fs.writeFileSync('./txt/output.txt', textOut, 'utf-8');
console.log('The file has been written.');
*/

// Non-Blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('💥 ERROR! 💥');

  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);

    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile(
        './txt/final.txt',
        `${data2}\n${data3}`,
        { encoding: 'utf-8' },
        (err) => {
          console.log('Your file has been written 😁');
        }
      );
    });
  });
});
console.log('The file will be read!');
