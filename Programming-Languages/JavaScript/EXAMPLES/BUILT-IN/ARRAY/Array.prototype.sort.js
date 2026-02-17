var numArr = [1, 10, 21, 2];
console.log(numArr.sort()); // [1, 10, 2, 21]

function compareNumbers(a, b) {
    return a - b;
}
console.log(numArr.sort(compareNumbers)); // 1,2,10,21

function compareStrings (a,b) {
    var A = a.toUpperCase();
    var B = b.toUpperCase();

    if (A < B ) return -1;
    if (A > B ) return 1;
    return 0;
}

var strArr = ['Mon','FRI','SAT', 'MON','TUE', 'Son' ];

console.log(strArr.sort(compareStrings));
// [ 'FRI', 'Mon', 'MON', 'SAT', 'Son', 'TUE' ]