console.log (
    Number.isInteger(3),            // true
    Number.isInteger(null),         // false
    Number.isInteger(undefined),    // false
    Number.isInteger(NaN),          // false
    Number.isInteger(0),            // true
    Number.isInteger(-0),           // true
    Number.isInteger(Infinity),     // false
    Number.isInteger(-Infinity),    // false
    Number.isInteger('0'),          // false
);