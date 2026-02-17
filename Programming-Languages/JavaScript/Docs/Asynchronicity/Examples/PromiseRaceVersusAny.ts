namespace example1 {
  const pA = new Promise((_, reject) => {
    setTimeout(reject, 1000, 'A');
  });
  const pB = new Promise((resolve, _) => {
    setTimeout(resolve, 1600, 'B');
  });

  const pC = new Promise((resolve, _) => {
    setTimeout(resolve, 1300, 'C');
  });

  Promise.race([pA, pB])
    .then((response) => {
      console.log('Promise.race() \t A,B response: \t', response);
    })
    .catch((err) =>
      console.log('Promise.race() \t A,B error: \t', err),
    );
  Promise.any([pA, pB])
    .then((response) => {
      console.log('Promice.any() \t A,B response: \t', response);
    })
    .catch((err) =>
      console.log('Promice.any() \t A,B Error: \t', err),
    );

  Promise.race([pB, pC])
    .then((response) => {
      console.log('Promise.race() \t B,C response: \t', response);
    })
    .catch((err) =>
      console.log('Promise.race() \t B,C error: \t', err),
    );
  Promise.any([pB, pC])
    .then((response) => {
      console.log('Promice.any() \t B,C response: \t', response);
    })
    .catch((err) =>
      console.log('Promice.any() \t B,C Error: \t', err),
    );

  // outputs:

  /**
    Promise.race()   A,B error:      A
    Promise.race()   B,C response:   C
    Promice.any()    B,C response:   C
    Promice.any()    A,B response:   B
  */
}
