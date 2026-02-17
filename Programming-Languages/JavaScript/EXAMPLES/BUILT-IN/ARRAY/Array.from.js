//@ts-check

var a = Array.from('foo');
console.log(a); // [ 'f', 'o', 'o' ]

function returnArrayFromArgs () {
    return Array.from(arguments);
}

var result = returnArrayFromArgs(1,2,4,'hallo',true,{a: 2});
console.log(result); // [ 1, 2, 4, 'hallo', true, { a: 2 } ]

var x = [9,25];
result = Array.from (x,Math.sqrt);
console.log(result); // [ 3, 5 ]

x = [3,5];
result = Array.from (x,x => x*x);
console.log(result); // [ 9, 25 ]

var n = 3;
console.log(Array.from(n)); // []