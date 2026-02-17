namespace Multiple {
  const starWarsPeople: any = [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/people/2/',
    'https://swapi.dev/api/people/3/',
  ];

  starWarsPeople[Symbol.asyncIterator] = () => {
    let index = 0;

    return {
      async next() {
        if (index === starWarsPeople.length) {
          return { done: true };
        }

        const url = starWarsPeople[index];
        index++;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Cannot retrieve Url: ' + url);
        }

        return {
          value: await response.json(),
          done: false,
        };
      },
    };
  };

  const iterator = starWarsPeople[Symbol.asyncIterator]();

  iterator.next().then((res: any) => {
    console.log('Response 1: ', res.value.name);
  });

  iterator.next().then((res: any) => {
    console.log('Response 2: ', res.value?.name);
  });
  iterator.next().then((res: any) => {
    console.log('Response 3: ', res.value?.name);
  });
  iterator.next().then((res: any) => {
    console.log('Response 4: ', res.value?.name);
  });
}

// outputs (always in different order, except 4 (allways first))

/**
Response 4:  undefined
Response 2:  C-3PO
Response 1:  Luke Skywalker
Response 3:  R2-D2
 */
