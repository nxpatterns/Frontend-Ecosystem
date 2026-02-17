var arr = ['one', 'two', 3];

var toStringResult = arr.toString();
var joinResult = arr.join();

console.log (toStringResult); // one,two,3
console.log (joinResult); // one,two,3

console.log (toStringResult == joinResult);  // true
console.log (toStringResult === joinResult); // true
