// arr.toLocaleString([locales[, options]]);

var date = new Date ();

console.log(date);
// 2017-12-21T17:37:46.421Z

console.log (date.toLocaleString());
// 12/21/2017, 6:38:27 PM

console.log (date.toLocaleString('de-DE'));
// 21.12.2017, 18:40:48

console.log (date.toLocaleDateString());
// 12/21/2017

console.log (date.toLocaleDateString('de-DE'));
// 21.12.2017