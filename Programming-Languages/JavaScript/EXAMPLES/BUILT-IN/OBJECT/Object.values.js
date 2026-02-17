var myObject = {
    d: new Date(),
    n: Math.PI,
    j: 0,
    b: true
};

console.log (
    Object
        .values(myObject)
        .join('\n'),
);

/*
 Sat Jan 06 2018 18:21:04 GMT+0100 (CET)
 3.141592653589793
 0
 true
*/