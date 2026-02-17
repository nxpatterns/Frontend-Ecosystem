/*
* Warning: Changing the [[Prototype]] of an
* object is, by the nature of how modern JavaScript
* engines optimize property accesses, a very slow
* operation, in every browser and JavaScript engine.
*
* f you care about performance you should avoid
* setting the [[Prototype]] of an object. Instead,
* create a new object with the desired [[Prototype]]
* using Object.create().
*
* Syntax: Object.setPrototypeOf(obj, prototype);
*
* */
var o = Object.setPrototypeOf({}, Date);
var n = Object.setPrototypeOf(0, Number);


console.log (
    Object.getPrototypeOf(o),  // [Function: Date]
    o.now(), // current time stamp
    Object.getPrototypeOf(n), // [Number: 0]

);