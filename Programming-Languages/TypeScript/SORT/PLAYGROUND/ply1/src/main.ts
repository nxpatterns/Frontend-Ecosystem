import { strict as assert } from 'assert';

assert.notStrictEqual(1, '1');
assert.throws(() => eval('null.nothing'), TypeError);
assert.deepStrictEqual(
  [...['a', 'b'], ...['c', 'd']],
  ['a', 'b', 'c', 'd'],
);

const obj = { foo: { baz: { bar: '2019' } }, bar: '2018' };

console.log(Object.entries(obj));
console.log(Object.values(obj));
console.log(Object.keys(obj));

let o = { age: 20 };

console.log(Object.getOwnPropertyDescriptors(o));

Object.seal(o); //?

console.log(Object.getOwnPropertyDescriptors(o));
