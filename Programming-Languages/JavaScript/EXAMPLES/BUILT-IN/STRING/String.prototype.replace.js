/*
* The replace() method returns a new string with some
* or all matches of a pattern replaced by a replacement.
* The pattern can be a string or a RegExp, and the
* replacement can be a string or a function to be called
* for each match.
*
* syntax: str.replace(regexp|substr, newSubstr|function)
*
* see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
*
* */

var wrong = 'a WRong word';
var right = wrong.replace(/wrong/i, 'right');

console.log (
    wrong, // a WRong word
    right, // a right word
);