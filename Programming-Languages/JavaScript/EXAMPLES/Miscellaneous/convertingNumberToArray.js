var n = 0;
var m = 1234;

function numToArray (num) {
    return Array.from(num.toString()).map(Number);
}

console.log(numToArray(n)); // [ 0 ]
console.log(numToArray(m)); // [ 1, 2, 3, 4 ]