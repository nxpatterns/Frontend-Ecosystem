var pi = new String(Math.PI);
var pi2 = "3.14";
console.log(
    parseFloat(pi), // 3.141592653589793
    parseFloat(pi2), // 3.141592653589793
    typeof (pi),    // 'object'
    typeof (pi2),    // 'string'
    typeof (parseFloat(pi)), // number
    typeof (parseFloat(pi2)), // number
);