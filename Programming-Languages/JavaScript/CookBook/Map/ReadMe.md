# Map

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Storing an array of unique objects](#storing-an-array-of-unique-objects)
- [Fixing double and corrupt data](#fixing-double-and-corrupt-data)
- [Further Questions](#further-questions)
  - [Which props and methods do JS Map and Set have?](#which-props-and-methods-do-js-map-and-set-have)
  - [What is the difference between Map and Set?](#what-is-the-difference-between-map-and-set)
  - [What is the difference between Map and WeakMap?](#what-is-the-difference-between-map-and-weakmap)
  - [What is the difference between Set and WeakSet?](#what-is-the-difference-between-set-and-weakset)
  - [What is the difference between Map and Object?](#what-is-the-difference-between-map-and-object)
  - [What is the difference between Set and Array?](#what-is-the-difference-between-set-and-array)

<!-- /code_chunk_output -->

## Storing an array of unique objects

```ts
const planets = [
  { id: 1, name: 'Merkur' },
  { id: 2, name: 'Venus' },
  { id: 3, name: 'Earth' },
  { id: 2, name: 'Venus' }, // duplicate ID
  { id: 4, name: 'Mars' },
];

const uniquePlanetsMap = new Map();

planets.forEach((planet) => {
  uniquePlanetsMap.set(planet.id, planet);
});

console.log(uniquePlanetsMap.size); // 4, since the duplicate was removed

const merkur = uniquePlanetsMap.get(1);
console.log(merkur);

console.log(uniquePlanetsMap.has(2)); // true
console.log(uniquePlanetsMap);

/* Output:
Map(4) {
  1 => { id: 1, name: 'Merkur' },
  2 => { id: 2, name: 'Venus' },
  3 => { id: 3, name: 'Earth' },
  4 => { id: 4, name: 'Mars' }
}
*/

console.log(Array.from(uniquePlanetsMap));

/* Output:
[
  [ 1, { id: 1, name: 'Merkur' } ],
  [ 2, { id: 2, name: 'Venus' } ],
  [ 3, { id: 3, name: 'Earth' } ],
  [ 4, { id: 4, name: 'Mars' } ]
]
*/

console.log(Array.from(uniquePlanetsMap.values()));

/* Output:
[
  { id: 1, name: 'Merkur' },
  { id: 2, name: 'Venus' },
  { id: 3, name: 'Earth' },
  { id: 4, name: 'Mars' }
]
*/
```

## Fixing double and corrupt data

```js
const planets = [
  { id: 1, name: 'Merkur' },
  { id: 4, name: 'Mars' }, // <- double entry
  { id: 2, name: 'Venus' },
  { id: 3, name: 'Earth' }, // <- double & corrupt entry
  { id: 33, name: 'Earth' }, // <- double & corrupt entry
  { id: 333, name: 'Earth' }, // <- double & corrupt entry
  { id: 4, name: 'Mars' }, // <- double entry
];

const correctIds = {
  Earth: 3, // <- correct id for Earth
};

const uniquePlanetsMap = new Map();

planets.forEach((planet) => {
  if (
    planet.name === 'Earth' &&
    planet.id !== correctIds['Earth']
  ) {
    planet.id = correctIds['Earth'];
  }
  uniquePlanetsMap.set(planet.id, planet);
});

console.log(Array.from(uniquePlanetsMap.values()));
```

## Further Questions

### Which props and methods do JS Map and Set have?

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map>
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set>

### What is the difference between Map and Set?

Both `Map` and `Set` are built-in data structures in JavaScript that allow you to store collections of values. However, they have some key differences in their behavior:

- `Map` stores a collection of key-value pairs, while `Set` stores a collection of unique values.
- In a `Map`, each key can only occur once. If you add a key-value pair to a `Map` that already has that key, it will overwrite the existing value for that key. In contrast, in a `Set`, each value can only occur once, and if you try to add a value to a `Set` that already exists in the `Set`, it will be ignored.
- `Map` allows any value to be used as a key, whereas in a `Set`, the values themselves are used as the keys.
- `Map` has methods to get, set, and delete individual key-value pairs, while `Set` only has methods to add, delete, and check for the presence of individual values.

Here is an example that shows the difference between `Map` and `Set`:

```js
const myMap = new Map();
myMap.set('a', 1);
myMap.set('b', 2);
myMap.set('a', 3); // overwrites the value for 'a'
console.log(myMap.values());

/* Output:
{ 3, 2 }  // 'a' is overwritten and the result is sorted
*/

const mySet = new Set();
mySet.add('a');
mySet.add('b');
mySet.add('a'); // duplicate value, ignored
console.log(mySet.values());

/* Output:
{ 'a', 'b' } // 'a' is overwritten and the result is sorted
*/
```

### What is the difference between Map and WeakMap?

Both `Map` and `WeakMap` are collections in JavaScript, but they have some differences in terms of functionality and memory management.

Here are some key differences:

- **Garbage collection**: In a `Map`, all keys and values are strong references, meaning they will not be garbage collected until the entire `Map` object is destroyed. In a `WeakMap`, keys are weak references, meaning they can be garbage collected if there are no other strong references to them.
- **Keys**: In a `Map`, keys can be any type, including objects, while in a `WeakMap`, keys must be objects. This is because the keys in a `WeakMap` are used as weak references to other objects.
- **Iteration**: A `Map` can be iterated using `forEach`, `for...of`, or the `entries`, `keys`, or `values` methods. A `WeakMap` does not provide any iteration methods, because the keys may be removed at any time due to garbage collection.
- **Size**: A `Map` keeps track of its size, which can be retrieved using the `size` property. A `WeakMap` does not keep track of its size, because the number of keys may change due to garbage collection.
- **Performance**: In general, a `Map` is faster than a `WeakMap`, because it does not have the overhead of weak references and garbage collection.

Overall, a `Map` is more flexible and easier to use, while a `WeakMap` is useful for certain specialized cases where you want to store data with weak references to other objects.

```js
// Using Map
const map = new Map();
const key = { id: 1 };
map.set(key, 'value');

// Using WeakMap
const weakMap = new WeakMap();
const weakKey = { id: 2 };
weakMap.set(weakKey, 'value');

// Deleting the original reference to the key
key = null;
weakKey = null;

// Trying to get the values using the original keys
console.log(map.get(key)); // 'value'
console.log(weakMap.get(weakKey)); // undefined
```

### What is the difference between Set and WeakSet?

### What is the difference between Map and Object?

### What is the difference between Set and Array?
