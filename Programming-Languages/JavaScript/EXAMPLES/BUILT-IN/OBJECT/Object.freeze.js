/*
 The Object.freeze() method freezes an object:
 that is, prevents new properties from being added to it;
 prevents existing properties from being removed;
 and prevents existing properties, or their enumerability,
 configurability, or writability, from being changed,
 it also prevents the prototype from being changed.

 The method returns the object in a frozen state.
*/

var obj = {
    prop: function() {},
    foo: 'bar'
};

// It is unnecessary to save the
// returned object in order to freeze the original.

var o = Object.freeze(obj);
o === obj; // true
Object.isFrozen(obj); // === true

// FREEZING ARRAYS

let a = [0];
Object.freeze(a); // The array cannot be modified now.

a[0] = 1;
console.log(a); // [ 0 ]

// IMPORTANT
/*
 The object being frozen is immutable.  However, it is not
 necessarily constant. The following example shows that
 a frozen object is not constant (freeze is shallow).

 See details online: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

*/

