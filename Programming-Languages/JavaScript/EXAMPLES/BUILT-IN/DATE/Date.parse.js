var t1 = Date.parse("10.02.2010");
var t2 = Date.parse("10/02/2010");
var t3 = Date.parse("2010/02/10");
var t4 = Date.parse("2010, 10. FEB");

console.log (
    '\n'+ new Date(t1), // Sat Oct 02 2010 00:00:00 GMT+0200 (CEST)
    '\n'+ new Date(t2), // Sat Oct 02 2010 00:00:00 GMT+0200 (CEST)
    '\n'+ new Date(t3), // Wed Feb 10 2010 00:00:00 GMT+0100 (CET)
    '\n'+ new Date(t4), // Wed Feb 10 2010 00:00:00 GMT+0100 (CET)
);