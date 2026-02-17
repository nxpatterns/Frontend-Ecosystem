var fs = require('fs');


let alltypes = [
    Object,
    Function,
    Boolean,
    Symbol,
    Error,
    EvalError,
    //    InternalError, // NOT STANDARD
    RangeError,
    ReferenceError,
    Number,
    Math,
    Date,
    String,
    RegExp,
].sort();

let ValueProperties = [
    Infinity,
    NaN,
    undefined,
    null
];

let FunctionProperties = [
    eval(),
    uneval(),
    isFinite()
];

console.log(alltypes.map(i => i.name ? i.name : i));