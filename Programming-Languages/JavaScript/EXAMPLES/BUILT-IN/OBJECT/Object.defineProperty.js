// see Object.defineProperties.js
// the same one in single way
// see details online https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty


var o = {}; // Creates a new object

Object.defineProperty(o, 'a', {
    value: 37,
    writable: false
});

