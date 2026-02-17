var s = "on tuesday or on monday";
var a = s.split(' ');

console.log (a.map(e => a.indexOf(e)+': '+e));
// [ '0: on', '1: tuesday', '2: or', '3: on', '4: monday' ]

console.log (a.lastIndexOf('on')); // 3
console.log (a.indexOf('on')); // 0
console.log (a.lastIndexOf('xx')); // -1
