# NestJS in a NxMonoRepo

All Samples: <https://github.com/nestjs/nest/tree/master/sample/>

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx Setup](#nx-setup)
  - [Use for Demos](#use-for-demos)
  - [Nx Workspace: Run the NestJS Application](#nx-workspace-run-the-nestjs-application)
  - [Or run via `nest` (If created with NestJS CLI)](#or-run-via-nest-if-created-with-nestjs-cli)
  - [Nx & SWC](#nx--swc)
- [Theoretical Background](#theoretical-background)
  - [Controllers](#controllers)
    - [Example](#example)
      - [CatsController](#catscontroller)
      - [CreateCatDto](#createcatdto)
      - [UpdateCatDto](#updatecatdto)
      - [Cat Class](#cat-class)
      - [CatsService](#catsservice)
  - [Providers](#providers)
    - [Providers & Scope](#providers--scope)
    - [Providers, Value Providers, Factory Providers](#providers-value-providers-factory-providers)
    - [Optional Providers](#optional-providers)
    - [Property-based Injection](#property-based-injection)
    - [Provider registration](#provider-registration)
      - [Adding the service to the providers array of the @Module() decorator](#adding-the-service-to-the-providers-array-of-the-module-decorator)
      - [As Object with `provide` and `useClass` properties](#as-object-with-provide-and-useclass-properties)
      - [As Object with `provide` and `useValue` properties, whereby the value is an instance of the service](#as-object-with-provide-and-usevalue-properties-whereby-the-value-is-an-instance-of-the-service)
      - [As Object with `provide` and `useFactory` properties, whereby the factory function returns an instance of the service](#as-object-with-provide-and-usefactory-properties-whereby-the-factory-function-returns-an-instance-of-the-service)
      - [As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function returns an instance of the service and awaits the result of the injected service before returning the instance of the service](#as-object-with-provide-usefactory-and-inject-properties-whereby-the-factory-function-returns-an-instance-of-the-service-and-awaits-the-result-of-the-injected-service-before-returning-the-instance-of-the-service)
      - [As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts parameters (`connection: Connection`) and dependend on them returns one or the other service instance](#as-object-with-provide-usefactory-and-inject-properties-whereby-the-factory-function-accepts-parameters-connection-connection-and-dependend-on-them-returns-one-or-the-other-service-instance)
      - [As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts a provider (`optionsProvider: OptionsProvider`) as parameter, awaits its result and creates the service instance with the result.](#as-object-with-provide-usefactory-and-inject-properties-whereby-the-factory-function-accepts-a-provider-optionsprovider-optionsprovider-as-parameter-awaits-its-result-and-creates-the-service-instance-with-the-result)
      - [As Object with `provide` and `useExisting` properties, whereby the value of the `useExisting` property is the class of the service](#as-object-with-provide-and-useexisting-properties-whereby-the-value-of-the-useexisting-property-is-the-class-of-the-service)
    - [Asynchronous Providers](#asynchronous-providers)
    - [Custom Providers](#custom-providers)
      - [DI Fundamentals](#di-fundamentals)
    - [Class Providers](#class-providers)
    - [Factory Providers](#factory-providers)
    - [Alias Providers](#alias-providers)
    - [Non-service based providers](#non-service-based-providers)
    - [Export Custom Provider](#export-custom-provider)
  - [Modules](#modules)
    - [Feature (Child) Modules](#feature-child-modules)
    - [Global Modules](#global-modules)
    - [Dynamic Modules](#dynamic-modules)
    - [Shared Modules](#shared-modules)
    - [Core Module (Singleton)](#core-module-singleton)
  - [Middleware](#middleware)
    - [Applying Middleware](#applying-middleware)
      - [`forRoutes()`](#forroutes)
    - [Multiple Middleware](#multiple-middleware)
    - [Excluding Routes](#excluding-routes)
    - [Functional Middleware](#functional-middleware)
    - [Global Middleware](#global-middleware)
    - [Further Details](#further-details)
  - [Exception Filters](#exception-filters)
    - [Throwing Standard Exceptions](#throwing-standard-exceptions)
    - [Custom Exceptions](#custom-exceptions)
    - [Built-in HTTP exceptions](#built-in-http-exceptions)
    - [Full Control with Exception Filters](#full-control-with-exception-filters)
    - [Arguments Host](#arguments-host)
    - [Binding Filters](#binding-filters)
      - [`APP_FILTER` Provider (Module-scoped Filter)](#app_filter-provider-module-scoped-filter)
      - [`@UseFilters()` Decorator (Controller-scoped Filter)](#usefilters-decorator-controller-scoped-filter)
      - [`@UseFilters()` Decorator (Method-scoped Filter)](#usefilters-decorator-method-scoped-filter)
      - [Application-scoped Filter](#application-scoped-filter)
    - [Catch Everything](#catch-everything)
    - [Inheritance](#inheritance)
    - [Exception Filters vs Pipes](#exception-filters-vs-pipes)
  - [Pipes](#pipes)
    - [Built-in Pipes](#built-in-pipes)
      - [ValidationPipe](#validationpipe)
      - [ParseIntPipe](#parseintpipe)
      - [ParseBoolPipe](#parseboolpipe)
      - [ParseArrayPipe](#parsearraypipe)
      - [ParseFloatPipe](#parsefloatpipe)
      - [ParseUUIDPipe](#parseuuidpipe)
      - [ParseEnumPipe](#parseenumpipe)
      - [DefaultValuePipe](#defaultvaluepipe)
      - [ParseFilePipe](#parsefilepipe)
      - [Custom Pipes](#custom-pipes)
    - [Schema-based Validation](#schema-based-validation)
    - [Binding Pipes (Overview)](#binding-pipes-overview)
    - [Binding Pipes (Other Techniques)](#binding-pipes-other-techniques)
      - [`APP_PIPE` Provider (Module-scoped Pipe)](#app_pipe-provider-module-scoped-pipe)
      - [`@UsePipes()` Decorator (Controller-scoped Pipe)](#usepipes-decorator-controller-scoped-pipe)
      - [`@UsePipes()` Decorator (Method-scoped Pipe)](#usepipes-decorator-method-scoped-pipe)
      - [Application-scoped Pipe](#application-scoped-pipe)
    - [Binding Multiple Pipes](#binding-multiple-pipes)
    - [Binding Multiple Pipes (with options)](#binding-multiple-pipes-with-options)
  - [Guards](#guards)
    - [Authorization Guards](#authorization-guards)
    - [Authorization guard](#authorization-guard)
    - [Execution context](#execution-context)
    - [Role based authentication](#role-based-authentication)
    - [Binding guards](#binding-guards)
    - [Setting roles per handler](#setting-roles-per-handler)
    - [Putting it all together](#putting-it-all-together)
  - [Interceptors](#interceptors)
    - [Basics](#basics)
    - [Execution context](#execution-context-1)
    - [Call handler](#call-handler)
    - [Aspect Interception](#aspect-interception)
    - [Binding interceptors](#binding-interceptors)
    - [Interceptor composition](#interceptor-composition)
    - [Interceptor context](#interceptor-context)
    - [Interceptor exclusion](#interceptor-exclusion)
    - [Interceptor inheritance](#interceptor-inheritance)
    - [Interceptor ordering](#interceptor-ordering)
    - [Interceptor interface](#interceptor-interface)
    - [Interceptor as middleware](#interceptor-as-middleware)
    - [Response mapping](#response-mapping)
    - [Stream Overriding](#stream-overriding)
    - [More Operators](#more-operators)
  - [Custom Decorators](#custom-decorators)
    - [Decorator Factories](#decorator-factories)
    - [Decorator Composition](#decorator-composition)
    - [Passing Data](#passing-data)
    - [Decorator Internals](#decorator-internals)
    - [Decorator as middleware](#decorator-as-middleware)
    - [Decorator inheritance](#decorator-inheritance)
    - [Decorator ordering](#decorator-ordering)
    - [Decorator interface](#decorator-interface)
    - [Working with Pipes](#working-with-pipes)
    - [Working with Guards](#working-with-guards)
    - [Working with Interceptors](#working-with-interceptors)
    - [Working with Filters](#working-with-filters)
  - [Injection Scopes](#injection-scopes)
    - [Provider Scope](#provider-scope)
      - [Usage](#usage)
    - [Controller Scope](#controller-scope)
    - [Scope Hierarchies](#scope-hierarchies)
    - [Request Provider](#request-provider)
    - [Inquirer Provider](#inquirer-provider)
    - [Performance Considerations](#performance-considerations)
    - [Durable Providers](#durable-providers)
  - [Circular Dependency](#circular-dependency)
    - [Circular Dependency Detection](#circular-dependency-detection)
    - [Circular Dependency Prevention](#circular-dependency-prevention)
      - [Technique 1: Use `forwardRef()`](#technique-1-use-forwardref)
      - [Technique 2: Use `@Inject()` with string token](#technique-2-use-inject-with-string-token)
      - [Technique 3: Use `@Inject()` with `forwardRef()`](#technique-3-use-inject-with-forwardref)
      - [Technique 4: Use `@Inject()` with `Type` token](#technique-4-use-inject-with-type-token)
      - [Technique 5: Use `@Inject()` with `Type` token and `forwardRef()`](#technique-5-use-inject-with-type-token-and-forwardref)
      - [Technique 6: Use `@Inject()` with `Type` token and `forwardRef()` (with `useClass`)](#technique-6-use-inject-with-type-token-and-forwardref-with-useclass)
      - [Technique 7: Use `@Inject()` with `Type` token and `forwardRef()` (with `useFactory`)](#technique-7-use-inject-with-type-token-and-forwardref-with-usefactory)
      - [Technique 8: Use `@Inject()` with `Type` token and `forwardRef()` (with `useExisting`)](#technique-8-use-inject-with-type-token-and-forwardref-with-useexisting)
      - [Technique 9: Use `@Inject()` with `Type` token and `forwardRef()` (with `useValue`)](#technique-9-use-inject-with-type-token-and-forwardref-with-usevalue)
  - [Module Reference](#module-reference)
    - [Resolving Providers](#resolving-providers)
    - [Resolving Scoped Providers](#resolving-scoped-providers)
    - [Resolving Scoped Providers with Payload](#resolving-scoped-providers-with-payload)
    - [Resolving Scoped Providers with ContextId](#resolving-scoped-providers-with-contextid)
    - [Resolving Scoped Providers with ContextId and Payload](#resolving-scoped-providers-with-contextid-and-payload)
    - [Resolving Scoped Providers with ContextId and Payload](#resolving-scoped-providers-with-contextid-and-payload-1)
    - [Retrieving Instances](#retrieving-instances)
    - [Getting Instance by Name](#getting-instance-by-name)
    - [Registering REQUEST Provider](#registering-request-provider)
    - [Getting Current Sub-tree](#getting-current-sub-tree)
    - [Instantiating custom classes dynamically](#instantiating-custom-classes-dynamically)
  - [Lazy Loading Modules](#lazy-loading-modules)
    - [Lazy Loading controllers, gateways, and resolvers](#lazy-loading-controllers-gateways-and-resolvers)
      - [Common Use Cases](#common-use-cases)
  - [Execution Context](#execution-context-2)
    - [ArgumentsHost Class](#argumentshost-class)
    - [Current Application Context](#current-application-context)
    - [Host handler arguments](#host-handler-arguments)
    - [ExecutionContext class](#executioncontext-class)
  - [Lifecycle Events](#lifecycle-events)
    - [Lifecycle sequence](#lifecycle-sequence)
    - [Lifecycle events](#lifecycle-events-1)
    - [Usage](#usage-1)
    - [Asynchronous initialization](#asynchronous-initialization)
    - [Application shutdown](#application-shutdown)
  - [Platform agnosticism](#platform-agnosticism)
  - [Testing](#testing)
    - [Installation](#installation)
    - [Unit testing](#unit-testing)
    - [Testing utilities](#testing-utilities)

<!-- /code_chunk_output -->

## Nx Setup

Create a new NestJS project within a NxMonoRepo via Nx Console:

```bash
npm i -g @nestjs/cli
npm i -D @nx/nest
npx nx generate @nx/nest:application
  --name=middleware-basis-app
  --frontendProject=basis-app
  --directory=apps/basis/middleware-basis-app
  --projectNameAndRootFormat=as-provided
  --tags=middleware-basis-app
  --no-interactive
  # --dry-run
```

### Use for Demos

```shell
npm i -S --legacy-peer-deps @nestjs/common @nestjs/core @nestjs/jwt @nestjs/passport @nestjs/platform-express @nestjs/serve-static @nestjs/swagger

npm i -D --legacy-peer-deps @nestjs/devtools-integration @nestjs/mapped-types @nestjs/schematics @nestjs/typeorm @nx/nest @nx/node @nx/workspace --verbose
```

```shell
npm i -g @nestjs/cli
```

### Nx Workspace: Run the NestJS Application

```bash
nx run middleware-basis-app:serve:development
```

### Or run via `nest` (If created with NestJS CLI)

> **Hint** If created with **nestjs/cli (nest)** instead of **Nx**
> To speed up the development process (x20 times faster builds), you can use the [SWC builder](https://docs.nestjs.com/recipes/swc) by passing the `-b swc` flag to the `start` script, as follows `nest start -b swc`.

### Nx & SWC

**For Nx & swc** -> see <https://nx.dev/nx-api/js/executors/swc>

## Theoretical Background

### Controllers

Controllers are responsible for handling **incoming requests** and **returning responses** to the client and for transforming the incoming request to the format required by the service.

They should be kept as lean as possible and should not contain any business logic except for routing logic. They are bound to a specific **path** (or paths) and **HTTP method** combination.

#### Example

##### CatsController

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

/**
 * The `@Controller()` decorator takes an optional `path`
 * argument that will be prefixed to each path
 * defined within the controller. `/cats` in this case.
 */

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * The `@Post()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/create`.
   *
   * The `@Body()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `createCatDto` parameter
   * will be retrieved from the `body` property of the request object.
   *
   * The `create()` method returns a `Promise` of type `Cat`.
   */

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  /**
   * The `@Get()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/findAll`.
   * The `findAll()` method returns a `Promise` of type `Cat[]`.
   */

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  /**
   * The `@Get()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/:id`.
   *
   * The `@Param()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `id` parameter
   * will be retrieved from the `params` property of the request object.
   * The `findOne()` method returns a `Promise` of type `Cat`.
   */

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(+id);
  }

  /**
   * The `@Patch()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   * In this case, the path will be `/cats` + `/:id`.
   *
   * The `@Param()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `id` parameter
   * will be retrieved from the `params` property of the request object.
   *
   * The `@Body()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `updateCatDto` parameter
   * will be retrieved from the `body` property of the request object.
   *
   * The `update()` method returns a `Promise` of type `Cat`.
   */

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catsService.update(+id, updateCatDto);
  }

  /**
   * The `@Delete()` decorator takes an optional `path` argument
   * that will be appended to the path defined at the controller level.
   *
   * In this case, the path will be `/cats` + `/:id`.
   *
   * The `@Param()` decorator takes an optional `param` argument
   * that will be used to retrieve the value of the parameter
   * from the request object.
   *
   * In this case, the value of the `id` parameter
   * will be retrieved from the `params` property of the request object.
   *
   * The `remove()` method returns a `Promise` of type `void`.
   */

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(+id);
  }
}
```

##### CreateCatDto

```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

##### UpdateCatDto

```ts
export class UpdateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

##### Cat Class

```ts
export class Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}
```

##### CatsService

```ts
import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = createCatDto.name;
    cat.age = createCatDto.age;
    cat.breed = createCatDto.breed;

    this.cats.push(cat);
    return Promise.resolve(cat);
  }

  findAll(): Promise<Cat[]> {
    return Promise.resolve(this.cats);
  }

  findOne(id: number): Promise<Cat> {
    return Promise.resolve(this.cats[id]);
  }

  update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = this.cats[id];
    cat.name = updateCatDto.name;
    cat.age = updateCatDto.age;
    cat.breed = updateCatDto.breed;

    return Promise.resolve(cat);
  }

  remove(id: number): Promise<void> {
    this.cats.splice(id, 1);
    return Promise.resolve();
  }
}
```

### Providers

Everything, that can be annotated with the `@Injectable()` decorator, can be used as a provider. The `@Injectable()` decorator is optional, but it is good practice to use it to keep the code clean and explicit.

#### Providers & Scope

By default, Nest makes each provider **singleton**, which means that **the same instance of each provider will be shared across the entire module**. If you want to **limit the scope of a provider**, you can use the `@Scope()` decorator.

```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {}
```

The `@Scope()` decorator takes a single argument, which is a `Scope` enum member. The following table describes the available options:

> **Hint** The `REQUEST` scope is **not** available in **microservices**. If you want to **share** the provider instance across consumers, you should **not** use the `REQUEST` scope.

| Scope       | Description                                                                                                                                                                                                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`   | The provider is instantiated **only once** in the scope of the entire application. The same instance is shared across **all** consumers.                                                                                                                                                                            |
| `TRANSIENT` | The provider is instantiated **every time** it is requested. This behavior is **independent** of the consumer's lifetime, which means that **every** consumer gets a **dedicated** instance of the provider.                                                                                                        |
| `REQUEST`   | The provider is instantiated **once** per incoming request. That means that **each** provider instance lives **only** within the **scope** of a single request and **is not** shared across consumers. If you want to **share** the provider instance across consumers, you should **not** use the `REQUEST` scope. |

#### Providers, Value Providers, Factory Providers

Value providers are a special type of provider that **returns a value** rather than an instance when requested. Value providers are **not** instantiated by the Nest IoC container.

Factory providers are a special type of provider that returns a value created by a **factory function**. Factory providers are **not** instantiated by the Nest IoC container.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
```

#### Optional Providers

If you want to **inject** a provider **conditionally**, you can use the `@Optional()` decorator. If the provider is not found, the `@Optional()` decorator will cause the **dependency injector** to **inject** `undefined` instead of throwing an exception.

```ts
import { Injectable, Optional } from '@nestjs/common';
import { CatsService } from './cats.service';

@Injectable()
export class DogsService {
  constructor(@Optional() private catsService: CatsService) {}
}
```

#### Property-based Injection

Details online <https://docs.nestjs.com/providers#property-based-injection>

The technique we've used so far is called constructor-based injection, as providers are injected via the constructor method. In some very specific cases, **property-based injection** might be useful. For instance, if your top-level class depends on either one or multiple providers, passing them all the way up by calling `super()` in sub-classes from the constructor can be very tedious. In order to avoid this, you can use the `@Inject()` decorator at the property level.

```ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

#### Provider registration

Providers are registered in modules.

##### Adding the service to the providers array of the @Module() decorator

CatsController has CatsService as a dependency. The CatsService is a provider. The CatsService is registered in the providers array of the @Module() decorator.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

##### As Object with `provide` and `useClass` properties

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide` and `useValue` properties, whereby the value is an instance of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useValue: new CatsService(),
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide` and `useFactory` properties, whereby the factory function returns an instance of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: () => {
        const catsService = new CatsService();
        // ... do something with the catsService
        // e.g. bind to events, etc.
        return catsService;
      },
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function returns an instance of the service and awaits the result of the injected service before returning the instance of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: async () => {
        const catsService = new CatsService();
        await catsService.init();
        return catsService;
      },
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts parameters (`connection: Connection`) and dependend on them returns one or the other service instance

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: (connection: Connection) => {
        if (connection.isConnected) {
          return new CatsService(connection);
        }
        return new MockCatsService();
      },
      inject: [Connection],
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide`, `useFactory` and `inject` properties, whereby the factory function accepts a provider (`optionsProvider: OptionsProvider`) as parameter, awaits its result and creates the service instance with the result.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useFactory: async (optionsProvider: OptionsProvider) => {
        const options = await optionsProvider.get();
        return new CatsService(options);
      },
      inject: [OptionsProvider],
    },
  ],
})
export class CatsModule {}
```

##### As Object with `provide` and `useExisting` properties, whereby the value of the `useExisting` property is the class of the service

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Connection } from './connection.provider';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    Connection,
    {
      provide: 'CONNECTION',
      useExisting: Connection,
    },
  ],
})
export class CatsModule {}
```

#### Asynchronous Providers

Providers can be **asynchronous**. This is useful when the provider is **dependent** on **asynchronous** logic. For example, when the provider needs to **connect** to a **database**.

At times, the application start should be delayed until one or more **asynchronous tasks** are completed. For example, you may not want to start accepting requests until the connection with the database has been established. You can achieve this using asynchronous providers.

The syntax for this is to use `async/await` with the `useFactory` syntax. The factory returns a `Promise`, and the factory function can `await` asynchronous tasks. Nest will await resolution of the promise before instantiating any class that depends on (injects) such a provider.

```ts
{
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection(options);
    return connection;
  },
}
```

#### Custom Providers

Custom providers are useful when you want to **configure** a provider before injecting it, or when you want to **create** a **dynamic** provider.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Connection } from './connection.provider';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    Connection,
    {
      provide: 'CONNECTION',
      useExisting: Connection,
    },
  ],
})

// The `configure()` method takes a `consumer` argument
// which is an instance of the `MiddlewareConsumer` class.
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
```

##### DI Fundamentals

Source: <https://docs.nestjs.com/fundamentals/custom-providers>

Dependency injection is an [inversion of control (IoC)](https://en.wikipedia.org/wiki/Inversion_of_control) technique wherein you delegate instantiation of dependencies to the IoC container (in our case, the NestJS runtime system), instead of doing it in your own code imperatively. Let's examine what's happening in this example from the [Providers chapter](https://docs.nestjs.com/providers).

First, we define a provider. The `@Injectable()` decorator marks the `CatsService` class as a provider.

```ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
```

Then we request that Nest inject the provider into our controller class:

```ts
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

Finally, we register the provider with the Nest IoC container:

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

What exactly is happening under the covers to make this work? There are three key steps in the process:

1. In `cats.service.ts`, the `@Injectable()` decorator declares the `CatsService` class as a class that can be managed by the Nest IoC container.
2. In `cats.controller.ts`, `CatsController` declares a dependency on the `CatsService` token with constructor injection:

```ts
constructor(private catsService: CatsService) {}
```

3. In `app.module.ts`, we associate the token `CatsService` with the class `CatsService` from the `cats.service.ts` file. We'll [see below](https://docs.nestjs.com/fundamentals/custom-providers#standard-providers) exactly how this association (also called _registration_) occurs.

When the Nest IoC container instantiates a `CatsController`, it first looks for any dependencies\*. When it finds the `CatsService` dependency, it performs a lookup on the `CatsService` token, which returns the `CatsService` class, per the registration step (#3 above). Assuming `SINGLETON` scope (the default behavior), Nest will then either create an instance of `CatsService`, cache it, and return it, or if one is already cached, return the existing instance.

\*This explanation is a bit simplified to illustrate the point. One important area we glossed over is that the process of analyzing the code for dependencies is very sophisticated, and happens during application bootstrapping. One key feature is that dependency analysis (or "creating the dependency graph"), is **transitive**. In the above example, if the `CatsService` itself had dependencies, those too would be resolved. The dependency graph ensures that dependencies are resolved in the correct order - essentially "bottom up". This mechanism relieves the developer from having to manage such complex dependency graphs.

#### Class Providers

The `useClass` syntax allows you to dynamically determine a class that a token should resolve to. For example, suppose we have an abstract (or default) `ConfigService` class. Depending on the current environment, we want Nest to provide a different implementation of the configuration service. The following code implements such a strategy.

```ts
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
```

Let's look at a couple of details in this code sample. You'll notice that we define `configServiceProvider` with a literal object first, then pass it in the module decorator's `providers` property. This is just a bit of code organization, but is functionally equivalent to the examples we've used thus far in this chapter.

Also, we have used the `ConfigService` class name as our token. For any class that depends on `ConfigService`, Nest will inject an instance of the provided class (`DevelopmentConfigService` or `ProductionConfigService`) overriding any default implementation that may have been declared elsewhere (e.g., a `ConfigService` declared with an `@Injectable()` decorator).

#### Factory Providers

The `useFactory` syntax allows for creating providers **dynamically**. The actual provider will be supplied by the value returned from a factory function. The factory function can be as simple or complex as needed. A simple factory may not depend on any other providers. A more complex factory can itself inject other providers it needs to compute its result. For the latter case, the factory provider syntax has a pair of related mechanisms:

1. The factory function can accept (optional) arguments.
2. The (optional) `inject` property accepts an array of providers that Nest will resolve and pass as arguments to the factory function during the instantiation process. Also, these providers can be marked as optional. The two lists should be correlated: Nest will pass instances from the `inject` list as arguments to the factory function in the same order. The example below demonstrates this.

```ts
// prettier-ignore
const connectionProvider = {
  provide: 'CONNECTION',
  useFactory: (
    optionsProvider: OptionsProvider,
    optionalProvider?: string
    ) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
  //       \_____________/            \__________________/
  //        This provider              The provider with this
  //        is mandatory.              token can resolve to `undefined`.
};

@Module({
  providers: [
    connectionProvider,
    OptionsProvider,
    // { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
})
export class AppModule {}
```

#### Alias Providers

The `useExisting` syntax allows you to create aliases for existing providers. This creates two ways to access the same provider. In the example below, the (string-based) token `'AliasedLoggerService'` is an alias for the (class-based) token `LoggerService`. Assume we have two different dependencies, one for `'AliasedLoggerService'` and one for `LoggerService`. If both dependencies are specified with `SINGLETON` scope, they'll both resolve to the same instance.

```ts
@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}
```

#### Non-service based providers

While providers often supply services, they are not limited to that usage. A provider can supply **any** value. For example, a provider may supply an array of configuration objects based on the current environment, as shown below:

```ts
const configServiceProvider = {
  provide: 'CONFIG_OPTIONS',
  useFactory: (): ConfigOptions => {
    const env = process.env.NODE_ENV || 'development';
    const configFilePath = `${env}.config.json`;
    const config = JSON.parse(
      fs.readFileSync(configFilePath).toString(),
    );
    return config;
  },
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
```

or

```ts
const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development'
      ? devConfig
      : prodConfig;
  },
};

@Module({
  providers: [configFactory],
})
export class AppModule {}
```

#### Export Custom Provider

Like any provider, a custom provider is scoped to its declaring module. To make it visible to other modules, it must be exported. To export a custom provider, we can either use its token or the full provider object.

The following example shows exporting using the token:

```ts
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class AppModule {}
```

Alternatively, export with the full provider object:

```ts
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: [connectionFactory],
})
export class AppModule {}
```

### Modules

Source: <https://docs.nestjs.com/modules>

Each application has at least one module, a **root module**. The root module is the starting point Nest uses to build the **application graph** - the internal data structure Nest uses to resolve module and provider relationships and dependencies.

A module is a class annotated with a `@Module()` decorator. The `@Module()` decorator provides metadata that Nest makes use of to organize the application structure.

A module can have **one or more** of the following properties:

- `controllers` - the set of controllers defined in the module which have to be instantiated
- `exports` - the subset of providers that are provided by this module and should be available in other modules which import this module
- `imports` - the set of modules required by this module
- `providers` - the set of providers defined in the module which have to be instantiated by the Nest injector

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Feature (Child) Modules

Feature modules are modules that **organize the code** related to a specific feature, keeping code that belongs together **closely**. They can be **imported** by other modules.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Global Modules

Global modules are modules that **should be available everywhere** in the application context. They should be **registered only once** and **not** be **re-exported** from any other module.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Dynamic Modules

Dynamic modules are modules that are **not** known at compile time and are **created** dynamically based on runtime information. They are declared using a **provider-based** syntax.

```ts
import { Module } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';

@Module({
  providers: [...createDatabaseProviders()],
})
export class DatabaseModule {}
```

#### Shared Modules

Shared modules are modules that **export** providers that are widely used and **re-exported** by other modules.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

#### Core Module (Singleton)

The core module is a special module that is **available everywhere** in the application context. It should be **registered only once** and **not** be **re-exported** from any other module.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
})
export class CoreModule {}
```

### Middleware

Source: <https://docs.nestjs.com/middleware>

Middleware are functions that have access to the **request** and **response** object. Middleware functions can **execute** any code, **make changes** to the request and the response objects, **end** the request-response cycle, and **call** the next middleware function in the stack.

The difference to interceptors is, that middleware functions have **full access** to the **request** and **response** objects, whereas interceptors are **not** allowed to **modify** the **request** object.

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

#### Applying Middleware

```ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})

// The `configure()` method takes a `consumer` argument
// which defines the set of routes which are handled by the middleware.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
```

##### `forRoutes()`

The `forRoutes()` method can take:

- a **string** representing a **path** (or paths)
- a **class** representing a **controller**
- an **object** representing a **specific route configuration**

#### Multiple Middleware

As mentioned above, in order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the apply() method:

```ts
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

#### Excluding Routes

```ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})

// The `configure()` method takes a `consumer` argument
// which defines the set of routes which are handled by the middleware.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
```

#### Functional Middleware

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      console.log('Request...');
      next();
    };
  }
}
```

#### Global Middleware

If we want to bind middleware to every registered route at once, we can use the `use()` method that is supplied by the `INestApplication` instance:

```ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

> **Hint** Accessing the DI container in a global middleware is not possible. You can use a [functional middleware](https://docs.nestjs.com/middleware#functional-middleware) instead when using `app.use()`. Alternatively, you can use a class middleware and consume it with `.forRoutes('*')` within the `AppModule` (or any other module).

#### Further Details

```ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';
```

The `APP_GUARD` token is used to provide a guard that is applied
globally to all controllers.

RolesGuard is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the guard. The `provide` property is optional and defaults to the class of the guard. The `provide` property is used to inject the guard into other providers.

The `APP_FILTER` token is used to provide a filter that is applied
globally to all controllers.

HttpExceptionFilter is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the filter. The `provide` property is optional and defaults to the class of the filter. The `provide` property is used to inject the filter into other providers.

The `APP_INTERCEPTOR` token is used to provide an interceptor that is applied
globally to all controllers.

LoggingInterceptor is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the interceptor. The `provide` property is optional and defaults to the class of the interceptor. The `provide` property is used to inject the interceptor into other providers.

The `APP_PIPE` token is used to provide a pipe that is applied
globally to all controllers.

ValidationPipe is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the pipe. The `provide` property is optional and defaults to the class of the pipe. The `provide` property is used to inject the pipe into other providers.

### Exception Filters

Source: <https://docs.nestjs.com/exception-filters>

Exception filters are used to **catch** exceptions **globally** and **transform** them into **proper responses**.

You can compare them with Angular's **interceptors**. The difference is that **interceptors** are called **before** a handler is executed, and **exception filters** are called **after** an exception is thrown from the handler. Exception filters should implement the `ExceptionFilter` interface.

```ts
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

```ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

Out of the box, this action is performed by a built-in **global exception filter**, which handles exceptions of type `HttpException` (and subclasses of it). When an exception is **unrecognized** (is neither `HttpException` nor a class that inherits from `HttpException`), the built-in exception filter generates the following default JSON response:

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

> **Hint** The global exception filter partially supports the `http-errors` library. Basically, any thrown exception containing the `statusCode` and `message` properties will be properly populated and sent back as a response (instead of the default `InternalServerErrorException` for unrecognized exceptions).

#### Throwing Standard Exceptions

Nest provides a set of standard exceptions that are mapped to HTTP response status codes. For example, the `NotFoundException` exception is mapped to the `404` status code. When this exception is thrown, Nest automatically responds with the following JSON:

```json
{
  "statusCode": 404,
  "message": "Not Found"
}
```

The following table describes the built-in exceptions and their corresponding HTTP status codes:

| Exception Name                  | Status Code |
| ------------------------------- | ----------- |
| `BadRequestException`           | `400`       |
| `UnauthorizedException`         | `401`       |
| `NotFoundException`             | `404`       |
| `ForbiddenException`            | `403`       |
| `NotAcceptableException`        | `406`       |
| `RequestTimeoutException`       | `408`       |
| `ConflictException`             | `409`       |
| `GoneException`                 | `410`       |
| `PayloadTooLargeException`      | `413`       |
| `UnsupportedMediaTypeException` | `415`       |
| `UnprocessableEntityException`  | `422`       |
| `InternalServerErrorException`  | `500`       |
| `NotImplementedException`       | `501`       |
| `BadGatewayException`           | `502`       |
| `ServiceUnavailableException`   | `503`       |
| `GatewayTimeoutException`       | `504`       |

Nest provides a built-in `HttpException` class, exposed from the `@nestjs/common` package. For typical HTTP REST/GraphQL API based applications, it's best practice to send standard HTTP response objects when certain error conditions occur.

For example, in the `CatsController`, we have a `findAll()` method (a `GET` route handler). Let's assume that this route handler throws an exception for some reason. To demonstrate this, we'll hard-code it as follows:

```ts
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

The `HttpException` class takes two arguments: a `response` and a `status` code. The `response` argument can be either a string or an object. If it's an object, it will be stringified and returned as a JSON response. The `status` argument is an HTTP response status code.

The `HttpException` class is a subclass of the built-in `Error` class. This means that you can pass an error stack to the `response` argument. For example:

```ts
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
```

> **Hint** We used the `HttpStatus` here. This is a helper enum imported from the `@nestjs/common` package.

To override just the message portion of the JSON response body, supply a string in the `response` argument. To override the entire JSON response body, pass an object in the `response` argument. Nest will serialize the object and return it as the JSON response body.

The second constructor argument - `status` - should be a valid HTTP status code. Best practice is to use the `HttpStatus` enum imported from `@nestjs/common`.

There is a **third** constructor argument (optional) - `options` - that can be used to provide an error [cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause). This `cause` object is not serialized into the response object, but it can be useful for logging purposes, providing valuable information about the inner error that caused the `HttpException` to be thrown.

Here's an example overriding the entire response body and providing an error cause:

```ts
@Get()
async findAll() {
try {
  await this.service.findAll()
} catch (error) {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN, {
    cause: error
  });
}
}
```

Using the above, this is how the response would look:

```json
{
  "statusCode": 403,
  "error": "This is a custom message"
}
```

#### Custom Exceptions

You can create your own custom exceptions by extending the built-in `HttpException` class. For example, let's create a `ForbiddenException` class:

```ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

Now, we can throw this exception from the `CatsController`:

```ts

@Get()
async findAll() {
  throw new ForbiddenException();
}
```

#### Built-in HTTP exceptions

Nest provides a set of standard exceptions that inherit from the base `HttpException`. These are exposed from the `@nestjs/common` package, and represent many of the most common HTTP exceptions:

- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `NotAcceptableException`
- `RequestTimeoutException`
- `ConflictException`
- `GoneException`
- `HttpVersionNotSupportedException`
- `PayloadTooLargeException`
- `UnsupportedMediaTypeException`
- `UnprocessableEntityException`
- `InternalServerErrorException`
- `NotImplementedException`
- `ImATeapotException`
- `MethodNotAllowedException`
- `BadGatewayException`
- `ServiceUnavailableException`
- `GatewayTimeoutException`
- `PreconditionFailedException`

All the built-in exceptions can also provide both an error `cause` and an error description using the `options` parameter:

```typescript
throw new BadRequestException('Something bad happened', {
  cause: new Error(),
  description: 'Some error description',
});
```

Using the above, this is how the response would look:

```json
{
  "message": "Something bad happened",
  "error": "Some error description",
  "statusCode": 400
}
```

#### Full Control with Exception Filters

While the base (built-in) exception filter can automatically handle many cases for you, you may want **full control** over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. **Exception filters** are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.

Let's create an exception filter that is responsible for catching exceptions which are an instance of the `HttpException` class, and implementing custom response logic for them. To do this, we'll need to access the underlying platform `Request` and `Response` objects. We'll access the `Request` object so we can pull out the original `url` and include that in the logging information. We'll use the `Response` object to take direct control of the response that is sent, using the `response.json()` method.

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

> **Hint** All exception filters should implement the generic `ExceptionFilter<T>` interface. This requires you to provide the `catch(exception: T, host: ArgumentsHost)` method with its indicated signature. `T` indicates the type of the exception.

The `@Catch(HttpException)` decorator binds the required metadata to the exception filter, telling Nest that this particular filter is looking for exceptions of type `HttpException` and nothing else. The `@Catch()` decorator may take a single parameter, or a comma-separated list. This lets you set up the filter for several types of exceptions at once.

The `catch()` method is the heart of the exception filter. It receives two arguments:

- `exception` - the exception instance being handled
- `host` - the arguments host object

The `host` object provides access to the underlying platform `Request` and `Response` objects. The `switchToHttp()` method returns an object with two methods: `getRequest()` and `getResponse()`. These methods return the underlying `Request` and `Response` objects respectively.

The `exception` object is an instance of the `HttpException` class. This class has a `getStatus()` method that returns the HTTP status code of the exception. We use this to set the status code of the response.

Finally, we use the `response.json()` method to send a JSON response back to the client. We use the `request.url` property to include the original URL in the response.

#### Arguments Host

Let's look at the parameters of the `catch()` method. The `exception` parameter is the exception object currently being processed. The `host` parameter is an `ArgumentsHost` object. `ArgumentsHost` is a powerful utility object that we'll examine further in the [execution context chapter](https://docs.nestjs.com/fundamentals/execution-context). In this code sample, we use it to obtain a reference to the `Request` and `Response` objects that are being passed to the original request handler (in the controller where the exception originates). In this code sample, we've used some helper methods on `ArgumentsHost` to get the desired `Request` and `Response` objects. Learn more about `ArgumentsHost`[here](https://docs.nestjs.com/fundamentals/execution-context).

The reason for this level of abstraction is that `ArgumentsHost` functions in all contexts (e.g., the HTTP server context we're working with now, but also Microservices and WebSockets). In the execution context chapter we'll see how we can access the appropriate [underlying arguments](https://docs.nestjs.com/fundamentals/execution-context#host-methods) for **any** execution context with the power of `ArgumentsHost` and its helper functions. This will allow us to write generic exception filters that operate across all contexts.

#### Binding Filters

Now that we've created our exception filter, we need to bind it to the application. We can do this in several ways. The first way is to bind it globally, using the `APP_FILTER` provider:

##### `APP_FILTER` Provider (Module-scoped Filter)

You can add as many filters with this technique as needed; simply add each to the providers array.

```ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

> **Hint** When using this approach to perform dependency injection for the filter, note that regardless of the module where this construction is employed, the filter is, in fact, global. Where should this be done? Choose the module where the filter (`HttpExceptionFilter` in the example above) is defined. Also, `useClass` is not the only way of dealing with custom provider registration. Learn more [here](https://docs.nestjs.com/fundamentals/custom-providers).

The `APP_FILTER` token is used to provide a filter that is applied globally to all controllers.

HttpExceptionFilter is a provider with `provide` and `useClass` properties. The value of the `useClass` property is the class of the filter. The `provide` property is optional and defaults to the class of the filter. The `provide` property is used to inject the filter into other providers.

The second way is to bind it to a particular controller or set of controllers using the `@UseFilters()` decorator:

##### `@UseFilters()` Decorator (Controller-scoped Filter)

```ts
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

The `@UseFilters()` decorator takes a single argument, which is the exception filter instance. This is the same instance that would be provided by the `APP_FILTER` provider.

The third way is to bind it to a particular method or set of methods using the `@UseFilters()` decorator:

##### `@UseFilters()` Decorator (Method-scoped Filter)

```ts
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Controller('cats')
export class CatsController {
  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll() {
    throw new ForbiddenException();
  }
}
```

##### Application-scoped Filter

To create a application-scoped filter, you would do the following:

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

> **Warning** The `useGlobalFilters()` method does not set up filters for gateways or hybrid applications.

Global-scoped filters are used across the whole application, for every controller and every route handler. In terms of dependency injection, global filters registered from outside of any module (with `useGlobalFilters()` as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can register a global-scoped filter **directly from any module** using the construction mentioned above: `APP_FILTER` provider.

#### Catch Everything

In order to catch **every** unhandled exception (regardless of the exception type), leave the `@Catch()` decorator's parameter list empty, e.g., `@Catch()`.

In the example below we have a code that is platform-agnostic because it uses the [HTTP adapter](https://docs.nestjs.com/faq/http-adapter) to deliver the response, and doesn't use any of the platform-specific objects (`Request` and `Response`) directly:

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be
    // available in the constructor method, thus we
    // should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
```

> **Warning** When combining an exception filter that catches everything with a filter that is bound to a specific type, the "Catch anything" filter should be declared first to allow the specific filter to correctly handle the bound type.

#### Inheritance

Exception filters can be inherited. This means that you can create a base exception filter that implements some common logic, and then extend it to create more specialized exception filters. For example, let's create a `HttpExceptionFilter` that implements the logic for handling `HttpException` exceptions, and then extend it to create a `ForbiddenExceptionFilter` that handles `ForbiddenException` exceptions:

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // ...
  }
}
```

```ts
import { ForbiddenException } from './forbidden.exception';
import { HttpExceptionFilter } from './http-exception.filter';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter extends HttpExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```

Another Example: Typically, you'll create fully customized exception filters crafted to fulfill your application requirements. However, there might be use-cases when you would like to simply extend the built-in default **global exception filter**, and override the behavior based on certain factors.

In order to delegate exception processing to the base filter, you need to extend `BaseExceptionFilter` and call the inherited `catch()` method.

```ts
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```

> **Warning** Method-scoped and Controller-scoped filters that extend the `BaseExceptionFilter` should not be instantiated with `new`. Instead, let the framework instantiate them automatically.

The above implementation is just a shell demonstrating the approach. Your implementation of the extended exception filter would include your tailored **business** logic (e.g., handling various conditions).

Global filters **can** extend the base filter. This can be done in either of two ways.

The first method is to inject the `HttpAdapter` reference when instantiating the custom global filter:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
```

The second method is to use the APP_FILTER token as shown further above.

#### Exception Filters vs Pipes

Exception filters and pipes are **different** things. Pipes are about **data transformation** and should be used to **transform** the **input** data to the **desired output**. Exception filters are about **handling exceptions** and should be used to **create** a **proper** **response**.

### Pipes

Source: <https://docs.nestjs.com/pipes>

A pipe is a class annotated with the `@Injectable()` decorator, which implements the `PipeTransform` interface.

```ts
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}
```

Pipes have two typical use cases:

- **transformation** - transform input data to the desired form (e.g., from string to integer)
- **validation** - evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

In both cases, pipes operate on the `arguments` being processed by a [controller route handler](https://docs.nestjs.com/controllers#route-parameters). Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them. Any transformation or validation operation takes place at that time, after which the route handler is invoked with any (potentially) transformed arguments.

Nest comes with a number of built-in pipes that you can use out-of-the-box. You can also build your own custom pipes. In this chapter, we'll introduce the built-in pipes and show how to bind them to route handlers. We'll then examine several custom-built pipes to show how you can build one from scratch.

> **Hint** Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer (global exceptions filter and any [exceptions filters](https://docs.nestjs.com/exception-filters) that are applied to the current context). Given the above, it should be clear that when an exception is thrown in a Pipe, no controller method is subsequently executed. This gives you a best-practice technique for validating data coming into the application from external sources at the system boundary.

#### Built-in Pipes

Nest provides a set of **built-in pipes** that cover most of the use-cases for the applications. These pipes are available from the `@nestjs/common` package. Let's take a look at each of them.

##### ValidationPipe

The `ValidationPipe` uses the [class-validator]().

```ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

##### ParseIntPipe

The `ParseIntPipe` converts a string to an integer value. If the string is not a number, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseBoolPipe

The `ParseBoolPipe` converts a string to a boolean value. If the string is not a boolean, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseBoolPipe) id: boolean,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseArrayPipe

The `ParseArrayPipe` converts a string to an array. If the string is not an array, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseArrayPipe) id: number[],
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseFloatPipe

The `ParseFloatPipe` converts a string to a float value. If the string is not a number, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseFloatPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseFloatPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseUUIDPipe

The `ParseUUIDPipe` converts a string to a UUID value. If the string is not a UUID, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseEnumPipe

The `ParseEnumPipe` converts a string to a enum value. If the string is not a enum, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseEnumPipe) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### DefaultValuePipe

The `DefaultValuePipe` sets a default value for the parameter. If the parameter is not present in the request, the default value will be used. If the parameter is present, the value from the request will be used.

```ts
import {
  Controller,
  Get,
  Param,
  DefaultValuePipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(
    @Param('id', new DefaultValuePipe(0)) id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
```

##### ParseFilePipe

The `ParseFilePipe` converts a file to a `multer` file object. If the file is not a file, an exception will be thrown (HTTP response status code `400 Bad Request`).

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cats')
export class CatsController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
```

##### Custom Pipes

You can create your own custom pipes by implementing the `PipeTransform` interface. The `PipeTransform` interface defines a single `transform()` method that you must implement. This method takes two arguments:

- `value` - the value passed into the method
- `metadata` - additional information about the value

The `transform()` method should return the transformed value. If the value cannot be transformed, you should throw an exception. The exception will be handled by Nest and an appropriate HTTP response will be sent back to the client.

Let's create a custom pipe that transforms a string to an integer value. If the string is not a number, we'll throw an exception.

```ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

The `ParseIntPipe` class implements the `PipeTransform` interface. The `PipeTransform` interface is a generic interface that takes two type arguments:

- `T` - the type of the value being transformed
- `R` - the type of the transformed value

In this case, we're transforming a string to a number, so `T` is `string` and `R` is `number`.

The `transform()` method takes two arguments:

- `value` - the value passed into the method
- `metadata` - additional information about the value

The `value` parameter is the currently processed method argument (before it is received by the route handling method), and `metadata` is the currently processed method argument's metadata. The metadata object has these properties:

- `type` - the type of the value being transformed
- `metatype` - the type of the object that contains the value being transformed
- `data` - the value being transformed

```ts
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
```

> **Warning** TypeScript interfaces disappear during transpilation. Thus, if a method parameter's type is declared as an interface instead of a class, the `metatype` value will be `Object`.

The `transform()` method should return the transformed value. If the value cannot be transformed, you should throw an exception. The exception will be handled by Nest and an appropriate HTTP response will be sent back to the client.

The `transform()` method is where you implement your custom logic. In this case, we're using the built-in `parseInt()` function to convert the string to a number. If the string is not a number, `parseInt()` will return `NaN`. We check for this and throw an exception if it occurs.

> **Hint** The `metadata` argument is an instance of the `ArgumentMetadata` interface. This interface defines two properties: `type` and `metatype`. The `type` property is the type of the value being transformed. The `metatype` property is the type of the object that contains the value being transformed. For example, if the value is a property of a class, the `metatype` property will be the type of that class.

#### Schema-based Validation

Let's make our validation pipe a little more useful. Take a closer look at the create() method of the CatsController, where we probably would like to ensure that the post body object is valid before attempting to run our service method.

```ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

Let's focus in on the `createCatDto` body parameter. Its type is `CreateCatDto`:

```typescript
// create-cat.dto.ts

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

We want to ensure that any incoming request to the create method contains a valid body. So we have to validate the three members of the `createCatDto` object. We could do this inside the route handler method, but doing so is not ideal as it would break the **single responsibility rule** (SRP).

Another approach could be to create a **validator class** and delegate the task there. This has the disadvantage that we would have to remember to call this validator at the beginning of each method.

How about creating validation middleware? This could work, but unfortunately, it's not possible to create **generic middleware** which can be used across all contexts across the whole application. This is because middleware is unaware of the **execution context**, including the handler that will be called and any of its parameters.

This is, of course, exactly the use case for which pipes are designed. So let's go ahead and refine our validation pipe.

#### Binding Pipes (Overview)

To use a pipe, we need to bind an instance of the pipe class to the appropriate context. In our `ParseIntPipe` example, we want to associate the pipe with a particular route handler method, and make sure it runs before the method is called. We do so with the following construct, which we'll refer to as binding the pipe at the method parameter level:

```typescript

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

This ensures that one of the following two conditions is true: either the parameter we receive in the `findOne()` method is a number (as expected in our call to `this.catsService.findOne()`), or an exception is thrown before the route handler is called.

For example, assume the route is called like:

```bash

GET localhost:3000/abc
```

Nest will throw an exception like this:

```json
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

The exception will prevent the body of the `findOne()` method from executing.

In the example above, we pass a class (`ParseIntPipe`), not an instance, leaving responsibility for instantiation to the framework and enabling dependency injection. As with pipes and guards, we can instead pass an in-place instance. Passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing options:

```typescript

@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
```

Binding the other transformation pipes (all of the **Parse\*** pipes) works similarly. These pipes all work in the context of validating route parameters, query string parameters and request body values.

For example with a query string parameter:

```typescript

@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

Here's an example of using the `ParseUUIDPipe` to parse a string parameter and validate if it is a UUID.

```typescript

@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}
```

> **Hint** When using `ParseUUIDPipe()` you are parsing UUID in version 3, 4 or 5, if you only require a specific version of UUID you can pass a version in the pipe options.

Above we've seen examples of binding the various `Parse*` family of built-in pipes.

#### Binding Pipes (Other Techniques)

Now that we've created our custom pipe, we need to bind it to the application. We can do this in several ways. The first way is to bind it globally, using the `APP_PIPE` provider:

##### `APP_PIPE` Provider (Module-scoped Pipe)

You can add as many pipes with this technique as needed; simply add each to the providers array.

```ts
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
```

##### `@UsePipes()` Decorator (Controller-scoped Pipe)

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller('cats')
@UsePipes(new ValidationPipe())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

##### `@UsePipes()` Decorator (Method-scoped Pipe)

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

##### Application-scoped Pipe

To create a application-scoped pipe, you would do the following:

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

> **Warning** The `useGlobalPipes()` method does not set up pipes for gateways or hybrid applications.

Global-scoped pipes are used across the whole application, for every controller and every route handler. In terms of dependency injection, global pipes registered from outside of any module (with `useGlobalPipes()` as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can register a global-scoped pipe **directly from any module** using the construction mentioned above: `APP_PIPE` provider.

#### Binding Multiple Pipes

You can bind multiple pipes to a single route handler. In this case, the pipes will be executed in the order they are bound. For example, let's bind the `ValidationPipe` and the `ParseIntPipe` to the `findOne()` method of the `CatsController`:

```ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  @UsePipes(ValidationPipe, ParseIntPipe)
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

#### Binding Multiple Pipes (with options)

You can bind multiple pipes to a single route handler. In this case, the pipes will be executed in the order they are bound. For example, let's bind the `ValidationPipe` and the `ParseIntPipe` to the `findOne()` method of the `CatsController`:

```ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  @UsePipes(
    new ValidationPipe({ transform: true }),
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
    }),
  )
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

### Guards

Source: <https://docs.nestjs.com/guards>

A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.

![From official NestJS Documentation](https://docs.nestjs.com/assets/Guards_1.png)

Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.).

> Guards are executed **after** each middleware, but **before** any pipe and interceptor.

Guards have a single method `canActivate()` which returns a boolean or a `Promise<boolean>`. If any guard returns `false`, the execution flow will be stopped and the request will be rejected. If `true`, Nest will proceed with executing the route handler.

But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the `next()` function. On the other hand, **Guards** have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.

#### Authorization Guards

Authorization guards are used to control access to resources based on the roles of the user. For example, you might want to restrict access to certain routes to only users with the role of **admin**. Authorization guards are defined as classes annotated with the `@Injectable()` decorator that implement the `CanActivate` interface.

```ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

```ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

> **Hint** If you are looking for a real-world example on how to implement an authentication mechanism in your application, visit [this chapter](https://docs.nestjs.com/security/authentication). Likewise, for more sophisticated authorization example, check [this page](https://docs.nestjs.com/security/authorization).

The logic inside the `validateRequest()` function can be as simple or sophisticated as needed. The main point of this example is to show how guards fit into the request/response cycle.

Every guard must implement a `canActivate()` function. This function should return a boolean, indicating whether the current request is allowed or not. It can return the response either synchronously or asynchronously (via a `Promise` or `Observable`). Nest uses the return value to control the next action:

- if it returns `true`, the request will be processed.
- if it returns `false`, Nest will deny the request.

Guards have a **single responsibility**. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as **authorization**. Authorization (and its cousin, **authentication**, with which it usually collaborates) has typically been handled by [middleware](https://docs.nestjs.com/middleware) in traditional Express applications. Middleware is a fine choice for authentication, since things like token validation and attaching properties to the `request` object are not strongly connected with a particular route context (and its metadata).

But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the `next()` function. On the other hand, **Guards** have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.

#### Authorization guard

Source <https://docs.nestjs.com/guards#authorization-guard>

As mentioned, **authorization** is a great use case for Guards because specific routes should be available only when the caller (usually a specific authenticated user) has sufficient permissions. The `AuthGuard` that we'll build now assumes an authenticated user (and that, therefore, a token is attached to the request headers). It will extract and validate the token, and use the extracted information to determine whether the request can proceed or not.

```typescript
// auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

> **Hint** If you are looking for a real-world example on how to implement an authentication mechanism in your application, visit [this chapter](https://docs.nestjs.com/security/authentication). Likewise, for more sophisticated authorization example, check [this page](https://docs.nestjs.com/security/authorization).

The logic inside the `validateRequest()` function can be as simple or sophisticated as needed. The main point of this example is to show how guards fit into the request/response cycle.

Every guard must implement a `canActivate()` function. This function should return a boolean, indicating whether the current request is allowed or not. It can return the response either synchronously or asynchronously (via a `Promise` or `Observable`). Nest uses the return value to control the next action:

- if it returns `true`, the request will be processed.
- if it returns `false`, Nest will deny the request.

#### Execution context

Source <https://docs.nestjs.com/guards#execution-context>

The `canActivate()` function takes a single argument, the `ExecutionContext` instance. The `ExecutionContext` inherits from `ArgumentsHost`. We saw `ArgumentsHost` previously in the exception filters chapter. In the sample above, we are just using the same helper methods defined on `ArgumentsHost` that we used earlier, to get a reference to the `Request` object. You can refer back to the **Arguments host** section of the [exception filters](https://docs.nestjs.com/exception-filters#arguments-host) chapter for more on this topic.

By extending `ArgumentsHost`, `ExecutionContext` also adds several new helper methods that provide additional details about the current execution process. These details can be helpful in building more generic guards that can work across a broad set of controllers, methods, and execution contexts. Learn more about `ExecutionContext`[here](https://docs.nestjs.com/fundamentals/execution-context).

#### Role based authentication

Let's build a more functional guard that permits access only to users with a specific role. We'll start with a basic guard template, and build on it in the coming sections. For now, it allows all requests to proceed:

```typescript
// roles.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

#### Binding guards

Source: <https://docs.nestjs.com/guards#binding-guards>

Like pipes and exception filters, guards can be **controller-scoped**, method-scoped, or global-scoped. Below, we set up a controller-scoped guard using the `@UseGuards()` decorator. This decorator may take a single argument, or a comma-separated list of arguments. This lets you easily apply the appropriate set of guards with one declaration.

```typescript
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

> **Hint** The `@UseGuards()` decorator is imported from the `@nestjs/common` package.

Above, we passed the `RolesGuard` class (instead of an instance), leaving responsibility for instantiation to the framework and enabling dependency injection. As with pipes and exception filters, we can also pass an in-place instance:

```typescript
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}
```

The construction above attaches the guard to every handler declared by this controller. If we wish the guard to apply only to a single method, we apply the `@UseGuards()` decorator at the **method level**.

In order to set up a global guard, use the `useGlobalGuards()` method of the Nest application instance:

```typescript
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
```

> **Notice** In the case of hybrid apps the `useGlobalGuards()` method doesn't set up guards for gateways and micro services by default (see [Hybrid application](https://docs.nestjs.com/faq/hybrid-application) for information on how to change this behavior). For "standard" (non-hybrid) microservice apps, `useGlobalGuards()` does mount the guards globally.

Global guards are used across the whole application, for every controller and every route handler. In terms of dependency injection, global guards registered from outside of any module (with `useGlobalGuards()` as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can set up a guard directly from any module using the following construction:

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```

> **Hint** When using this approach to perform dependency injection for the guard, note that regardless of the module where this construction is employed, the guard is, in fact, global. Where should this be done? Choose the module where the guard (`RolesGuard` in the example above) is defined. Also, `useClass` is not the only way of dealing with custom provider registration. Learn more [here](https://docs.nestjs.com/fundamentals/custom-providers).

#### Setting roles per handler

Source <https://docs.nestjs.com/guards#setting-roles-per-handler>

Our `RolesGuard` is working, but it's not very smart yet. We're not yet taking advantage of the most important guard feature - the [execution context](https://docs.nestjs.com/fundamentals/execution-context). It doesn't yet know about roles, or which roles are allowed for each handler. The `CatsController`, for example, could have different permission schemes for different routes. Some might be available only for an admin user, and others could be open for everyone. How can we match roles to routes in a flexible and reusable way?

This is where **custom metadata** comes into play (learn more [here](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata)). Nest provides the ability to attach custom **metadata** to route handlers through either decorators created via `Reflector#createDecorator` static method, or the built-in `@SetMetadata()` decorator.

For example, let's create a `@Roles()` decorator using the `Reflector#createDecorator` method that will attach the metadata to the handler. `Reflector` is provided out of the box by the framework and exposed from the `@nestjs/core` package.

```ts
// roles.decorator.ts
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();
```

The `Roles` decorator here is a function that takes a single argument of type `string[]`.

Now, to use this decorator, we simply annotate the handler with it:

```typescript
// cats.controller.ts

@Post()
@Roles(['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

Here we've attached the `Roles` decorator metadata to the `create()` method, indicating that only users with the `admin` role should be allowed to access this route.

Alernatively, instead of using the `Reflector#createDecorator` method, we could use the built-in `@SetMetadata()` decorator. Learn more about [here](https://docs.nestjs.com/fundamentals/execution-context#low-level-approach).

#### Putting it all together

Source: <https://docs.nestjs.com/guards#putting-it-all-together>

Let's now go back and tie this together with our `RolesGuard`. Currently, it simply returns `true` in all cases, allowing every request to proceed. We want to make the return value conditional based on the comparing the **roles assigned to the current user** to the actual roles required by the current route being processed. In order to access the route's role(s) (custom metadata), we'll use the `Reflector` helper class again, as follows:

```typescript
// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}
```

> **Hint** In the node.js world, it's common practice to attach the authorized user to the `request` object. Thus, in our sample code above, we are assuming that `request.user` contains the user instance and allowed roles. In your app, you will probably make that association in your custom **authentication guard** (or middleware). Check [this chapter](https://docs.nestjs.com/security/authentication) for more information on this topic.

> **Warning** The logic inside the `matchRoles()` function can be as simple or sophisticated as needed. The main point of this example is to show how guards fit into the request/response cycle.

Refer to the [Reflection and metadata](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata) section of the **Execution context** chapter for more details on utilizing `Reflector` in a context-sensitive way.

When a user with insufficient privileges requests an endpoint, Nest automatically returns the following response:

```typescript

{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

Note that behind the scenes, when a guard returns `false`, the framework throws a `ForbiddenException`. If you want to return a different error response, you should throw your own specific exception. For example:

```typescript
throw new UnauthorizedException();
```

Any exception thrown by a guard will be handled by the [exceptions layer](https://docs.nestjs.com/exception-filters) (global exceptions filter and any exceptions filters that are applied to the current context).

> **Hint** If you are looking for a real-world example on how to implement authorization, check [this chapter](https://docs.nestjs.com/security/authorization).

### Interceptors

Source: <https://docs.nestjs.com/interceptors>

An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface.

![From official NestJS Documentation](https://docs.nestjs.com/assets/Interceptors_1.png)

Interceptors have a set of useful capabilities which are inspired by the [Aspect Oriented Programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming) (AOP) technique. They make it possible to:

- bind extra logic before / after method execution
- transform the result returned from a function
- transform the exception thrown from a function
- extend the basic function behavior
- completely override a function depending on specific conditions (e.g., for caching purposes)

#### Basics

Source: <https://docs.nestjs.com/interceptors#basics>

Each interceptor implements the `intercept()` method, which takes two arguments. The first one is the `ExecutionContext` instance (exactly the same object as for [guards](https://docs.nestjs.com/guards)). The `ExecutionContext` inherits from `ArgumentsHost`. We saw `ArgumentsHost` before in the exception filters chapter. There, we saw that it's a wrapper around arguments that have been passed to the original handler, and contains different arguments arrays based on the type of the application. You can refer back to the [exception filters](https://docs.nestjs.com/exception-filters#arguments-host) for more on this topic.

#### Execution context

Source <https://docs.nestjs.com/interceptors#execution-context>

By extending `ArgumentsHost`, `ExecutionContext` also adds several new helper methods that provide additional details about the current execution process. These details can be helpful in building more generic interceptors that can work across a broad set of controllers, methods, and execution contexts. Learn more about `ExecutionContext`[here](https://docs.nestjs.com/fundamentals/execution-context).

#### Call handler

Source: <https://docs.nestjs.com/interceptors#call-handler>

The second argument is a `CallHandler`. The `CallHandler` interface implements the `handle()` method, which you can use to invoke the route handler method at some point in your interceptor. If you don't call the `handle()` method in your implementation of the `intercept()` method, the route handler method won't be executed at all.

This approach means that the `intercept()` method effectively **wraps** the request/response stream. As a result, you may implement custom logic **both before and after** the execution of the final route handler. It's clear that you can write code in your `intercept()` method that executes **before** calling `handle()`, but how do you affect what happens afterward? Because the `handle()` method returns an `Observable`, we can use powerful [RxJS](https://github.com/ReactiveX/rxjs) operators to further manipulate the response. Using Aspect Oriented Programming terminology, the invocation of the route handler (i.e., calling `handle()`) is called a [Pointcut](https://en.wikipedia.org/wiki/Pointcut), indicating that it's the point at which our additional logic is inserted.

Consider, for example, an incoming `POST /cats` request. This request is destined for the `create()` handler defined inside the `CatsController`. If an interceptor which does not call the `handle()` method is called anywhere along the way, the `create()` method won't be executed. Once `handle()` is called (and its `Observable` has been returned), the `create()` handler will be triggered. And once the response stream is received via the `Observable`, additional operations can be performed on the stream, and a final result returned to the caller.

#### Aspect Interception

The first use case we'll look at is to use an interceptor to log user interaction (e.g., storing user calls, asynchronously dispatching events or calculating a timestamp). We show a simple LoggingInterceptor below:

```typescript
// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

> **Hint** The `NestInterceptor<T, R>` is a generic interface in which `T` indicates the type of an `Observable<T>` (supporting the response stream), and `R` is the type of the value wrapped by `Observable<R>`.

> **Notice** Interceptors, like controllers, providers, guards, and so on, can **inject dependencies** through their `constructor`.

Since `handle()` returns an RxJS `Observable`, we have a wide choice of operators we can use to manipulate the stream. In the example above, we used the `tap()` operator, which invokes our anonymous logging function upon graceful or exceptional termination of the observable stream, but doesn't otherwise interfere with the response cycle.

#### Binding interceptors

In order to set up the interceptor, we use the @UseInterceptors() decorator imported from the @nestjs/common package. Like pipes and guards, interceptors can be controller-scoped, method-scoped, or global-scoped.

Below, we set up a controller-scoped interceptor using the @UseInterceptors() decorator. This decorator may take a single argument, or a comma-separated list of arguments. This lets you easily apply the appropriate set of interceptors with one declaration.

```typescript
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

> **Hint** The `@UseInterceptors()` decorator is imported from the `@nestjs/common` package.

Above, we passed the `LoggingInterceptor` class (instead of an instance), leaving responsibility for instantiation to the framework and enabling dependency injection. As with pipes and guards, we can also pass an in-place instance:

```typescript
@Controller('cats')
@UseInterceptors(new LoggingInterceptor())
export class CatsController {}
```

The construction above attaches the interceptor to every handler declared by this controller. If we wish the interceptor to apply only to a single method, we apply the `@UseInterceptors()` decorator at the **method level**.

In order to set up a global interceptor, use the `useGlobalInterceptors()` method of the Nest application instance:

```typescript
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

> **Notice** In the case of hybrid apps the `useGlobalInterceptors()` method doesn't set up interceptors for gateways and micro services by default (see [Hybrid application](https://docs.nestjs.com/faq/hybrid-application) for information on how to change this behavior). For "standard" (non-hybrid) microservice apps, `useGlobalInterceptors()` does mount the interceptors globally.

Global interceptors are used across the whole application, for every controller and every route handler. In terms of dependency injection, global interceptors registered from outside of any module (with `useGlobalInterceptors()` as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can set up an interceptor directly from any module using the following construction:

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
```

> **Hint** When using this approach to perform dependency injection for the interceptor, note that regardless of the module where this construction is employed, the interceptor is, in fact, global. Where should this be done? Choose the module where the interceptor (`LoggingInterceptor` in the example above) is defined. Also, `useClass` is not the only way of dealing with custom provider registration. Learn more [here](https://docs.nestjs.com/fundamentals/custom-providers).

#### Interceptor composition

Source: <https://docs.nestjs.com/interceptors#interceptor-composition>

Interceptors can be composed. This means that you can apply multiple interceptors to a single handler. The interceptors will then be executed in the order they are set up (from left to right). For example, let's bind the `LoggingInterceptor` and the `TransformInterceptor` to the `findOne()` method of the `CatsController`:

```typescript
@Controller('cats')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

#### Interceptor context

Source: <https://docs.nestjs.com/interceptors#interceptor-context>

Interceptors have access to a `ExecutionContext` instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and guards, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.

#### Interceptor exclusion

Source: <https://docs.nestjs.com/interceptors#interceptor-exclusion>

You can exclude interceptors from being applied to specific routes. To do so, use the `@ExcludeInterceptors()` decorator. This decorator may take a single argument, or a comma-separated list of arguments. This lets you easily exclude the appropriate set of interceptors with one declaration.

```typescript
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  @Get(':id')
  @ExcludeInterceptors(TransformInterceptor)
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

#### Interceptor inheritance

Source: <https://docs.nestjs.com/interceptors#interceptor-inheritance>

Interceptors can be inherited. This means that you can apply an interceptor to a controller, and it will be automatically applied to all the handlers within that controller. For example, let's bind the `LoggingInterceptor` to the `CatsController`:

```typescript
@UseInterceptors(LoggingInterceptor)
@Controller('cats')
export class CatsController {
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

In the example above, the `LoggingInterceptor` will be applied to the `findOne()` method. This is because the `findOne()` method is defined within the `CatsController` class. If you want to exclude the interceptor from a specific handler, you can use the `@ExcludeInterceptors()` decorator.

#### Interceptor ordering

Source: <https://docs.nestjs.com/interceptors#interceptor-ordering>

Interceptors are executed in the order they are defined. The order of global interceptors is not guaranteed. The order of controller-scoped interceptors is also not guaranteed. The order of method-scoped interceptors is guaranteed.

#### Interceptor interface

Source: <https://docs.nestjs.com/interceptors#interceptor-interface>

The `NestInterceptor<T, R>` is a generic interface in which `T` indicates the type of an `Observable<T>` (supporting the response stream), and `R` is the type of the value wrapped by `Observable<R>`.

```typescript
export interface NestInterceptor<T, R> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<R> | Promise<Observable<R>>;
}
```

#### Interceptor as middleware

Source: <https://docs.nestjs.com/interceptors#interceptor-as-middleware>

Interceptors can be used as middleware. This means that you can apply an interceptor to a controller, and it will be automatically applied to all the handlers within that controller. For example, let's bind the `LoggingInterceptor` to the `CatsController`:

```typescript
@UseInterceptors(LoggingInterceptor)
@Controller('cats')
export class CatsController {
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}
```

#### Response mapping

Source: <https://docs.nestjs.com/interceptors#response-mapping>

Interceptors can be used to transform the result returned from a function. For example, let's create a `TransformInterceptor` that will transform the result returned from the `CatsController`:

```typescript
// transform.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
```

> **Hint** Nest interceptors work with both synchronous and asynchronous `intercept()` methods. You can simply switch the method to `async` if necessary.

With the above construction, when someone calls the `GET /cats` endpoint, the response would look like the following (assuming that route handler returns an empty array `[]`):

```json
{
  "data": []
}
```

Interceptors have great value in creating re-usable solutions to requirements that occur across an entire application. For example, imagine we need to transform each occurrence of a `null` value to an empty string `''`. We can do it using one line of code and bind the interceptor globally so that it will automatically be used by each registered handler.

```typescript
// transform.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => (data === null ? '' : data)));
  }
}
```

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
```

```typescript
// cats.controller.ts
@Get()
async findAll(): Promise<any[]> {
  return [null];
}
```

```json
[""]
```

#### Stream Overriding

Source: <https://docs.nestjs.com/interceptors#stream-overriding>

Interceptors can be used to completely override a function depending on specific conditions (e.g., for caching purposes). For example, let's create a `CacheInterceptor` that will cache the response for 5 seconds:

```typescript
// cache.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
```

Our `CacheInterceptor` has a hardcoded `isCached` variable and a hardcoded response `[]` as well. The key point to note is that we return a new stream here, created by the RxJS `of()` operator, therefore the route handler **won't be called** at all. When someone calls an endpoint that makes use of `CacheInterceptor`, the response (a hardcoded, empty array) will be returned immediately. In order to create a generic solution, you can take advantage of `Reflector` and create a custom decorator. The `Reflector` is well described in the [guards](https://docs.nestjs.com/guards) chapter.

#### More Operators

Source: <https://docs.nestjs.com/interceptors#more-operators>

Interceptors can be used to extend the basic function behavior. For example, let's create a `TimeoutInterceptor` that will throw an exception if the request takes longer than 5000 milliseconds:

```typescript
// timeout.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(timeout(5000));
  }
}
```

### Custom Decorators

Source: <https://docs.nestjs.com/custom-decorators>

Decorators are a language feature that allow you to annotate or modify classes and class members (properties, methods, and so on) at compile time. Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration.

Nest is built around a language feature called **decorators**. Decorators are a well-known concept in a lot of commonly used programming languages, but in the JavaScript world, they're still relatively new. In order to better understand how decorators work, we recommend reading [this article](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841). Here's a simple definition:

> An ES2016 decorator is an expression which returns a function and can take a target, name and property descriptor as arguments. You apply it by prefixing the decorator with an `@` character and placing this at the very top of what you are trying to decorate. Decorators can be defined for either a class, a method or a property.

#### Decorator Factories

Source: <https://docs.nestjs.com/custom-decorators#decorator-factories>

A decorator factory is simply a function that returns the expression that will be called by the decorator at runtime. For example, let's create a `@Roles()` decorator factory:

```typescript
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) =>
  SetMetadata('roles', roles);
```

#### Decorator Composition

Source: <https://docs.nestjs.com/custom-decorators#decorator-composition>

Decorators can be composed. This means that you can apply multiple decorators to a single class, method, or property. The decorators will then be executed in the order they are set up (from left to right). For example, let's bind the `@Roles()` and the `@UseGuards()` decorators to the `CatsController`:

```typescript
@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {}
```

#### Passing Data

Source: <https://docs.nestjs.com/custom-decorators#passing-data>

Decorators can take arguments. For example, let's create a `@Roles()` decorator that takes a variable number of string arguments:

```typescript
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) =>
  SetMetadata('roles', roles);
```

#### Decorator Internals

Source: <https://docs.nestjs.com/custom-decorators#decorator-internals>

Decorators are just functions, and like any function, they can be synchronous or asynchronous. Nest supports both types of decorators. Synchronous decorators are the most common, and are used to modify or replace the target declaration. Asynchronous decorators are used to perform additional processing after the target declaration has been evaluated.

#### Decorator as middleware

Source: <https://docs.nestjs.com/custom-decorators#decorator-as-middleware>

Decorators can be used as middleware. This means that you can apply a decorator to a controller, and it will be automatically applied to all the handlers within that controller. For example, let's bind the `@Roles()` decorator to the `CatsController`:

```typescript
@Roles('admin')
@Controller('cats')
export class CatsController {}
```

In the example above, the `@Roles()` decorator will be applied to all the handlers defined within the `CatsController` class. If you want to exclude the decorator from a specific handler, you can use the `@ExcludeRoles()` decorator.

#### Decorator inheritance

Source: <https://docs.nestjs.com/custom-decorators#decorator-inheritance>

Decorators can be inherited. This means that you can apply a decorator to a controller, and it will be automatically applied to all the handlers within that controller. For example, let's bind the `@Roles()` decorator to the `CatsController`:

```typescript
@Roles('admin')
@Controller('cats')
export class CatsController {}
```

In the example above, the `@Roles()` decorator will be applied to all the handlers defined within the `CatsController` class. If you want to exclude the decorator from a specific handler, you can use the `@ExcludeRoles()` decorator.

#### Decorator ordering

Source: <https://docs.nestjs.com/custom-decorators#decorator-ordering>

Decorators are executed in the order they are defined. The order of global decorators is not guaranteed. The order of controller-scoped decorators is also not guaranteed. The order of method-scoped decorators is guaranteed.

#### Decorator interface

Source: <https://docs.nestjs.com/custom-decorators#decorator-interface>

The `NestInterceptor<T, R>` is a generic interface in which `T` indicates the type of an `Observable<T>` (supporting the response stream), and `R` is the type of the value wrapped by `Observable<R>`.

```typescript
export interface NestInterceptor<T, R> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<R> | Promise<Observable<R>>;
}
```

#### Working with Pipes

Source: <https://docs.nestjs.com/custom-decorators#working-with-pipes>

Decorators can be used to apply pipes. For example, let's create a `@UsePipes()` decorator that will apply the `ValidationPipe` to the `CatsController`:

```typescript
// use-pipes.decorator.ts
import { applyDecorators, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export function UseValidationPipe() {
  return applyDecorators(UsePipes(new ValidationPipe()));
}
```

```typescript
// cats.controller.ts
@UseValidationPipe()
@Controller('cats')
export class CatsController {}
```

#### Working with Guards

Source: <https://docs.nestjs.com/custom-decorators#working-with-guards>

Decorators can be used to apply guards. For example, let's create a `@UseGuards()` decorator that will apply the `AuthGuard` to the `CatsController`:

```typescript
// use-guards.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/common';

export function UseAuthGuard() {
  return applyDecorators(UseGuards(AuthGuard));
}
```

```typescript
// cats.controller.ts
@UseAuthGuard()
@Controller('cats')
export class CatsController {}
```

#### Working with Interceptors

Source: <https://docs.nestjs.com/custom-decorators#working-with-interceptors>

Decorators can be used to apply interceptors. For example, let's create a `@UseInterceptors()` decorator that will apply the `LoggingInterceptor` to the `CatsController`:

```typescript
// use-interceptors.decorator.ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '@nestjs/common';

export function UseLoggingInterceptor() {
  return applyDecorators(UseInterceptors(LoggingInterceptor));
}
```

```typescript
// cats.controller.ts
@UseLoggingInterceptor()
@Controller('cats')
export class CatsController {}
```

#### Working with Filters

Source: <https://docs.nestjs.com/custom-decorators#working-with-filters>

Decorators can be used to apply filters. For example, let's create a `@UseFilters()` decorator that will apply the `HttpExceptionFilter` to the `CatsController`:

```typescript
// use-filters.decorator.ts
import { applyDecorators, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@nestjs/common';

export function UseHttpExceptionFilter() {
  return applyDecorators(UseFilters(HttpExceptionFilter));
}
```

```typescript
// cats.controller.ts
@UseHttpExceptionFilter()
@Controller('cats')
export class CatsController {}
```

### Injection Scopes

Source: <https://docs.nestjs.com/fundamentals/injection-scopes>

For people coming from different programming language backgrounds, it might be unexpected to learn that in Nest, almost everything is shared across incoming requests. We have a connection pool to the database, singleton services with global state, etc. Remember that Node.js doesn't follow the request/response Multi-Threaded Stateless Model in which every request is processed by a separate thread. Hence, using singleton instances is fully **safe** for our applications.

However, there are edge-cases when request-based lifetime may be the desired behavior, for instance per-request caching in GraphQL applications, request tracking, and multi-tenancy. Injection scopes provide a mechanism to obtain the desired provider lifetime behavior.

#### Provider Scope

A provider can have any of the following scopes:

| Scope       | Description                                                                                                                                                                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`   | A single instance of the provider is shared across the entire application. The instance lifetime is tied directly to the application lifecycle. Once the application has bootstrapped, all singleton providers have been instantiated. Singleton scope is used by default. |
| `REQUEST`   | A new instance of the provider is created exclusively for each incoming **request**. The instance is garbage-collected after the request has completed processing.                                                                                                         |
| `TRANSIENT` | Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new, dedicated instance.                                                                                                                               |

> **Hint** Using singleton scope is **recommended** for most use cases. Sharing providers across consumers and across requests means that an instance can be cached and its initialization occurs only once, during application startup.

##### Usage

To set the scope of a provider, use the `@Injectable()` decorator. The `@Injectable()` decorator takes an optional `scope` argument, which can be set to `Scope.DEFAULT`, `Scope.REQUEST`, or `Scope.TRANSIENT`.

```typescript
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {}
```

Similarly, for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers), set the `scope` property in the long-hand form for a provider registration:

```typescript
{
  provide: 'CACHE_MANAGER',
  useClass: CacheManager,
  scope: Scope.TRANSIENT,
}
```

> **Hint** Import the `Scope` enum from `@nestjs/common`

Singleton scope is used by default, and need not be declared. If you do want to declare a provider as singleton scoped, use the `Scope.DEFAULT` value for the `scope` property.

> **Notice** Websocket Gateways should not use request-scoped providers because they must act as singletons. Each gateway encapsulates a real socket and cannot be instantiated multiple times. The limitation also applies to some other providers, like [_Passport strategies_](https://docs.nestjs.com/security/authentication#request-scoped-strategies) or _Cron controllers_.

#### Controller Scope

Source: <https://docs.nestjs.com/fundamentals/injection-scopes#controller-scope>

Controllers can also be scoped. This means that you can apply a scope to a controller, and it will be automatically applied to all the providers within that controller. For example, let's bind the `CatsController` to the `REQUEST` scope:

```typescript
@Controller({
  path: 'cats',
  scope: Scope.REQUEST,
})
export class CatsController {}
```

#### Scope Hierarchies

The `REQUEST` scope bubbles up the injection chain. A controller that depends on a request-scoped provider will, itself, be request-scoped.

Imagine the following dependency graph: `CatsController <- CatsService <- CatsRepository`. If `CatsService` is request-scoped (and the others are default singletons), the `CatsController` will become request-scoped as it is dependent on the injected service. The `CatsRepository`, which is not dependent, would remain singleton-scoped.

Transient-scoped dependencies don't follow that pattern. If a singleton-scoped `DogsService` injects a transient `LoggerService` provider, it will receive a fresh instance of it. However, `DogsService` will stay singleton-scoped, so injecting it anywhere would _not_ resolve to a new instance of `DogsService`. In case it's desired behavior, `DogsService` must be explicitly marked as `TRANSIENT` as well.

#### Request Provider

In an HTTP server-based application (e.g., using `@nestjs/platform-express` or `@nestjs/platform-fastify`), you may want to access a reference to the original request object when using request-scoped providers. You can do this by injecting the `REQUEST` object.

```typescript
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(REQUEST) private request: Request) {}
}
```

Because of underlying platform/protocol differences, you access the inbound request slightly differently for Microservice or GraphQL applications. In [GraphQL](https://docs.nestjs.com/graphql/quick-start) applications, you inject `CONTEXT` instead of `REQUEST`:

```typescript
import { Injectable, Scope, Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { GqlContextType } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(CONTEXT) private context: GqlContextType) {}
}
```

You then configure your `context` value (in the `GraphQLModule`) to contain `request` as its property.

```typescript
GraphQLModule.forRoot({
  context: ({ req }) => ({ request: req }),
}),
```

#### Inquirer Provider

If you want to get the class where a provider was constructed, for instance in logging or metrics providers, you can inject the INQUIRER token.

```ts
import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class HelloService {
  constructor(@Inject(INQUIRER) private parentClass: object) {}

  sayHello(message: string) {
    console.log(
      `${this.parentClass?.constructor?.name}: ${message}`,
    );
  }
}
```

And then use it as follows:

```ts
import { Injectable } from '@nestjs/common';
import { HelloService } from './hello.service';

@Injectable()
export class AppService {
  constructor(private helloService: HelloService) {}

  getRoot(): string {
    this.helloService.sayHello('My name is getRoot');

    return 'Hello world!';
  }
}
```

In the example above when `AppService#getRoot` is called, `"AppService: My name is getRoot"` will be logged to the console.

#### Performance Considerations

Source: <https://docs.nestjs.com/fundamentals/injection-scopes#performance>

Using request-scoped providers will have an impact on application performance. While Nest tries to cache as much metadata as possible, it will still have to create an instance of your class on each request. Hence, it will slow down your average response time and overall benchmarking result. Unless a provider must be request-scoped, it is strongly recommended that you use the default singleton scope.

> **Hint** Although it all sounds quite intimidating, a properly designed application that leverages request-scoped providers should not slow down by more than ~5% latency-wise.

#### Durable Providers

Source: <https://docs.nestjs.com/fundamentals/injection-scopes#durable-providers>

Request-scoped providers, as mentioned in the section above, may lead to increased latency since having at least 1 request-scoped provider (injected into the controller instance, or deeper - injected into one of its providers) makes the controller request-scoped as well. That means, it must be recreated (instantiated) per each individual request (and garbage collected afterwards). Now, that also means, that for let's say 30k requests in parallel, there will be 30k ephemeral instances of the controller (and its request-scoped providers).

Having a common provider that most providers depend on (think of a database connection, or a logger service), automatically converts all those providers to request-scoped providers as well. This can pose a challenge in **multi-tenant applications**, especially for those that have a central request-scoped "data source" provider that grabs headers/token from the request object and based on its values, retrieves the corresponding database connection/schema (specific to that tenant).

For instance, let's say you have an application alternately used by 10 different customers. Each customer has its **own dedicated data source**, and you want to make sure customer A will never be able to reach customer B's database. One way to achieve this could be to declare a request-scoped "data source" provider that - based on the request object - determines what's the "current customer" and retrieves its corresponding database. With this approach, you can turn your application into a multi-tenant application in just a few minutes. But, a major downside to this approach is that since most likely a large chunk of your application' components rely on the "data source" provider, they will implicitly become "request-scoped", and therefore you will undoubtedly see an impact in your apps performance.

But what if we had a better solution? Since we only have 10 customers, couldn't we have 10 individual [DI sub-trees](https://docs.nestjs.com/fundamentals/module-ref#resolving-scoped-providers) per customer (instead of recreating each tree per request)? If your providers don't rely on any property that's truly unique for each consecutive request (e.g., request UUID) but instead there're some specific attributes that let us aggregate (classify) them, there's no reason to _recreate DI sub-tree_ on every incoming request.

And that's exactly when the **durable providers** come in handy.

Before we start flagging providers as durable, we must first register a **strategy** that instructs Nest what are those "common request attributes", provide logic that groups requests - associates them with their corresponding DI sub-trees. The strategy is a simple class that implements the `DurableStrategyHost` interface:

```ts
import { DurableStrategyHost } from '@nestjs/common';
import { Request } from 'express';

export class RequestStrategy implements DurableStrategyHost {
  getDurabilityGroupId(request: Request): string {
    return request.headers['x-tenant-id'];
  }
}
```

The `getDurabilityGroupId` method is responsible for returning a string that will be used as a key to group requests. In the example above, we're using the `x-tenant-id` header to determine the tenant ID. This means that all requests with the same `x-tenant-id` header will be grouped together and will share the same DI sub-tree.

> **Hint** The `DurableStrategyHost` interface is imported from the `@nestjs/common` package.

Once we have our strategy, we can register it in the `DurableModule`:

```ts
import { Module } from '@nestjs/common';
import { DurableModule } from '@nestjs/common';
import { RequestStrategy } from './request.strategy';

@Module({
  imports: [
    DurableModule.register({
      strategy: new RequestStrategy(),
    }),
  ],
})
export class AppModule {}
```

Another Example

```ts
import {
  HostComponentInfo,
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
} from '@nestjs/core';
import { Request } from 'express';

const tenants = new Map<string, ContextId>();

export class AggregateByTenantContextIdStrategy
  implements ContextIdStrategy
{
  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers['x-tenant-id'] as string;
    let tenantSubTreeId: ContextId;

    if (tenants.has(tenantId)) {
      tenantSubTreeId = tenants.get(tenantId);
    } else {
      tenantSubTreeId = ContextIdFactory.create();
      tenants.set(tenantId, tenantSubTreeId);
    }

    // If tree is not durable, return the original "contextId" object
    return (info: HostComponentInfo) =>
      info.isTreeDurable ? tenantSubTreeId : contextId;
  }
}
```

```ts
import { Module } from '@nestjs/common';
import { DurableModule } from '@nestjs/common';
import { AggregateByTenantContextIdStrategy } from './aggregate-by-tenant-context-id.strategy';

@Module({
  imports: [
    DurableModule.register({
      strategy: new AggregateByTenantContextIdStrategy(),
    }),
  ],
})
export class AppModule {}
```

> **Hint** Similar to the request scope, durability bubbles up the injection chain. That means if A depends on B which is flagged as `durable`, A implicitly becomes durable too (unless `durable` is explicitly set to `false` for A provider).

> **Warning** Note this strategy is not ideal for applications operating with a large number of tenants.

The value returned from the `attach` method instructs Nest what context identifier should be used for a given host. In this case, we specified that the `tenantSubTreeId` should be used instead of the original, auto-generated `contextId` object, when the host component (e.g., request-scoped controller) is flagged as durable (you can learn how to mark providers as durable below). Also, in the above example, **no payload** would be registered (where payload = `REQUEST`/`CONTEXT` provider that represents the "root" - parent of the sub-tree).

If you want to register the payload for a durable tree, use the following construction instead:

```ts
import { Module } from '@nestjs/common';
import { DurableModule } from '@nestjs/common';
import { AggregateByTenantContextIdStrategy } from './aggregate-by-tenant-context-id.strategy';

@Module({
  imports: [
    DurableModule.register({
      strategy: new AggregateByTenantContextIdStrategy(),
      payload: {
        provide: 'REQUEST',
        useFactory: (contextId: ContextId) => {
          const request = contextId.switchToHttp().getRequest();
          return request;
        },
        inject: [ContextId],
      },
    }),
  ],
})
export class AppModule {}
```

> **Hint** The `ContextId` object is imported from the `@nestjs/core` package.

Another Example:

```ts
// The return of `AggregateByTenantContextIdStrategy#attach` method:
return {
  resolve: (info: HostComponentInfo) =>
    info.isTreeDurable ? tenantSubTreeId : contextId,
  payload: { tenantId },
  }
}
```

```ts
import { Module } from '@nestjs/common';
import { DurableModule } from '@nestjs/common';
import { AggregateByTenantContextIdStrategy } from './aggregate-by-tenant-context-id.strategy';

@Module({
  imports: [
    DurableModule.register({
      strategy: new AggregateByTenantContextIdStrategy(),
      payload: {
        provide: 'TENANT_ID',
        useFactory: (payload: any) => payload.tenantId,
        inject: ['DURABLE_CONTEXT_ID_PAYLOAD'],
      },
    }),
  ],
})
export class AppModule {}
```

Now whenever you inject the `REQUEST` provider (or `CONTEXT` for GraphQL applications) using the `@Inject(REQUEST)`/`@Inject(CONTEXT)`, the `payload` object would be injected (consisting of a single property - `tenantId` in this case).

Alright so with this strategy in place, you can register it somewhere in your code (as it applies globally anyway), so for example, you could place it in the `main.ts` file:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestStrategy } from './request.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(RequestStrategy));
  await app.listen(3000);
}
bootstrap();
```

Or

```ts
ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
```

> **Hint** The `ContextIdFactory` class is imported from the `@nestjs/core` package.

As long as the registration occurs before any request hits your application, everything will work as intended.

Now, you can flag providers as durable by setting the `scope` property to `Scope.DEFAULT` and the `durable` property to `true`:

```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT, durable: true })
export class CatsService {}
```

Similarly, for custom providers, set the durable property in the long-hand form for a provider registration:

```ts
{
  provide: 'CACHE_MANAGER',
  useClass: CacheManager,
  scope: Scope.TRANSIENT,
  durable: true,
}
```

or

```ts
{
  provide: 'foobar',
  useFactory: () => { ... },
  scope: Scope.REQUEST,
  durable: true,
}
```

### Circular Dependency

Source: <https://docs.nestjs.com/fundamentals/circular-dependency>

A circular dependency occurs when two or more modules depend on each other. For example, module `A` imports module `B`, and module `B` imports module `A`. This creates a circular dependency between the two modules, which Nest cannot resolve.

#### Circular Dependency Detection

Nest detects circular dependencies and throws an error when one is found. For example, let's create a circular dependency between the `CatsModule` and the `DogsModule`:

```typescript
// cats.module.ts
import { Module } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [DogsModule],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [CatsModule],
})
export class DogsModule {}
```

When you run the application, you'll see the following error:

```bash
Nest can't resolve dependencies of the DogsService (?). Please make sure that the argument dependency at index [0] is available in the DogsModule context.

Potential solutions:
- If dependency is a provider, is it part of the current DogsModule?
- If dependency is exported from a separate @Module, is that module imported within DogsModule?
  @Module({
    imports: [ /* the Module containing dependency */ ]
  })
```

#### Circular Dependency Prevention

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#prevention>

To prevent circular dependencies, you can use one of the following techniques:

##### Technique 1: Use `forwardRef()`

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-1-use-forwardref>

The `forwardRef()` function returns a **temporary** `Module` object required to reference modules which are not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {}
```

> **Hint** The `forwardRef()` function is imported from the `@nestjs/common` package.

##### Technique 2: Use `@Inject()` with string token

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-2-use-inject-with-string-token>

You can use the `@Inject()` decorator with a string token to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [DogsModule],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [CatsModule],
})
export class DogsModule {
  constructor(
    @Inject('CatsService')
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator is imported from the `@nestjs/common` package.

##### Technique 3: Use `@Inject()` with `forwardRef()`

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-3-use-inject-with-forwardref>

You can use the `@Inject()` decorator with the `forwardRef()` function to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module, forwardRef, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator and the `forwardRef()` function are imported from the `@nestjs/common` package.

##### Technique 4: Use `@Inject()` with `Type` token

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-4-use-inject-with-type-token>

You can use the `@Inject()` decorator with a `Type` token to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module } from '@nestjs/common';

@Module({
  imports: [DogsModule],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts

import { Module, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [CatsModule],
})
export class DogsModule {
  constructor(
    @Inject(CatsService)
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator is imported from the `@nestjs/common` package.

##### Technique 5: Use `@Inject()` with `Type` token and `forwardRef()`

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-5-use-inject-with-type-token-and-forwardref>

You can use the `@Inject()` decorator with a `Type` token and the `forwardRef()` function to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module, forwardRef, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator and the `forwardRef()` function are imported from the `@nestjs/common` package.

##### Technique 6: Use `@Inject()` with `Type` token and `forwardRef()` (with `useClass`)

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-6-use-inject-with-type-token-and-forwardref-with-useclass>

You can use the `@Inject()` decorator with a `Type` token and the `forwardRef()` function to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module, forwardRef, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator and the `forwardRef()` function are imported from the `@nestjs/common` package.

##### Technique 7: Use `@Inject()` with `Type` token and `forwardRef()` (with `useFactory`)

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-7-use-inject-with-type-token-and-forwardref-with-usefactory>

You can use the `@Inject()` decorator with a `Type` token and the `forwardRef()` function to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module, forwardRef, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator and the `forwardRef()` function are imported from the `@nestjs/common` package.

##### Technique 8: Use `@Inject()` with `Type` token and `forwardRef()` (with `useExisting`)

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-8-use-inject-with-type-token-and-forwardref-with-useexisting>

You can use the `@Inject()` decorator with a `Type` token and the `forwardRef()` function to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts

import { Module, forwardRef, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator and the `forwardRef()` function are imported from the `@nestjs/common` package.

##### Technique 9: Use `@Inject()` with `Type` token and `forwardRef()` (with `useValue`)

Source: <https://docs.nestjs.com/fundamentals/circular-dependency#technique-9-use-inject-with-type-token-and-forwardref-with-usevalue>

You can use the `@Inject()` decorator with a `Type` token and the `forwardRef()` function to reference a provider that is not yet defined. This is required when you want to create a circular dependency (see the example below).

```typescript
// cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DogsModule } from './dogs.module';

@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}
```

```typescript
// dogs.module.ts
import { Module, forwardRef, Inject } from '@nestjs/common';
import { CatsModule } from './cats.module';

@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class DogsModule {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
```

> **Hint** The `@Inject()` decorator and the `forwardRef()` function are imported from the `@nestjs/common` package.

### Module Reference

Source: <https://docs.nestjs.com/fundamentals/module-ref>

Nest provides the `ModuleRef` class to navigate the internal list of providers and obtain a reference to any provider using its injection token as a lookup key. The `ModuleRef` class also provides a way to dynamically instantiate both static and scoped providers. `ModuleRef` can be injected into a class in the normal way:

```typescript
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}
}
```

> **Hint** The `ModuleRef` class is imported from the `@nestjs/core` package.

#### Resolving Providers

Source: <https://docs.nestjs.com/fundamentals/module-ref#resolving-providers>

To resolve a provider, use the `resolve()` method. The `resolve()` method takes a single argument, the provider's injection token, and returns the provider instance.

```typescript
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    return this.moduleRef.resolve(CatsService);
  }
}
```

#### Resolving Scoped Providers

Source: <https://docs.nestjs.com/fundamentals/module-ref#resolving-scoped-providers>

To dynamically resolve a scoped provider (transient or request-scoped), use the resolve() method, passing the provider's injection token as an argument.

```typescript
@Injectable()
export class CatsService implements OnModuleInit {
  private transientService: TransientService;
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.transientService = await this.moduleRef.resolve(
      TransientService,
    );
  }
}
```

The `resolve()` method returns a unique instance of the provider, from its own **DI container sub-tree**. Each sub-tree has a unique **context identifier**. Thus, if you call this method more than once and compare instance references, you will see that they are not equal.

```ts
@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService),
      this.moduleRef.resolve(TransientService),
    ]);
    console.log(transientServices[0] === transientServices[1]); // false
  }
}
```

To generate a single instance across multiple `resolve()` calls, and ensure they share the same generated DI container sub-tree, you can pass a context identifier to the `resolve()` method. Use the `ContextIdFactory` class to generate a context identifier. This class provides a `create()` method that returns an appropriate unique identifier.

```ts
@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const contextId = ContextIdFactory.create();
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService, contextId),
      this.moduleRef.resolve(TransientService, contextId),
    ]);
    console.log(transientServices[0] === transientServices[1]); // true
  }
}
```

> **Hint** The `ContextIdFactory` class is imported from the `@nestjs/core` package.

#### Resolving Scoped Providers with Payload

Source: <https://docs.nestjs.com/fundamentals/module-ref#resolving-scoped-providers-with-payload>

To resolve a scoped provider with payload, use the `resolve()` method. The `resolve()` method takes a single argument, the provider's injection token, and returns the provider instance.

```typescript
import { Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    return this.moduleRef.resolve(CatsService);
  }
}
```

#### Resolving Scoped Providers with ContextId

Source: <https://docs.nestjs.com/fundamentals/module-ref#resolving-scoped-providers-with-contextid>

To resolve a scoped provider with contextId, use the `resolve()` method. The `resolve()` method takes a single argument, the provider's injection token, and returns the provider instance.

```typescript
import { Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    return this.moduleRef.resolve(CatsService);
  }
}
```

#### Resolving Scoped Providers with ContextId and Payload

Source: <https://docs.nestjs.com/fundamentals/module-ref#resolving-scoped-providers-with-contextid-and-payload>

To resolve a scoped provider with contextId and payload, use the `resolve()` method. The `resolve()` method takes a single argument, the provider's injection token, and returns the provider instance.

```typescript
import { Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    return this.moduleRef.resolve(CatsService);
  }
}
```

#### Resolving Scoped Providers with ContextId and Payload

Source: <https://docs.nestjs.com/fundamentals/module-ref#resolving-scoped-providers-with-contextid-and-payload>

To resolve a scoped provider with contextId and payload, use the `resolve()` method. The `resolve()` method takes a single argument, the provider's injection token, and returns the provider instance.

```typescript
import { Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    return this.moduleRef.resolve(CatsService);
  }
}
```

#### Retrieving Instances

Source: <https://docs.nestjs.com/fundamentals/module-ref#retrieving-instances>

To retrieve an instance of a provider, use the `get()` method. The `get()` method takes a single argument, the provider's injection token, and returns the provider instance.

```typescript
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    return this.moduleRef.get(CatsService);
  }
}
```

> **Warning** You can't retrieve scoped providers (transient or request-scoped) with the `get()` method. Instead, use the technique described [below](https://docs.nestjs.com/fundamentals/module-ref#resolving-scoped-providers). Learn how to control scopes [here](https://docs.nestjs.com/fundamentals/injection-scopes).

To retrieve a provider from the global context (for example, if the provider has been injected in a different module), pass the `{ strict: false }` option as a second argument to `get()`.

```ts
const catsService = this.moduleRef.get(CatsService, {
  strict: false,
});
```

#### Getting Instance by Name

Source: <https://docs.nestjs.com/fundamentals/module-ref#getting-instance-by-name>

To retrieve an instance of a provider by name, use the `get()` method. The `get()` method takes a single argument, the provider's name, and returns the provider instance.

```typescript
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    return this.moduleRef.get('CatsService');
  }
}
```

#### Registering REQUEST Provider

Source: <https://docs.nestjs.com/fundamentals/module-ref#registering-request-provider>

To register a request provider, use the `registerRequestByContextId()` method. The `registerRequestByContextId()` method takes a single argument, the request object, and returns the context identifier.

```typescript
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  getCatsService(): CatsService {
    const contextId = this.moduleRef.registerRequestByContextId(
      /* YOUR_REQUEST_OBJECT */,
    );
    return this.moduleRef.get('CatsService', contextId);
  }
}
```

or

```typescript
const contextId = ContextIdFactory.create();
this.moduleRef.registerRequestByContextId(/* YOUR_REQUEST_OBJECT */, contextId);
```

#### Getting Current Sub-tree

Occasionally, you may want to resolve an instance of a request-scoped provider within a **request context**. Let's say that `CatsService` is request-scoped and you want to resolve the `CatsRepository` instance which is also marked as a request-scoped provider. In order to share the same DI container sub-tree, you must obtain the current context identifier instead of generating a new one (e.g., with the `ContextIdFactory.create()` function, as shown above). To obtain the current context identifier, start by injecting the request object using `@Inject()` decorator.

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
  ) {}
}
```

> **Hint** Learn more about the request provider [here](https://docs.nestjs.com/fundamentals/injection-scopes#request-provider).

Now, use the `getByRequest()` method of the `ContextIdFactory` class to create a context id based on the request object, and pass this to the `resolve()` call:

```typescript
import { Injectable } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';

@Injectable()
export class CatsService {
  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
    private moduleRef: ModuleRef,
  ) {}

  getCatsService(): CatsService {
    const contextId = ContextIdFactory.getByRequest(this.request);
    const catsRepository = await this.moduleRef.resolve(
      CatsRepository,
      contextId,
    );
    return catsRepository; // Re-check it!
  }
}
```

#### Instantiating custom classes dynamically

Source: <https://docs.nestjs.com/fundamentals/module-ref#instantiating-custom-classes-dynamically>

To dynamically instantiate a class that **wasn't previously registered** as a **provider**, use the module reference's `create()` method.

```ts
@Injectable()
export class CatsService implements OnModuleInit {
  private catsFactory: CatsFactory;
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.catsFactory = await this.moduleRef.create(CatsFactory);
  }
}
```

This technique enables you to conditionally instantiate different classes outside of the framework container.

### Lazy Loading Modules

Source: <https://docs.nestjs.com/fundamentals/lazy-loading-modules>

By default, modules are eagerly loaded, which means that as soon as the application loads, so do all the modules, whether or not they are immediately necessary. While this is fine for most applications, it may become a bottleneck for apps/workers running in the **serverless environment**, where the startup latency ("cold start") is crucial.

Lazy loading can help decrease bootstrap time by loading only modules required by the specific serverless function invocation. In addition, you could also load other modules asynchronously once the serverless function is "warm" to speed-up the bootstrap time for subsequent calls even further (deferred modules registration).

> **Hint** If you're familiar with the **Angular** framework, you might have seen the "lazy-loading modules" term before. Be aware that this technique is **functionally different** in Nest and so think about this as an entirely different feature that shares similar naming conventions.

> **Warning** Do note that [lifecycle hooks methods](https://docs.nestjs.com/fundamentals/lifecycle-events) are not invoked in lazy loaded modules and services.

To load modules on-demand, Nest provides the `LazyModuleLoader` class that can be injected into a class in the normal way:

```ts
import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class CatsService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}
}
```

> **Hint** The `LazyModuleLoader` class is imported from the `@nestjs/core` package.

Alternatively, you can obtain a reference to the `LazyModuleLoader` provider from within your application bootstrap file (`main.ts`), as follows:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const lazyModuleLoader = app.get(LazyModuleLoader);
  await app.listen(3000);
}
bootstrap();
```

With this in place, you can now load any module using the following construction:

```ts
const moduleRef = await this.lazyModuleLoader.load(() =>
  import('./cats.module').then((m) => m.CatsModule),
);
```

or

```ts
const { LazyModule } = await import('./lazy.module');
const moduleRef = await this.lazyModuleLoader.load(
  () => LazyModule,
);
```

**Hint** "Lazy-loaded" modules are **cached** upon the first `LazyModuleLoader#load` method invocation. That means, each consecutive attempt to load `LazyModule` will be **very fast** and will return a cached instance, instead of loading the module again.

```shell
Load "LazyModule" attempt: 1
time: 2.379ms
Load "LazyModule" attempt: 2
time: 0.294ms
Load "LazyModule" attempt: 3
time: 0.303ms
```

Where `lazy.module.ts` is a TypeScript file that exports a **regular Nest module** (no extra changes are required).

The `LazyModuleLoader#load` method returns the [module reference](https://docs.nestjs.com/fundamentals/module-ref) (of `LazyModule`) that lets you navigate the internal list of providers and obtain a reference to any provider using its injection token as a lookup key.

For example, let's say we have a `LazyModule` with the following definition:

```ts
import { Module } from '@nestjs/common';
import { LazyService } from '...';

@Module({
  providers: [LazyService],
  exports: [LazyService],
})
export class LazyModule {}
```

> **Hint** Lazy-loaded modules cannot be registered as **global modules** as it simply makes no sense (since they are registered lazily, on-demand when all the statically registered modules have been already instantiated). Likewise, registered **global enhancers** (guards/interceptors/etc.) **will not work** properly either.

With this, we could obtain a reference to the `LazyService` provider, as follows:

```ts
const { LazyModule } = await import('./lazy.module');
const moduleRef = await this.lazyModuleLoader.load(
  () => LazyModule,
);

const { LazyService } = await import('./lazy.service');
const lazyService = moduleRef.get(LazyService);
```

**Warning** If you use **Webpack**, make sure to update your `tsconfig.json` file - setting `compilerOptions.module` to `"esnext"` and adding `compilerOptions.moduleResolution` property with `"node"` as a value:

```shell
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    ...
  }
}
```

With these options set up, you'll be able to leverage the [code splitting](https://webpack.js.org/guides/code-splitting/) feature.

#### Lazy Loading controllers, gateways, and resolvers

Since controllers (or resolvers in GraphQL applications) in Nest represent sets of routes/paths/topics (or queries/mutations), you **cannot lazy load them** using the `LazyModuleLoader` class.

> **Warning** Controllers, [resolvers](https://docs.nestjs.com/graphql/resolvers), and [gateways](https://docs.nestjs.com/websockets/gateways) registered inside lazy-loaded modules will not behave as expected. Similarly, you cannot register middleware functions (by implementing the `MiddlewareConsumer` interface) on-demand.

For example, let's say you're building a REST API (HTTP application) with a Fastify driver under the hood (using the `@nestjs/platform-fastify` package). Fastify does not let you register routes after the application is ready/successfully listening to messages. That means even if we analyzed route mappings registered in the module's controllers, all lazy-loaded routes wouldn't be accessible since there is no way to register them at runtime.

Likewise, some transport strategies we provide as part of the `@nestjs/microservices` package (including Kafka, gRPC, or RabbitMQ) require to subscribe/listen to specific topics/channels before the connection is established. Once your application starts listening to messages, the framework would not be able to subscribe/listen to new topics.

Lastly, the `@nestjs/graphql` package with the code first approach enabled automatically generates the GraphQL schema on-the-fly based on the metadata. That means, it requires all classes to be loaded beforehand. Otherwise, it would not be doable to create the appropriate, valid schema.

##### Common Use Cases

Most commonly, you will see lazy loaded modules in situations when your worker/cron job/lambda & serverless function/webhook must trigger different services (different logic) based on the input arguments (route path/date/query parameters, etc.). On the other hand, lazy-loading modules may not make too much sense for monolithic applications, where the startup time is rather irrelevant.

### Execution Context

Source: <https://docs.nestjs.com/fundamentals/execution-context>

Nest provides several utility classes that help make it easy to write applications that function across multiple application contexts (e.g., Nest HTTP server-based, microservices and WebSockets application contexts). These utilities provide information about the current execution context which can be used to build generic [guards](https://docs.nestjs.com/guards), [filters](https://docs.nestjs.com/exception-filters), and [interceptors](https://docs.nestjs.com/interceptors) that can work across a broad set of controllers, methods, and execution contexts.

We cover two such classes in this chapter: `ArgumentsHost` and `ExecutionContext`.

#### ArgumentsHost Class

Source: <https://docs.nestjs.com/fundamentals/execution-context#argumentshost-class>

The `ArgumentsHost` class provides methods for retrieving the arguments being passed to a handler. It allows choosing the appropriate context (e.g., HTTP, RPC (microservice), or WebSockets) to retrieve the arguments from. The framework provides an instance of `ArgumentsHost`, typically referenced as a `host` parameter, in places where you may want to access it. For example, the `catch()` method of an [exception filter](https://docs.nestjs.com/exception-filters#arguments-host) is called with an `ArgumentsHost`instance.

`ArgumentsHost` simply acts as an abstraction over a handler's arguments. For example, for HTTP server applications (when `@nestjs/platform-express` is being used), the `host` object encapsulates Express's `[request, response, next]` array, where `request` is the request object, `response` is the response object, and `next` is a function that controls the application's request-response cycle. On the other hand, for [GraphQL](https://docs.nestjs.com/graphql/quick-start) applications, the `host` object contains the `[root, args, context, info]` array.

#### Current Application Context

When building generic [guards](https://docs.nestjs.com/guards), [filters](https://docs.nestjs.com/exception-filters), and [interceptors](https://docs.nestjs.com/interceptors) which are meant to run across multiple application contexts, we need a way to determine the type of application that our method is currently running in. Do this with the `getType()` method of `ArgumentsHost`:

```ts
if (host.getType() === 'http') {
  // do something that is only important in the context of regular HTTP requests (REST)
} else if (host.getType() === 'rpc') {
  // do something that is only important in the context of Microservice requests
} else if (host.getType<GqlContextType>() === 'graphql') {
  // do something that is only important in the context of GraphQL requests
}
```

> **Hint** The `GqlContextType` is imported from the `@nestjs/graphql` package.

#### Host handler arguments

To retrieve the array of arguments being passed to the handler, one approach is to use the host object's `getArgs()` method.

```typescript
const [req, res, next] = host.getArgs();
```

You can pluck a particular argument by index using the `getArgByIndex()` method:

```typescript
const request = host.getArgByIndex(0);
const response = host.getArgByIndex(1);
```

In these examples we retrieved the request and response objects by index, which is not typically recommended as it couples the application to a particular execution context. Instead, you can make your code more robust and reusable by using one of the `host` object's utility methods to switch to the appropriate application context for your application. The context switch utility methods are shown below.

```typescript

/**
 * Switch context to RPC.
 */
switchToRpc(): RpcArgumentsHost;
/**
 * Switch context to HTTP.
 */
switchToHttp(): HttpArgumentsHost;
/**
 * Switch context to WebSockets.
 */
switchToWs(): WsArgumentsHost;
```

Let's rewrite the previous example using the `switchToHttp()` method. The `host.switchToHttp()` helper call returns an `HttpArgumentsHost` object that is appropriate for the HTTP application context. The `HttpArgumentsHost` object has two useful methods we can use to extract the desired objects. We also use the Express type assertions in this case to return native Express typed objects:

```typescript
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

Similarly `WsArgumentsHost` and `RpcArgumentsHost` have methods to return appropriate objects in the microservices and WebSockets contexts. Here are the methods for `WsArgumentsHost`:

```typescript
export interface WsArgumentsHost {
  /**
   * Returns the data object.
   */
  getData<T>(): T;
  /**
   * Returns the client object.
   */
  getClient<T>(): T;
}
```

Following are the methods for `RpcArgumentsHost`:

```typescript
export interface RpcArgumentsHost {
  /**
   * Returns the data object.
   */
  getData<T>(): T;

  /**
   * Returns the context object.
   */
  getContext<T>(): T;
}
```

#### ExecutionContext class

`ExecutionContext` extends `ArgumentsHost`, providing additional details about the current execution process. Like `ArgumentsHost`, Nest provides an instance of `ExecutionContext` in places you may need it, such as in the `canActivate()` method of a [guard](https://docs.nestjs.com/guards#execution-context) and the `intercept()` method of an [interceptor](https://docs.nestjs.com/interceptors#execution-context). It provides the following methods:

```typescript
export interface ExecutionContext extends ArgumentsHost {
  /**
   * Returns the type of the controller class which the current handler belongs to.
   */
  getClass<T>(): Type<T>;
  /**
   * Returns a reference to the handler (method) that will be invoked next in the
   * request pipeline.
   */
  getHandler(): Function;
}
```

The `getHandler()` method returns a reference to the handler about to be invoked. The `getClass()` method returns the type of the `Controller` class which this particular handler belongs to. For example, in an HTTP context, if the currently processed request is a `POST` request, bound to the `create()` method on the `CatsController`, `getHandler()` returns a reference to the `create()` method and `getClass()` returns the `CatsController`**type** (not instance).

```typescript
const methodKey = ctx.getHandler().name; // "create"
const className = ctx.getClass().name; // "CatsController"
```

The ability to access references to both the current class and handler method provides great flexibility. Most importantly, it gives us the opportunity to access the metadata set through either decorators created via `Reflector#createDecorator` or the built-in `@SetMetadata()` decorator from within guards or interceptors. We cover this use case below.

### Lifecycle Events

A Nest application, as well as every application element, has a lifecycle managed by Nest. Nest provides **lifecycle hooks** that give visibility into key lifecycle events, and the ability to act (run registered code on your modules, providers or controllers) when they occur.

#### Lifecycle sequence

Source: <https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-sequence>

The following diagram depicts the sequence of key application lifecycle events, from the time the application is bootstrapped until the node process exits. We can divide the overall lifecycle into three phases: **initializing**, **running** and **terminating**. Using this lifecycle, you can plan for appropriate initialization of modules and services, manage active connections, and gracefully shutdown your application when it receives a termination signal.

![Official Documentation](https://docs.nestjs.com/assets/lifecycle-events.png)

#### Lifecycle events

Source: <https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events-1>

Lifecycle events happen during application bootstrapping and shutdown. Nest calls registered lifecycle hook methods on modules, providers and controllers at each of the following lifecycle events (**shutdown hooks** need to be enabled first, as described [below](https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown)). As shown in the diagram above, Nest also calls the appropriate underlying methods to begin listening for connections, and to stop listening for connections.

In the following table, `onModuleDestroy`, `beforeApplicationShutdown` and `onApplicationShutdown` are only triggered if you explicitly call `app.close()` or if the process receives a special system signal (such as SIGTERM) and you have correctly called `enableShutdownHooks` at application bootstrap (see below **Application shutdown** part).

| Lifecycle hook method                                                                                          | Lifecycle event triggering the hook method call                                               |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `onModuleInit()`                                                                                               | Called once the host module's dependencies have been resolved.                                |
| `onApplicationBootstrap()`                                                                                     | Called once all modules have been initialized, but before listening for connections.          |
| `onModuleDestroy()`\*                                                                                          | Called after a termination signal (e.g., `SIGTERM`) has been received.                        |
| `beforeApplicationShutdown()`\*                                                                                | Called after all `onModuleDestroy()` handlers have completed (Promises resolved or rejected); |
| once complete (Promises resolved or rejected), all existing connections will be closed (`app.close()` called). |
| `onApplicationShutdown()`\*                                                                                    | Called after connections close (`app.close()` resolves).                                      |

\* For these events, if you're not calling `app.close()` explicitly, you must opt-in to make them work with system signals such as `SIGTERM`. See [Application shutdown](https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown) below.

> **Warning** The lifecycle hooks listed above are not triggered for **request-scoped** classes. Request-scoped classes are not tied to the application lifecycle and their lifespan is unpredictable. They are exclusively created for each request and automatically garbage-collected after the response is sent.

> **Hint** Execution order of `onModuleInit()` and `onApplicationBootstrap()` directly depends on the order of module imports, awaiting the previous hook.

#### Usage

Source: <https://docs.nestjs.com/fundamentals/lifecycle-events#usage>

Each lifecycle hook is represented by an interface. Interfaces are technically optional because they do not exist after TypeScript compilation. Nonetheless, it's good practice to use them in order to benefit from strong typing and editor tooling. To register a lifecycle hook, implement the appropriate interface. For example, to register a method to be called during module initialization on a particular class (e.g., Controller, Provider or Module), implement the `OnModuleInit` interface by supplying an `onModuleInit()` method, as shown below:

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}
```

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}
```

#### Asynchronous initialization

Source: <https://docs.nestjs.com/fundamentals/lifecycle-events#asynchronous-initialization>

Both the `OnModuleInit` and `OnApplicationBootstrap` hooks allow you to defer the application initialization process (return a `Promise` or mark the method as `async` and `await` an asynchronous method completion in the method body).

```typescript

async onModuleInit(): Promise<void> {
  await this.fetch();
}
```

```typescript

async onModuleInit() {
  await this.fetch();
}
```

#### Application shutdown

Source: <https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown>

The `onModuleDestroy()`, `beforeApplicationShutdown()` and `onApplicationShutdown()` hooks are called in the terminating phase (in response to an explicit call to `app.close()` or upon receipt of system signals such as SIGTERM if opted-in). This feature is often used with [Kubernetes](https://kubernetes.io/) to manage containers' lifecycles, by [Heroku](https://www.heroku.com/) for dynos or similar services.

Shutdown hook listeners consume system resources, so they are disabled by default. To use shutdown hooks, you **must enable listeners** by calling `enableShutdownHooks()`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
```

> **warning** Due to inherent platform limitations, NestJS has limited support for application shutdown hooks on Windows. You can expect `SIGINT` to work, as well as `SIGBREAK` and to some extent `SIGHUP` - [read more](https://nodejs.org/api/process.html#process_signal_events). However `SIGTERM` will never work on Windows because killing a process in the task manager is unconditional, "i.e., there's no way for an application to detect or prevent it". Here's some [relevant documentation](https://docs.libuv.org/en/v1.x/signal.html) from libuv to learn more about how `SIGINT`, `SIGBREAK` and others are handled on Windows. Also, see Node.js documentation of [Process Signal Events](https://nodejs.org/api/process.html#process_signal_events)

> **Info**`enableShutdownHooks` consumes memory by starting listeners. In cases where you are running multiple Nest apps in a single Node process (e.g., when running parallel tests with Jest), Node may complain about excessive listener processes. For this reason, `enableShutdownHooks` is not enabled by default. Be aware of this condition when you are running multiple instances in a single Node process.

When the application receives a termination signal it will call any registered `onModuleDestroy()`, `beforeApplicationShutdown()`, then `onApplicationShutdown()` methods (in the sequence described above) with the corresponding signal as the first parameter. If a registered function awaits an asynchronous call (returns a promise), Nest will not continue in the sequence until the promise is resolved or rejected.

```typescript
@Injectable()
class UsersService implements OnApplicationShutdown {
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
```

```typescript
@Injectable()
class UsersService implements OnApplicationShutdown {
  onApplicationShutdown(signal) {
    console.log(signal); // e.g. "SIGINT"
  }
}
```

> **Info** Calling `app.close()` doesn't terminate the Node process but only triggers the `onModuleDestroy()` and `onApplicationShutdown()` hooks, so if there are some intervals, long-running background tasks, etc. the process won't be automatically terminated.

### Platform agnosticism

Source: <https://docs.nestjs.com/fundamentals/platform-agnosticism>

Nest is a platform-agnostic framework. This means you can develop **reusable logical parts** that can be used across different types of applications. For example, most components can be re-used without change across different underlying HTTP server frameworks (e.g., Express and Fastify), and even across different _types_ of applications (e.g., HTTP server frameworks, Microservices with different transport layers, and Web Sockets).

The **Overview** section of the documentation primarily shows coding techniques using HTTP server frameworks (e.g., apps providing a REST API or providing an MVC-style server-side rendered app). However, all those building blocks can be used on top of different transport layers ([microservices](https://docs.nestjs.com/microservices/basics) or [websockets](https://docs.nestjs.com/websockets/gateways)).

Furthermore, Nest comes with a dedicated [GraphQL](https://docs.nestjs.com/graphql/quick-start) module. You can use GraphQL as your API layer interchangeably with providing a REST API.

In addition, the [application context](https://docs.nestjs.com/application-context) feature helps to create any kind of Node.js application - including things like CRON jobs and CLI apps - on top of Nest.

Nest aspires to be a full-fledged platform for Node.js apps that brings a higher-level of modularity and reusability to your applications.

### Testing

Automated testing is considered an essential part of any serious software development effort. Automation makes it easy to repeat individual tests or test suites quickly and easily during development. This helps ensure that releases meet quality and performance goals. Automation helps increase coverage and provides a faster feedback loop to developers. Automation both increases the productivity of individual developers and ensures that tests are run at critical development lifecycle junctures, such as source code control check-in, feature integration, and version release.

Such tests often span a variety of types, including unit tests, end-to-end (e2e) tests, integration tests, and so on. While the benefits are unquestionable, it can be tedious to set them up. Nest strives to promote development best practices, including effective testing, so it includes features such as the following to help developers and teams build and automate tests. Nest:

- automatically scaffolds default unit tests for components and e2e tests for applications
- provides default tooling (such as a test runner that builds an isolated module/application loader)
- provides integration with [Jest](https://github.com/facebook/jest) and [Supertest](https://github.com/visionmedia/supertest) out-of-the-box, while remaining agnostic to testing tools
- makes the Nest dependency injection system available in the testing environment for easily mocking components

As mentioned, you can use any **testing framework** that you like, as Nest doesn't force any specific tooling. Simply replace the elements needed (such as the test runner), and you will still enjoy the benefits of Nest's ready-made testing facilities.

#### Installation

Source <https://docs.nestjs.com/fundamentals/testing#installation>

To get started, first install the required package:

```bash

npm i --save-dev @nestjs/testing
```

#### Unit testing

Source: <https://docs.nestjs.com/fundamentals/testing#unit-testing>

In the following example, we test two classes: `CatsController` and `CatsService`. As mentioned, [Jest](https://github.com/facebook/jest) is provided as the default testing framework. It serves as a test-runner and also provides assert functions and test-double utilities that help with mocking, spying, etc. In the following basic test, we manually instantiate these classes, and ensure that the controller and service fulfill their API contract.

cats.controller.spec.ts

```typescript
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(() => {
    catsService = new CatsService();
    catsController = new CatsController(catsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest
        .spyOn(catsService, 'findAll')
        .mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
```

> **Hint** Keep your test files located near the classes they test. Testing files should have a `.spec` or `.test` suffix.

Because the above sample is trivial, we aren't really testing anything Nest-specific. Indeed, we aren't even using dependency injection (notice that we pass an instance of `CatsService` to our `catsController`). This form of testing - where we manually instantiate the classes being tested - is often called **isolated testing** as it is independent from the framework. Let's introduce some more advanced capabilities that help you test applications that make more extensive use of Nest features.

#### Testing utilities

Source: <https://docs.nestjs.com/fundamentals/testing#testing-utilities>

The `@nestjs/testing` package provides a set of utilities that enable a more robust testing process. Let's rewrite the previous example using the built-in `Test` class:

cats.controller.spec.ts

```typescript
import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest
        .spyOn(catsService, 'findAll')
        .mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
```

The `Test` class is useful for providing an application execution context that essentially mocks the full Nest runtime, but gives you hooks that make it easy to manage class instances, including mocking and overriding. The `Test` class has a `createTestingModule()` method that takes a module metadata object as its argument (the same object you pass to the `@Module()` decorator). This method returns a `TestingModule` instance which in turn provides a few methods. For unit tests, the important one is the `compile()` method. This method bootstraps a module with its dependencies (similar to the way an application is bootstrapped in the conventional `main.ts` file using `NestFactory.create()`), and returns a module that is ready for testing.

> **Hint** The `compile()` method is **asynchronous** and therefore has to be awaited. Once the module is compiled you can retrieve any **static** instance it declares (controllers and providers) using the `get()` method.

`TestingModule` inherits from the [module reference](https://docs.nestjs.com/fundamentals/module-ref) class, and therefore its ability to dynamically resolve scoped providers (transient or request-scoped). Do this with the `resolve()` method (the `get()` method can only retrieve static instances).

```typescript
const moduleRef = await Test.createTestingModule({
  controllers: [CatsController],
  providers: [CatsService],
}).compile();

catsService = await moduleRef.resolve(CatsService);
```

> **Warning** The `resolve()` method returns a unique instance of the provider, from its own **DI container sub-tree**. Each sub-tree has a unique context identifier. Thus, if you call this method more than once and compare instance references, you will see that they are not equal.

> **Hint** Learn more about the module reference features [here](https://docs.nestjs.com/fundamentals/module-ref).

Instead of using the production version of any provider, you can override it with a [custom provider](https://docs.nestjs.com/fundamentals/custom-providers) for testing purposes. For example, you can mock a database service instead of connecting to a live database. We'll cover overrides in the next section, but they're available for unit tests as well.
