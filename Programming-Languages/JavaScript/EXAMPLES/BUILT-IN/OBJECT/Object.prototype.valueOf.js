/*
* The valueOf() method returns the primitive value of
* the specified object.
* EBIA: see toString(), like there: meant to be overwritten
 * */

var o = { foo: 1};
var p = { valueOf: function(){ return 'Hi!';}};
var n = 1;

console.log (
    o.valueOf(),    // { foo: 1 }
    p.valueOf(),    // 'Hi!'
    n.valueOf(),    // 1
);