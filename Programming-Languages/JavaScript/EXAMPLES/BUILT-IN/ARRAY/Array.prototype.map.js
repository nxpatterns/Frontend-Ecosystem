var arr = [9,16,25,36];
const copy  = [];

console.log(arr.map(Math.sqrt));
console.log(arr.map(i => i));

arr.forEach(i => {copy.push(Math.sqrt(i));});
console.log(copy);