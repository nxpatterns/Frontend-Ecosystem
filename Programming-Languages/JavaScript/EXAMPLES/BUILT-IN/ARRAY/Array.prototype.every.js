function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var arr1 = [2,3,4,'Hallo',5,6];
var arr2 = [2,3,4,5,6,'7'];

// ES6 Syntax - short pattern
console.log(arr1.every(isNumeric)); // false
console.log(arr2.every(isNumeric)); // true
