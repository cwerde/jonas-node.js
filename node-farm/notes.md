# Introduction to Node.js and NPM

## 6. Running JavaScript Outside the Browser

We open the terminal and write `node` there to open **node**. This will open up the Node REPL, which stands for read-event-print loop. We can use here like a browser terminal. If we want to exit this loop, we write `.exit` or press **CTRL+C**.

We write **Tab** 2 times on the terminal and the terminal lists all the global variables that are available in Node. We can write to the console one of these variables and by hitting **Tab** 2 times again, we can list all the methods or the properties that are available to us.

---

## 7. Running JavaScript Outside the Browser

### Hello World!

We define a variable:

```javascript
const hello = 'Hello World!';
```

Then, we write to the console:

```javascript
console.log(hello);
```

When the code is ready, we will write this command to the console to start the program:

```shell
node index.js
```

The output is:

```shell
Hello World!
```

### Core Modules

We import the module that we need. In this example, we need `fs` module to access the file system:

```javascript
require('fs');
```

And after that, we store the result of the `require` function into a variable:

```javascript
const fs = require('fs');
```

So again, calling this function here with this built-in `fs` module name will return an object in which there are lots of functions that we can use.

**Note:** We import the modules at the top of our files.

---

## 8. Reading and Writing Files

### Reading Files

We use `fs` variable to use the functions on that object. In this example we use `readFileSync` function:

```javascript
fs.readFileSync();
```

`readFileSync` function takes 2 arguements. The first one is `path` (`string`) and the second one is `options` (`object`) or `encoding` (`string`):

```javascript
fs.readFileSync('./txt/input.txt', 'utf-8');
```

We will take the content in **input.txt** here but if we didn't define the encoding, we would have received a `Buffer` and we don't want that.

### Writing Files

In this example we use `writeFileSync` function:

```javascript
fs.writeFileSync();
```

`writeFileSync` function takes 3 arguements. The first one is `path` (`string`), the second one is `data` (`string`) and the third one is `options` (`object`) or `encoding` (`string`):

```javascript
fs.writeFileSync('./txt/output.txt', textOut, 'utf-8');
```

**Note:** This function doesn't return anything meaningful and we don't save anything to any variable.

---

## 10. Reading and Writing Files Asynchronously

### Reading

We use `readFile` function to read the files asyncronously. It takes 3 arguements. The first one is `path` (`string`), the second one is `options` (`object`) or `encoding` (`string`) and the third one is a `callback` (`function`):

```javascript
fs.readFile('./txt/start.txt', 'utf-8', () => {});
```

The third arguement `callback` takes 2 arguements. The first one is `error` (`error`) and the second one is `data` (`string`):

```javascript
fs.readFile('./txt/start.txt', 'utf-8', (error, data) => {});
```

When we write codes this block, they will run after the file is read.

### Writing

We use `writeFile` function to read the files asyncronously. It takes 4 arguements. The first one is `path` (`string`), the second one is `data` (`string`), the third one is `options` (`object`) or `encoding` (`string`) and the fourth one is a `callback` (`function`):

```javascript
fs.writeFile('./txt/final.txt', data, 'utf-8', () => {});
```

If we are writing a basic example, the fourth arguement `callback` probably takes 1 arguement and this arguement is `error` (`error`):

```javascript
fs.writeFile('./txt/final.txt', data, 'utf-8', (err) => {});
```

If we don't handle the error, we don't have to write anything between the curly braces.

---

## 11. Creating a Simple Web Server

We use our `http` module and a `method` that is on that `object`.

```javascript
http.createServer();
```

`createServer` function will accept a `callback` function and this callback will accept 2 fundamental variables. They are the `request` variable and the `response` variable.

```javascript
http.createServer((request, response) => {});
```

Each time that a new request hits our server this callback function will get called, and the callback function will have access to the `request` object which holds all kinds of stuff like the request url, and a bunch of other stuff. On the other hand, the `response` object gives us a lot of tools basically for dealing with the `response`, so for sending out the `response`. All we want to do now is just a basic response and we do that with `end` method on `response` object:

```javascript
http.createServer((req, res) => {
  res.end('Hello from the server!');
});
```

Creating a server was the first part, and the second part is to actually listen to incoming requests from the client. In order to do that, we should save the result of `createServer` to a new variable.

```javascript
const server = http.createServer((req, res) => {
  res.end('Hello from the server!');
});
```

After that, we use `listen` method on this object.

```javascript
server.listen();
```

And this method accepts 3 parameters. The first one is the `port` (`int`), the second one is the `host` (`string`) and the third one is a `callback`. We don't need to specify the second and the third ones.

```javascript
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
```

And now, all we have to do is to actually go to this url on our computer on port 8000. We have to run the Node application and then we can write on url bar `127.0.0.1:8000`.

---

## 12. Routing
