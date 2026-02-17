import assert from 'assert/strict';

namespace example1 {
  function* gen() {
    yield 'a';
    yield 'b';
  }

  const iterator = gen();
  assert.deepEqual(Array.from(iterator), ['a', 'b']);

  console.log(iterator.next(), iterator.next(), iterator.next());

  /**
   * {value: 'a', done: false}
   * {value: 'b', done: false}
   * {value: undefined, done: true}
   */
}

namespace example2 {
  function* genLines() {
    yield 'Sentence one';
    yield 'Sentence two';
  }

  function* genNumberLines(genLinesIterable: Generator) {
    let lineNo = 1;
    for (const line of genLinesIterable) {
      yield lineNo++ + ') ' + line;
    }
  }

  const numberedLines = genNumberLines(genLines());

  console.log(
    numberedLines.next(),
    numberedLines.next(),
    numberedLines.next(),
    numberedLines.next(),
  );

  /**
   * { value: '1) Sentence one', done: false }
   * { value: '2) Sentence two', done: false }
   * { value: undefined, done: true }
   * { value: undefined, done: true }
   */
}
