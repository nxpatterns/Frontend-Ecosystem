/*
 2 possible syntaxes:
 String.raw(callSite, ...substitutions)
 String.raw`templateString`
 * */

console.log (
    String.raw`Hi\n${2+3}!`,   // Hi\n5!
);

// Other use case (but does not really works properly)

let isSingleUnicodeWord = RegExp(String.raw`^\pL+$`); // L: Letter
console.log(isSingleUnicodeWord.test("Русский"));      // true
console.log(isSingleUnicodeWord.test("日本語"));        // true
console.log(isSingleUnicodeWord.test("العربية"));      // true
console.log(isSingleUnicodeWord.test("foo bar"));      // false