console.log (
Number.isFinite(Infinity) + '\n',  // false
Number.isFinite(NaN) + '\n',       // false
Number.isFinite(-Infinity) + '\n', // false
Number.isFinite(0) + '\n',         // true
Number.isFinite(2e40) + '\n',      // true
Number.isFinite('0') + '\n',       // false
Number.isFinite(null) + '\n',      // false

    // ATTENTION Global isFinite
    // Different behaviour
    isFinite(null) + '\n',         // true
    isFinite(0) + '\n',            // true
    isFinite('0') + '\n',          // true

);