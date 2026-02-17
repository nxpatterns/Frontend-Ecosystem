var arr = ['ONE','TWO','THREE'];
var iterator = arr.keys();

console.log(iterator);  // {}
console.log(iterator.next());  // { value: 0, done: false }
console.log(iterator.next());  // { value: 1, done: false }
console.log(iterator.next());  // { value: 2, done: false }
console.log(iterator.next());  // { value: undefined, done: true }

console.log(Object.keys(arr));  // [ '0', '1', '2' ]

// ES6 spread operator . . .
console.log([...arr.keys()]);   // [ 0, 1, 2 ]
