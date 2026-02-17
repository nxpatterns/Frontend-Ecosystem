// Simple Example

const items = ['mon', 'tue', 'wed'];
const copy  = [];

items.forEach(function(item){
    copy.push(item.toUpperCase());
});

console.log(items);     // [  ]'mon', 'tue', 'wed' ]
console.log(copy);      // [ 'MON', 'TUE', 'WED'

// Intermediate Example

const items2 = ['mon', 'tue', 'wed'];
const copy2  = [];
const indexes2 = [];

function copyAndToUppercase (element, index, array){
    copy.push(element.toUpperCase());
    indexes2.push(index);
}

items.forEach(copyAndToUppercase);

console.log(items2);     // [ 'mon', 'tue', 'wed' ]
console.log(copy2);      // [ 'MON', 'TUE', 'WED' ]
console.log(indexes2);   // [ 0, 1, 2 ]

// Ninja Example With thisArg

function Counter() {
    this.sum = 0;
    this.count = 0;
}
Counter.prototype.add = function(array) {
    array.forEach(function(entry) {
        this.sum += entry;
        ++this.count;
    }, this);
    // ^---- Note
};

const obj = new Counter();
obj.add([3, 5, 8]);
console.log (
    obj.count,    // 3
    obj.sum      // 16
);