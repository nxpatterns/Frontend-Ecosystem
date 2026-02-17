# Ordinals

```js
export function suffix(n: number) {
  n %= 100;
  return Math.floor(n / 10) === 1
    ? 'th'
    : n % 10 === 1
    ? 'st'
    : n % 10 === 2
    ? 'nd'
    : n % 10 === 3
    ? 'rd'
    : 'th';
}

export function ordinal(n: number) {
  return `${n}${suffix(n)}`;
}

console.log(ordinal(1)); // 1st
console.log(ordinal(2)); // 2nd
console.log(ordinal(3)); // 3rd
console.log(ordinal(4)); // 4th
console.log(ordinal(11)); // 11th
console.log(ordinal(21)); // 21st
```
