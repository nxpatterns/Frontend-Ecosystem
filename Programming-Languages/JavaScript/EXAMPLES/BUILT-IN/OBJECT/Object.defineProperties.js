/*
 The Object.defineProperties() method defines new or
 modifies existing properties directly on an object,
 returning the object.

 Syntax: Object.defineProperties(obj, props)

 props:
   configurable (defaults to false)
   enumerable (defaults to false)
   value (defaults to undefined)
   writable (defaults to false)
   get, set (defaults to undefined)

 // enumerable defaults to true
 // when creating a property by setting it

*/

var obj = {};
Object.defineProperties(obj, {
    'foo': {
        value: 1,
        writable: true
    },
    'bar': {
        value: 'Hello World',
        writable: false
    }
});

console.log (obj); // {}
for (var i in obj) {console.log(i);} // {}
console.log(Object.getOwnPropertyNames(obj)); // [ 'foo', 'bar' ]
console.log(Object.getOwnPropertyDescriptor(obj,'foo'));
/*
 { value: 1,
 writable: true,
 enumerable: false,
 configurable: false }
*/


// CUSTOM SETTERS AND GETTERS

function Archiver() {
    var temperature = null;
    var archive = [];

    Object.defineProperty(this, 'temperature', {
        get() {
            return temperature;
        },
        set(value) {
            temperature = value;
            archive.push({ val: temperature });
        }
    });

    this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature = 11;
arc.temperature = 13;
console.log(arc.temperature);   // 13
console.log(arc.getArchive()); // [{ val: 11 }, { val: 13 }]