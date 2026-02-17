function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var arr = ['existing', 'a', 'numeric', 'value', 7];

// ES6 Syntax - short pattern
console.log(arr.some(isNumeric)); // true
