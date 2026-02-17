# Serializing Circular Objects in JavaScript

## Serialize Fuction

```js
function serialize(obj) {
  const visited = new Set();
  const stack = [obj];
  while (stack.length > 0) {
    const node = stack.pop();
    if (typeof node === 'object' && node !== null && !visited.has(node)) {
      visited.add(node);
      for (const key in node) {
        stack.push(node[key]);
      }
    }
  }
  visited.clear();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (visited.has(value)) {
        return '[Circular]';
      }
      visited.add(value);
    }
    return value;
  });
}

```

## Usage Example

```js
// Create a object
const a = {
  b: {
    c: 'Hi'
  }
};

// Create a circular reference
a.b.d = a;

// Serialize the object
const serialized = serialize(a);
console.log(serialized);

// outputs:
// {"b":{"c":"Hi","d":"[Circular]"}}
```
