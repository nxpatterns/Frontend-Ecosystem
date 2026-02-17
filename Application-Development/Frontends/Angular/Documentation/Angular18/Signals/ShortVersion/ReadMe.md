# Signals

- Writable
- Computed

## Writable Signals

```ts
const count = signal(0);
// Signals are getter functions - calling them reads their value.
console.log('The count is: ' + count());
```

To change the value of a writable signal, either `.set()` it directly:

```ts
count.set(3);
```

or use the `.update()` operation to compute a new value from the previous one:

```ts
// Increment the count by 1.
count.update(value => value + 1);
```

Writable signals have the type `WritableSignal`.
