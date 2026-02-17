/*
* It is strongly recommended that assignment operators
* (+, +=) are used instead of the concat() method.
* See this performance test:
* http://jsperf.com/concat-vs-plus-vs-join
 * */

var hello = 'Hello, ';
console.log(hello.concat('World', '. Have a nice day.'));
// Hello, World. Have a nice day.

var greetList = ['Hello', ' ', 'World', '!'];
var result = "".concat(...greetList);

console.log(result); // Hello World!
