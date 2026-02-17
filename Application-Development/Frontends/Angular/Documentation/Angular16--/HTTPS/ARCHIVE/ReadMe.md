# Serve Angular via HTTPS

> IMPORTANT: LOCAL DEVELOPMENT ONLY

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Angular](#angular)
  - [Create a certificate](#create-a-certificate)
  - [Add it to configuration](#add-it-to-configuration)
- [NestJS](#nestjs)
  - [Update main.ts](#update-maints)
  - [Starten von NestJS für Local Development](#starten-von-nestjs-für-local-development)
- [Mockserver (e.g. json-server)](#mockserver-eg-json-server)
- [Things to be ignored](#things-to-be-ignored)
  - [Chrome Developer Tools - Console](#chrome-developer-tools---console)

<!-- /code_chunk_output -->

## Angular

### Create a certificate

Without password (for local tests only) with `-nodes` e.g. within ./certificates in NxMonoRepo:

```shell
openssl req -x509 \
  -newkey rsa:4096 \
  -keyout local-private-key.pem -out local-public-certificate.pem \
  -days 365 \
  -nodes
```

### Add it to configuration

project.json -> serve -> options

```json
  "options": {
        "ssl": true,
        "sslCert": ".certificates/local/public-local-certificate.pem",
        "sslKey": ".certificates/local/private-local-key.pem"
      }
```

## NestJS

### Update main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import fs from 'fs';  // <--- add this

import dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {

/** HTTPS CONFIGURATION BEGINN */

  const httpsOptions = {
    key: fs.readFileSync('.certificates/local/local-private-key.pem'),
    cert: fs.readFileSync('.certificates/local/local-public-certificate.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

/** HTTPS CONFIGURATION END */

  app.enableCors({
    // origin: '*',
    origin: [
      'http://localhost:4200',
      'http://localdev.com:4200',
      'http://IP:4200',
      'https://localhost:4200',
      'https://localdev.com:4200',
      'https://IP:4200',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('My Middleware')
    .setDescription('My Middleware API description')
    .setVersion('0.1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Please enter JWT with Bearer into field',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('openapi', app, document);

  app.use(
    session({
      secret: 'SECRETKEY',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3300);
}
bootstrap();
```

### Starten von NestJS für Local Development

```shell
NODE_TLS_REJECT_UNAUTHORIZED=0 nx serve <project-name>
```

## Mockserver (e.g. json-server)

> `json-server` must be installed (e.g. as dev-dependency)

```typescript
const jsonServer = require('json-server');
const fs = require('fs');
const https = require('https');
const routes = require('./routes.json');

const server = jsonServer.create();
const router = jsonServer.router(
  'apps/mocks/...../db.json', // Important, relative to the root of the project
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
  console.log('JSON Server is running on https://localhost:3333');
});
```

## Things to be ignored

### Chrome Developer Tools - Console

Ignore the error `ERR_CERT_AUTHORITY_INVALID` in the console. That is for local development only.
