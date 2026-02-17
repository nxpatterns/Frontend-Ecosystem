/*
 * The split() method splits a String object into an
 * array of strings by separating the string into
 * substrings, using a specified separator string to
 * determine where to make each split.
 *
 * Syntax: str.split([separator[, limit]])
 *
 * If an empty string ("") is used as the separator,
 * the string is split between each character.
 * */

var str = 'one or two words';
var emtpyString = '';

console.log(
  str.split(' '), // [ 'one', 'or', 'two', 'words' ]
  emtpyString.split(''), // []
  emtpyString.split(), // ['']
);

// REVERSING A STRING USING split()

var reverseMe = '1aibew@';

console.log(
  reverseMe.split('').reverse().join(''), //@webia1
);

// MULTIPLE SEPATATORS

const numbersString = 'one two,three,four;five';
//------------------------^---^-----^----^------
const separators = [',', ' ', ';'];
// METHODE 1
const numbers1 = str.split(new RegExp(separators.join('|'), 'g'));
// METHODE 2
const numbers2 = str.split(/[, ;]/g); // q: please learn this and memorize it

console.log(numbers1);
console.log(numbers2);
