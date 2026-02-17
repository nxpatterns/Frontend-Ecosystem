/*
* Every object has a toString() method that is automatically
* called when the object is to be represented as a text value
* or when an object is referred to in a manner in which a
* string is expected. By default, the toString() method is
* inherited by every object descended from Object. If this
* method is not overridden in a custom object, toString()
* returns "[object type]", where type is the object type.
* The following code illustrates this:
* */

var o = { foo: 'bar' };
console.log(o.toString()); // [object Object]

// USING toString() TO DETECT OBJECT CLASS

var toString = Object.prototype.toString;

console.log(
  toString.call(new Date()), // [object Date]
 
  // Do not use String as a constructor. (W053)
  /*jshint -W053 */
  toString.call(new String()), // [object String]

  toString.call(Math), // [object Math]
  toString.call(0), // [object Number]
  toString.call(undefined), // [object Undefined]
  toString.call(null), // [object Null]
  toString.call(NaN) // [object Number]
);
