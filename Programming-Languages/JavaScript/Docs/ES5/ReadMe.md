# JavaScript Concepts & Patterns

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [JavaScript Concepts & Patterns](#javascript-concepts-patterns)
	* [SimpleTypes in ES5 (EcmaScript)](#simpletypes-in-es5-ecmascript)
	* [Use Strict](#use-strict)
	* [Unabsichtlich erzeugte globale Variablen](#unabsichtlich-erzeugte-globale-variablen)
	* [Zugriff auf das globale Objekt](#zugriff-auf-das-globale-objekt)
	* [Basic Statements](#basic-statements)
		* [for](#for)
		* [do while](#do-while)
		* [while](#while)
		* [switch](#switch)
	* [Hoisting](#hoisting)
	* [Performant `for` loops](#performant-for-loops)
		* [Suboptimal](#suboptimal)
		* [Besser](#besser)
		* [Noch besser](#noch-besser)
		* [Best (with while loop)](#best-with-while-loop)
	* [`for in` loop with `hasOwnProperty()`](#for-in-loop-with-hasownproperty)
	* [Erweitern von eingebauten Prototypen](#erweitern-von-eingebauten-prototypen)
	* [Konstruktoren mit Großbuchstaben beginnen](#konstruktoren-mit-großbuchstaben-beginnen)
	* [Selbst aufrufender Konstruktor](#selbst-aufrufender-konstruktor)
	* [Regexp Literal](#regexp-literal)
	* [Wrapper für Primitive](#wrapper-für-primitive)
	* [Error Objects](#error-objects)
		* [Eigene Exceptions werfen](#eigene-exceptions-werfen)
	* [Funktionen](#funktionen)
		* [Terminologie](#terminologie)
		* [Self-Executing Anonymous Functions or better said "Immediately-Invoked Function Expression (IIFE)](#self-executing-anonymous-functions-or-better-said-immediately-invoked-function-expression-iife)
		* [Arguments](#arguments)
		* [Return Value](#return-value)
		* [constructor](#constructor)
		* [Callback](#callback)
			* [Short Example](#short-example)
			* [Long Example](#long-example)
	* [Cascade](#cascade)
	* [Closures](#closures)
	* [Currying](#currying)
	* [Objects related](#objects-related)
		* [Use an Object for own namespace](#use-an-object-for-own-namespace)
		* [Modul Pattern](#modul-pattern)
		* [Public Static members](#public-static-members)
		* [Private Static members](#private-static-members)
		* [Object Constants](#object-constants)
	* [Cookbook Part](#cookbook-part)
		* [isArray](#isarray)
		* [isNumber or isNumeric](#isnumber-or-isnumeric)
		* [isValueSet](#isvalueset)
			* [Falsy values in this context](#falsy-values-in-this-context)
		* [Removing duplicate characters (`...new Set()`)](#removing-duplicate-characters-new-set)
		* [Capitalizing](#capitalizing)
		* [Number to Array](#number-to-array)
		* [Cut file extension or get file extension](#cut-file-extension-or-get-file-extension)
		* [`filter` array content based on search criteria](#filter-array-content-based-on-search-criteria)
	* [Some Oddities](#some-oddities)
		* [typeof](#typeof)
		* [Equality](#equality)
		* [Comments](#comments)

<!-- /code_chunk_output -->

In deutscher Sprache (and sometimes in & English) :)

## SimpleTypes in ES5 (EcmaScript)

`boolean`, `null`, `undefined`, `Infinity`, `NaN`, `Number`

```JavaScript
1 == 1.0       // true
1 === 1.0      // true
1 == '1'       // true
1 === '1'      // false
1 / 0          // Infinity
1 / 'x'        // NaN
NaN == NaN     // false
NaN === NaN    // false
1e2 == 100     // true, 1e2 = 1 * 10^2
1.3e2 == 130   // true
```

## Use Strict

```javascript
'use strict';
```

## Unabsichtlich erzeugte globale Variablen

```javascript
var a = (b = 0); // b globale Variable
```

Globale Variablen sind Eigenschaften des globalen Objektes und können daher auch mit `delete` gelöscht werden.

## Zugriff auf das globale Objekt

```javascript {cmd="node"}
var global = (function() {
  return this;
})(); // Man beachte die zusäztlichen Klammern

console.log(global);
```

## Basic Statements

### for

```javascript
var myData = ['zero', 'one', 'two', 'three'];

for (var i = 0; i < myData.length; i++) {
  console.log(myData[i]);
}

for (var index in myData) {
  console.log(index, myData[index]);
}

/* for .. of -> not available in ES5

 for (var item of myData) {
    console.log(item);
 }

 */
```

### do while

```javascript
var myString = 'webia1';
var i = 0;

do {
  console.log(myString[i]);
  i++;
} while (i < myString.length);
```

### while

```javascript
var myName = 'webia1';
var i = 0;
var j = myName.length;
var temp = '';

/* Write myName backwards */
while (i < j) {
  temp += myName[j - (i + 1)];
  i++;
}

console.log(myName, ' => ', temp); // webia1  =>  1aibew
```

### switch

```javascript
var whatever = 'world';

switch (whatever) {
  case 'world':
    console.log('Hello World!');
    break;
  default:
    console.log('Hello ' + whatever);
}
```

## Hoisting

Function `whereAreYou` has a variable `me` too. Therefore the first `console.log`
is `undefined`.

```javascript
var me = "I'am outside";

function whereAreYou() {
  console.log(me); // undefined
  var me = "I'am inside";
  console.log(me);
}

whereAreYou(); // I'am inside
```

The same example without the second `me` works as expected:

```javascript
var me = "I'am outside";

function whereAreYou() {
  console.log(me);
}

whereAreYou(); // I'am outside
```

Same examples with `functions`.

```javascript
var me = function() {
  console.log("I'am outside");
};

function whereAreYou() {
  console.log(typeof me); // undefined
  // me(); would output "TypeError: me is not a function"
  var me = function() {
    // anonym function
    console.log("I'am inside");
  };
  me();
}

whereAreYou(); // I'am inside
```

You have exact the same behaviour with so called `array functions (ES6)`:

```javascript
var me = function() {
  console.log("I'am outside");
};

function whereAreYou() {
  console.log(typeof me); // undefined
  // me(); would output "TypeError: me is not a function"
  var me = () => {
    console.log("I'am inside");
  };
  me(); // that would work
}

whereAreYou(); // I'am inside
```

**Attention!** `function declarations` below work something differently!

```javascript
var me = function() {
  console.log("I'am outside");
};

function whereAreYou() {
  console.log(typeof me); // function
  me(); // I'am inside
  function me() {
    console.log("I'am inside");
  }
  me(); // I'am inside
}

whereAreYou();
```

## Performant `for` loops

### Suboptimal

```javascript
for (var i = 0; i < myarray.length; i++) {
  // ....
}
```

### Besser

```javascript
for (var i = 0, max = myarray.length; i < max; i++) {
  // ....
}
```

### Noch besser

```javascript
for (var i=myarray.length; i--){
  // ....
}
```

### Best (with while loop)

```javascript
var myArray = [],
  i = myArray.length;
while (i--) {
  // ....
}
```

## `for in` loop with `hasOwnProperty()`

```javascript
for (var i in whatever) {
  if (whatever.hasOwnProperty(i)) {
    // ....
  }
}
```

## Erweitern von eingebauten Prototypen

```javascript
if (typeof Object.prototype.myMethod !== 'function') {
  Object.prototype.myMethod = function() {
    // Implementierung
  };
}
```

## Konstruktoren mit Großbuchstaben beginnen

```javascript
function MyWhateverConstructor () { ... }
function myWhateverFunction () { ... }

var myWhatever = new MyWhateverConstructor ();
myWhateverFunction ();
```

## Selbst aufrufender Konstruktor

Hilft, wenn `new` vergessen wird.

```javascript {cmd="node"}
function Whatever() {
  if (!(this instanceof Whatever)) {
    return new Whatever();
  }
  this.description = 'It is whatever!';
}

var w1 = new Whatever(),
  w2 = Whatever();

console.log(
  w1.description, // It is whatever!
  w2.description, // It is whatever!
);
```

## Regexp Literal

```javascript {cmd="node"}
// var re = /pattern/gmi;  // g..Global, m..Multiline, i..Case insensitive
var re1 = /\\/gm; // looking for a single backslash
var re2 = new RegExp('\\\\', 'gm'); // looking for a single backslash

var someString = 'A12X23Y';
var re = /[a-z]/gi;
var noLetters = someString.replace(re, ''); // 1223
```

## Wrapper für Primitive

Diese lassen sich durch die eingebauten Konstruktoren `Number(), String() und Boolean()` erzeugen.

```javascript {cmd="node"}
var hello = 'Hello World';
var myHello = hello.split(' ')[0]; // Hello
myHello.foo = 'bar'; // no error, but it does not do anything
console.log(
  typeof myHello.foo, // undefined
  myHello, // Hello
  hello, // Hello World
);

var myHello2 = new String('Hello');
myHello2.foo = 'bar';
console.log(typeof myHello2.foo); // string
```

## Error Objects

Einige eingebaute Fehler-Konstruktoren sind: `Error(), SyntaxError(), TypeError()`, sie besitzen die Eigenschaften `name, message`.

### Eigene Exceptions werfen

```javascript
// try {} catch (e) {}
try {
  // es ist etwas bestimmtes passiert
  throw {
    name: 'MyOwnWhateverErrorType',
    message: 'Uuups, I did it again',
    foo: "I've a foo whatever it is",
    remedy: genericErrorHandler, // Wer kümmert sich darum
  };
} catch (e) {
  console.log(e.message);
  e.remedy(); // Aufruf von genericErrorHandler()
}
```

## Funktionen

### Terminologie

```javascript
var add = function add(a, b) {
  return a + b;
}; // named function
var add = function(a, b) {
  return a + b;
}; // anonym function
function add(a, b) {
  return a + b;
} // function declaration
```

### Self-Executing Anonymous Functions or better said "Immediately-Invoked Function Expression (IIFE)

Two different syntaxes:

```javascript
(function() {})();
(function() {})();
```

### Arguments

Bonus parameter, which gives access to all of the arguments. It is an array-like-object, has a `length` property, but it lacks all of the array methods.

[>> See here more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

### Return Value

A function always returns a value, if not specified then `undefined`.

### constructor

```javascript {cmd="node"}
function foo() {}
console.log(foo.constructor); // [Function: Function]
console.log(foo.constructor()); // [Function: anonymous]
```

### Callback

A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. [Source: Developer Mozilla](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

#### Short Example

```javascript
function greeting() {
  console.log('Welcome!');
}

function doWhateverItIs(callback) {
  if (typeof callback === 'function') {
    callback();
  }
}

doWhateverItIs(greeting); // Without `()`
```

#### Long Example

```javascript
function greeting(name) {
  return `Hello ${name}`;
}

function getName() {
  return 'James';
}

function doWhateverItIs(callback, itsArgument) {
  console.log(callback(itsArgument));
}

doWhateverItIs(greeting, getName());
```

**Attention:** There is a big difference: `greeting` is the callback function and `getName()` returns a value.

The above example is a synchronous callback, as it is executed immediately. Note, however, that callbacks are often used to continue code execution after an asynchronous operation has completed — these are called asynchronous callbacks.

## Cascade

An object with chain-able methods, that returning `this`, make it possible to cascade:

```javascript
var myOperations = {
  result: 0,
  plus2: function() {
    this.result = this.result + 2;
    return this;
  },
  timesThree: function() {
    this.result = this.result * 3;
    return this;
  },
  logResult: function() {
    console.log(this.result);
  },
};

myOperations
  .plus2()
  .timesThree()
  .logResult();
```

## Closures

```javascript
var myObj = (function() {
  var myValue = 'whatever';
  return {
    getMyValue: function() {
      return myValue;
    },
    setMyValue: function(value) {
      myValue = value;
    },
  };
})();

myObj.setMyValue('Webia1');
console.log(myObj.getMyValue()); // Webia1
console.log(myObj.myValue); // undefined
```

## Currying

```javascript
/*
 if the function is invoked, with
 no arguments => return 0
 one argument => return preventively a function, because argument(s) missing
 two or more arguments => return the sum

 */

function add() {
  var slice = Array.prototype.slice;
  var x = slice.apply(arguments);
  if (x.length == 1)
    return function(n) {
      return x[0] + n;
    };
  if (x.length >= 2) return x.reduce((i, j) => i + j);
  return 0;
}

console.log(add()); // 0
console.log(add(1)); // [function]
console.log(add(1)(2)); // 3
console.log(add(1, 2)); // 3
console.log(add(1, 2, 3, 4)); // 10
```

## Objects related

### Use an Object for own namespace

```javascript
var MYAPP = MYAPP || {};
```

### Modul Pattern

```javascript {cmd="node"}
var myObj = (function() {
  // private member
  var myName = 'James Bond';
  return {
    getName: function() {
      return myName;
    },
  };
})();
console.log(myObj.getName()); // James Bond
```

### Public Static members

`WhatEver.isFoo` is a static member, it does not need an instance.

```javascript {cmd="node"}
var WhatEver = function() {};
WhatEver.isFoo = function() {
  return "Yes, I'm FOO";
};

WhatEver.prototype.isBar = function() {
  return "Yes, I'm BAR";
};

var something = new WhatEver();

console.log(
  WhatEver.isFoo(), // Yes, I'm FOO
  // WhatEver.isBar (), // TypeError: WhatEver.isBar is not a function
  something.isBar(), // Yes, I'm BAR
  // something.isFoo() // TypeError: something.isFoo is not a function
);
```

### Private Static members

```javascript {cmd="node"}
var myCounterObj = (function() {
  var counter = 0; // static variable
  var myNewCounterObj = function() {
    counter++;
  };
  myNewCounterObj.prototype.getLastNumber = function() {
    return counter;
  };

  return myNewCounterObj;
})();

var fooCounter = new myCounterObj();
var barCounter = new myCounterObj();
var bazCounter = new myCounterObj();
console.log(
  fooCounter.getLastNumber(), // 3
  bazCounter.getLastNumber(), // 3
);
```

### Object Constants

```javascript
//  only in ES5 through the help of object properties
//  and only in global context and not in a block scope
Object.defineProperty(typeof global === 'object' ? global : window, 'PI', {
  value: 3.141593,
  enumerable: true,
  writable: false,
  configurable: false,
});
```

Another implementation would be:

```javascript
var constant = (function() {
  var constants = {},
    i = 0,
    ownProp = Object.prototype.hasOwnProperty,
    allowed = {
      string: true,
      number: true,
      boolean: true,
    },
    prefix = (Math.random() + '_').slice(2); // delete first 2 characters

  return {
    set: function(name, value) {
      if (this.isDefined(name)) {
        return false;
      }

      if (!ownProp.call(allowed, typeof value)) {
        return false;
      }

      constants[prefix + name] = value;
      console.log(constants);
      return true;
    },
    isDefined: function(name) {
      i++; // within IIFE global variable
      console.log(i, prefix + name);
      return ownProp.call(constants, prefix + name);
    },
    get: function(name) {
      if (this.isDefined(name)) {
        return constants[prefix + name];
      }
      return null;
    },
  };
})();

constant.isDefined('maxWidth'); // false
constant.set('maxWidth', 480); // true
// e.g. { '13702937294496964_maxWidth': 480 }
constant.isDefined('maxWidth'); // true
constant.set('maxWidth', 320); // false
constant.get('maxWidth'); // 480
```

## Cookbook Part

### isArray

```javascript
if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) == '[object Array]';
  };
}
```

### isNumber or isNumeric

```javascript
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```

```javascript
function isNumeric(n) {
  return Number(parseFloat(n)) === n;
}
```

### isValueSet

```javascript
isValueSet(value: string): boolean {
  return value ? true : false;
}
```

#### Falsy values in this context

```javascript
null;
undefined;
NaN;
(''); // Empty String
0;
false;
```

### Removing duplicate characters (`...new Set()`)

```javascript
console.log(
  [...new Set('xxyzssscabaaxbcc')].join(''),
  // 'xyzscab'
);
```

### Capitalizing

```javascript
var str = 'english'; // Expected result: English

var r1 = str.replace(/^./, str[0].toUpperCase());
var r2 = str.charAt(0).toUpperCase() + str.slice(1);
var r3 = str[0].toUpperCase() + str.slice(1);
var r4 = str[0].toUpperCase() + str.substr(1);
var r5 = str.replace(/^./, match => match.toUpperCase());

// Here is a defect implementation
// works with "english" but not with "engel"
// because engel[0] == engel[3]
// Use it for demonstration purposes
// for an unit-test-example

var r6 = str
  .split('')
  .map(s => {
    if (str.indexOf(s) === 0) return s.toUpperCase();
    return s;
  })
  .join('');

// correct implemention with spread operator

var r7 = [...str].map((s, i) => (i ? s : s.toUpperCase())).join('');

/*
 * CONSIDER THE CSS SOLUTION
 p:first-letter {
 text-transform: capitalize;
 }
 * */

console.log(
  '\n' + r1,
  r2,
  r3,
  r4,
  r5,
  r6,
  r7, // English <--
  '\n' + str, // english <-- not modified
);
```

### Number to Array

**Attention!** `Array.from (ES6)`

```javascript
var n = 0;
var m = 1234;

function numToArray(num) {
  return Array.from(num.toString()).map(Number);
}

console.log(numToArray(n)); // [ 0 ]
console.log(numToArray(m)); // [ 1, 2, 3, 4 ]
```

### Cut file extension or get file extension

```javascript
var myFName = 'myFoto.postfix.jpg';
var nameWithPath = 'css/styles.css';

console.log(
  myFName.substr(0, myFName.lastIndexOf('.')) || myFName, // "myFoto.postfix"
  myFName.split('.').shift(), // "myFoto"
  myFName.split('.').pop(), // "jpg"
  require('path').extname(nameWithPath), // ".css"
);
```

### `filter` array content based on search criteria

```javascript
var arr = ['big', 'bank', 'bold', 'DAnk', 'gaNg'];

function searchArray(query) {
  return arr.filter(function(item) {
    var tmp = item.toUpperCase();
    return tmp.indexOf(query.toUpperCase()) !== -1;
  });
}

var searchResult = searchArray('an');

console.log(searchResult); // [ 'bank', 'DAnk', 'gaNg' ]
```

## Some Oddities

### typeof

The values produced by `typeof` are: `number`, `string`, `boolean`, `undefined`, `function`, `object`

```javascript
console.log(typeof array); // 'object'
console.log(typeof {}); // 'object'
console.log(typeof null); // 'object'
console.log(typeof Object); // function

console.log(typeof NaN); // number
console.log(typeof 1); // number
console.log(typeof Number); // function

console.log(typeof undefined); // undefined
console.log(typeof null); // object
```

### Equality

```javascript
isNaN(NaN); // true
NaN == NaN; // false
null == undefined; // true
null === undefined; // false
```

### Comments

Block comments `/* .. */` are not safe for commenting out blocks of code, for instance:

```JavaScript
var r = /a*/.match(s) // better use one line comment here
```
