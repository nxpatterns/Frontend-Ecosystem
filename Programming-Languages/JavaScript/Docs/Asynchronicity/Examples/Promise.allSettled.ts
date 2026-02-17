namespace PromiseAllSettled {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  const p4 = Promise.reject(3);

  Promise.allSettled([promise1, promise2, promise3, p4])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// ouputs:

[
  { status: 'fulfilled', value: 3 },
  { status: 'fulfilled', value: 42 },
  { status: 'fulfilled', value: 'foo' },
  { status: 'rejected', reason: 3 },
];
