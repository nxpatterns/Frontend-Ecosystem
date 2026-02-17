// Syntax: func.bind(thisArg[, arg1[, arg2[, ...]]])
// EXAMPLE 1 ---------------------

var o = { num: 10 };

function addTo (n) { return this.num + n; }

var boundNumAddTo = addTo.bind(o);

console.log (boundNumAddTo);  // [Function: bound addTo]
console.log (boundNumAddTo(3)); // 13

// EXAMPLE 2 ---------------------
num = 20;
var foo = {
    num: 10,
    getNum: function () {
        return this.num;
    }
};

console.log(foo.getNum()); // 10

var myNewGetNum = foo.getNum;
console.log(myNewGetNum()); // 20 not 10

var boundedMyNewGetNum = myNewGetNum.bind(foo);
console.log(boundedMyNewGetNum()); // 10

// EXAMPLE 3
// An interesting example with a preset leading argument
function list () {
    return Array.prototype.slice.call(arguments);
}

var myList = list (1,2,3); // returns [ 1, 2, 3 ]
var preset10ToList = list.bind(null, 10);
var list2 = preset10ToList();
var list3 = preset10ToList(4,5,6);
console.log(list2); // [ 10 ]
console.log(list3); // [ 10, 4, 5, 6 ]

