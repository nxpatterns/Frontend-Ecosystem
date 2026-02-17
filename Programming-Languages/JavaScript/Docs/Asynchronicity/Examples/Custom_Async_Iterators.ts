namespace CustomAsyncIterators {
  const someCollection: any = {
    one: 'First value',
    two: 'Second value',
    three: 'Third value',
    [Symbol.asyncIterator]() {
      let i = 0;
      const values = Object.keys(this);
      return {
        next: () => {
          return new Promise((resolve, _reject) => {
            setTimeout(() => {
              resolve({
                value: this[values[i++]],
                done: i > values.length,
              });
            }, 1000);
          });
        },
      };
    },
  };

  const iterator = someCollection[Symbol.asyncIterator]();

  iterator.next().then((result: any) => {
    console.log('Result: ', result);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result);
  });

  // outputs after 1 second (= 1000ms)
  /**
  Result:  { value: 'First value', done: false }
  Result:  { value: 'Second value', done: false }
  Result:  { value: 'Third value', done: false }
  Result:  { value: undefined, done: true }
  Result:  { value: undefined, done: true }
  Result:  { value: undefined, done: true }
  */
}
