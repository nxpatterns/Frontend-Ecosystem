namespace example2 {
  const successHandlerX = () => {
    throw new Error('just throwing an error');
  };

  const errorHandler = (err: any) => console.log('Error: ', err);

  // Error handler won't be executed
  // const p1 = Promise.resolve();
  // p1.then(successHandlerX, errorHandlerX);

  // That will catch the error
  const p2 = Promise.resolve();
  p2.then(successHandlerX).catch(errorHandler);
}
