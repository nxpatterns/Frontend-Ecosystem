const someArr = [3, 4, 5, 7, 9];

const immutableDelete = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

const result = immutableDelete(someArr, 1);

console.log('Result: ', result); // [3, 5, 7, 9]
console.log('Original Array: ', someArr); // [3, 4, 5, 7, 9];
