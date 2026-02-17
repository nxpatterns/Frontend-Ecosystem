namespace PromiseRace1 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P1 resolve');
  });
  const promise2 = Promise.resolve('P2 resolve');
  const promise3 = Promise.reject('P3 reject');

  Promise.race([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// P2 resolve

namespace PromiseRace2 {
  const errorHandler = (err: any) => console.log('Error: ', err);

  const promise1 = new Promise((resolve, _reject) => {
    setTimeout(resolve, 100, 'P1 resolve');
  });
  const promise2 = Promise.reject('P2 reject');
  const promise3 = Promise.resolve('P3 resolve');

  Promise.race([promise1, promise2, promise3])
    .then((values) => {
      console.log(values);
    })
    .catch(errorHandler);
}

// outputs:
// Error:  P2 reject
