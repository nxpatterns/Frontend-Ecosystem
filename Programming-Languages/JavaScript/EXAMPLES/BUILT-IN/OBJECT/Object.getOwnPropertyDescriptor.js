/*
 The Object.getOwnPropertyDescriptor() method returns a property
 descriptor for an own property (that is, one directly present
 on an object and not in the object's prototype chain)
 of a given object.
*/

var o = { get foo() { return 17; } };
console.log(Object.getOwnPropertyDescriptor(o, 'foo'));

/*
 { get: [Function: get foo],
   set: undefined,
   enumerable: true,
   configurable: true }
*/

console.log(o); // { foo: [Getter] }

console.log('---------------------------------------');

var p = { foo: '0815'};
console.log(Object.getOwnPropertyDescriptor(p, 'foo'));
/*
 { value: '0815',
   writable: true,
   enumerable: true,
   configurable: true }
*/
console.log(p); // { foo: '0815' }