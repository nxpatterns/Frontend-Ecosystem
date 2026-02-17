/*
* The slice() method extracts a section of a string and
* returns it as a new string.
*
* Syntax: str.slice(beginIndex[, endIndex])
*
* slice() extracts the text from one string and returns a
* new string. Changes to the text in one string do not
* affect the other string.

 slice() extracts up to but not including endIndex.
 str.slice(1, 4) extracts the second character through
 the fourth character (characters indexed 1, 2, and 3).

 As an example, str.slice(2, -1) extracts the third
 character through the second to last character in the string.

* */

var str = "One or two words"
console.log (
    str.slice(0,3),     // One
    str.slice(-5,-1),     // word
    str.slice(-5),     // words
    str.slice(0,-5),     // One or two
);