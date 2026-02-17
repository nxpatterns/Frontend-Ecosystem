var o = {
    foo: 'love',
    bar: [1,2,3]
};

console.log (
    o.propertyIsEnumerable('foo'),    // true
    o.propertyIsEnumerable('bar'),    // true
    o.propertyIsEnumerable('length'), // false
    Object.getOwnPropertyDescriptors(o)
);