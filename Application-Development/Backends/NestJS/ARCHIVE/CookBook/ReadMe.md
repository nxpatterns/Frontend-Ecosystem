# NestJS Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Getting Started](#getting-started)
  - [`nest/cli`](#nestcli)
  - [`nest generate`](#nest-generate)
- [Template Engine (pug)](#template-engine-pug)
- [NestJS with Kafka](#nestjs-with-kafka)
  - [Setup](#setup)
- [NestExpressApplication: Static Sites with `pug`](#nestexpressapplication-static-sites-with-pug)
  - [Install `pug`](#install-pug)
  - [Create Static Folder within `src`](#create-static-folder-within-src)
  - [Update `src/main.ts`](#update-srcmaints)
  - [Update `nest-cli.json`](#update-nest-clijson)
  - [Update `tsconfig.build.json`](#update-tsconfigbuildjson)
  - [Update Corresponding Service](#update-corresponding-service)
  - [Update Corresponding Controller](#update-corresponding-controller)
  - [Last but not least `index.pug`](#last-but-not-least-indexpug)
- [Excerpts from File-Structure](#excerpts-from-file-structure)
  - [`app-module.ts`](#app-modulets)
  - [A Controller](#a-controller)
  - [A Custom Decorator](#a-custom-decorator)
  - [A Custom Filter](#a-custom-filter)
  - [A Custom Gateway](#a-custom-gateway)
  - [A Custom Guard](#a-custom-guard)
  - [A Custom Interceptor](#a-custom-interceptor)
  - [A Middleware](#a-middleware)
  - [A Module](#a-module)
  - [A Pipe](#a-pipe)
  - [Provider](#provider)
  - [A Resolver (GraphQL)](#a-resolver-graphql)
  - [A Service](#a-service)
- [Concepts (Excerpt)](#concepts-excerpt)
  - [Bootstrapping](#bootstrapping)
  - [Dependency Injection (similar to Angular)](#dependency-injection-similar-to-angular)
  - [Authentication Library: `@nestjs/passport`](#authentication-library-nestjspassport)
  - [Connection to MSSSQL](#connection-to-msssql)
    - [Install the mpm package](#install-the-mpm-package)
    - [Example](#example)
  - [ORM (Object-relational Mapping)](#orm-object-relational-mapping)
    - [TypeORM](#typeorm)
      - [Supporting Databases](#supporting-databases)
      - [An `ormconfig.json` example](#an-ormconfigjson-example)
      - [Initialize TypeORM](#initialize-typeorm)
      - [Entity Example](#entity-example)
    - [Sequelize](#sequelize)
    - [Mongoose](#mongoose)
  - [REST API](#rest-api)
  - [WebSockets](#websockets)
  - [MicroServices](#microservices)
  - [Routing & Request Handling](#routing-request-handling)
    - [Controller & Decorators](#controller-decorators)
    - [Standard (NestJS) Response](#standard-nestjs-response)
    - [ExpressJS Response](#expressjs-response)
    - [Route Parameters](#route-parameters)
    - [Request Body](#request-body)
    - [Request Object](#request-object)
    - [Asynchronous handlers](#asynchronous-handlers)
    - [Promise](#promise)
    - [Observables](#observables)
  - [GraphQL (`@nestjs/graphql`)](#graphql-nestjsgraphql)
  - [Routing](#routing)
  - [OpenAPI (`@nestjs/swagger`)](#openapi-nestjsswagger)
  - [CQRS (Command Query Responsibility Segregation)](#cqrs-command-query-responsibility-segregation)
  - [Testing (`@nestjs/testing`)](#testing-nestjstesting)
  - [Angular Universal](#angular-universal)
- [Full Resource Example](#full-resource-example)
- [Error Handling](#error-handling)
  - [Exception Filters](#exception-filters)
    - [Default Exception Response](#default-exception-response)
    - [Throwing Standard Exceptions](#throwing-standard-exceptions)
    - [Custom Exceptions](#custom-exceptions)
    - [Built-In Exceptions](#built-in-exceptions)
    - [Exception Filters](#exception-filters-1)
    - [Binding Filters](#binding-filters)
    - [Catch Everything](#catch-everything)
- [Pipes](#pipes)
  - [Built-in pipes](#built-in-pipes)
  - [Binding Pipes](#binding-pipes)
    - [Validation](#validation)
- [Guards](#guards)
- [Interceptors](#interceptors)
- [Trouble Shooting](#trouble-shooting)
  - [Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser](#parsing-error-parseroptionsproject-has-been-set-for-typescript-eslintparser)
    - [`Problem` &rarr; Following errors](#problem-rarr-following-errors)
    - [`Solution`](#solution)
- [Own Notices / Own Styles](#own-notices-own-styles)

<!-- /code_chunk_output -->

## Getting Started

```bash
npm i -g @nestjs/cli

nest new [project-name]

```

### `nest/cli`

```bash
Command     Alias     Description
new         n         New Project
generate    g         Generates and/or modifies (see next chapter).
build                 Compiles an application
start                 Compiles and runs an application
add                   Imports a library
update      u         Update @nestjs dependencies
info        i         Displays information
```

### `nest generate`

```bash
nest generate service [service-name] # oder
nest g s [service-name]
```

```bash
    Version 7.4.1 - Available schematics:
      ┌───────────────┬─────────────┐
      │ name          │ alias       │
      │ application   │ application │
      │ class         │ cl          │
      │ configuration │ config      │
      │ controller    │ co          │
      │ decorator     │ d           │
      │ filter        │ f           │
      │ gateway       │ ga          │
      │ guard         │ gu          │
      │ interceptor   │ in          │
      │ interface     │ interface   │
      │ middleware    │ mi          │
      │ module        │ mo          │
      │ pipe          │ pi          │
      │ provider      │ pr          │
      │ resolver      │ r           │
      │ service       │ s           │
      │ library       │ lib         │
      │ sub-app       │ app         │
      └───────────────┴─────────────┘
```

## Template Engine (pug)

Chosen Template Engine: **pug**

Website: https://github.com/pugjs/pug

Tutorial: https://leanpub.com/pug-node/read

[List of Template Engines](https://expressjs.com/en/resources/template-engines.html)

## NestJS with Kafka

### Setup

```bash
npm i --save @nestjs/microservices
npm i --save kafkajs
nest g sub-app kafka
```

## NestExpressApplication: Static Sites with `pug`

After the configuration below, static files (=Assets) will be served from `./dist/static`.

### Install `pug`

```bash
npm i pug
```

### Create Static Folder within `src`

```bash
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── static
    ├── public
    │   └── css
    │       └── style.css
    └── views
        └── index.pug
```

### Update `src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(join(__dirname, 'static/public'));
  app.setBaseViewsDir(join(__dirname, 'static/views'));
  app.setViewEngine('pug');
  await app.listen(3000);
  console.log(`App is running on: ${await app.getUrl()}`);
}
bootstrap();
```

### Update `nest-cli.json`

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": ["static/**/*"],
    "watchAssets": true
  }
}
```

### Update `tsconfig.build.json`

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "static", "**/*spec.ts"]
}
```

### Update Corresponding Service

E.g. `app.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): unknown {
    return {
      title: 'MyTitle',
      subTitle: 'MySubTitle',
    };
  }
}
```

### Update Corresponding Controller

E.g. `app.controller.ts`

```typescript
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return this.appService.getIndex();
  }
}
```

### Last but not least `index.pug`

```pug
doctype html5
html
  head
    link(rel="stylesheet" href="css/style.css")
    title= title
  body
    h1.cTitle= title
    h2.cSubTitle= subTitle
```

## Excerpts from File-Structure

### `app-module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyController } from './ebia/controller/my/my.controller';

@Module({
  imports: [],
  controllers: [AppController, MyController],
  providers: [AppService],
})
export class AppModule {}
```

### A Controller

[>> See full resource example in coming chapters below](#full-resource-example)

```typescript
import { Controller } from '@nestjs/common';

@Controller('my')
export class MyController {}
```

### A Custom Decorator

```typescript
import { CustomDecorator, SetMetadata } from '@nestjs/common';
export const My = (...args: string[]): CustomDecorator =>
  SetMetadata('my', args);
```

or

```typescript
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const My = (...args: string[]): CustomDecorator =>
  SetMetadata('my', args);
```

### A Custom Filter

```typescript
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch()
export class MyFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
```

### A Custom Gateway

```bash
npm i @nestjs/websockets
nest g ga ebia/gateway/my
```

```typescript
import {
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

type MyAny = Record<string, unknown> | unknown;

@WebSocketGateway()
export class MyGateway {
  @SubscribeMessage('message')
  handleMessage(client: MyAny, payload: MyAny): string {
    console.log('Client: ', client);
    console.log('Payload: ', payload);
    return 'Hello world!';
  }
}
```

```typescript
// app.module.ts
@Module({
  // ...
  providers: [AppService, MyGateway],
})
export class AppModule {}
```

### A Custom Guard

```typescript
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('ExecutionContext: ', context);
    return true;
  }
}
```

### A Custom Interceptor

```typescript
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle();
  }
}
```

### A Middleware

Middleware implements `NestMiddleware` interface and it is called before route handlers.

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MyMiddleware implements NestMiddleware {
  use(req, res, next: () => void) {
    next();
  }
}
```

### A Module

@Module() decorator takes a single object with following properties:

- components
- controllers
- imports
- exports
- providers

```typescript
import { Module } from '@nestjs/common';

@Module({})
export class MyModule {}
```

```typescript
// app.module.ts
import { MyModule } from './ebia/module/my/my.module';

@Module({
  imports: [MyModule], // <-- Module Import
  controllers: [AppController, MyController],
  providers: [AppService, MyGateway],
})
export class AppModule {}
```

### A Pipe

```typescript
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

### Provider

Providers are global available (Services/Factories/Helpers/..):

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class My {}
```

```typescript
@Module({
  imports: [MyModule],
  controllers: [AppController, MyController],
  providers: [/* .. */ My /* .. */],
})
export class AppModule {}
```

### A Resolver (GraphQL)

```typescript
import { Resolver } from '@nestjs/graphql';

@Resolver('My')
export class MyResolver {}
```

### A Service

```typescript
import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class MyService implements OnModuleInit, OnModuleDestroy {
  constructor() {
    //
  }

  async onModuleInit(): Promise<void> {
    //
  }

  async onModuleDestroy(): Promise<void> {
    //
  }
}
```

## Concepts (Excerpt)

### Bootstrapping

`NestFactory` &rarr; `listen()`

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### Dependency Injection (similar to Angular)

- see `reflect-metadata` library

```typescript
// Simple Example

@Injectable()
export class UserService {
  /*...*/
}

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}
}
```

### Authentication Library: `@nestjs/passport`

```bash
npm i passport-jwt @types/passport-jwt
npm i jsonwebtoken @types/jsonwebtoken
```

[>> Passport Website](https://www.npmjs.com/package/passport)
[>> NestJS Documentation -> Authentication](https://docs.nestjs.com/techniques/authentication)

- Strategy (local, jwt, googleOAuth, facebook, twitter,..)
- Application Middleware
- The Session (Optional)

### Connection to MSSSQL

#### Install the mpm package

    npm install mssql

#### Example

If you're on Windows Azure, add ?encrypt=true to your connection string.

```typescript
import { MyConfig } from './whatever';
import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
// @ts-ignore
const sql = require('mssql');

@Injectable()
export class MyWhatEverDBService
  implements OnModuleInit, OnModuleDestroy
{
  Something: Array<any> = [];

  async onModuleInit(): Promise<void> {
    // if necessary
  }

  async getSomething(): Promise<Array<any>> {
    try {
      await sql.connect(
        `mssql://${MyConfig.db_user}:${MyConfig.db_password}@${MyConfig.db_server}/${MyConfig.db_database}`,
      );
      this.Something = await sql.query(
        `select * from ${MyConfig.db_table_something}`,
      );
      console.log(Object.keys(this.Something));
      return this.Something && this.Something['recordset']
        ? this.Something['recordset']
        : [];
    } catch (error) {
      console.warn('Errors: ', error);
      return [];
    }
  }

  async onModuleDestroy(): Promise<void> {
    sql.disconnect();
  }
}
```

### ORM (Object-relational Mapping)

An ORM provides a mapping between objects in memory and database entities (relational database tables, nosql,..).

#### TypeORM

<https://typeorm.io>
<https://www.npmjs.com/package/typeorm>

> simple-json &rarr; column type is supported by almost all RDMBSs
> Storing plain old JS-Objects in RDBMS-Columns

##### Supporting Databases

- MySQL
- MariaDB
- PostgreSQL
- MS SQL Server
- sql.js
- MongoDB
- Oracle (experimental)

##### An `ormconfig.json` example

```json
{
  "type": "mariadb",
  "host": "mariadb",
  "port": 3306,
  "username": "myUserName",
  "password": "myUserPassword",
  "database": "MyDatabase",
  "synchronize": true,
  "entities": ["src/**/*.entity.ts"]
}
```

##### Initialize TypeORM

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ...
    ]
})

export class AppModule {}
```

##### Entity Example

```typescript
import { Entity } from 'typeorm';

@Entity()
export class Entry {}
```

#### Sequelize

<https://www.npmjs.com/package/sequelize>

#### Mongoose

<https://www.npmjs.com/package/mongoose>

### REST API

### WebSockets

[>> Details &rarr; Official Documentation](https://docs.nestjs.com/websockets/gateways)

`@nestjs/websockets`, `@WebSocketGateway`

> **Hint:** It is also possible to implement the web socket over a Rest API using the decorators provided by NestJS.

### MicroServices

### Routing & Request Handling

#### Controller & Decorators

2 Possibilities for decorators:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('entries')
export class EntryController {
  @Get()
  index(): Entry[] {
      const entries: Entry[] =
      this.entriesService.findAll();
      return entries;
}
```

or

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller() // <-- DIFFERENCE
export class EntryController {
  @Get('entries') // <-- DIFFERENCE
  index(): Entry[] {
      const entries: Entry[] =
      this.entriesService.findAll();
      return entries;
}
```

#### Standard (NestJS) Response

```typescript
@HttpCode(204)
@Post()
create() {
// This handler will return a 204 status response
}
```

#### ExpressJS Response

```typescript
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express'; // <- DIFFERENCE

@Controller('entries')
export class EntryController {
  @Get()
  index(@Res() res: Response) {
    const entries: Entry[] = this.entriesService.findAll();
    return res.status(HttpStatus.OK).json(entries);
  }
}
```

#### Route Parameters

```typescript
@Get(':entryId') // entries/:entryId

```

#### Request Body

```typescript
import { Body, Controller, Post } from '@nestjs/common';

@Controller('entries')
export class EntryController {
  @Post()
  create(@Body() body: Entry) {
    this.entryService.create(body);
  }
}
```

#### Request Object

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('entries')
export class EntryController {
  @Get()
  index(@Req() req: Request): Entry[] {
      const entries: Entry[] =
      this.entriesService.findAll();
      return entries;
}
```

#### Asynchronous handlers

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('entries')
export class EntryController {
  @Get()
  async index(): Promise<Entry[]> {
    const entries: Entry[] = await this.entryService.findAll();
    return entries;
  }
}
```

#### Promise

Similarly, you can also just return a promise from a handler function directly without using async/await.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('entries')
export class EntryController {
  @Get()
  index(): Promise<Entry[]> {
    const entriesPromise: Promise<Entry[]> =
      this.entryService.findAll();
    return entriesPromise;
  }
}
```

#### Observables

```typescript
import { Controller, Get } from '@nestjs/common';
@Controller('entries')
export class EntryController {
  @Get()
  index(): Observable<Entry[]> {
    const entriesPromise: Observable<Entry[]> =
      this.entryService.findAll();
    return entriesPromise;
  }
}
```

### GraphQL (`@nestjs/graphql`)

GraphQLModule &rarr; Wrapper around the Apollo Server

### Routing

### OpenAPI (`@nestjs/swagger`)

### CQRS (Command Query Responsibility Segregation)

> CQRS: a command and an event bus

### Testing (`@nestjs/testing`)

HTTP-Requests &larr; Jest (supertest)

### Angular Universal

## Full Resource Example

An Excerpt from [NestJS-Documentation](https://docs.nestjs.com/controllers)

```typescript
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

## Error Handling

### Exception Filters

[See Details here](https://docs.nestjs.com/exception-filters)

#### Default Exception Response

```typescript
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

#### Throwing Standard Exceptions

```typescript

// Simple

@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}

// Better

@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}

// When the client calls this endpoint, the response looks like this:

{
  "statusCode": 403,
  "message": "Forbidden"
}

```

#### Custom Exceptions

```typescript
// Class

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

// Controller

@Get()
async findAll() {
  throw new ForbiddenException();
}
```

#### Built-In Exceptions

[See Details here](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

```txt
BadRequestException
UnauthorizedException
NotFoundException
ForbiddenException
NotAcceptableException
RequestTimeoutException
ConflictException
GoneException
HttpVersionNotSupportedException
PayloadTooLargeException
UnsupportedMediaTypeException
UnprocessableEntityException
InternalServerErrorException
NotImplementedException
ImATeapotException
MethodNotAllowedException
BadGatewayException
ServiceUnavailableException
GatewayTimeoutException

```

#### Exception Filters

[See details here](https://docs.nestjs.com/exception-filters#exception-filters-1)

While the base (built-in) exception filter can automatically handle many cases
for you, you may want full control over the exceptions layer. For example, you
may want to add logging or use a different JSON schema based on some dynamic
factors. Exception filters are designed for exactly this purpose. They let you
control the exact flow of control and the content of the response sent back to
the client.

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

#### Binding Filters

```typescript
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

// Alternatively, you may pass the class (instead of an instance),
// leaving responsibility for instantiation to the framework,
// and enabling dependency injection.

// Prefer applying filters by using classes instead of
// instances when possible. It reduces memory usage since
// Nest can easily reuse instances of the same class
// across your entire module.

@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

// Exception filters can be scoped at different levels:
// method-scoped, controller-scoped, or global-scoped.
// For example, to set up a filter as controller-scoped,
// you would do the following:

@UseFilters(new HttpExceptionFilter())
export class CatsController {}

// To create a global-scoped filter,
// you would do the following:
// WARNING: The useGlobalFilters() method does not
// set up filters for gateways or hybrid applications.


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();


// global filters registered from outside of any module
// (with useGlobalFilters() as in the example above)
// cannot inject dependencies since this is done
// outside the context of any module. In order to solve
// this issue, you can register a global-scoped filter
// directly from any module using the following construction:

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

// When using this approach to perform dependency
// injection for the filter, note that regardless
// of the module where this construction is employed,
// the filter is, in fact, global. Where should this
// be done? Choose the module where the filter
// (HttpExceptionFilter in the example above) is defined.
// Also, useClass is not the only way of dealing with
// custom provider registration. Learn more here:
// https://docs.nestjs.com/fundamentals/custom-providers
```

#### Catch Everything

In order to catch every unhandled exception (regardless of the exception type),
leave the `@Catch()` decorator's parameter list empty, e.g., `@Catch()`.

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// In order to delegate exception processing
// to the base filter, you need to extend BaseExceptionFilter
// and call the inherited catch() method.
// WARNING: Method-scoped and Controller-scoped filters
// that extend the BaseExceptionFilter should not be instantiated
// with new. Instead, let the framework instantiate them automatically.

import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

// Global filters can extend the base filter.
// This can be done in either of two ways.
// The first method is to inject the
// HttpServer reference when instantiating
// the custom global filter:

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();

// The second method is to use the APP_FILTER
// See examples above
```

## Pipes

[See details here](https://docs.nestjs.com/pipes)

A pipe is a class annotated with the `@Injectable()` decorator. Pipes should
implement the `PipeTransform` interface. Pipes have two typical use cases:

- **transformation**: transform input data to the desired form (e.g., from
  string to integer)
- **validation**: evaluate input data and if valid, simply pass it through
  unchanged; otherwise, throw an exception when the data is incorrect

**HINT**: Pipes run inside the exceptions zone. This means that when a Pipe
throws an exception it is handled by the exceptions layer (global exceptions
filter and any exceptions filters that are applied to the current context).
Given the above, it should be clear that when an exception is thrown in a Pipe,
no controller method is subsequently executed. This gives you a best-practice
technique for validating data coming into the application from external sources
at the system boundary.

### Built-in pipes

Pipes available out-of-the-box are:

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

They're exported from the @nestjs/common package.

### Binding Pipes

```typescript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

// GET localhost:3000/abc
// will throw an exception like:

{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}

// Here's an example of using the ParseUUIDPipe
// to parse a string parameter and validate if is a UUID.

@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}

// HINT: When using ParseUUIDPipe() you are parsing UUID
// in version 3, 4 or 5, if you only require a specific
// version of UUID you can pass a version in the pipe options.
```

#### Validation

[See Details here](https://docs.nestjs.com/techniques/validation)

## Guards

[See Details here](https://docs.nestjs.com/guards)

A guard is a class annotated with the @Injectable() decorator. Guards should
implement the CanActivate interface.

Guards have a single responsibility. They determine whether a given request will
be handled by the route handler or not, depending on certain conditions (like
permissions, roles, ACLs, etc.) present at run-time.

**HINT**: Guards are executed after each middleware, but before any interceptor
or pipe. Unlike middleware, Guards have access to the `ExecutionContext`

```typescript
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}

// In the node.js world, it's common practice to attach
// the authorized user to the request object. Thus, in our
// sample code above, we are assuming that request.user contains
// the user instance and allowed roles. In your app, you will
// probably make that association in your custom
// authentication guard (or middleware).
```

## Interceptors

[See details here](https://docs.nestjs.com/interceptors)

## Trouble Shooting

### Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser

#### `Problem` &rarr; Following errors

- Parsing error: "parserOptions.project" has been set for
  @typescript-eslint/parser.
- The file does not match your project config: .eslintrc.js.
- The file must be included in at least one of the projects provided.

#### `Solution`

Create a `tsconfig.eslint.json` file i your project root with the following
content and restart VSCode:

```json
{
  "compilerOptions": { "strict": true },
  "include": [
    "**/src/**/*.ts",
    "**/test/**/*.ts"
    // etc
  ]
}
```

## Own Notices / Own Styles

## StackOverflow

### Deleting Cache

[nestjs-how-to-clear-reset-all-cache](https://stackoverflow.com/questions/62351708/nestjs-how-to-clear-reset-all-cache)
