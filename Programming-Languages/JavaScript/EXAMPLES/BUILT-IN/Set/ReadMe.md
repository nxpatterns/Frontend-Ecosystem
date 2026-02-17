# Set

## Unique Array (avoiding doubles / distinct)

```typescript

const uniqueArray = arr => [...new Set(arr)];

console.log (uniqueArray([1,2,3,1,2,3,1,1])); // [1,2,3]

```
