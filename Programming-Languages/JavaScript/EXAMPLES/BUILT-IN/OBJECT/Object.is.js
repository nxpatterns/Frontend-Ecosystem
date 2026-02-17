/*
* The Object.is() method determines whether
* two values are the same value.
*
* Syntax: Object.is(value1, value2);
*
* */
console.log (
    Object.is(3,5),         // false
    Object.is(3,3),         // true
    Object.is('',false),    // false
    Object.is("",false),    // false
    Object.is(0,0),         // true
    Object.is(+0,-0),       // false
    +0 == -0,               // true --> Object.is --> false see above
    +0 === -0,              // true --> Object.is --> false see above
    Object.is(-0,-0),       // true
    Object.is(NaN,NaN),     // true
    NaN == NaN,             // false
    NaN === NaN,            // false
);