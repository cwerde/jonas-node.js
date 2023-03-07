// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const Calc = require('./test-module-1');
const calc1 = new Calc();
console.log(calc1.addition(2, 5));

// exports
/*
const calc2 = require('./test-module-2');
console.log(calc2.multiplication(2, 5));
*/

const {
  addition,
  subtraction,
  multiplication,
  division,
} = require('./test-module-2');

console.log(multiplication(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
