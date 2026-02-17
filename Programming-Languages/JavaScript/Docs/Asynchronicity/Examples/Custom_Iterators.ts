namespace CustomIterators {
  const someCollection: any = {
    one: 'First value',
    two: 'Second value',
    three: 'Third value',
    [Symbol.iterator]() {
      let i = 0;
      const values = Object.keys(this);
      return {
        next: () => {
          return {
            value: this[values[i++]],
            done: i > values.length,
          };
        },
      };
    },
  };

  const iterator = someCollection[Symbol.iterator]();

  console.log(
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
  );

  // outputs:

  /**
  { value: 'First value', done: false }
  { value: 'Second value', done: false }
  { value: 'Third value', done: false }
  { value: undefined, done: true }
  { value: undefined, done: true }
  { value: undefined, done: true }
 */

  for (let s of someCollection) {
    console.log('Next: ', s);
  }

  // outputs:
  /**
  Next:  First value
  Next:  Second value
  Next:  Third value
  */
}
