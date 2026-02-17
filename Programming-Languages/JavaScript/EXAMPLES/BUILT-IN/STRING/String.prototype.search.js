/*
* When you want to know whether a pattern is found
* and also its index in a string use search()
* (if you only want to know if it exists, use the similar
* test() method on the RegExp prototype, which
* returns a boolean); for more information (but slower
* execution) use match() (similar to the regular
* expression exec() method).
* */

var str = "somEthing";
//         ---^-----
//         0--3-----

var re = /[A-Z]/g;

console.log (
    str.search(re),     // 3
);