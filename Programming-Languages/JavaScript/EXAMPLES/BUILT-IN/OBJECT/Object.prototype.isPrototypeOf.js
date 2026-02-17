// see also the comparison between
// Object.getPrototypeOf and Object.prototype.isPrototypeOf

var p = {foo: 'bar'};
var o = Object.create(p);

console.log(
    p.isPrototypeOf(o), // true
    Object.getPrototypeOf(o) === p   // true
);




console.log ();