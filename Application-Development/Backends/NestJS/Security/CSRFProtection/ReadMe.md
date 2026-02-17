# CSRF Protection

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Use with Express (default)](#use-with-express-default)
- [Use with Fastify](#use-with-fastify)

<!-- /code_chunk_output -->

Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious exploit of a website where **unauthorized** commands are transmitted from a user that the web application trusts. To mitigate this kind of attack you can use the [csurf](https://github.com/expressjs/csurf) package.

## Use with Express (default)

Source: <https://docs.nestjs.com/security/csrf#use-with-express-default>

Start by installing the required package:

```bash
npm i --save csurf
```

> **Warning** This package is deprecated, refer to [`csurf` docs](https://github.com/expressjs/csurf#csurf) for more information.

> **Warning** As explained in the [`csurf` docs](https://github.com/expressjs/csurf#csurf), this middleware requires either session middleware or `cookie-parser` to be initialized first. Please see that documentation for further instructions.

Once the installation is complete, apply the `csurf` middleware as global middleware.

```typescript
import * as csurf from 'csurf';
// ...
// somewhere in your initialization file
app.use(csurf());
```

## Use with Fastify

Source: <https://docs.nestjs.com/security/csrf#use-with-fastify>

Start by installing the required package:

```bash
npm i --save @fastify/csrf-protection
```

Once the installation is complete, register the `@fastify/csrf-protection` plugin, as follows:

```typescript
import fastifyCsrf from '@fastify/csrf-protection';
// ...
// somewhere in your initialization file after registering some storage plugin
await app.register(fastifyCsrf);
```

> **Warning** As explained in the `@fastify/csrf-protection` docs [here](https://github.com/fastify/csrf-protection#usage), this plugin requires a storage plugin to be initialized first. Please, see that documentation for further instructions.
