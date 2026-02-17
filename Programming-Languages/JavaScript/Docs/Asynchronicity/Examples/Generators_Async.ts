namespace example1 {
  const starWarsPeople: any = [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/people/2/',
    'https://swapi.dev/api/people/3/',
    // 'https://swapi.dev/api/people/none-existing/',
  ];

  starWarsPeople[Symbol.asyncIterator] = async function* () {
    for (let url of this) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Cannot retrieve URL: ' + url);
        }
        yield response.json();
      } catch (err) {
        console.log('Error: ', err);
      }
    }
  };

  const iterator = starWarsPeople[Symbol.asyncIterator]();

  iterator.next().then((result: any) => {
    console.log('Result: ', result?.value?.name);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result?.value?.name);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result?.value?.name);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result?.value?.name);
  });
  iterator.next().then((result: any) => {
    console.log('Result: ', result?.value?.name);
  });
}
