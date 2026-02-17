/*
 The Object.create() method creates a new object
 with the specified prototype object and properties.
*/

// Object.create(proto[, propertiesObject])

var p = {foo: 'bar'};
var o = Object.create(p);
console.log(Object.getPrototypeOf(o)); // { foo: 'bar' }
console.log(Object.getPrototypeOf(o) === p); // true


// CLASSICAL INHERITANCE WITH Object.create()

function Creatures () {
    this.livingArea = undefined;
}

Creatures.prototype.setLivingArea = function (la) {
    this.livingArea = la;
}

function Human () {
    Creatures.call(this); // call super constructor
}

Human.prototype = Object.create(Creatures.prototype);
Human.prototype.constructor = Human();

var hugo = new Human();
hugo.setLivingArea('earth');

console.log ('is hugo a creature?', hugo instanceof Creatures); // true
console.log ('is hugo a Human?', hugo instanceof Human); // true
console.log ('where does hugo live?', hugo.livingArea); // earth


// CREATING AN OBJECT WITH SAMPLE PROPERTIES

var o = Object.create(Object.prototype, {
    // foo is a regular 'value property'
    foo: {
        writable: true,
        configurable: true,
        value: 'Hi'
    }});

console.log(o); // {}
console.log(o.foo); // Hi


// CREATING A NEW OBJECT WITH A SINGLE PROPERTY

o2 = Object.create({}, { p: { value: 0 } });

// by default properties ARE NOT writable,
// enumerable or configurable:
o2.p = 10;
console.log(o2);    // {}
console.log(o2.p);  // 0
