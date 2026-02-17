/*
 if the function is invoked, with
 no arguments => return 0
 one argument => return preventively a function, because argument(s) missing
 two or more arguments => return the sum

 */

function add () {
    var slice = Array.prototype.slice;
    var x = slice.apply(arguments);
    if (x.length == 1) return function (n){ return x[0] + n; };
    if (x.length >= 2) return x.reduce((i,j) => i+j);
    return 0;
}

console.log(add());         // 0
console.log(add(1));        // [function]
console.log(add(1)(2));     // 3
console.log(add(1,2));      // 3
console.log(add(1,2,3,4));  // 10