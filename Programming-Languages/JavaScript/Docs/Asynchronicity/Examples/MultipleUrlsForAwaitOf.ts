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

  async function getNames() {
    try {
      for await (const person of starWarsPeople) {
        console.log('Person: ', person?.name);
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  getNames();
}

// outputs in exact order this time

/**
Person:  Luke Skywalker
Person:  C-3PO
Person:  R2-D2
 */
