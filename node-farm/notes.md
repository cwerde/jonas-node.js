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
