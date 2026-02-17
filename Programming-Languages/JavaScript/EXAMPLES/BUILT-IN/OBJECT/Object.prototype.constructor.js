var obj = {}, arr = [], num = 3;
console.log (
    obj.constructor,                  // [Function: Object]
    arr.constructor,                  // [Function: Array]
    num.constructor,                  // [Function: Number]
    obj.constructor === Object,       // true
    arr.constructor === Array,        // true
    num.constructor === Number,       // true

);

function Foo (x) { this.x = x };
var bar = new Foo('Hi');

console.log (
    Foo.constructor,        // [Function: Function]
    "" + Foo.constructor,   // 'function Function() { [native code] }'
    bar.constructor,        // [Function: Foo]
    ""+bar.constructor,     // 'function Foo(x) { this.x = x }'
    bar,                    // Foo { x: 'Hi' }
);





