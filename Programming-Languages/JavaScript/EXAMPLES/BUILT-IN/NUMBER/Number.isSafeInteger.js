console.log(
    Number.isSafeInteger(Infinity),     // false
    Number.isSafeInteger(0),            // true
    Number.isSafeInteger(1/0),          // false
    Number.isSafeInteger(1e253),        // false
    Number.isSafeInteger(1.2),          // false -> float
);