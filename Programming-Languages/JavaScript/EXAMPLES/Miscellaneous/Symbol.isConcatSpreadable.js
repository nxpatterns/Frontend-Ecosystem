var foo = [1, 2, 3];
var bar = { // fake array
    length: 2,
    0: 'hello',
    1: 'world'
};

console.log (
    foo.concat(bar),    // [ 1, 2, 3, { '0': 'hello', '1': 'world', length: 2 } ]
);

bar[Symbol.isConcatSpreadable] = true;

console.log (
    foo.concat(bar),    // [ 1, 2, 3, 'hello', 'world' ]
);

