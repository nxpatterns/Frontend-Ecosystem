var arr = [[0, 1], [2, 3], ['4', 5]];
function concatElements (a,b){
    return a.concat(b);
}

var flattened = arr.reduceRight(concatElements,[3]);

console.log(flattened);
// [ 3, '4', 5, 2, 3, 0, 1 ]