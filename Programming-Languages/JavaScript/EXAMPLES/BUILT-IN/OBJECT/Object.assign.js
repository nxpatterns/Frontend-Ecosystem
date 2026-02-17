/* Syntax: Object.assign(target, ...sources)
 The Object.assign() method is used to copy the
 values of all enumerable own properties from one
 or more source objects to a target object.
 It will return the target object.

 Properties in the target object will be overwritten
 by properties in the sources if they have the same key.
 Later sources' properties will similarly overwrite
 earlier ones.

 See here: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript

*/

// Cloning an object
var obj = { a: 1, b: {c: [2,{x: 'y'}]}};
var copy = Object.assign({}, obj);
console.log(copy);
// { a: 1, b: { c: [ 2, [Object] ] } }

// Deep Cloning better with
var copy2 = JSON.parse(JSON.stringify(obj));

copy2.b.c[0] = 3;
console.log(obj);
console.log(copy2);

// Merging objects
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 },
// target object 'o1' itself is changed.


// EXCEPTIONS WILL INTERRUPT THE ONGOING COPYING TASK

var target = Object.defineProperty({}, 'foo', {
    value: 1,
    writable: false
}); // target.foo is a read-only property

// Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
// TypeError: Cannot assign to read only property 'foo' of object '#<Object>'
// The Exception is thrown when assigning target.foo





