Promise.race([])
  .then((res) => console.log('will never run', res))
  .catch((err) => console.log('this either', err));

Promise.race('')
  .then((res) => console.log('will never run', res))
  .catch((err) => console.log('this either', err));
