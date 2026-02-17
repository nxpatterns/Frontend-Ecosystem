# Generators (ES6 Generators)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Generator Example](#generator-example)
- [Better: Avoid Generators and use instead:](#better-avoid-generators-and-use-instead)

<!-- /code_chunk_output -->

## Generator Example

```js
function* counter1() {
  let i = 0;
  while (true) {
    i++;
    yield i;
  }
}

const gen1 = counter1();

console.log(gen1.next().value); // 1
console.log(gen1.next().value); // 2
console.log(gen1.next().value); // 3
```

## Better: Avoid Generators and use instead:

```js
function counter2() {
  let i = 0;
  return {
    next() {
      i++;
      return { value: i };
    },
  };
}

const gen2 = counter2();

console.log(gen2.next().value); // 1
console.log(gen2.next().value); // 2
console.log(gen2.next().value); // 3

function counter3() {
  let i = 0;
  return function next() {
    i++;
    return i;
  };
}

const gen3 = counter3();

console.log(gen3()); // 1
console.log(gen3()); // 2
console.log(gen3()); // 3
```
