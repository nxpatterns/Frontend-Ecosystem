namespace timeout {
  function getData() {
    const timeout = 206; // sometimes timeout sometimes not
    const data = fetch('https://swapi.dev/api/people/1/');
    const rejectAfterTimeout = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout: ' + timeout + 'ms'));
      }, timeout);
    });
    return Promise.race([data, rejectAfterTimeout]);
  }

  getData()
    .then((res: any) => {
      res?.json().then((person: any) => {
        console.log('Response -> person.name: ', person?.name);
      });
    })
    .catch((err) => console.log('Error: ', err));
}
