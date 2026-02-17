namespace PromiseAny1 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.resolve('P1 resolve');
  const promise2 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P2 Foo');
  });
  const promise3 = Promise.reject('P3 reject');

  Promise.any([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P1 resolve

namespace PromiseAny2 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.reject('P1 reject');
  const promise2 = Promise.resolve('P2 resolve');
  const promise3 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P3 Foo');
  });

  Promise.any([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P2 resolve

namespace PromiseAny3 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.reject('P1 reject');
  const promise2 = Promise.reject('P2 reject');
  const promise3 = new Promise((_resolve, reject) => {
    setTimeout(reject, 100, 'P3 reject');
  });

  Promise.any([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// Error:  [AggregateError: All promises were rejected]

namespace PromiseAny4 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = Promise.reject('P1 reject');
  const promise2 = Promise.reject('P2 reject');
  const promise3 = new Promise((_resolve, reject) => {
    setTimeout(reject, 100, 'P3 reject');
  });
  const promise4 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 200, 'P4 resolve');
  });

  Promise.any([promise1, promise2, promise3, promise4])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P4 resolve
