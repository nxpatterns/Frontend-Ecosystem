var n = 0.2345;
var j = 3.2345;
// precision between 1 and 100
console.log(
    n.toPrecision(),   // "0.2345"
    n.toPrecision(1),  // "0.2"
    n.toPrecision(2),  // "0.23"
    n.toPrecision(3),  // "0.234" <-- ROUND DOWN
    n.toPrecision(4),  // "0.2345"
    n.toPrecision(5),   // "0.23450"

    j.toPrecision(),   // "3.2345"
    j.toPrecision(1),  // "3.2"
    j.toPrecision(2),  // "3.23"
    j.toPrecision(3),  // "3.235" <-- ROUND UP
    j.toPrecision(4),  // "3.2345"
    j.toPrecision(5)   // "3.23450"
);