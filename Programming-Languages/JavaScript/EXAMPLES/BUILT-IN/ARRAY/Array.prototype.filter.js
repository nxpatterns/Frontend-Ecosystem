var values = [30,10,20,40,0];

// ES5 Version
function greaterThen20 (value) {
    return value > 20;
}

const result = values.filter(greaterThen20);
console.log(result); // [ 30, 40 ]

//ES6 Version is very short
const resultNew = values.filter(el => el > 20);
console.log(resultNew); // [ 30, 40 ]
