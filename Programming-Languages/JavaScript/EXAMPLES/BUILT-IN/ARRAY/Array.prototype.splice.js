var arr = ['ONE','THREE','TEN','FOUR'];

// GOTO index AND remove X ELEMENTS AND/OR ADD ELEMENT(S)

// THE FOLLOWING INSERTS AN ELEMENT WITHOUT REMOVING
var removedElement = arr.splice(1,0,'TWO');

console.log(removedElement); //  [] Empty Array
console.log(arr);   // [ 'ONE', 'TWO', 'THREE', 'TEN', 'FOUR' ]

removedElement = arr.splice(3,1);

console.log(removedElement);    // [ 'TEN' ]
console.log(arr);   // [ 'ONE', 'TWO', 'THREE', 'FOUR' ]