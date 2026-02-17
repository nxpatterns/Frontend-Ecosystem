// Syntax: str.match(regexp)

var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-C]/gi;
var matches_array = str.match(regexp);

console.log (
    matches_array, // [ 'A', 'B', 'C', 'a', 'b', 'c' ]
);

