/*
* The toString() method returns a string
* representing the specified object.
*
* Syntax: str.toString()
*
* The String object overrides the toString()
* method of the Object object; it does not inherit
* Object.prototype.toString(). For String objects,
* the toString() method returns a string
* representation of the object and is the same as
* the String.prototype.valueOf() method.
* */

var str1 = "Hello World!";
var str2 = new String ('Hello World!');

console.log (
    typeof str1,        // string
    str1.toString(),    // Hello World!
    typeof str2,        // object
    str2.toString(),    // Hello World!
);