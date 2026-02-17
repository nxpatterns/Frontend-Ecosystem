namespace example1 {
  const starWarsPeople: any = {
    one: 'First value',
    two: 'Second value',
    three: 'Third value',
  };

  starWarsPeople[Symbol.iterator] = function* () {
    for (let key in this) {
      yield this[key];
    }
  };

  const iterator = starWarsPeople[Symbol.iterator]();

  console.log(
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
  );
}
