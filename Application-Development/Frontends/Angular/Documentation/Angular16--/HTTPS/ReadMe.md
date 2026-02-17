# Angular HTTPS

## Certificate Creation Process

### Key

```shell
openssl genrsa -out local-private-key.pem 4096
```

### CSR

  ```shell
  openssl req -new -sha256 \
    -key local-private-key.pem \
    -out local-certificate.csr
  ```

Important: Common Name (e.g. server FQDN or YOUR name) []: localdev.com

Challenge password: just press enter

#### Verify CSR

```shell
openssl req -in local-certificate.csr -noout -text
```

### Certificate

```shell
openssl x509 -req \
  -in local-certificate.csr \
  -signkey local-private-key.pem \
  -out local-public-certificate.pem
  -days 3650 # 10 years
```

### Add it to configuration

project.json -> serve -> options

```json
  "options": {
        "ssl": true,
        "sslCert": ".certificates/local/local-public-certificate.pem",
        "sslKey": ".certificates/local/local-private-key.pem"
      }
```

## NestJS

### Update main.ts

```typescript

/** HTTPS CONFIGURATION BEGINN */

  const httpsOptions = {
    key: fs.readFileSync('.certificates/local/local-private-key.pem'),
    cert: fs.readFileSync('.certificates/local/local-public-certificate.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

/** HTTPS CONFIGURATION END */
```

## JSON Mock Server

## Update json-https-server.ts

```ts
const server = jsonServer.create();
const router = jsonServer.router(
  'apps/mocks/dynamic/<my-app>/json-server/db.json',
);
const middlewares = jsonServer.defaults();

server.use(jsonServer.rewriter(routes));
server.use(middlewares);
server.use(router);

const httpsOptions = {
  key: fs.readFileSync('.certificates/local/local-private-key.pem'),
  cert: fs.readFileSync('.certificates/local/local-public-certificate.pem'),
};

https.createServer(httpsOptions, server).listen(3333, () => {
  console.log('JSON Server is running on https://localdev.com:3333');
});

```
