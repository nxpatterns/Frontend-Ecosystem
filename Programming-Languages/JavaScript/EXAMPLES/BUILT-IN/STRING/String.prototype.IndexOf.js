// Syntax: str.indexOf(searchValue[, fromIndex])

var s = 'Come on onto the roof';
// -----------^--^-------------
// -----------5--8-------------

console.log(s.indexOf('on'));     // 5
console.log(s.indexOf('on',5));   // 5
console.log(s.indexOf('on',6));   // 8
