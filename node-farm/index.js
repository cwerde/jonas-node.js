const fs = require('fs');
const http = require('http');
const url = require('url');
const { type } = require('os');

//------------------------------//
// FILES
//------------------------------//

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
/*
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
*/

//------------------------------//
// SERVER
//------------------------------//

const dataJSON = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(dataJSON);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    res.end(`<p style="font-family: monospace">This is the OVERVIEW!</p>`);
  } else if (pathName === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    res.end(`<p style="font-family: monospace;">This is the PRODUCT!</p>`);
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(dataJSON);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });

    res.end(`<p style="font-family: monospace;">404 PAGE NOT FOUND!</p>`);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
