/*
* The decodeURI() function decodes a Uniform Resource
* Identifier (URI) previously created by encodeURI or
* by a similar routine.
* */

var uri = 'https://mozilla.org/?x=шеллы';
var encodedUri = 'https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B';

// if already encoded, decodeUri does not do anything

console.log (
    decodeURI(uri),  // https://mozilla.org/?x=шеллы
    decodeURI(encodedUri),  // https://mozilla.org/?x=шеллы
    decodeURIComponent(uri), // // https://mozilla.org/?x=шеллы
    decodeURIComponent(encodedUri), // // https://mozilla.org/?x=шеллы
    encodeURI(uri),  // https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
    encodeURIComponent(uri), // https%3A%2F%2Fmozilla.org%2F%3Fx%3D%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
);
