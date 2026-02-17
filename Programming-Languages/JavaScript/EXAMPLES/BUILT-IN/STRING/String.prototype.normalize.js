/*
* str.normalize([form])
* One of "NFC", "NFD", "NFKC", or "NFKD", specifying the Unicode Normalization Form.
* If omitted or undefined, "NFC" is used.
*
* The normalize() method returns the specified Unicode Normalization Form of the string.
* It does not affect the value of the string itself.
*
* */


var cafe4= 'caf\u00E9';
var cafe5= 'cafe\u0301';


console.log (
    cafe4+' '+cafe4.length,       // café 4
    cafe5+' '+cafe5.length,       // café 5
    cafe4 === cafe5,               // false
    cafe4.normalize() === cafe5.normalize() // true
);
