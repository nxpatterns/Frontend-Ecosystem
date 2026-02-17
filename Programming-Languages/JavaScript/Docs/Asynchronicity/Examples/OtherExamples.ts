import assert from 'assert/strict';

namespace Closure1 {
  function f1(value: string) {
    return () => value;
  }
  const f2 = f1('Hi');
  assert.equal(typeof f2(), 'string');
  assert.equal(f2(), 'Hi');
  console.log('F2: ', f2());
}

namespace Closure2 {
  function createInc(startValue: number) {
    return (step: number) => {
      startValue += step;
      return startValue;
    };
  }

  const inc = createInc(3);

  console.log('inc: ', inc(4));
}
