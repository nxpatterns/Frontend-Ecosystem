var str = "english";

console.log (
    str.toUpperCase(),      // ENGLISH

);

// CAPITALIZING

var r1 = str.replace(/^./, str[0].toUpperCase());
var r2 = str.charAt(0).toUpperCase() + str.slice(1);
var r3 = str[0].toUpperCase() + str.slice(1);
var r4 = str[0].toUpperCase() + str.substr(1);
var r5 = str.replace(/^./, match => match.toUpperCase());

// Here is a defect implementation
// works with "english" but not with "engel";
var r6 = str.split('')
    .map (s => {
        if (str.indexOf(s) === 0) return s.toUpperCase();
        return s;
    }).join ('');

// correct implemention with spread operator

var r7 = [...str]
    .map((s,i) => i ? s : s.toUpperCase())
    .join('');

/*
* CONSIDER THE CSS SOLUTION
    p:first-letter {
        text-transform: capitalize;
    }
* */

console.log (
    '\n' + r1, r2, r3, r4, r5,r6, r7, // English <--
    '\n' + str // english <-- not modified
);