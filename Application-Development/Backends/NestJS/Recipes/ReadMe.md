# Recipes

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [REPL (Read-Eval-Print-Loop)](#repl-read-eval-print-loop)
  - [Usage](#usage)
  - [Native functions](#native-functions)
  - [Watch mode](#watch-mode)
- [CRUD Generator](#crud-generator)
- [SWC (Speedy Web Compiler)](#swc-speedy-web-compiler)
- [Passport (auth)](#passport-auth)
- [Hot Reload](#hot-reload)
- [MikroORM](#mikroorm)
- [TypeORM](#typeorm)
- [Mongoose](#mongoose)
- [Sequelize](#sequelize)
- [Prisma](#prisma)
- [Router Module](#router-module)
- [Health Checks (Terminus)](#health-checks-terminus)
- [CQRS (Command Query Responsibility Segregation)](#cqrs-command-query-responsibility-segregation)
  - [Installation](#installation)
  - [Commands](#commands)
  - [Queries](#queries)
  - [Events](#events)
  - [Sagas](#sagas)
  - [Setup](#setup)
  - [Unhandled exceptions](#unhandled-exceptions)
  - [Subscribing to all events](#subscribing-to-all-events)
  - [Example](#example)
- [Documentation with Compodoc](#documentation-with-compodoc)
- [Serve Static](#serve-static)
- [Nest Commander](#nest-commander)
- [Async Local Storage](#async-local-storage)
- [Automock](#automock)
- [Runtime Optimizations](#runtime-optimizations)
- [Global Path Prefix](#global-path-prefix)
- [Raw Body](#raw-body)
- [Hybrid application](#hybrid-application)
  - [Sharing configuration](#sharing-configuration)
- [Common Errors](#common-errors)

<!-- /code_chunk_output -->

## REPL (Read-Eval-Print-Loop)

REPL is a simple interactive environment that takes single user inputs, executes them, and returns the result to the user. The REPL feature lets you inspect your dependency graph and call methods on your providers (and controllers) directly from your terminal.

### Usage

To run your NestJS application in REPL mode, create a new `repl.ts` file (alongside the existing `main.ts` file) and add the following code inside:

repl.ts

```typescript
import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();
```

Now in your terminal, start the REPL with the following command:

```bash
npm run start -- --entryFile repl
```

> **Hint**`repl` returns a [Node.js REPL server](https://nodejs.org/api/repl.html) object.

Once it's up and running, you should see the following message in your console:

```bash

LOG [NestFactory] Starting Nest application...
LOG [InstanceLoader] AppModule dependencies initialized
LOG REPL initialized
```

And now you can start interacting with your dependencies graph. For instance, you can retrieve an `AppService` (we are using the starter project as an example here) and call the `getHello()` method:

```typescript

> get(AppService).getHello()
'Hello World!'
```

You can execute any JavaScript code from within your terminal, for example, assign an instance of the `AppController` to a local variable, and use `await` to call an asynchronous method:

```typescript

> appController = get(AppController)
AppController { appService: AppService {} }
> await appController.getHello()
'Hello World!'
```

To display all public methods available on a given provider or controller, use the `methods()` function, as follows:

```typescript

> methods(AppController)

Methods:
 ◻ getHello
```

To print all registered modules as a list together with their controllers and providers, use `debug()`.

```typescript

> debug()

AppModule:
 - controllers:
  ◻ AppController
 - providers:
  ◻ AppService
```

Quick demo:

<figure><img src="https://docs.nestjs.com/assets/repl.gif" /></figure>

You can find more information about the existing, predefined native methods in the section below.

### Native functions

Source: <https://docs.nestjs.com/recipes/repl#native-functions>

The built-in NestJS REPL comes with a few native functions that are globally available when you start REPL. You can call `help()` to list them out.

If you don't recall what's the signature (ie: expected parameters and a return type) of a function, you can call `<function_name>.help`. For instance:

```text

> $.help
Retrieves an instance of either injectable or controller, otherwise, throws exception.
Interface: $(token: InjectionToken) => any
```

> **Hint** Those function interfaces are written in [TypeScript function type expression syntax](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions).

<!-- prettier-ignore -->
| Function | Description | Signature |
| --- | --- | --- |
| `debug` | Print all registered modules as a list together with their controllers and providers. | `debug(moduleCls?: ClassRef | string) => void` |
| `get` or `$` | Retrieves an instance of either injectable or controller, otherwise, throws exception. | `get(token: InjectionToken) => any` |
| `methods` | Display all public methods available on a given provider or controller. | `methods(token: ClassRef | string) => void` |
| `resolve` | Resolves transient or request-scoped instance of either injectable or controller, otherwise, throws exception. | `resolve(token: InjectionToken, contextId: any) => Promise<any>` |
| `select` | Allows navigating through the modules tree, for example, to pull out a specific instance from the selected module. | `select(token: DynamicModule | ClassRef) => INestApplicationContext` |

### Watch mode

Source: <https://docs.nestjs.com/recipes/repl#watch-mode>

During development it is useful to run REPL in a watch mode to reflect all the code changes automatically:

```bash

$ npm run start -- --watch --entryFile repl
```

This has one flaw, the REPL's command history is discarded after each reload which might be cumbersome. Fortunately, there is a very simple solution. Modify your `bootstrap` function like this:

```typescript
async function bootstrap() {
  const replServer = await repl(AppModule);
  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}
```

Now the history is preserved between the runs/reloads.

## CRUD Generator

See Online <https://docs.nestjs.com/recipes/crud-generator>

## SWC (Speedy Web Compiler)

See Online <https://docs.nestjs.com/recipes/swc>

## Passport (auth)

See Online <https://docs.nestjs.com/recipes/passport>

## Hot Reload

See Online <https://docs.nestjs.com/recipes/hot-reload>

## MikroORM

See Online <https://docs.nestjs.com/recipes/mikroorm>

## TypeORM

See Online <https://docs.nestjs.com/recipes/sql-typeorm>

## Mongoose

See Online <https://docs.nestjs.com/recipes/mongodb>

## Sequelize

See Online <https://docs.nestjs.com/recipes/sql-sequelize>

## Prisma

See Online <https://docs.nestjs.com/recipes/prisma>

[Prisma](https://www.prisma.io/) is an [open-source](https://github.com/prisma/prisma) ORM for Node.js and TypeScript. It is used as an **alternative** to writing plain SQL, or using another database access tool such as SQL query builders (like [knex.js](https://knexjs.org/)) or ORMs (like [TypeORM](https://typeorm.io/) and [Sequelize](https://sequelize.org/)). Prisma currently supports PostgreSQL, MySQL, SQL Server, SQLite, MongoDB and CockroachDB ([Preview](https://www.prisma.io/docs/reference/database-reference/supported-databases)).

While Prisma can be used with plain JavaScript, it embraces TypeScript and provides a level to type-safety that goes beyond the guarantees other ORMs in the TypeScript ecosystem. You can find an in-depth comparison of the type-safety guarantees of Prisma and TypeORM [here](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm#type-safety).

> **Note** If you want to get a quick overview of how Prisma works, you can follow the [Quickstart](https://www.prisma.io/docs/getting-started/quickstart) or read the [Introduction](https://www.prisma.io/docs/understand-prisma/introduction) in the [documentation](https://www.prisma.io/docs/). There also are ready-to-run examples for [REST](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nestjs) and [GraphQL](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nestjs) in the [`prisma-examples`](https://github.com/prisma/prisma-examples/) repo.

## Router Module

See Online <https://docs.nestjs.com/recipes/router-module>

> **Hint** This chapter is only relevant to HTTP-based applications.

In an HTTP application (for example, REST API), the route path for a handler is determined by concatenating the (optional) prefix declared for the controller (inside the `@Controller` decorator), and any path specified in the method's decorator (e.g, `@Get('users')`). You can learn more about that in [this section](https://docs.nestjs.com/controllers#routing). Additionally, you can define a [global prefix](https://docs.nestjs.com/faq/global-prefix) for all routes registered in your application, or enable [versioning](https://docs.nestjs.com/techniques/versioning).

Also, there are edge-cases when defining a prefix at a module-level (and so for all controllers registered inside that module) may come in handy. For example, imagine a REST application that exposes several different endpoints being used by a specific portion of your application called "Dashboard". In such a case, instead of repeating the `/dashboard` prefix within each controller, you could use a utility `RouterModule` module, as follows:

```typescript
@Module({
  imports: [
    DashboardModule,
    RouterModule.register([
      {
        path: 'dashboard',
        module: DashboardModule,
      },
    ]),
  ],
})
export class AppModule {}
```

> **Hint** The `RouterModule` class is exported from the `@nestjs/core` package.

In addition, you can define hierarchical structures. This means each module can have `children` modules. The children modules will inherit their parent's prefix. In the following example, we'll register the `AdminModule` as a parent module of `DashboardModule` and `MetricsModule`.

```typescript

@Module({
  imports: [
    AdminModule,
    DashboardModule,
    MetricsModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'dashboard',
            module: DashboardModule,
          },
          {
            path: 'metrics',
            module: MetricsModule,
          },
        ],
      },
    ])
  ],
});
```

> **Hint** This feature should be used very carefully, as overusing it can make code difficult to maintain over time.

In the example above, any controller registered inside the `DashboardModule` will have an extra `/admin/dashboard` prefix (as the module concatenates paths from top to bottom - recursively - parent to children). Likewise, each controller defined inside the `MetricsModule` will have an additional module-level prefix `/admin/metrics`.

## Health Checks (Terminus)

See Online <https://docs.nestjs.com/recipes/terminus>

## CQRS (Command Query Responsibility Segregation)

See Online <https://docs.nestjs.com/recipes/cqrs>

CQRS is a pattern that segregates operations that read data (queries) from operations that update data (commands) by using separate interfaces. This means that the application contains a command side that performs operations such as creating, updating, and deleting data, and a query side that performs operations such as reading data.

The CQRS pattern is useful in complex applications because it allows you to isolate the query side from the command side. This isolation allows you to scale each side independently and to use different data models for each side. For example, you can use a relational database for the command side and a NoSQL database for the query side.

The flow of simple [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) (Create, Read, Update and Delete) applications can be described as follows:

1. The controllers layer handles HTTP requests and delegates tasks to the services layer.
2. The services layer is where most of the business logic lives.
3. Services use repositories / DAOs to change / persist entities.
4. Entities act as containers for the values, with setters and getters.

While this pattern is usually sufficient for small and medium-sized applications, it may not be the best choice for larger, more complex applications. In such cases, the **CQRS** (Command and Query Responsibility Segregation) model may be more appropriate and scalable (depending on the application's requirements). Benefits of this model include:

- **Separation of concerns**. The model separates the read and write operations into separate models.
- **Scalability**. The read and write operations can be scaled independently.
- **Flexibility**. The model allows for the use of different data stores for read and write operations.
- **Performance**. The model allows for the use of different data stores optimized for read and write operations.

To facilitate that model, Nest provides a lightweight [CQRS module](https://github.com/nestjs/cqrs). This chapter describes how to use it.

### Installation

Source: <https://docs.nestjs.com/recipes/cqrs#installation>

First install the required package:

```bash
npm install --save @nestjs/cqrs
```

### Commands

Source: <https://docs.nestjs.com/recipes/cqrs#commands>

Commands are used to change the application state. They should be task-based, rather than data centric. When a command is dispatched, it is handled by a corresponding **Command Handler**. The handler is responsible for updating the application state.

heroes-game.service.ts

```typescript
@Injectable()
export class HeroesGameService {
  constructor(private commandBus: CommandBus) {}

  async killDragon(heroId: string, killDragonDto: KillDragonDto) {
    return this.commandBus.execute(
      new KillDragonCommand(heroId, killDragonDto.dragonId),
    );
  }
}
```

In the code snippet above, we instantiate the `KillDragonCommand` class and pass it to the `CommandBus`'s `execute()` method. This is the demonstrated command class:

kill-dragon.command.ts

```typescript
export class KillDragonCommand {
  constructor(
    public readonly heroId: string,
    public readonly dragonId: string,
  ) {}
}
```

The `CommandBus` represents a **stream** of commands. It is responsible for dispatching commands to the appropriate handlers. The `execute()` method returns a promise, which resolves to the value returned by the handler.

Let's create a handler for the `KillDragonCommand` command.

kill-dragon.handler.ts

```typescript
@CommandHandler(KillDragonCommand)
export class KillDragonHandler
  implements ICommandHandler<KillDragonCommand>
{
  constructor(private repository: HeroRepository) {}

  async execute(command: KillDragonCommand) {
    const { heroId, dragonId } = command;
    const hero = this.repository.findOneById(+heroId);

    hero.killEnemy(dragonId);
    await this.repository.persist(hero);
  }
}
```

This handler retrieves the `Hero` entity from the repository, calls the `killEnemy()` method, and then persists the changes. The `KillDragonHandler` class implements the `ICommandHandler` interface, which requires the implementation of the `execute()` method. The `execute()` method receives the command object as an argument.

### Queries

Source: <https://docs.nestjs.com/recipes/cqrs#queries>

Queries are used to retrieve data from the application state. They should be data centric, rather than task-based. When a query is dispatched, it is handled by a corresponding **Query Handler**. The handler is responsible for retrieving the data.

The `QueryBus` follows the same pattern as the `CommandBus`. Query handlers should implement the `IQueryHandler` interface and be annotated with the `@QueryHandler()` decorator.

### Events

Source: <https://docs.nestjs.com/recipes/cqrs#events>

Events are used to notify other parts of the application about changes in the application state. They are dispatched by **models** or directly using the `EventBus`. When an event is dispatched, it is handled by corresponding **Event Handlers**. Handlers can then, for example, update the read model.

For demonstration purposes, let's create an event class:

hero-killed-dragon.event.ts

```typescript
export class HeroKilledDragonEvent {
  constructor(
    public readonly heroId: string,
    public readonly dragonId: string,
  ) {}
}
```

Now while events can be dispatched directly using the `EventBus.publish()` method, we can also dispatch them from the model. Let's update the `Hero` model to dispatch the `HeroKilledDragonEvent` event when the `killEnemy()` method is called.

hero.model.ts

```typescript
export class Hero extends AggregateRoot {
  constructor(private id: string) {
    super();
  }

  killEnemy(enemyId: string) {
    // Business logic
    this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  }
}
```

The `apply()` method is used to dispatch events. It accepts an event object as an argument. However, since our model is not aware of the `EventBus`, we need to associate it with the model. We can do that by using the `EventPublisher` class.

kill-dragon.handler.ts

```typescript
@CommandHandler(KillDragonCommand)
export class KillDragonHandler
  implements ICommandHandler<KillDragonCommand>
{
  constructor(
    private repository: HeroRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: KillDragonCommand) {
    const { heroId, dragonId } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );
    hero.killEnemy(dragonId);
    hero.commit();
  }
}
```

The `EventPublisher#mergeObjectContext` method merges the event publisher into the provided object, which means that the object will now be able to publish events to the events stream.

Notice that in this example we also call the `commit()` method on the model. This method is used to dispatch any outstanding events. To automatically dispatch events, we can set the `autoCommit` property to `true`:

```typescript
export class Hero extends AggregateRoot {
  constructor(private id: string) {
    super();
    this.autoCommit = true;
  }
}
```

In case we want to merge the event publisher into a non-existing object, but rather into a class, we can use the `EventPublisher#mergeClassContext` method:

```typescript
const HeroModel = this.publisher.mergeClassContext(Hero);
const hero = new HeroModel('id'); // <-- HeroModel is a class
```

Now every instance of the `HeroModel` class will be able to publish events without using `mergeObjectContext()` method.

Additionally, we can emit events manually using `EventBus`:

```typescript
this.eventBus.publish(new HeroKilledDragonEvent());
```

> **Hint** The `EventBus` is an injectable class.

Each event can have multiple **Event Handlers**.

hero-killed-dragon.handler.ts

```typescript
@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler
  implements IEventHandler<HeroKilledDragonEvent>
{
  constructor(private repository: HeroRepository) {}

  handle(event: HeroKilledDragonEvent) {
    // Business logic
  }
}
```

> **Hint** Be aware that when you start using event handlers you get out of the traditional HTTP web context.
>
> - Errors in `CommandHandlers` can still be caught by built-in [Exception filters](https://docs.nestjs.com/exception-filters).
> - Errors in `EventHandlers` can't be caught by Exception filters: you will have to handle them manually. Either by a simple `try/catch`, using [Sagas](https://docs.nestjs.com/recipes/cqrs#sagas) by triggering a compensating event, or whatever other solution you choose.
> - HTTP Responses in `CommandHandlers` can still be sent back to the client.
> - HTTP Responses in `EventHandlers` cannot. If you want to send information to the client you could use [WebSocket](https://docs.nestjs.com/websockets/gateways), [SSE](https://docs.nestjs.com/techniques/server-sent-events), or whatever other solution you choose.

### Sagas

Source: <https://docs.nestjs.com/recipes/cqrs#sagas>

Saga is a long-running process that listens to events and may trigger new commands. It is usually used to manage complex workflows in the application. For example, when a user signs up, a saga may listen to the `UserRegisteredEvent` and send a welcome email to the user.

Sagas are an extremely powerful feature. A single saga may listen for 1..\* events. Using the [RxJS](https://github.com/ReactiveX/rxjs) library, we can filter, map, fork, and merge event streams to create sophisticated workflows. Each saga returns an Observable which produces a command instance. This command is then dispatched **asynchronously** by the `CommandBus`.

Let's create a saga that listens to the `HeroKilledDragonEvent` and dispatches the `DropAncientItemCommand` command.

heroes-game.saga.ts

```typescript
@Injectable()
export class HeroesGameSagas {
  @Saga()
  dragonKilled = (
    events$: Observable<any>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(HeroKilledDragonEvent),
      map(
        (event) =>
          new DropAncientItemCommand(event.heroId, fakeItemID),
      ),
    );
  };
}
```

> **Hint** The `ofType` operator and the `@Saga()` decorator are exported from the `@nestjs/cqrs` package.

The `@Saga()` decorator marks the method as a saga. The `events$` argument is an Observable stream of all events. The `ofType` operator filters the stream by the specified event type. The `map` operator maps the event to a new command instance.

In this example, we map the `HeroKilledDragonEvent` to the `DropAncientItemCommand` command. The `DropAncientItemCommand` command is then auto-dispatched by the `CommandBus`.

### Setup

Source: <https://docs.nestjs.com/recipes/cqrs#setup>

To wrap up, we need to register all command handlers, event handlers, and sagas in the `HeroesGameModule`:

heroes-game.module.ts

```typescript
export const CommandHandlers = [
  KillDragonHandler,
  DropAncientItemHandler,
];
export const EventHandlers = [
  HeroKilledDragonHandler,
  HeroFoundItemHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [HeroesGameController],
  providers: [
    HeroesGameService,
    HeroesGameSagas,
    ...CommandHandlers,
    ...EventHandlers,
    HeroRepository,
  ],
})
export class HeroesGameModule {}
```

### Unhandled exceptions

Source: <https://docs.nestjs.com/recipes/cqrs#unhandled-exceptions>

Event handlers are executed in the asynchronous manner. This means they should always handle all exceptions to prevent application from entering the inconsistent state. However, if an exception is not handled, the `EventBus` will create the `UnhandledExceptionInfo` object and push it to the `UnhandledExceptionBus` stream. This stream is an `Observable` which can be used to process unhandled exceptions.

```typescript

private destroy$ = new Subject<void>();

constructor(private unhandledExceptionsBus: UnhandledExceptionBus) {
  this.unhandledExceptionsBus
    .pipe(takeUntil(this.destroy$))
    .subscribe((exceptionInfo) => {
      // Handle exception here
      // e.g. send it to external service, terminate process, or publish a new event
    });
}

onModuleDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

To filter out exceptions, we can use the `ofType` operator, as follows:

```typescript
this.unhandledExceptionsBus
  .pipe(
    takeUntil(this.destroy$),
    UnhandledExceptionBus.ofType(TransactionNotAllowedException),
  )
  .subscribe((exceptionInfo) => {
    // Handle exception here
  });
```

Where `TransactionNotAllowedException` is the exception we want to filter out.

The `UnhandledExceptionInfo` object contains the following properties:

```typescript
export interface UnhandledExceptionInfo<
  Cause = IEvent | ICommand,
  Exception = any,
> {
  /**
   * The exception that was thrown.
   */
  exception: Exception;
  /**
   * The cause of the exception (event or command reference).
   */
  cause: Cause;
}
```

### Subscribing to all events

Source: <https://docs.nestjs.com/recipes/cqrs#subscribing-to-all-events>

`CommandBus`, `QueryBus` and `EventBus` are all **Observables**. This means that we can subscribe to the entire stream and, for example, process all events. For example, we can log all events to the console, or save them to the event store.

```typescript

private destroy$ = new Subject<void>();

constructor(private eventBus: EventBus) {
  this.eventBus
    .pipe(takeUntil(this.destroy$))
    .subscribe((event) => {
      // Save events to database
    });
}

onModuleDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Example

Source: <https://docs.nestjs.com/recipes/cqrs#example>

A working example is available [here](https://github.com/kamilmysliwiec/nest-cqrs-example).

## Documentation with Compodoc

See online <https://docs.nestjs.com/recipes/documentation>

## Serve Static

See online <https://docs.nestjs.com/recipes/serve-static>

## Nest Commander

See online <https://docs.nestjs.com/recipes/nest-commander>

Expanding on the [standalone application](https://docs.nestjs.com/standalone-applications) docs there's also the [nest-commander](https://jmcdo29.github.io/nest-commander) package for writing command line applications in a structure similar to your typical Nest application.

> **info**`nest-commander` is a third party package and is not managed by the entirety of the NestJS core team. Please, report any issues found with the library in the [appropriate repository](https://github.com/jmcdo29/nest-commander/issues/new/choose)

## Async Local Storage

See online <https://docs.nestjs.com/recipes/async-local-storage>

`AsyncLocalStorage` is a [Node.js API](https://nodejs.org/api/async_context.html#async_context_class_asynclocalstorage) (based on the `async_hooks` API) that provides an alternative way of propagating local state through the application without the need to explicitly pass it as a function parameter. It is similar to a thread-local storage in other languages.

The main idea of Async Local Storage is that we can _wrap_ some function call with the `AsyncLocalStorage#run` call. All code that is invoked within the wrapped call gets access to the same `store`, which will be unique to each call chain.

In the context of NestJS, that means if we can find a place within the request's lifecycle where we can wrap the rest of the request's code, we will be able to access and modify state visible only to that request, which may serve as an alternative to REQUEST-scoped providers and some of their limitations.

Alternatively, we can use ALS to propagate context for only a part of the system (for example the _transaction_ object) without passing it around explicitly across services, which can increase isolation and encapsulation.

## Automock

See online <https://docs.nestjs.com/recipes/automock>

Automock is a standalone library for unit testing. Using TypeScript Reflection API (`reflect-metadata`) internally to produce mock objects, Automock streamlines test development by automatically mocking class external dependencies.

> **info**`Automock` is a third party package and is not managed by the NestJS core team. Please, report any issues found with the library in the [appropriate repository](https://github.com/omermorad/automock)

## Runtime Optimizations

See online <https://docs.nestjs.com/faq/serverless#runtime-optimizations>

## Global Path Prefix

See online <https://docs.nestjs.com/faq/global-prefix>

## Raw Body

See online <https://docs.nestjs.com/faq/raw-body>

One of the most common use-case for having access to the raw request body is performing webhook signature verifications. Usually to perform webhook signature validations the unserialized request body is required to calculate an HMAC hash.

> **Warning** This feature can be used only if the built-in global body parser middleware is enabled, ie., you must not pass `bodyParser: false` when creating the app.

## Hybrid application

See online <https://docs.nestjs.com/faq/hybrid-application>

A hybrid application is one that listens for requests from two or more different sources. This can combine an HTTP server with a microservice listener or even just multiple different microservice listeners. The default `createMicroservice` method does not allow for multiple servers so in this case each microservice must be created and started manually. In order to do this, the `INestApplication` instance can be connected with `INestMicroservice` instances through the `connectMicroservice()` method.

```typescript
const app = await NestFactory.create(AppModule);
const microservice = app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.TCP,
});

await app.startAllMicroservices();
await app.listen(3001);
```

> **Hint** the `app.listen(port)` method starts an HTTP server on the specified address. If your application does not handle HTTP requests then you should use the `app.init()` method instead.

To connect multiple microservice instances, issue the call to `connectMicroservice()` for each microservice:

```typescript
const app = await NestFactory.create(AppModule);
// microservice #1
const microserviceTcp =
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
// microservice #2
const microserviceRedis =
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

await app.startAllMicroservices();
await app.listen(3001);
```

To bind `@MessagePattern()` to only one transport strategy (for example, MQTT) in a hybrid application with multiple microservices, we can pass the second argument of type `Transport` which is an enum with all the built-in transport strategies defined.

```typescript

@MessagePattern('time.us.*', Transport.NATS)
getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
  console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
  return new Date().toLocaleTimeString(...);
}
@MessagePattern({ cmd: 'time.us' }, Transport.TCP)
getTCPDate(@Payload() data: number[]) {
  return new Date().toLocaleTimeString(...);
}
```

> **Hint**`@Payload()`, `@Ctx()`, `Transport` and `NatsContext` are imported from `@nestjs/microservices`.

### Sharing configuration

Source: <https://docs.nestjs.com/faq/hybrid-application#sharing-configuration>

By default a hybrid application will not inherit global pipes, interceptors, guards and filters configured for the main (HTTP-based) application. To inherit these configuration properties from the main application, set the `inheritAppConfig` property in the second argument (an optional options object) of the `connectMicroservice()` call, as follow:

```typescript
const microservice = app.connectMicroservice<MicroserviceOptions>(
  {
    transport: Transport.TCP,
  },
  { inheritAppConfig: true },
);
```

## Common Errors

See online <https://docs.nestjs.com/faq/common-errors>
