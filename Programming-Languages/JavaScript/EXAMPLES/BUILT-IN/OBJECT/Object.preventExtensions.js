/*
* An object is extensible if new properties can be
* added to it. Object.preventExtensions() marks an
* object as no longer extensible, so that it will
* never have properties beyond the ones it had at
* the time it was marked as non-extensible. Note
* that the properties of a non-extensible object,
* in general, may still be deleted. Attempting to
* add new properties to a non-extensible object will
* fail, either silently or by throwing a TypeError
* (most commonly, but not exclusively, when in strict
* mode). Object.preventExtensions() only prevents
* addition of own properties. Properties can still be
* added to the object prototype. There is no way to
* make an object extensible again once it has been
* made non-extensible.
* */

var o1 = {foo: 'bar'};
console.log (Object.isExtensible(o1)); // true
var o2 = Object.preventExtensions(o1);

console.log(o1 === o2); // true
console.log (Object.isExtensible(o1)); // false
console.log (Object.isExtensible(o2)); // false