/*
* The substr() method returns the characters in a
* string beginning at the specified location through
* the specified number of characters.
* */

var str = "Hello World!";
console.log (
    '\n'+ str.substr(0,5),       // Hello
    '\n'+ str.substr(-6),        // World!
    '\n'+ str.substr(-2),        // d!
    '\n'+ str.substr(-2,1),      // d
);

// COMPARISON TO slice()
// "Hello World!";
console.log (
    '\n'+ "-----------",
    '\n'+ str.slice(0,5),    // Hello
    '\n'+ str.slice(-6),     // World!
    '\n'+ str.slice(-2),     // d!
    '\n'+ str.slice(-2,1),   // NOT AVAILABLE
);

// COMPARISON TO substring() (UNEXPECTED BEHAVIOR)
// "Hello World!";
console.log (
    '\n'+ str.substring(0,5), // Hello
    '\n'+ str.substring(-6),  // Hello World!
    '\n'+ str.substring(-2),  // Hello World!
    '\n'+ str.substring(-2,1) // H
);

// CONCLUSION use substr()