var arr = ['JAN','FEB','MAR','APR'];
// slice FROM Index [TO Index]

var sliceResult = arr.slice(1,2);
console.log(sliceResult);    // [ 'FEB' ]

var sliceResult = arr.slice(1,3);
console.log(sliceResult);    // [ 'FEB', 'MAR' ]

var sliceResult = arr.slice(1,1);
console.log(sliceResult);    // [ ]

var sliceResult = arr.slice(1);
console.log(sliceResult);      // [ 'FEB', 'MAR', 'APR' ]

var sliceResult = arr.slice(); // Copying Array (Independent)
console.log(sliceResult);      // [ JAN, 'FEB', 'MAR', 'APR' ]

console.log(arr); // [ 'JAN', 'FEB', 'MAR', 'APR' ]

arr.push('MAY');
console.log(arr,sliceResult);

