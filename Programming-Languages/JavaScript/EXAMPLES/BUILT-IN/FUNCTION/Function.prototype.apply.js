// foo.apply(thisArg, [argsArray])
// The result of calling the function with the specified this value and arguments.

// Example1 apply()
var numbers = [3,13,1,19];
var max = Math.max.apply(null, numbers);
console.log (max);

var obj = {
    num: 12
};

// Example 2 apply() vs. call()

// var addTo = n => this.num + n; // does not work
var addTo = function (n) {
    return this.num + n;
};

var someNumber = 2;

var x = addTo.call(obj,someNumber);
console.log (obj.num); // 12
console.log (x); // 12

// For using "apply" we need an Array
var someNumberArray = someNumber.toString().split("").map(Number);

var y = addTo.apply(obj,someNumberArray);
console.log (obj.num); // 12
console.log (y); // 12


