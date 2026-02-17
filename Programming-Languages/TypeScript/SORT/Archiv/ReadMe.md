# TypeScript concepts & some advanced topics

## Introduction

> First rule: use `let` instead of `var` whenever possible

### Declaration

```typescript
// It is a question of style
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

### void

```typescript
function warnUser(): void {
  alert('This is my warning message');
}
```

### undefined, null

By default `null` and `undefined` are subtypes of all other types. That means you can assign null and undefined to something like `number`. However, when using the `--strictNullChecks` flag, null and undefined are only assignable to void and their respective types.

```typescript
let u: undefined = undefined;
let n: null = null;
```

### never

The never type represents the type of values that never occur.

```typescript
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}
```

### Type assertions

```typescript
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

## Tidbits

### Destructuring

```typescript
function f([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}

let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```

#### Default Values

```typescript
function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject;
}
```

#### Function Declaration

The snippet below is an example of type inference

```javascript
function f({ a, b } = { a: "", b: 0 }): void {
    // ...
}
f(); // ok, default to { a: "", b: 0 }
```

### Spread Operator `...`

```typescript
// Arrays

let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5]; // [0, 1, 2, 3, 4, 5]

// Objects

let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' };

// IMPORTANT: The Order is important, food will be overwritten
// Processing from left to right

let search = { ...defaults, food: 'rich' }; // =  { food: "rich", price: "$$", ambiance: "noisy" }

// IMPORTANT: Order is different, compare the result with the previous one

let search = { food: 'rich', ...defaults }; //  { food: "spicy", price: "$$", ambiance: "noisy" }
```

Object spread also has a couple of other surprising limits. First, it only includes an objects’ `own, enumerable properties`. Basically, that means you lose methods when you spread instances of an object:

```typescript
class C {
  p = 12;
  m() {}
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

Second, the Typescript compiler doesn’t allow spreads of type parameters from generic functions. That feature is expected in future versions of the language.

### readonly

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

TypeScript comes with a `ReadonlyArray<T>` type that is the same as `Array<T>` with all mutating methods removed, so you can make sure you don’t change your arrays after creation:

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to a normal array is illegal. You can still override it with a type assertion, though:

```typescript
a = ro as number[];
```

#### readonly vs const

The easiest way to remember whether to use readonly or const is to ask whether you’re using it on a variable or a property. Variables use const whereas properties use readonly.

## Interfaces

It is about defining contracts within your code as well as contracts with code outside of your project:

```typescript
interface SquareConfig {
  color: string; // required
  width?: number; // optional
}
```

### Excess Property Checks
