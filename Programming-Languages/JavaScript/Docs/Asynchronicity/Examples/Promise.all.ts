namespace PromiseAllOneRejects {
  const successHandler = (success: any) =>
    console.log('Success: ', success);
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  const p4 = Promise.reject(3);

  Promise.all([promise1, promise2, promise3, p4])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);

  // Error: 3
}

namespace PromiseAllFullfills {
  const successHandler = (success: any) =>
    console.log('Success: ', success);
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  Promise.all([promise1, promise2, promise3])
    .then((values) => {
      console.log('Values: ', values);
    })
    .catch(errorHandler);

  // outputs: [ 3, 42, 'foo' ]
}
