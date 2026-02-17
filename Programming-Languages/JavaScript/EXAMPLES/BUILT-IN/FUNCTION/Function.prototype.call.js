// Example apply() vs. call()

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


