# TypeScript Types

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Everyday Types](#everyday-types)
  - [The primitives](#the-primitives)
    - [string](#string)
    - [number](#number)
    - [boolean](#boolean)
  - [Arrays](#arrays)
  - [any](#any)
  - [Functions](#functions)
  - [Object Types](#object-types)
  - [Union Types](#union-types)
  - [Interfaces](#interfaces)
    - [Interfaces vs Types](#interfaces-vs-types)
      - [Extending](#extending)
        - [Interface](#interface)
        - [Type](#type)
      - [Adding New Fields](#adding-new-fields)
        - [Interface](#interface-1)
        - [Type](#type-1)
  - [Type Assertions](#type-assertions)
  - [Literal Inference Issue](#literal-inference-issue)
  - [`null` and `undefined`](#null-and-undefined)
    - [strictNullChecks off](#strictnullchecks-off)
    - [strictNullChecks on](#strictnullchecks-on)
    - [Non-null Assertion Operator (Postfix `!`)](#non-null-assertion-operator-postfix)
  - [Enums](#enums)
- [Creating Types from Types](#creating-types-from-types)
  - [Generics](#generics)
    - [Generic Constraints](#generic-constraints)
    - [Using Type Parameters in Generic Constraints](#using-type-parameters-in-generic-constraints)
    - [Using Class Types in Generics](#using-class-types-in-generics)
      - [Mixins](#mixins)
  - [`keyof` Type Operator](#keyof-type-operator)
  - [`typeof` & ReturnType Operator](#typeof-returntype-operator)
  - [Indexed Access Types](#indexed-access-types)
  - [Conditional Types](#conditional-types)
    - [Conditional Type Constraints](#conditional-type-constraints)
      - [Using `infer` keyword (&rarr; MORE EXAMPLES NECESSARY!)](#using-infer-keyword-rarr-more-examples-necessary)
    - [Distributive Conditional Types](#distributive-conditional-types)
  - [Mapped Types](#mapped-types)
    - [Mapping Modifiers](#mapping-modifiers)
    - [Key Remapping via `as`](#key-remapping-via-as)
  - [Template Literal Types](#template-literal-types)
    - [String Unions in Types](#string-unions-in-types)
    - [Inference with Template Literals](#inference-with-template-literals)
    - [Intrinsic String Manipulation Types](#intrinsic-string-manipulation-types)

<!-- /code_chunk_output -->

## Everyday Types

### The primitives

#### string

#### number

#### boolean

### Arrays

```ts
const arr: Array<string> = ['s', 't'];
```

### any

When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.

You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) to flag any implicit any as an error.

### Functions

```ts
function greetMe(name: string): string {
  return `Hi ${name}!`;
}
```

### Object Types

```ts
// The parameter's type annotation is an object type
function printC(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printC({ x: 3, y: 7 });
```

or better:

```ts
type Point = {
  x: number;
  y: number;
};

function printC(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printC({ x: 3, y: 7 });
```

### Union Types

```ts
type Id = number | string; // <-- Id is a union type

function getId(id: Id): string {
  return String(id);
}

typeof getId(4); // string
```

Numeric literal types work the same way:

```ts
type OneOf = -1 | 0 | 1;
function compare(a: string, b: string): OneOf {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

### Interfaces

> Tip: You don't have to repeat prop-names within the class, it they have the same name:

```ts
interface SomeClass {
  propOne: string;
  propTwo: number;
}
class SomeClass {
  constructor(one: string, two: number) {
    this.propOne = one;
    this.propTwo = two;
  }
}
```

#### Interfaces vs Types

##### Extending

###### Interface

```ts
interface Mammal {
  name: string;
}

interface Human extends Mammal {
  brain: boolean;
}
```

###### Type

```ts
type Mammal = {
  name: string;
};

type Human = Mammal & {
  brain: boolean;
};
```

##### Adding New Fields

###### Interface

```ts
interface Human {
  kind: string;
}

interface Human {
  brain: boolean;
}

class Human implements Human {
  constructor() {
    this.kind = 'Homo Sapiens';
    this.brain = true; // hopefully
  }
}

let h = new Human();
// Human { kind: 'Homo Sapiens', brain: true }
```

###### Type

A type cannot be changed after being created

### Type Assertions

Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.

In this situation, you can use a type assertion to specify a more specific type:

```ts
const myCanvas = document.getElementById(
  'main_canvas',
) as HTMLCanvasElement;
```

You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:

```ts
const myCanvas = <HTMLCanvasElement>(
  document.getElementById('main_canvas')
);
```

### Literal Inference Issue

```ts
const req = { url: 'https://example.com', method: 'GET' };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable
// to parameter of type '"GET" | "POST"'.
```

There are two ways to work around this.

1. You can change the inference by adding a type assertion in either location:

```ts
// Change 1:
const req = {
  url: 'https://example.com',
  method: 'GET' as 'GET',
};
// Change 2
handleRequest(req.url, req.method as 'GET');
```

2. You can use as const to convert the entire object to be type literals:

```ts
const req = {
  url: 'https://example.com',
  method: 'GET',
} as const;
handleRequest(req.url, req.method);
```

### `null` and `undefined`

JavaScript has two primitive values used to signal absent or uninitialized value: null and undefined.

TypeScript has two corresponding types by the same names. How these types behave depends on whether you have the `strictNullChecks` option on.

#### strictNullChecks off

With `strictNullChecks` off, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type. This is similar to how languages without `null` checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; we always recommend people turn `strictNullChecks` on if it’s practical to do so in their codebase.

#### strictNullChecks on

With `strictNullChecks` on, when a value is `null` or `undefined`, you will need to test for those values before using methods or properties on that value. Just like checking for `undefined` before using an optional property, we can use narrowing to check for values that might be `null`:

```ts
function doSomething(x: string | undefined) {
  if (x === undefined) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase());
  }
}
```

#### Non-null Assertion Operator (Postfix `!`)

TypeScript also has a special syntax for removing `null` and `undefined` from a type without doing any explicit checking. Writing `!` after any expression is effectively a type assertion that the value isn’t `null` or `undefined`:

```ts
function liveDangerously(x?: number | undefined) {
  // I know x will be always a number, hopefully
  console.log(x!.toFixed());
}
```

### Enums

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;
```

## Creating Types from Types

### Generics

`<T>` is a kind of placeholder, you can write anything there like `<WhatEver>`:

```ts
function identity<T>(arg: T): T {
  return arg;
}
let outputString = identity<string>('myString'); //?
let outputNumber = identity<number>(2); //?
```

#### Generic Constraints

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity(3); // <-- ERROR
// Argument of type 'number' is not assignable
// to parameter of type 'Lengthwise'.ts(2345)

loggingIdentity({ length: 7 }); // OK
loggingIdentity({ length: 10, value: 3 }); // OK
```

#### Using Type Parameters in Generic Constraints

```ts
function getProperty<Type, Key extends keyof Type>(
  obj: Type,
  key: Key,
) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a'); // OK --> 1
getProperty(x, 'm'); // ERROR
// Argument of type '"m"' is not assignable to
// parameter of type '"a" | "b" | "c" | "d"'.ts(2345)
```

#### Using Class Types in Generics

When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. For example:

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

##### Mixins

A more advanced example uses the prototype property to infer and constrain relationships between the constructor function and the instance side of class types. (This pattern is used to power the [`mixins`](https://www.typescriptlang.org/docs/handbook/mixins.html) design pattern.)

```ts
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

### `keyof` Type Operator

The keyof operator takes an object type and produces a string or numeric literal union of its keys:

```ts
type Point = { x: number; y: number };
type P = keyof Point;
```

If the type has a string or number index signature, keyof will return those types instead:

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
//   ^ = type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
//   ^ = type M = string | number
```

Note that in this example, `M` is `string | number` — this is because JavaScript object keys are always coerced to a string, so `obj[0]` is always the same as `obj["0"]`.

keyof types become especially useful when combined with mapped types, which we’ll learn more about later.

### `typeof` & ReturnType Operator

```ts
type WhatEverType = {
  x: number;
  y: number;
};

type Predicate = (x: unknown) => WhatEverType;

// predefined type ReturnType<T>
type K = ReturnType<Predicate>;

/*
type K = {
    x: number;
    y: number;
}
*/
```

If we try to use ReturnType on a function name, we see an instructive error:

```ts
type WhatEverType = {
  x: number;
  y: number;
};

function f(): WhatEverType {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>; // ERROR
// 'f' refers to a value, but is being used as a type here.
// Did you mean 'typeof f'?

type T = ReturnType<typeof f>; // OK

/*
  type T = {
      x: number;
      y: number;
  }
  */
```

### Indexed Access Types

We can use an indexed access type to look up a specific property on another type:

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person['age'];
//   ^ = type Age = number
```

The indexing type is itself a type, so we can use unions, keyof, or other types entirely:

```ts
type I1 = Person['age' | 'name'];
//   ^ = type I1 = string | number

type I2 = Person[keyof Person];
//   ^ = type I2 = string | number | boolean

type AliveOrName = 'alive' | 'name';
type I3 = Person[AliveOrName];
//   ^ = type I3 = string | boolean
```

You’ll even see an error if you try to index a property that doesn’t exist:

```ts
type I1 = Person['alve']; // ERROR
// Property 'alve' does not exist on type 'Person'.
```

Another example of indexing with an arbitrary type is using number to get the type of an array’s elements. We can combine this with typeof to conveniently capture the element type of an array literal:

```ts
const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
];

// only `number` is a index type in this case
type Person = typeof MyArray[number];
//   ^ = type Person = {
//       name: string;
//       age: number;
//   }
type Name = typeof MyArray[number]['name'];
//   ^ = type Name = string
type Age = typeof MyArray[number]['age'];
//   ^ = type Age = number
// Or
type Age2 = Person['age'];
//   ^ = type Age2 = number
```

You can only use types when indexing, meaning you can’t use a const to make a variable reference:

```ts
const key = 'age';
type Age = Person[key]; // ERROR
// Type 'any' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here.
// Did you mean 'typeof key'?
```

However, you can use a type alias for a similar style of refactor:

```ts
type key = 'age';
type Age = Person[key];
```

### Conditional Types

```ts
SomeType extends OtherType ? TrueType : FalseType;

interface Mammal {
    live(): void;
}
interface Human extends Mammal {
    think(): void;
}

type Example1 = Human extends Mammal ? number : string;
//   ^ type Example1 = number

type Example2 = Mammal extends Human ? number : string;
//   ^ type Example2 = string
```

From the examples above, conditional types might not immediately seem useful - we can tell ourselves whether or not `Human` extends `Mammal` and pick number or string! But the power of conditional types comes from using them with generics:

```ts
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;

function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  if (typeof nameOrId === 'string') {
    return { name: nameOrId };
  } else return { id: nameOrId };
}

createLabel(3); // { id: 3 }
createLabel('George'); // { name: 'George' }
```

Improvement:

```ts
type IdLabel = { id: number };
type NameLabel = { name: string };

type NameOrIdType<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(
  paramNameOrId: T,
): NameOrIdType<T> {
  if (typeof paramNameOrId === 'string') {
    return <NameOrIdType<T>>(<unknown>{ name: paramNameOrId });
  } else {
    return <NameOrIdType<T>>(<unknown>{ id: paramNameOrId });
  }
}

let a = createLabel('typescript'); // { name: 'typescript' }
let b = createLabel(4.1); // { id: 4.1 }
```

#### Conditional Type Constraints

Often, the checks in a conditional type will provide us with some new information. Just like with narrowing with type guards can give us a more specific type, the true branch of a conditional type will further constraint generics by the type we check against.

For example, let’s take the following:

```ts
type MessageOf<T> = T["message"];

ERROR: Type '"message"' cannot be used to index type 'T'.
```

In this example, TypeScript errors because `T` isn’t known to have a property called message. We could constrain `T`, and TypeScript would no longer complain:

```ts
type MessageOf<T extends { message: unknown }> = T['message'];
interface Email {
  message: string;
}
type EmailMessageContents = MessageOf<Email>;
//   ^ = type EmailMessageContents = string
```

However, what if we wanted MessageOf to take any type, and default to something like never if a message property isn’t available? We can do this by moving the constraint out and introducing a conditional type:

```ts
type MessageOf<T> = T extends { message: unknown }
  ? T['message']
  : never;

interface Email {
  message: string;
}

interface Dog {
  woff(): void;
}

type EmailMessageContents = MessageOf<Email>;
//   ^ = type EmailMessageContents = string

type DogMessageContents = MessageOf<Dog>;
//   ^ = type DogMessageContents = never
```

As another example, we could also write a type called Flatten that flattens array types to their element types, but leaves them alone otherwise:

```ts
type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;
//   ^ = type Str = string

// Leaves the type alone.
type Num = Flatten<number>;
//   ^ = type Num = number
```

When `Flatten` is given an array type, it uses an indexed access with `number` to fetch out `string[]`’s element type. Otherwise, it just returns the type it was given.

##### Using `infer` keyword (&rarr; MORE EXAMPLES NECESSARY!)

> **to infer:** schlussfolgern, etw. schließen, erschließen (from &rarr; aus)

We just found ourselves using conditional types to apply constraints and then extract out types. This ends up being such a common operation that conditional types make it easier.

Conditional types provide us with a way to infer from types we compare against in the true branch using the `infer` keyword. For example, we could have inferred the element type in `Flatten` instead of fetching it out “manually” with an indexed access type:

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

Here, we used the `infer` keyword to declaratively introduce a new generic type variable named `Item` instead of specifying how to retrieve the element type of `T` within the true branch. This frees us from having to think about how to dig through and probing apart the structure of the types we’re interested in.

We can write some useful helper type aliases using the `infer` keyword. For example, for simple cases, we can extract the return type out from function types:

```ts
type GetReturnType<Type> = Type extends (
  ...args: never[]
) => infer Return
  ? Return
  : never;

type SomeObjectType = { a: string; b: number };

type FNum = () => number;
type FStr = () => string;
type FArrStr = (arg: SomeObjectType) => Array<string>;
type FObj = () => SomeObjectType;
type FVoid = () => void;

type Num = GetReturnType<FNum>;
//   ^ type Num = number
type Str = GetReturnType<FStr>;
//   ^ type Str = string
type ArrStr = GetReturnType<FArrStr>;
//   ^ type ArrStr = Array<string>
type Obj = GetReturnType<FObj>;
//   ^ type Obj = { a: string; b: number; }
type Void = GetReturnType<FVoid>;
//   ^ type Void = void
```

When inferring from a type with multiple call signatures (such as the type of an overloaded function), inferences are made from the last signature (which, presumably, is the most permissive catch-all case). It is not possible to perform overload resolution based on a list of argument types.

```ts
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;
//   ^ = type T1 = string | number
```

#### Distributive Conditional Types

When conditional types act on a generic type, they become distributive when given a union type. For example, take the following:

```ts
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;
//   ^ type StrArrOrNumArr = Array<string> | Array<number>
```

What happens here is that StrOrNumArray distributes on:

```ts
string | number;
```

and maps over each member type of the union, to what is effectively:

```ts
ToArray<string> | ToArray<number>;
```

which leaves us with:

```ts
string[] | number[];
```

Typically, distributivity is the desired behavior. To avoid that behavior, you can surround each side of the extends keyword with square brackets.

```ts
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'StrOrNumArr' is no longer a union.
type StrOrNumArr = ToArrayNonDist<string | number>;
//   ^ = type StrOrNumArr = (string | number)[]
```

### Mapped Types

When you don’t want to repeat yourself, sometimes a type needs to be based on another type.

Mapped types build on the syntax for index signatures, which are used to declare the types of properties which has not been declared ahead of time:

```ts
type Horse = {};

type OnlyBooleansAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBooleansAndHorses = {
  del: true,
  rodney: false,
};
```

A mapped type is a generic type which uses a union created via a keyof to iterate through the keys of one type to create another. In this example below, OptionFlags will take all the properties from the type Type and change their values to be a boolean:

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
/*   ^ type FeatureOptions = {
         darkMode: boolean;
         newUserProfile: boolean;
       } 
*/
```

#### Mapping Modifiers

There are two additional modifiers which can be applied during mapping: readonly and ? which affect mutability and optionality respectively.

You can remove or add these modifiers by prefixing with `-` or `+`. If you don’t add a prefix, then `+` is assumed.

Example 1: Removes 'readonly' attributes from a type's properties

```ts
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
//   ^ = type UnlockedAccount = {
//       id: string;
//       name: string;
//   }
```

Example 2: Removes 'optional' attributes from a type's properties

```ts
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;
//   ^ = type User = {
//       id: string;
//       name: string;
//       age: number;
//   }
```

#### Key Remapping via `as`

In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type:

```ts
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};
```

You can leverage features like [template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) to create new property names from prior ones:

```ts
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPersonType = Getters<Person>;
//   ^ = type LazyPerson = {
//       getName: () => string;
//       getAge: () => number;
//       getLocation: () => string;
//   }
```

You can filter out keys by producing never via a conditional type:

```ts
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<
    Property,
    'kind'
  >]: Type[Property];
};

interface Circle {
  kind: 'circle';
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
//   ^ = type KindlessCircle = {
//       radius: number;
//   }
```

Mapped types work well with other features in this type manipulation section, for example here is a mapped type using a conditional type which returns either a true or false depending on whether an object has the property pii set to the literal true:

```ts
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true }
    ? true
    : false;
};

type DBFields = {
  id: { format: 'incrementing' };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
//   ^ = type ObjectsNeedingGDPRDeletion = {
//       id: false;
//       name: true;
//   }
```

### Template Literal Types

Template literal types build on [string literal types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types), and have the ability to expand into many strings via unions.

They have the same syntax as [template literal strings in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), but are used in type positions. When used with concrete literal types, a template literal produces a new string literal type by concatenating the contents.

```ts
type World = 'world';

type Greeting = `hello ${World}`;
//   ^ = type Greeting = "hello world"
```

When a union is used in the interpolated position, the type is the set of every possible string literal that could be represented by each union member:

```ts
type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
//   ^ = type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

For each interpolated position in the template literal, the unions are cross multiplied:

```ts
type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = 'en' | 'ja' | 'pt';

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
//   ^ = type LocaleMessageIDs =
//       | 'en_welcome_email_id'
//       | 'en_email_heading_id'
//       | 'en_footer_title_id'
//       | 'en_footer_sendoff_id'
//       | 'ja_welcome_email_id'
//       | 'ja_email_heading_id'
//       | 'ja_footer_title_id'
//       | 'ja_footer_sendoff_id'
//       | 'pt_welcome_email_id'
//       | 'pt_email_heading_id'
//       | 'pt_footer_title_id'
//       | 'pt_footer_sendoff_id';
```

TS-Team generally recommend that people use ahead-of-time generation for large string unions, but this is useful in smaller cases.

#### String Unions in Types

The power in template literals comes when defining a new string based off an existing string inside a type.

For example, a common pattern in JavaScript is to extend an object based on the fields that it currently has. We’ll provide a type definition for a function which adds support for an on function which lets you know when a value has changed (additionally, makeWatchedObject has to be defined):

```ts
type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void,
  ): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type,
): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: 'Saoirse',
  lastName: 'Ronan',
  age: 26,
});

person.on('firstNameChanged', (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

// It's typo-resistent
person.on('firstName', () => {});
// Argument of type '"firstName"' is not assignable
// to parameter of type '"firstNameChanged" | "lastNameChanged"
// | "ageChanged"'.
```

#### Inference with Template Literals

Note how the last examples did not re-use the type of the original value. The callback used an `any`. Template literal types can infer from substitution positions.

We can make our last example generic to infer from parts of the `eventName` string to figure out the associated property.

```ts
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void,
  ): void;
};

declare function makeWatchedObject<Type>(
  obj: Type,
): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: 'Saoirse',
  lastName: 'Ronan',
  age: 26,
});

person.on('firstNameChanged', (newName) => {
  //                           ^?
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on('ageChanged', (newAge) => {
  //                     ^?
  if (newAge < 0) {
    console.warn('warning! negative age');
  }
});

person.firstName = 'Hi';
```

Here we made `on` into a generic method.

When a user calls with the string `firstNameChanged`, TypeScript will try to infer the right type for `Key`. To do that, it will match `Key` against the content prior to `Changed` and infer the string `firstName`. Once TypeScript figures that out, the `on` method can fetch the type of `firstName` on the original object, which is `string` in this case. Similarly, when called with `ageChanged`, TypeScript finds the type for the property `age` which is `number`.

Inference can be combined in different ways, often to deconstruct strings, and reconstruct them in different ways.

#### Intrinsic String Manipulation Types

To help with string manipulation, TypeScript includes a set of types which can be used in string manipulation. These types come built-in to the compiler for performance and can’t be found in the .d.ts files included with TypeScript.

```ts
Uppercase<StringType>
Lowercase<StringType>
Capitalize<StringType>
Uncapitalize<StringType>
```

Examples:

```ts
type Greeting = 'Hello, world';
type ShoutyGreeting = Uppercase<Greeting>;
//   ^ = type ShoutyGreeting = "HELLO, WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<'my_app'>;
//   ^ = type MainID = "ID-MY_APP"
```

```ts
type Greeting = 'Hello, world';
type QuietGreeting = Lowercase<Greeting>;
//   ^ = type QuietGreeting = "hello, world"

type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`;
type MainID = ASCIICacheKey<'MY_APP'>;
//   ^ = type MainID = "id-my_app"
```

```ts
type LowercaseGreeting = 'hello, world';
type Greeting = Capitalize<LowercaseGreeting>;
//   ^ = type Greeting = "Hello, world"
```

```ts
type UppercaseGreeting = 'HELLO WORLD';
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
//   ^ = type UncomfortableGreeting = "hELLO WORLD"
```

The code, as of TypeScript 4.1, for these intrinsic functions uses the JavaScript string runtime functions directly for manipulation and are not locale aware.

```ts
function applyStringMapping(symbol: Symbol, str: string) {
  switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
    case IntrinsicTypeKind.Uppercase:
      return str.toUpperCase();
    case IntrinsicTypeKind.Lowercase:
      return str.toLowerCase();
    case IntrinsicTypeKind.Capitalize:
      return str.charAt(0).toUpperCase() + str.slice(1);
    case IntrinsicTypeKind.Uncapitalize:
      return str.charAt(0).toLowerCase() + str.slice(1);
  }
  return str;
}
```
