var a = ['a', 'b', 'c'];
var iterator = a.entries();

console.log(iterator.next().value); // [0, 'a']
console.log(iterator.next().value); // [1, 'b']
console.log(iterator.next().value); // [2, 'c']

// SECOND EXAMPLE

var b = ['a', 'b', 'c'];
var iterator = b.entries();

console.log(iterator.next()); // { value: [ 0, 'a' ], done: false }
console.log(iterator.next()); // { value: [ 1, 'b' ], done: false }
console.log(iterator.next()); // { value: [ 2, 'c' ], done: false }
console.log(iterator.next()); // { value: undefined, done: true }