const array1 = [1, 2, 3, 4];
const reducer = function (accumulator, currentValue) {
    return accumulator + currentValue;
}

console.log(array1.reduce(reducer));
// 1 + 2 + 3 + 4 = 10

console.log(array1.reduce(reducer, 5));
// 5 + 1 + 2 + 3 + 4 = 15