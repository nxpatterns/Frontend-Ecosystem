class MyClass {
    static [Symbol.hasInstance] () {
        return true;
    }
}

console.log (
    [] instanceof MyClass,       // true
    {} instanceof MyClass,       // true
    'foo' instanceof MyClass,    // true
    NaN instanceof MyClass,      // true
    null instanceof MyClass,     // true
    undefined instanceof MyClass // true
);