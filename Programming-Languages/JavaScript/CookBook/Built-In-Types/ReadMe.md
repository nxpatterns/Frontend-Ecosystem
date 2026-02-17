# Built-In Types

```js
const a = 'myString1';
const b = new String('myString2');

console.log(typeof a === 'string'); // true
console.log(typeof b === 'string'); // false

const type_a = Object.prototype.toString.call(a); // [object String]
const type_b = Object.prototype.toString.call(b); // [object String]

const allTypes_viaObjectPrototypeToStringCall = [
  '[object Undefined]',
  '[object Null]',
  '[object Boolean]',
  '[object Number]',
  '[object String]',
  '[object Symbol]',
  '[object Object]',
  '[object Function]',
  '[object Array]',
  '[object Date]',
  '[object RegExp]',
  '[object Error]',
  '[object Promise]',
  '[object Map]',
  '[object Set]',
  '[object WeakMap]',
  '[object WeakSet]',
  '[object ArrayBuffer]',
  '[object SharedArrayBuffer]',
  '[object DataView]',
  '[object Int8Array]',
  '[object Uint8Array]',
  '[object Uint8ClampedArray]',
  '[object Int16Array]',
  '[object Uint16Array]',
  '[object Int32Array]',
  '[object Uint32Array]',
  '[object Float32Array]',
  '[object Float64Array]',
  '[object BigInt64Array]',
  '[object BigUint64Array]',
];

console.log(b instanceof Array); // false
console.log(b instanceof ArrayBuffer); // false
console.log(b instanceof Boolean); // false
console.log(b instanceof Buffer); // false
console.log(b instanceof DataView); // false
console.log(b instanceof Date); // false
console.log(b instanceof Error); // false
console.log(b instanceof Float32Array); // false
console.log(b instanceof Float64Array); // false
console.log(b instanceof Function); // false
console.log(b instanceof Int16Array); // false
console.log(b instanceof Int32Array); // false
console.log(b instanceof Int8Array); // false
console.log(b instanceof Map); // false
console.log(b instanceof Number); // false
console.log(b instanceof Object); // true <-- this is true for all objects
console.log(b instanceof Promise); // false
console.log(b instanceof RegExp); // false
console.log(b instanceof Set); // false
console.log(b instanceof String); // true <-- String
console.log(b instanceof Symbol); // false
console.log(b instanceof Uint16Array); // false
console.log(b instanceof Uint32Array); // false
console.log(b instanceof Uint8Array); // false
console.log(b instanceof Uint8ClampedArray); // false
console.log(b instanceof WeakMap); // false
console.log(b instanceof WeakSet); // false

console.log(b instanceof clearImmediate); // false
console.log(b instanceof clearInterval); // false
console.log(b instanceof clearTimeout); // false
console.log(b instanceof queueMicrotask); // false
console.log(b instanceof require); // false
console.log(b instanceof setImmediate); // false
console.log(b instanceof setInterval); // false
console.log(b instanceof setTimeout); // false
```
