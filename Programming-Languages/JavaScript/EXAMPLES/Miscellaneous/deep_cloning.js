// Rekursive Funktion copy(o)

function copy(o) {
    var out, v, key;
    out = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        out[key] = (typeof v === "object") ? copy(v) : v;
    }
    return out;
}

var obj1 = { a: 1, b: {c: [2,{x: 'y'}]}};
var copy1 = copy(obj1);

var obj2 = [1,{ a: 1, b: {c: [2,{x: 'y'}]}}];
var copy2 = copy(obj2);

console.log(copy1);
console.log(copy2);