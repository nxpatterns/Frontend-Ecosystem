import * as vm from 'node:vm';

const context = vm.createContext();
const arr = vm.runInContext('[]', context);

console.log(arr instanceof Array); // false
console.log(Array.isArray(arr)); // true

console.log(typeof Array);
