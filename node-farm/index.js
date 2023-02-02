const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate', 'utf-8');

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const dataJSON = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(dataJSON);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cards = dataObject
      .map((product) => replaceTemplate(tempCard, product))
      .join('');

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cards);

    res.end(output);
  }

  // Product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const product = dataObject[query.split('=')[1]];

    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }

  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(dataJSON);
  }

  // Not found
  else {
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
