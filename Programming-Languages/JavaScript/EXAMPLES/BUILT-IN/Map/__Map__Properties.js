const MapStdProps = ['length', 'name', 'prototype'];

// get Map[@@species]
// Map.prototype[@@toStringTag]
// Map.prototype.size

/**

Details: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@species

 * Species in ordinary objects
 * The species property returns the default constructor function,
 * which is the Map constructor for Map objects:

Map[Symbol.species]; // function Map()

* Species in derived objects
* In a derived collection object (e.g. your custom map MyMap),
the MyMap species is the MyMap constructor.
However, you might want to overwrite this, in order to return parent
Map objects in your derived class methods:

class MyMap extends Map {
  // Overwrite MyMap species to the parent Map constructor
  static get [Symbol.species]() { return Map; }
}

 */

const map1 = Object.prototype.toString.call(new Map());

console.log(map1);
// expected output: "[object Map]"
