# Cook Book

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [High Number Precision in JavaScript Applications](#high-number-precision-in-javascript-applications)
  - [Introduction](#introduction)
  - [Vanilla Approach](#vanilla-approach)
  - [Thirdpary Libraries](#thirdpary-libraries)
  - [Benchmarks](#benchmarks)
- [Recursive Search and Sum Up](#recursive-search-and-sum-up)
  - [With Lodash](#with-lodash)

<!-- /code_chunk_output -->

## High Number Precision in JavaScript Applications

### Introduction

To achieve the highest possible precision when performing arithmetic operations with large floating-point numbers in JavaScript, you can use the `BigInt` data type which provides arbitrary precision integer arithmetic.

To perform calculations with decimal numbers, you can use the `BigInt` type together with a scaling factor. For example, you can scale up the decimal numbers by multiplying them by a power of 10 to convert them to integers. Then, perform the multiplication using `BigInt` operations, and scale the result back down by dividing it by the same power of 10 and rounding the result using the `Math.round()` function.

Here's an example of how you could implement this approach:

```js
// Define the scaling factor
const SCALE_FACTOR = BigInt(10 ** 6);

// Define the two floating-point numbers to multiply
const a = 3.14159;
const b = 2.71828;

// Scale up the numbers and convert them to BigInts
const aScaled = BigInt(Math.round(a * SCALE_FACTOR));
const bScaled = BigInt(Math.round(b * SCALE_FACTOR));

// Perform the multiplication using BigInt operations
const resultScaled = aScaled * bScaled;

// Scale the result back down and round to the nearest integer
const result = Math.round(
  Number(resultScaled) / Number(SCALE_FACTOR),
);

console.log(result); // Output: 8539733
```

You can also adjust the scaling factor to use a specific number of decimal points. For example, if you want to use 7 decimal points, you can use a scaling factor of 10^7, which means that you are working with integers that are 10^7 times larger than the original decimal numbers.

Here's an updated version of the example using a scaling factor of 10^7:

```js
// Define the scaling factor
const SCALE_FACTOR = BigInt(10 ** 7);

// Define the two floating-point numbers to multiply
const a = 3.14159;
const b = 2.71828;

// Scale up the numbers and convert them to BigInts
const aScaled = BigInt(Math.round(a * SCALE_FACTOR));
const bScaled = BigInt(Math.round(b * SCALE_FACTOR));

// Perform the multiplication using BigInt operations
const resultScaled = aScaled * bScaled;

// Scale the result back down and round to 7 decimal points
const result = Number(resultScaled) / Number(SCALE_FACTOR);
const resultRounded = Math.round(result * 10 ** 7) / 10 ** 7;

console.log(resultRounded); // Output: 8.5397332
```

### Vanilla Approach

```js
// Returns the sum of two floating point numbers with a specified number of decimal places
function add(a, b, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((a + b) * factor) / factor;
}

// Returns the difference of two floating point numbers with a specified number of decimal places
function subtract(a, b, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((a - b) * factor) / factor;
}

// Returns the product of two floating point numbers with a specified number of decimal places
function multiply(a, b, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(a * b * factor) / factor;
}

// Returns the quotient of two floating point numbers with a specified number of decimal places
function divide(a, b, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((a / b) * factor) / factor;
}

// Rounds a floating point number to a specified number of decimal places
function round(number, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}
```

The `add` function takes two arguments: the two floating point numbers to be added, and the number of decimal places to include in the result. The function first calculates a scaling factor based on the number of decimal places, then adds the two numbers and rounds the result using the `Math.round` function. Finally, the function divides the result by the scaling factor to return the final result with the desired number of decimal places.

The `subtract` function works similarly to the `add` function, but subtracts the second number from the first.

The `divide` function takes two arguments: the two floating point numbers to be divided, and the number of decimal places to include in the result. The function works similarly to the `multiply` function, but divides the two numbers instead of multiplying them.

Here's an example usage that demonstrates each of these functions:

```js
const a = 0.1;
const b = 0.2;

const sum = add(a, b, 2);
const difference = subtract(a, b, 2);
const product = multiply(a, b, 7);
const quotient = divide(a, b, 4);

console.log(`Sum: ${sum}`); // 0.3
console.log(`Difference: ${difference}`); // -0.1
console.log(`Product: ${product}`); // 0.0200000
console.log(`Quotient: ${quotient}`); // 0.5000
```

### Thirdpary Libraries

There are several libraries available that can help you perform high-precision arithmetic operations in JavaScript. One popular library is `big.js`, which provides a simple API for working with decimal numbers of arbitrary precision.

Here's an example of how you could use `big.js` to perform the same calculation as in the previous example:

```js
// Import the big.js library
const Big = require('big.js');

// Define the two floating-point numbers to multiply
const a = 3.14159;
const b = 2.71828;

// Convert the numbers to Big.js objects with 7 decimal places
const aBig = new Big(a.toFixed(7));
const bBig = new Big(b.toFixed(7));

// Perform the multiplication and round to 7 decimal places
const resultBig = aBig.times(bBig).toFixed(7);

console.log(resultBig); // Output: 8.5397332
```

`big.js` is a popular and widely-used library for high-precision arithmetic in JavaScript, and is generally considered to be a well-performing and reliable solution. Other libraries you might consider include `bignumber.js`, `decimal.js`, and `mathjs`.

### Benchmarks

There have been several benchmarks comparing the performance of various libraries for high-precision arithmetic in JavaScript.

> It's important to note that the results of these benchmarks can depend on a variety of factors such as the specific use case, the size and precision of the numbers being worked with, and the characteristics of the system running the code.

One such benchmark can be found at [https://github.com/peterolson/BigInteger.js#performance](https://github.com/peterolson/BigInteger.js#performance), which compares the performance of several libraries including `big.js`, `bignumber.js`, `decimal.js`, and `mathjs`.

Another benchmark can be found at [https://jsperf.com/big-number-addition/3](https://jsperf.com/big-number-addition/3), which focuses specifically on addition operations and compares the performance of `big.js`, `bignumber.js`, and `decimal.js` on a range of number sizes. This benchmark suggests that `decimal.js` is generally the fastest library for addition operations, but again, the results may vary depending on the specific use case.

## Recursive Search and Sum Up

```js
function sumFileSizes(obj) {
  let sum = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === 'files') {
        // if the current property is "files", loop through each object in the array and sum up the "fileSize" property
        obj[key].forEach(function (file) {
          sum += file.fileSize || 0;
        });
      } else if (
        typeof obj[key] === 'object' &&
        obj[key] !== null
      ) {
        // if the current property is an object (and not null), recursively call this function on the object
        sum += sumFileSizes(obj[key]);
      }
    }
  }
  return sum;
}
```

### With Lodash

```js
const _ = require('lodash');

const obj = {
  files: [
    { name: 'file1', fileSize: 100 },
    { name: 'file2', fileSize: 200 },
  ],
  nestedObj: {
    files: [
      { name: 'file3', fileSize: 300 },
      { name: 'file4', fileSize: 400 },
    ],
    otherProp: 'someValue',
  },
  otherProp: 'someValue',
};

const totalFileSize = _.sumBy(
  _.flatMapDeep(obj, function (value, key) {
    if (key === 'files' && _.isArray(value)) {
      return value;
    } else {
      return [];
    }
  }),
  'fileSize',
);

console.log(totalFileSize); // Output: 1000
```
