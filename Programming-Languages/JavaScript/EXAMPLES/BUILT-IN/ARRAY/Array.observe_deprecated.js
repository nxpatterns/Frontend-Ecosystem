var arr = ['a', 'b', 'c'];

Array.observe(arr, function(changes) {
    console.log(changes);
});

// Array.observe is not a function