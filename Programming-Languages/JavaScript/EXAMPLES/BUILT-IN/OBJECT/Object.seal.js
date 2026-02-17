/*
* The Object.seal() method seals an object, preventing
* new properties from being added to it and marking all
* existing properties as non-configurable. Values of
* present properties can still be changed as long as
* they are writable.
* */

var o = {age: 20};



console.log (
    Object.getOwnPropertyDescriptors(o),
    Object.seal(o),
    Object.getOwnPropertyDescriptors(o),
);

/*
 { age:
    { value: 20,
      writable: true,
      enumerable: true,
      configurable: true --> seal --> false
    }
 }
*/