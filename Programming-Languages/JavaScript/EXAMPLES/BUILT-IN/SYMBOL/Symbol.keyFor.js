var globalSym = Symbol.for('foo'); // create a new global symbol

console.log (
    Symbol.keyFor(globalSym),   // "foo"

);