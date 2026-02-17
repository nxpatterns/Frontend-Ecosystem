# Vanilla HTTP vs. Axios

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=2 orderedList=false} -->

<!-- code_chunk_output -->

- [Vanilla HTTP GET Request](#vanilla-http-get-request)
- [Axios GET Request](#axios-get-request)
- [Conclusion](#conclusion)

<!-- /code_chunk_output -->

## Vanilla HTTP GET Request

```typescript

import * as https from 'https';
// ...

@Injectable()
export class SomeService {

someHttpGetCall(): any {
  try {
    const auth = 'Basic ' + Buffer.from('user_name' + ':' + 'password').toString('base64');
    const agent = new https.Agent({
      /**
       * NOTE: this will disable client verification
       * Use this only for testing purposes if you get
       * 'unable to verify the first certificate' error
       */
      rejectUnauthorized: false,
    });
    const options = {
      hostname: 'without-http-s-and-without-port-only-domain',
      port: 3333, // change this to your port
      path: '/your/gateway/path',
      method: 'GET',
      headers: {
        Authorization: auth
      },
      agent: agent,
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(data); // Process the data as needed
      });
      res.on('error', (error) => {
        console.error(error);
        return error;
      });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}
}
```

## Axios GET Request

```typescript
import * as https from 'https';
import axios from 'axios';
// ...

@Injectable()
export class SomeService {
  private readonly url = 'https://some-domain:3333/your/gateway/path';

  constructor() {}

  async someAxiosGetCall(): Promise<any> {
    const agent = new https.Agent({
      /**
       * NOTE: this will disable client verification
       * Use this only for testing purposes if you get
       * 'unable to verify the first certificate' error
       */
      rejectUnauthorized: false,
    });

    try {
      const axiosResult = await axios.get(this.url, {
        httpsAgent: agent,
        auth: {
          username: 'user_name',
          password: 'password',
        },
      });
      return axiosResult;
    } catch (error) {
      return error;
    }
  }
}
```

## Conclusion

- Axios is a promise-based HTTP client for the browser and Node.js.
- Axios is easier to use and has more features than vanilla HTTP.
- Axios is more powerful, secure and flexible than vanilla HTTP.

**Then why Vanilla HTTP?**

It is a built-in module in Node.js and can be used without any additional dependencies. However, it is **only** a good choice **for simple HTTP requests**.
