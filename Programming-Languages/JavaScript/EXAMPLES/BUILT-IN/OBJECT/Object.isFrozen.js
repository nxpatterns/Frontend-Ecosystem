var obj = {};

console.log(
    Object.isFrozen(obj),   // false
    Object.freeze(obj),     // returnValue is frozen Object => {}
    Object.isFrozen(obj)    // true
);

