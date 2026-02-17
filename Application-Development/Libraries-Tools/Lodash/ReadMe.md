# Lodash 4+

Abbreviations:

- Array &rarr; `arr` or `a`
- Notice &rarr; `N:`
- Result &rarr; `res` or `r`

**All features were mentioned, but only the following topics were covered in detail:**

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Array](#array)
  - [concat](#concat)
  - [difference, differenceBy, differenceWith](#difference-differenceby-differencewith)
  - [drop, dropRight, dropRightWhile](#drop-dropright-droprightwhile)
  - [fill](#fill)
  - [fromPairs, intersection, sortedIndex, zip, zipObjectDeep](#frompairs-intersection-sortedindex-zip-zipobjectdeep)
- [Object](#object)
  - [countBy (!!)](#countby)
  - [every](#every)
  - [flatMap](#flatmap)
  - [flatMapDeep](#flatmapdeep)
  - [groupBy (!!)](#groupby)
  - [invokeMap (!!)](#invokemap)
  - [keyBy (!!)](#keyby)
  - [orderBy (!!)](#orderby)
  - [partition (!!)](#partition)
- [Date](#date)
- [Function](#function)
  - [debounce](#debounce)
  - [memoize(func, [resolver]) (!!)](#memoizefunc-resolver)
  - [once](#once)
  - [spread](#spread)
  - [wrap](#wrap)
- [Lang](#lang)
  - [castArray](#castarray)
  - [isNil](#isnil)
  - [toFinite](#tofinite)
  - [toPlainObject (!!)](#toplainobject)
- [Math](#math)
  - [ceil (aufrunden)](#ceil-aufrunden)
  - [divide](#divide)
  - [floor (abrunden), round (runden)](#floor-abrunden-round-runden)
- [Number](#number)
  - [inRange(number, [start=0], end)](#inrangenumber-start0-end)
  - [random([lower=0], [upper=1], [floating])](#randomlower0-upper1-floating)
- [Object](#object-1)
  - [get(object, path, [defaultValue])](#getobject-path-defaultvalue)
  - [mapKeys, mapValues](#mapkeys-mapvalues)
  - [omitBy(object, [predicate=\_.identity])](#omitbyobject-predicate_identity)
  - [transform](#transform)
- [Seq](#seq)
  - [chain, tap, thru, prototype.value()](#chain-tap-thru-prototypevalue)
- [String](#string)
  - [camelCase, capitalize, escape, escapeRegExp](#camelcase-capitalize-escape-escaperegexp)
  - [template](#template)
  - [truncate](#truncate)
- [Util](#util)
  - [attempt](#attempt)
  - [defaultTo(value, defaultValue)](#defaulttovalue-defaultvalue)
  - [identity(value) (??)](#identityvalue)
  - [itaretee](#itaretee)
  - [flow ([funcs])](#flow-funcs)
  - [property](#property)

<!-- /code_chunk_output -->

## Array

> **chunk:**
> Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.

> **compact:**
> Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.

**concat**:
Creates a new array concatenating array with any additional arrays and/or values.

**difference:**
Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array. Note: Unlike `pullAll`, this method returns a new array.

**differenceBy:**
This method is like difference except that it accepts iteratee which is invoked for each element of array and values to generate the criterion by which they're compared. The order and references of result values are determined by the first array. The iteratee is invoked with one argument: (value). Note: Unlike `pullAllBy`, this method returns a new array.

**differenceWith,**

**drop**, **dropRight**, **dropRightWhile**, dropWhile,

**fill**,

> **findIndex:** > _.findIndex(array, [predicate=_.identity], [fromIndex=0])

> **findLastIndex:**
> This method is like \_.findIndex except that it iterates over elements of collection from right to left.

> **first** or **head** (alias)
> Gets the first element of array.

> **flatten, flattenDeep, flattenDepth**,
> flatten: 1, flattenDeep: all, flattenDepth n

**fromPairs**,
The inverse of \_.toPairs; this method returns an object composed from key-value pairs.

> **head:** see above &rarr; `first`

> **indexOf:** indexOf(array, value, [fromIndex=0])
> Gets the index at which the first occurrence of value is found in array using SameValueZero for equality comparisons. If fromIndex is negative, it's used as the offset from the end of array.

> **initial:** Gets all but the last element of array.

**intersection**

> **intersectionBy:**

> **intersectionWith:**

> **join:**

> **last:**

> **lastIndexOf:**

> **nth:**

> **pull:**

> **pullAll:**

> **pullAllBy:**

> **pullAllWith:**

> **pullAt:**

> **remove:**

> **reverse:**

> **slice:**

**sortedIndex**

> **sortedIndexBy**

> **sortedIndexOf sortedLastIndex**

> **sortedLastIndexBy**

> **sortedLastIndexOf**

> **sortedUniq**

> **sortedUniqBy**

> **tail**

> **take**

> **takeRight**

> **takeRightWhile**

> **takeWhile**

> **union**

> **unionBy**

> **unionWith**

> **uniq**

> **uniqBy**

> **uniqWith**

> **unzip**

> **unzipWith**

> **without,**

> **xor xorBy xorWith**

**zip**

> **zipObject:**

**zipObjectDeep:**

> **zipWith:**

### concat

```javascript
let arr = [1];
let res = concat(array, 2, [3], [[4]]); // => [1, 2, 3, [4]]
```

### difference, differenceBy, differenceWith

```javascript
difference([2, 1], [2, 3]); // => [1]

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2]
// N: The floor() method rounds a number DOWNWARDS to the nearest integer

differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x');
// => [{ 'x': 2 }]

var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
differenceWith(objects, [{ x: 1, y: 2 }], isEqual);
// => [{ 'x': 2, 'y': 1 }]
```

### drop, dropRight, dropRightWhile

```java
drop([1, 2, 3]); // => [2, 3]

drop([1, 2, 3], 2); // => [3]

dropRight([1, 2, 3]); // => [1, 2]

var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

dropRightWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']

```

### fill

```javascript
      0  1  2  3
fill([4, 6, 8, 10], '*', 1, 3); // from 1 (incl.) to 3 (excl.)
//=> [4, '*', '*', 10]
```

### fromPairs, intersection, sortedIndex, zip, zipObjectDeep

```javascript
fromPairs([
  ['a', 1],
  ['b', 2],
]);
// => { 'a': 1, 'b': 2 }

intersection([1, 3], [2, 3], [3, 4], [5, 3], [7, 3]); // => [3]

sortedIndex([30, 50], 40); // => 1

uniq([3, 1, 1, 2, 3]); // => [3,1,2]

zip(['x', 'x', 'y'], ['a', 'b', 'c'], [1, 2, 3]);
// => [ [ 'x', 'a', 1 ], [ 'x', 'b', 2 ], [ 'y', 'c', 3 ] ]

zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```

## Object

**countBy**,

> each -> forEach,

> eachRight -> forEachRight,

**every**,

> filter,

> find,

> findLast,

**flatMap**,

**flatMapDeep**,

> flatMapDepth,

> forEach,

> forEachRight,

**groupBy**,

> includes,

**invokeMap**,

**keyBy**,

> map,

**orderBy**,

**partition**,

> reduce,

> reduceRight,

> **reject**: The opposite of \_.filter; this method returns the elements of collection that predicate does not return truthy for.

> sample,

> sampleSize,

> shuffle,

> size,

> some,

> sortBy,

### countBy (!!)

```javascript
countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }

// The `property` iteratee shorthand.
countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```

### every

```javascript
var users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: false },
];

every(users, ['active', false]);
// => true

every(users, 'active');
// => false
```

### flatMap

```javascript
function duplicate(n) {
  return [n, n];
}

flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]
```

### flatMapDeep

```javascript
let a = [
  [{ a: 1, b: { b0: 1 } }],
  [[[[{ a: 2, b: { b0: 2 } }]]]],
  [[{ a: 3, b: { b0: 3 } }]],
];

console.log(flatMapDeep(a));

/*
[ { a: 1, b: { b0: 1 } },
  { a: 2, b: { b0: 2 } },
  { a: 3, b: { b0: 3 } } ]
*/
```

### groupBy (!!)

```javascript
groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }

// The `property` iteratee shorthand.
groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

### invokeMap (!!)

> invokeMap(collection, path, [args])
> path: `sort`, `toUpperCase`, `toFixed`, `String.prototype.split`, whatever ..

```javascript
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort',
);
// => [[1, 5, 7], [1, 2, 3]]

invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```

### keyBy (!!)

```javascript
var array = [
  { key: 'left', value: 97 },
  { key: 'right', value: 100 },
];

keyBy(array, 'key');

// => { left: { key: 'left', value: 97 }, right: { key: 'right', value: 100 } }

keyBy(array, 'value');

// = { 97: { key: 'left', value: 97 }, 100: { key: 'right', value: 100 } }
```

### orderBy (!!)

```javascript
var users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

// Sort by `user` in ascending order and by `age` in descending order.
orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

### partition (!!)

Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsey for. The predicate is invoked with one argument: (value).

```javascript
var users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
  { user: 'pebbles', age: 1, active: false },
];

partition(users, 'active');
// => objects for [['fred'], ['barney', 'pebbles']]
```

## Date

> now

## Function

> after

> ary

> before

> bind

> bindKey

> curry

> curryRight

**debounce**

> defer

> delay

> flip

**memoize**

> negate

**once**

> overArgs

> partial,

> partialRight,

> rearg,

> rest,

**spread**,

> throttle,

> unary,

**wrap**,

### debounce

> [Difference between debouncing and throttling](https://css-tricks.com/debouncing-throttling-explained-examples/)

> [Lodash `debounce()`](https://lodash.com/docs/4.17.15#debounce)

### memoize(func, [resolver]) (!!)

Creates a function that memoizes the result of `func`. If `resolver` is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function. By default, the first argument provided to the memoized function is used as the map cache key. The `func` is invoked with the `this` binding of the memoized function.

**Note:** The cache is exposed as the `cache` property on the memoized function. Its creation may be customized by replacing the `memoize.Cache` constructor with one whose instances implement the `Map` method interface of `clear`, `delete`, `get`, `has`, and `set`.

```javascript
var object = { a: 1, b: 2 };
var other = { c: 3, d: 4 };

var values = memoize(_.values);
values(object);
// => [1, 2]

values(other);
// => [3, 4]

object.a = 2;
values(object);
// => [1, 2]

// Modify the result cache.
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']

// Replace `_.memoize.Cache`.
memoize.Cache = WeakMap;
```

### once

```javascript
var initialize = _.once(createApplication);
initialize();
initialize();
// => `createApplication` is invoked once
```

### spread

```javascript
var say = spread(function (who, what) {
  return who + ' says ' + what;
});

say(['fred', 'hello']);
// => 'fred says hello'
```

### wrap

```javascript
var p = wrap(escape, function (func, text) {
  return '<p>' + func(text) + '</p>';
});

p('fred, barney, & pebbles');
// => '<p>fred, barney, &amp; pebbles</p>'
```

## Lang

**castArray**,

> clone,

> cloneDeep

> cloneDeepWith

> cloneWith,

> conformsTo

> eq

> gt

> gte

> isArguments

> isArray

> isArrayBuffer

> isArrayLike

> isArrayLikeObject

> isBoolean

> isBuffer

> isDate

> isElement

> isEmpty

> isEqual

> isEqualWith

> isError

> isFinite

> isFunction

> isInteger

> isLength

> isMap,

> isMatch

> isMatchWith,

> isNaN

> isNative

**isNil**

> isNull

> isNumber,

> isObject

> isObjectLike

> _isPlainObject_,

> isRegExp

> isSafeInteger

> isSet

> isString

> isSymbol

> isTypedArray

> isUndefined

> isWeakMap

> isWeakSet

> lt

> lte

> toArray,

**toFinite**

> toInteger

> toLength

> toNumber

**toPlainObject**

> toSafeInteger

> toString,

### castArray

```javascript
castArray(1);
// => [1]

castArray({ a: 1 });
// => [{ 'a': 1 }]

castArray('abc');
// => ['abc']

castArray(null);
// => [null]

castArray(undefined);
// => [undefined]

castArray();
// => []

var array = [1, 2, 3];
console.log(castArray(array) === array);
// => true
```

### isNil

Checks if value is null or undefined

### toFinite

```javascript
toFinite(Infinity); // => 1.7976931348623157e+308
```

### toPlainObject (!!)

```javascript
function Foo() {
  this.b = 2;
}

Foo.prototype.c = 3;

_.assign({ a: 1 }, new Foo());
// => { 'a': 1, 'b': 2 }

_.assign({ a: 1 }, _.toPlainObject(new Foo()));
// => { 'a': 1, 'b': 2, 'c': 3 }
```

## Math

> add,

**ceil**,

**divide**,

**floor**,

> max

> maxBy,

**mean** (arithmetisches Mittel),

> meanBy

> min

> minBy

> multiply

**round**

> subtract,

**sum**

> sumBy,

### ceil (aufrunden)

Computes number rounded up to precision.

```javascript
ceil(4.006);
// => 5

ceil(6.004, 2);
// => 6.01

ceil(6040, -2);
// => 6100
```

### divide

```javascript
divide(6, 4); // 1.5
divide(6, 0); // Infinity
```

### floor (abrunden), round (runden)

```javascript
floor(4.006); // => 4
round(4.006); // => 4

floor(0.046, 2); // => 0.04
round(0.046, 2); // => 0.05

floor(4060, -2); // => 4000
round(4060, -2); // => 4100

floor(4.006, 2); // => 4
round(4.006, 2); // => 4.01

floor(4060, -2); // => 4000
round(4060, -2); // => 4100
```

## Number

> clamp: `clamp(number, [lower], upper)`
> Clamps number within the inclusive lower and upper bounds.

**inRange**,

**random**,

### inRange(number, [start=0], end)

### random([lower=0], [upper=1], [floating])

## Object

> assign

> _assignIn_

> assignInWith

> assignWith

> at

> create

> defaults

> defaultsDeep

> entries -> toPairs

> entriesIn -> toPairsIn

> extend -> assignIn

> extendWith -> assignInWith

> findKey

> findLastKey

> forIn

> forInRight

> forOwn

> forOwnRight

> functions

> functionsIn,

**get**,

> has

> hasIn,

> _invert_

> invertBy,

> invoke,

> keys

> keysIn,

**mapKeys, mapValues,**

> merge,

> mergeWith,

> omit,

_omitBy_,

> pick,

> pickBy,

> result,

> set,

> setWith,

> toPairs,

> toPairsIn,

**transform**,

> unset,

> update,

> updateWith,

> values,

> valuesIn,

### get(object, path, [defaultValue])

Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.

**Arguments:**
object (Object): The object to query.
path (Array|string): The path of the property to get.
[defaultValue]: The value returned for undefined resolved values.

```javascript
var object = { a: [{ b: { c: 3 } }] };

get(object, 'a[0].b.c');
// => 3

get(object, ['a', '0', 'b', 'c']);
// => 3

get(object, 'a.b.c', 'default');
// => 'default'
```

### mapKeys, mapValues

```javascript
mapKeys({ a: 1, b: 2 }, function (value, key) {
  return key + value;
});
// => { 'a1': 1, 'b2': 2 }

var users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 },
};

mapValues(users, function (o) {
  return o.age;
});
// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)

// The `property` iteratee shorthand.
mapValues(users, 'age');
// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
```

### omitBy(object, [predicate=_.identity])

The opposite of `pickBy`; this method creates an object composed of the own and inherited enumerable string keyed properties of object that predicate doesn't return truthy for. The predicate is invoked with two arguments: (value, key).

```javascript
var object = { a: 1, b: '2', c: 3 };
omitBy(object); // => {}

var object = { a: 1, b: '2', c: false };
omitBy(object); // => { c: false }

var object = { a: 1, b: '2', c: 3 };
omitBy(object, isNumber); // => { b: '2' } because 2 is string
```

### transform

:) I understand, why,..

```javaScript
const a = [3, 6, 9, 7, 8];
let b = [1];

const r = transform(
  a,
  function (result, n) {
    result.push(n);
    return n % 3 === 0; // ?
  },
  b
); // => [ 1, 3, 6, 9, 7 ]
```

Hinweis: 1 war schon in b, bei 7 wird abgebrochen, wurde aber schon gepusht.

## Seq

**chain**,

**tap**,

**thru**,

> prototype[Symbol.iterator],

> prototype.at,

> prototype.chain,

> prototype.commit,

> prototype.next,

> prototype.plant,

> prototype.reverse,

> prototype.toJSON -> value,

**prototype.value**,

> prototype.valueOf -> value,

### chain, tap, thru, prototype.value()

```javascript
var users = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 1 },
];

var youngest = chain(users)
  .sortBy('age')
  .map((u) => 'age: ' + u.age)
  .head()
  .value(); // => age: 1

chain([1, 2, 3])
  .tap((c) => c.unshift(0)) // c is the whole array
  .reverse()
  .value(); // => [3,2,1,0]

chain('  abc  ')
  //.trim()
  .thru((s) => s.split(''))
  .value(); // => [ ' ', ' ', 'a', 'b', 'c', ' ', ' ' ]

chain('  abc  ')
  .trim()
  .thru((s) => s.split(''))
  .value(); // => [ 'a', 'b', 'c' ]

var array = [1, 2, 3];

chain(array).reverse().value(); // => [3,2,1]
```

## String

**camelCase**

**capitalize**

> deburr

> endsWith

**escape**

**escapeRegExp**

> kebabCase

> lowerCase

> lowerFirst

> pad

> padEnd

> padStart

> parseInt

> repeat

> replace

> snakeCase

> split

> startCase

> startsWith

**template**

> toLower

> toUpp

> tr

> trimEnd

> trimStart

**truncate**

> unescape

> upperCase

> upperFirst

> words

### camelCase, capitalize, escape, escapeRegExp

```javascript
camelCase('Foo Bar');
// => 'fooBar'

camelCase('--foo-bar--');
// => 'fooBar'

camelCase('__FOO_BAR__');
// => 'fooBar'

capitalize('FRED');
// => 'Fred'

deburr('déjà vu');
// => 'deja vu'

escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'

escapeRegExp('[lodash](https://lodash.com/)');
// => '\[lodash\]\(https://lodash\.com/\)'
```

### template

```javascript
// Use the "interpolate" delimiter to create a compiled template.
var compiled = template('hello <%= user %>!');
compiled({ user: 'fred' });
// => 'hello fred!'

// Use the HTML "escape" delimiter to escape data property values.
var compiled = template('<b><%- value %></b>');
compiled({ value: '<script>' });
// => '<b>&lt;script&gt;</b>'

// Use the "evaluate" delimiter to execute JavaScript and generate HTML.
var compiled = template(
  '<% forEach(users, function(user) { %><li><%- user %></li><% }); %>',
);
compiled({ users: ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'

// Use the internal `print` function in "evaluate" delimiters.
var compiled = template('<% print("hello " + user); %>!');
compiled({ user: 'barney' });
// => 'hello barney!'

// Use the ES template literal delimiter as an "interpolate" delimiter.
// Disable support by replacing the "interpolate" delimiter.
var compiled = template('hello ${ user }!');
compiled({ user: 'pebbles' });
// => 'hello pebbles!'

// Use backslashes to treat delimiters as plain text.
var compiled = template('<%= "\\<%- value %\\>" %>');
compiled({ value: 'ignored' });
// => '<%- value %>'

// Use the `imports` option to import `jQuery` as `jq`.
var text =
  '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
var compiled = template(text, { imports: { jq: jQuery } });
compiled({ users: ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'

// Use the `sourceURL` option to specify a custom sourceURL for the template.
var compiled = template('hello <%= user %>!', {
  sourceURL: '/basic/greeting.jst',
});
compiled(data);
// => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.

// Use the `variable` option to ensure a with-statement isn't used in the compiled template.
var compiled = template('hi <%= data.user %>!', {
  variable: 'data',
});
compiled.source;
// => function(data) {
//   var __t, __p = '';
//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
//   return __p;
// }

// Use custom template delimiters.
templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = template('hello {{ user }}!');
compiled({ user: 'mustache' });
// => 'hello mustache!'

// Use the `source` property to inline compiled templates for meaningful
// line numbers in error messages and stack traces.
fs.writeFileSync(
  path.join(process.cwd(), 'jst.js'),
  '\
  var JST = {\
    "main": ' +
    template(mainText).source +
    '\
  };\
',
);
```

### truncate

```javascript
truncate('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'

truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: ' ',
});
// => 'hi-diddly-ho there,...'

truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: /,? +/,
});
// => 'hi-diddly-ho there...'

truncate('hi-diddly-ho there, neighborino', {
  omission: ' [...]',
});
// => 'hi-diddly-ho there, neig [...]'
```

## Util

**attempt**

> bindAll

> _cond_

> _conforms_

> constant

**defaultTo**

> flow

> flowRight

**identity**

**iteratee**

> matches

> matchesProperty

> method

> methodOf

> mixin

> noConflict

> noop

> nthArg

> _over_

> overEvery

> overSome

**property**

> propertyOf

> range

> rangeRight

> runInContext

> stubArray

> stubFalse

> stubObject

> stubString

> stubTrue

> times

> toPath

> _uniqueId_

>

### attempt

```javascript
// Avoid throwing errors for invalid selectors.
var elements = attempt(function (selector) {
  return document.querySelectorAll(selector);
}, '>_>');

if (isError(elements)) {
  elements = [];
}
```

### defaultTo(value, defaultValue)

If `value` `NaN`, `null` or `undefined` then take `defaltValue`.

Checks value to determine whether a default value should be returned in its place. The defaultValue is returned if value is NaN, null, or undefined.

```javascript
_.defaultTo(1, 10);
// => 1

_.defaultTo(undefined, 10);
// => 10
```

### identity(value) (??)

This method returns the first argument it receives.

```javascript
var object = { a: 1 };

console.log(_.identity(object) === object);
// => true
```

### itaretee

```javascript
var users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
];
map(users, iteratee('user')); // => [ 'barney', 'fred' ]

filter(users, iteratee(['user', 'fred']));
// => [{ 'user': 'fred', 'age': 40 }]

// Create custom iteratee shorthands.
iteratee = wrap(iteratee, function (iteratee, func) {
  return !isRegExp(func)
    ? iteratee(func)
    : function (string) {
        return func.test(string);
      };
});

filter(['abc', 'def'], /ef/);
// => ['def']
```

### flow ([funcs])

```javascript
function myAdd(n1: number, n2: number) {
  return n1 + n2;
}

function mySquare(n: number) {
  return n * n;
}

var addSquare = flow([myAdd, mySquare]);
addSquare(1, 2); // => (1+2) * (1+2) = 9
```

### property

```javaScript
var objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];

map(objects, property('a.b'));
// => [2, 1]

map(sortBy(objects, property(['a', 'b'])), 'a.b');
// => [1, 2]
```
