/*
* The toLocaleString() method returns a string representing
* the object. This method is meant to be overridden by
* derived objects for locale-specific purposes.
* */

const myBirthDay = new Date(Date.UTC(2017,10,11));
const pi = Math.PI;
console.log (
    myBirthDay, // 2017-11-11T00:00:00.000Z
    myBirthDay.toLocaleString('de-DE'), // '11.11.2017, 01:00:00'
    pi, // 3.141592653589793
    pi.toLocaleString('de-DE'), // '3,142'
);