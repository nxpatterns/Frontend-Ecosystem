namespace example1 {
  const successHandler = (success: any) =>
    console.log('Success: ', success);
  const errorHandler = (err: any) => console.log('Error: ', err);

  const p1 = Promise.reject('An arbitrary rejection');
  p1.then(successHandler, errorHandler);
  // outputs: Error:  An arbitrary rejection

  const p2 = Promise.resolve('An arbitrary success message');
  p2.then(successHandler, errorHandler);
  // outputs: Success:  An arbitrary success message

  // that is also possible
  p1.catch(errorHandler); // An arbitrary rejection
  p2.catch(errorHandler); // wont be executed
}
