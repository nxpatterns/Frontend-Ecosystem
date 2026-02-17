/*
* This method returns a string and not a String object.

 Because fromCharCode() is a static method of String,
 you always use it as String.fromCharCode(), rather
 than as a method of a String object you created.
*
* */

console.log (
    String.fromCharCode(65, 66, 67)  // "ABC"
);