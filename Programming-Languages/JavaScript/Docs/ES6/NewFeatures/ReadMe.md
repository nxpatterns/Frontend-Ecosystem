# ES6 What is new ?

[See up-to-date information online](http://es6-features.org/#RegularExpressionStickyMatching)

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [ES6 What is new ?](#es6-what-is-new)
	* [Variables & Constants](#variables-constants)
		* [let](#let)
		* [const](#const)
	* [Scoping](#scoping)
	* [Arrow Functions](#arrow-functions)
	* [Extended Parameter Handling](#extended-parameter-handling)
		* [Default Parameter](#default-parameter)
		* [Rest Parameter](#rest-parameter)
		* [Spread Operator](#spread-operator)
	* [Template Literals](#template-literals)
		* [String Interpolation `${}`](#string-interpolation)
		* [Custom Interpolation](#custom-interpolation)
		* [Raw String Access](#raw-string-access)
	* [Extended Literals](#extended-literals)
		* [Binary & Octal (0b11, 0o7)](#binary-octal-0b11-0o7)
		* [Unicode String & RexExp Literal (Multi Language Support)](#unicode-string-rexexp-literal-multi-language-support)
	* [Enhanced Regular Expression](#enhanced-regular-expression)
		* [Sticky Matching](#sticky-matching)
	* [Enhanced Object Properties](#enhanced-object-properties)
		* [Property Shorthand](#property-shorthand)
		* [Computed Property Names](#computed-property-names)
		* [Method Properties](#method-properties)
	* [Destructuring Assignment](#destructuring-assignment)
		* [Array Matching](#array-matching)
		* [Object Matching Shorthand Notation](#object-matching-shorthand-notation)
		* [Object Matching Deep Matching](#object-matching-deep-matching)
		* [Object And Array Matching, Default Values](#object-and-array-matching-default-values)
		* [Fail-Soft Destructuring](#fail-soft-destructuring)
	* [Modules](#modules)
		* [Value Export/Import](#value-exportimport)
		* [Default & Wildcard](#default-wildcard)
	* [Classes](#classes)
		* [Class Definition](#class-definition)
		* [Class Inheritance (also from Expressions)](#class-inheritance-also-from-expressions)
		* [Static Members](#static-members)
	* [Symbol Type](#symbol-type)
	* [Iterators & For-Of Operator](#iterators-for-of-operator)
	* [Generators](#generators)
	* [Map/Set & WeakMap/WeakSet](#mapset-weakmapweakset)
	* [TypedArrays](#typedarrays)
	* [New built-in-methods](#new-built-in-methods)
		* [Object Property Assignment](#object-property-assignment)
		* [Array Element Finding](#array-element-finding)
		* [String repeating](#string-repeating)
		* [String Searching](#string-searching)
	* [Promises](#promises)
		* [Usage](#usage)
		* [Combination](#combination)
	* [Meta Programming](#meta-programming)
		* [Proxy](#proxy)
		* [Reflection](#reflection)
	* [Internationalization & Localization](#internationalization-localization)
		* [Collation](#collation)
		* [Number Formatting](#number-formatting)
		* [Currency Formatting](#currency-formatting)
		* [Date/Time Formatting](#datetime-formatting)

<!-- /code_chunk_output -->

## Variables & Constants

### let

### const

## Scoping

Block-scoped function definitions and block-scoped variables (and constants) without hoisting.

## Arrow Functions

## Extended Parameter Handling

### Default Parameter

### Rest Parameter

### Spread Operator

## Template Literals

### String Interpolation `${}`

### Custom Interpolation

### Raw String Access

Access the raw template string content (backslashes are not interpreted).

## Extended Literals

### Binary & Octal (0b11, 0o7)

### Unicode String & RexExp Literal (Multi Language Support)

## Enhanced Regular Expression

### Sticky Matching

Keep the matching position sticky between matches and this way support efficient parsing of arbitrary long input strings, even with an arbitrary number of distinct regular expressions.

## Enhanced Object Properties

### Property Shorthand

```javascript
obj = { x, y }; // ES5: obj = { x: x, y: y };
```

### Computed Property Names

Support for computed names in object property definitions.

### Method Properties

Support for method notation in object property definitions, for both regular functions and generator functions.

```javascript
obj = {
    foo (a, b) {
        …
    }
}
```

## Destructuring Assignment

### Array Matching

Intuitive and flexible destructuring of Arrays into individual variables during assignment.

```javascript
var list = [1, 2, 3];
var [a, , b] = list; // a=1, b=3
```

### Object Matching Shorthand Notation

```javascript
var { op, lhs, rhs } = getASTNode();
```

### Object Matching Deep Matching

```javascript
var {
  op: a,
  lhs: { op: b },
  rhs: c,
} = getASTNode();
```

### Object And Array Matching, Default Values

```javascript
var obj = { a: 1 };
var list = [1];
var { a, b = 2 } = obj;
var [x, y = 2] = list;
```

### Fail-Soft Destructuring

```javascript
var list = [7, 42];
var [a = 1, b = 2, c = 3, d] = list;
// a = 7, b = 42, c = 3, d = undefined
```

## Modules

### Value Export/Import

Support for exporting/importing values from/to modules without global namespace pollution.

### Default & Wildcard

## Classes

### Class Definition

```javascript
class Shape {
  constructor() {}
  move() {}
}
```

### Class Inheritance (also from Expressions)

```javascript
class Circle extends Shape {
  constructor() {
    super();
  }
}
```

### Static Members

## Symbol Type

## Iterators & For-Of Operator

## Generators

## Map/Set & WeakMap/WeakSet

## TypedArrays

## New built-in-methods

### Object Property Assignment

### Array Element Finding

```javascript
[1, 3, 4, 2]
  .find(x => x > 3) // 4
  [(1, 3, 4, 2)].findIndex(x => x > 3); // 2
```

### String repeating

```javascript
let depth = 2;
'foo'.repeat(2 * depth);
'foo'.repeat(3);
```

### String Searching

```javascript
'hello'.startsWith('ello', 1); // true
'hello'.endsWith('hell', 4); // true
'hello'.includes('ell'); // true
'hello'.includes('ell', 1); // true
'hello'.includes('ell', 2); // false
```

## Promises

### Usage

```javascript
function msgAfterTimeout(msg, who, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout);
  });
}
msgAfterTimeout('', 'Foo', 100)
  .then(msg => msgAfterTimeout(msg, 'Bar', 200))
  .then(msg => {
    console.log(`done after 300ms:${msg}`);
  });
```

### Combination

```javascript
function fetchAsync (url, timeout, onData, onError) {
    …
}
let fetchPromised = (url, timeout) => {
    return new Promise((resolve, reject) => {
        fetchAsync(url, timeout, resolve, reject)
    })
}
Promise.all([
    fetchPromised("http://backend/foo.txt", 500),
    fetchPromised("http://backend/bar.txt", 500),
    fetchPromised("http://backend/baz.txt", 500)
]).then((data) => {
    let [ foo, bar, baz ] = data
    console.log(`success: foo=${foo} bar=${bar} baz=${baz}`)
}, (err) => {
    console.log(`error: ${err}`)
})
```

## Meta Programming

### Proxy

```javascript
let target = {
  foo: 'Welcome, foo',
};
let proxy = new Proxy(target, {
  get(receiver, name) {
    return name in receiver ? receiver[name] : `Hello, ${name}`;
  },
});
proxy.foo === 'Welcome, foo';
proxy.world === 'Hello, world';
```

### Reflection

```javascript
let obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2 });
obj[Symbol('c')] = 3;
Reflect.ownKeys(obj); // [ "a", "b", Symbol(c) ]
```

## Internationalization & Localization

### Collation

### Number Formatting

### Currency Formatting

### Date/Time Formatting
