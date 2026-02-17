var str1 = '   ABC   ';
var str2 = '   ABC   ';
var str3 = '   ABC   ';

console.log (
    str1.trim(),        // ABC
    str2.trimLeft(),    // ABC___ // _ = one empty space
    str3.trimRight(),   // ___ABC
);