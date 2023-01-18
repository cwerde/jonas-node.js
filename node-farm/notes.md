# Introduction to Node.js and NPM

## 6. Running JavaScript Outside the Browser

We open the terminal and write `node` there to open **node**. This will open up the Node REPL, which stands for read-event-print loop. We can use here like a browser terminal. If we want to exit this loop, we write `.exit` or press **CTRL+C**.

We write **Tab** 2 times on the terminal and the terminal lists all the global variables that are available in Node. We can write to the console one of these variables and by hitting **Tab** 2 times again, we can list all the methods or the properties that are available to us.

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

## 8. Reading and Writing Files

We use `fs` variable to use the functions on that object. In this example we use `readFileSync` function:

```javascript
fs.readFileSync();
```

`readFileSync` function takes 2 arguements. The first one `path` <string>, and the second part `options` <object>:
