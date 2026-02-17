const obj = { foo: 'Hello', bar: '2018' };
console.log(Object.entries(obj));


// Or, using array extras
Object.entries(obj).forEach(([key, value]) => {
    console.log(`${key} ${value}`);
});

// foo Hello
// bar 2018