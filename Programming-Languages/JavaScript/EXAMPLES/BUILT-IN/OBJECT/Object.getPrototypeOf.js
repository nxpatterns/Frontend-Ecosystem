var p = {foo: 'bar'};
var o = Object.create(p);
console.log(Object.getPrototypeOf(o)); // { foo: 'bar' }
console.log(Object.getPrototypeOf(o) === p); // true


// Own Experiment

function Foo () {}
bar = new Foo();

console.log(Object.getPrototypeOf(bar)); // Foo {}
