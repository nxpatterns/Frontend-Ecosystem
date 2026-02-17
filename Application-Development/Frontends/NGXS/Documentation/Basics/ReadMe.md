# NGXS

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [What is NGXS](#what-is-ngxs)
   1. [CQRS Command Query Responsibility Segregation](#cqrs-command-query-responsibility-segregation)
2. [Installation](#installation)
   1. [Options for NgxsModule.forRoot](#options-for-ngxsmoduleforroot)
      1. [Example before Explanation](#example-before-explanation)
      2. [developmentMode](#developmentmode)
      3. [selectorOptions](#selectoroptions)
         1. [suppressErrors](#suppresserrors)
         2. [injectContainerState](#injectcontainerstate)
         3. [compatibility](#compatibility)
            1. [strictContentSecurityPolicy](#strictcontentsecuritypolicy)
         4. [executionStrategy](#executionstrategy)
   2. [Development Tools & PlugIns](#development-tools-plugins)
      1. [Package.json Dependencies](#packagejson-dependencies)
   3. [Ivy Migration](#ivy-migration)
      1. [Changes You Have To Do](#changes-you-have-to-do)
3. [Concepts](#concepts)
   1. [Store](#store)
   2. [State](#state)
   3. [Selects](#selects)
   4. [Actions](#actions)
4. [Store](#store-1)
   1. [Snapshots](#snapshots)
5. [State](#state-1)
   1. [(Optional) Defining State Token](#optional-defining-state-token)
   2. [Provided State Operators](#provided-state-operators)
      1. [patch](#patch)
      2. [updateItem](#updateitem)
      3. [removeItem](#removeitem)
      4. [insertItem](#insertitem)
      5. [append](#append)
      6. [compose](#compose)
      7. [iif](#iif)
   3. [Reset](#reset)
6. [Select](#select)
   1. [Select Decorators](#select-decorators)
   2. [Store Select Function](#store-select-function)
   3. [Snapshot Selects](#snapshot-selects)
   4. [Memoized Selectors](#memoized-selectors)
      1. [Selector Options](#selector-options)
         1. [`suppressErrors`](#suppresserrors-1)
         2. [`injectContainerState`](#injectcontainerstate-1)
      2. [Memoized Selectors with Arguments](#memoized-selectors-with-arguments)
         1. [Lazy Selectors](#lazy-selectors)
         2. [Dynamic Selectors](#dynamic-selectors)
      3. [Joining Selectors](#joining-selectors)
      4. [Meta Selectors](#meta-selectors)
      5. [The Order of Interacting Selectors](#the-order-of-interacting-selectors)
      6. [Inheriting Selectors](#inheriting-selectors)
   5. [Special Considerations](#special-considerations)
      1. [Angular Libraries: Use of lambdas in static functions](#angular-libraries-use-of-lambdas-in-static-functions)
      2. [Using Select Decorator with `strictPropertyInitialization`](#using-select-decorator-with-strictpropertyinitialization)
7. [Actions](#actions-1)
   1. [Naming Conventions](#naming-conventions)
      1. [Actions taking place in the future](#actions-taking-place-in-the-future)
      2. [Actions as Reaction of Events (already triggered)](#actions-as-reaction-of-events-already-triggered)
   2. [Internal Actions](#internal-actions)
   3. [Creating/Defining Actions](#creatingdefining-actions)
      1. [Quick Example](#quick-example)
         1. [Actions with Metadata](#actions-with-metadata)
      2. [Details](#details)
         1. [Simple Actions](#simple-actions)
         2. [Actions with a payload](#actions-with-a-payload)
         3. [Async Actions](#async-actions)
         4. [Dispatching Actions From Actions](#dispatching-actions-from-actions)
   4. [Grouping Actions](#grouping-actions)
   5. [Dispatching Actions](#dispatching-actions)
   6. [Dispatching Multiple Actions](#dispatching-multiple-actions)
   7. [Dispatching & Observables](#dispatching-observables)
      1. [Reseting a form after dispatching - I](#reseting-a-form-after-dispatching-i)
      2. [Reseting a form - II - getting state](#reseting-a-form-ii-getting-state)
8. [Advanced Topics](#advanced-topics)
   1. [Actions Life Cycle](#actions-life-cycle)
      1. [Theory](#theory)
      2. [Asynchronous actions](#asynchronous-actions)
      3. [Error life cycle](#error-life-cycle)
      4. [Asynchronous Actions continued - "Fire and forget" vs "Fire and wait"](#asynchronous-actions-continued-fire-and-forget-vs-fire-and-wait)
      5. [Summary](#summary)
   2. [Action Handlers](#action-handlers)
   3. [Canceling](#canceling)
      1. [Basic](#basic)
      2. [Advanced](#advanced)
   4. [Composition](#composition)
   5. [Error Handling](#error-handling)
      1. [Handling errors within an `@Select`](#handling-errors-within-an-select)
         1. [Why does RxJS unsubscribe on error?](#why-does-rxjs-unsubscribe-on-error)
      2. [Handling errors within an `@Action`](#handling-errors-within-an-action)
      3. [Handling errors after dispatching an action](#handling-errors-after-dispatching-an-action)
   6. [Lazy Loaded Stores](#lazy-loaded-stores)
   7. [Life-cycle](#life-cycle)
      1. [`ngxsOnChanges`](#ngxsonchanges)
      2. [`ngxsOnInit`](#ngxsoninit)
      3. [`ngxsAfterBootstrap`](#ngxsafterbootstrap)
      4. [Lifecycle sequence](#lifecycle-sequence)
      5. [Feature Modules Order of Imports](#feature-modules-order-of-imports)
      6. [APP_INITIALIZER Stage](#app_initializer-stage)
         1. [Theoretical Introduction](#theoretical-introduction)
         2. [APP_INITIALIZER and NGXS](#app_initializer-and-ngxs)
         3. [Solution](#solution)
         4. [Summary](#summary-1)
   8. [Mapped Sub States](#mapped-sub-states)
   9. [Meta Reducers](#meta-reducers)
   10. [Optimizing Selectors](#optimizing-selectors)
       1. [Memoization](#memoization)
       2. [Implementation](#implementation)
   11. [Shared State](#shared-state)
   12. [State Operators](#state-operators)
       1. [Why?](#why)
       2. [Basic](#basic-1)
       3. [Example](#example)
          1. [Supplied State Operators](#supplied-state-operators)
          2. [Advanced Example](#advanced-example)
          3. [Custom Operators](#custom-operators)
          4. [Relevant Articles](#relevant-articles)
   13. [Sub States](#sub-states)
       1. [Unidirectional Data Flow in NGXS](#unidirectional-data-flow-in-ngxs)
       2. [Example](#example-1)
       3. [Caveats](#caveats)
       4. [Preventing sub-state erasure](#preventing-sub-state-erasure)
   14. [Recipes](#recipes)
       1. [Authentication](#authentication)
       2. [Caching](#caching)
       3. [Component Events from NGXS](#component-events-from-ngxs)
       4. [Debouncing Actions](#debouncing-actions)
       5. [Dynamic Plugins](#dynamic-plugins)
       6. [Immutability Helpers](#immutability-helpers)
       7. [Style Guide](#style-guide)
       8. [Unit Testing](#unit-testing)
       9. [RxAngular Integration](#rxangular-integration)
   15. [Plugins](#plugins)
       1. [Introduction](#introduction)
       2. [cli](#cli)
       3. [logger](#logger)
       4. [devtools](#devtools)
       5. [storage](#storage)
       6. [form](#form)
       7. [websocket](#websocket)
       8. [router](#router)
       9. [hmr](#hmr)
9. [Labs](#labs)
   1. [Stable Packages](#stable-packages)
      1. [@ngxs-labs/data](#ngxs-labsdata)
      2. [@ngxs-labs/emitter](#ngxs-labsemitter)
      3. [@ngxs-labs/immer-adapter](#ngxs-labsimmer-adapter)
      4. [@ngxs-labs/dispatch-decorator](#ngxs-labsdispatch-decorator)
      5. [@ngxs-labs/select-snapshot](#ngxs-labsselect-snapshot)
   2. [Alpha or in Development](#alpha-or-in-development)
      1. [@ngxs-labs/async-storage-plugin](#ngxs-labsasync-storage-plugin)
      2. [@ngxs-labs/entity-state](#ngxs-labsentity-state)
      3. [@ngxs-labs/actions-executing](#ngxs-labsactions-executing)
      4. [@ngxs-labs/attach-action](#ngxs-labsattach-action)
      5. [@ngxs-labs/firestore-plugin](#ngxs-labsfirestore-plugin)

<!-- /code_chunk_output -->

## What is NGXS

[>> Source & Website](https://www.ngxs.io/)

**NGXS** is a state management pattern + library for Angular. It acts as a **single source of truth** for your application's state, providing simple rules for **predictable state mutations**.

NGXS is modeled after the **CQRS pattern** popularly implemented in libraries like _Redux_ and _NgRx_ but reduces boilerplate by using modern **TypeScript** features such as **classes** and **decorators**.

### CQRS Command Query Responsibility Segregation

It's very useful to separate methods into those that change state (commands) and those that don't (queries).

> Because the term **command** is widely used in other contexts I prefer to refer to them as **modifiers**, you also see the term **mutators**.
>
> _\- Martin Fowler_

Non-state changing methods, can be used in any context without worrying about how they sequence with other methods. You have to be more careful with modifiers.

Further Reading & Related Topics:

- <https://martinfowler.com/bliki/CQRS.html>
- <https://martinfowler.com/bliki/CommandQuerySeparation.html>
- <https://martinfowler.com/bliki/BoundedContext.html>
- <https://martinfowler.com/bliki/ObservableState.html>

## Installation

```shell
npm install @ngxs/store --save
```

then in **app.module.ts**, import the **NgxsModule**:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from './../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot(
      [], // <-- INITIAL STATE
      {
        developmentMode: !environment.production,
      },
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

When you include the module in the import, you can pass root stores along with **options** (see coming chapters).

If you are lazy loading, you can use the `forFeature` option with the same arguments.

Options such as `developmentMode` can be passed to the module as the second argument in the `forRoot` method.

In development mode, plugin authors can add additional runtime checks/etc to enhance the developer experience. Switching to development mode will also freeze your store using [deep-freeze-strict](https://www.npmjs.com/package/deep-freeze-strict)
module.

It's important that you add `NgxsModule.forRoot([])` at the root of your module even if all of your states are feature states.

### Options for NgxsModule.forRoot

#### Example before Explanation

ngxs.config.ts

```ts
import { NgxsModuleOptions } from '@ngxs/store';

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    // These Selector Settings are recommended in preparation for NGXS v4
    // (See below for their effects)
    suppressErrors: false,
    injectContainerState: false,
  },
  compatibility: {
    strictContentSecurityPolicy: true,
  },
  // Execution strategy overridden for illustrative purposes
  // (only do this if you know what you are doing)
  executionStrategy: NoopNgxsExecutionStrategy,
};
```

app.module.ts

```ts
import { NgxsModule } from '@ngxs/store';
import { ngxsConfig } from './ngxs.config';
...

@NgModule({
  imports: [
    NgxsModule.forRoot(states, ngxsConfig)
  ],
  ...
})
export class AppModule {}
```

You can provide an `NgxsModuleOptions` object as the second argument of your `NgxsModule.forRoot` call. The following options are available:

- developmentMode
- selectorOptions
  - suppressErrors
  - injectContainerState
- compatibility
  - strictContentSecurityPolicy
- executionStrategy

#### developmentMode

- `developmentMode` - Setting this to `true` will add additional debugging features that are useful for development time. This includes freezing your state and actions to guarantee immutability. (Default value is `false`)

#### selectorOptions

- `selectorOptions` - A nested options object for providing a global options setting to be used for selectors. This can be overridden at the class or specific selector method level using the `SelectorOptions` decorator. The following options are available:

##### suppressErrors

- `suppressErrors` - Setting this to `true` will cause any error within a selector to result in the selector returning `undefined`. Setting this to `false` results in these errors propagating through the stack that triggered the evaluation of the selector that caused the error. **NOTE:** _The default for this setting will be changing to `false` in NGXS v4. The default value in NGXS v3.x is `true`._

##### injectContainerState

- `injectContainerState` - Setting this to `false` will prevent the injection of the container state model as the first parameter of a selector method (defined within a state class) that joins to other selectors for its parameters. When this setting is `true` all selectors defined within a state class will receive the container class' state model as their first parameter. As a result every selector would be re-evaluated after any change to that state. **NOTE:** _This is not ideal, therefore this setting default will be changing to `false` in NGXS v4. The default value in NGXS v3.x is `true`._
- See <https://www.ngxs.io/concepts/select#joining-selectors> for examples of the effect this setting has on your selectors.

##### compatibility

- `compatibility` - A nested options object that allows for the following compatibility options:

###### strictContentSecurityPolicy

- `strictContentSecurityPolicy` - Set this to `true` in order to enable support for pages where a Strict Content Security Policy has been enabled. This setting circumvent some optimisations that violate a strict CSP through the use of `new Function(...)`. (Default value is `false`)

##### executionStrategy

- `executionStrategy` - An advanced option that is used to gain specific control over the way that NGXS executes code that is considered to be inside the NGXS context (ie. within `@Action` handlers) and the context under which the NGXS behaviours are observed (outside the NGXS context). These observable behaviours are: `@Select(...)`, `store.select(...)`, `actions.subscribe(...)` or `store.dispatch(...).subscribe(...)`

  Developers who prefer to manually control the change detection mechanism in their application may choose to use the `NoopNgxsExecutionStrategy` which does not interfere with zones and therefore relies on the external context to handle change detection (for example: `OnPush` or the Ivy rendering engine). Developers can also choose to implement their own strategy by providing an Angular service class that implements the `NgxsExecutionStrategy` interface. The default value of `null` will result in the default strategy being used. This default strategy runs NGXS operations outside Angular's zone but all observable behaviours of NGXS are run back inside Angular's zone. (The default value is `null`)

### Development Tools & PlugIns

```ts
// excerpt e.g. app.module.ts, some of them
NgxsRouterPluginModule.forRoot(),
NgxsFormPluginModule.forRoot(),
NgxsStoragePluginModule.forRoot(),
NgxsReduxDevtoolsPluginModule.forRoot(),
NgxsDispatchPluginModule.forRoot(),
```

#### Package.json Dependencies

```shell
"@ngx-formly/core": "^5.0.0",
"@ngx-formly/material": "^5.0.0",
"@ngx-translate/core": "^13.0.0",
"@ngx-translate/http-loader": "^6.0.0",
"@ngxs-labs/dispatch-decorator": "^2.1.1",
"@ngxs-labs/immer-adapter": "^3.0.5",
"@ngxs/devtools-plugin": "^3.7.2",
"@ngxs/form-plugin": "^3.7.2",
"@ngxs/logger-plugin": "^3.7.2",
"@ngxs/router-plugin": "^3.7.2",
"@ngxs/storage-plugin": "^3.7.2",
"@ngxs/store": "^3.7.2",
```

### Ivy Migration

The Angular team has worked hard to ensure Ivy is as backwards-compatible with the previous rendering engine ("View Engine") as possible. Unfortunately, some changes have to be made so that NGXS and Ivy can function together seamlessly.

In Ivy, all provided or injected tokens must have `@Injectable()` decorator (previously, injected tokens without `@Injectable()` were allowed if another decorator was used, e.g. pipes). In our case the `@State()` decorator was used.

#### Changes You Have To Do

All states are providers, you don't care about their initialization as NGXS does it for you underneath. A typical state looks like this:

```ts
import { State } from '@ngxs/store';

@State<string[]>({
  name: 'countries',
  defaults: ['USA', 'Mexico', 'Canada'],
})
export class CountriesState {}
```

As `CountriesState` is a provider and Ivy requires to decorate all providers with the `@Injectable()` decorator, then the Ivy compatible code should look like this:

```ts
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State<string[]>({
  name: 'countries',
  defaults: ['USA', 'Mexico', 'Canada'],
})
@Injectable()
export class CountriesState {}
```

Note: you don't have to set `providedIn` to `root` on the `@Injectable()` decorator.

## Concepts

Sources:

- <https://www.ngxs.io/concepts/intro>

![NGXS Store Concept](assets/NGXSStoreConcept.png)

There are 4 major concepts to NGXS:

### Store

Global state container, action dispatcher and selector

### State

Class definition of the state

### Selects

State slice selectors

### Actions

Class describing the action to take and its associated metadata. Actions in NGXS are asynchronous. This allows actions to have a life cycle, meaning we can now listen for when a single action or a collection of actions is complete making complex workflows predictable.

## Store

The **store** is a **global state manager** that **dispatches actions** your state containers listen to and provides a way to select data slices out from the global state.

### Snapshots

You can get a snapshot of the state by calling `store.snapshot()`. This will return the entire value of the store for that point in time.

## State

States are classes along with decorators to describe metadata
and action mappings. To define a state container, let's create an
ES2015 class and decorate it with the `State` decorator.

```ts
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State<string[]>({
  name: 'animals',
  defaults: [],
})
@Injectable()
export class AnimalsState {}
```

In the state decorator, we define some metadata about the state. These options
include:

- `name`: The name of the state slice. Note: The name is a required parameter and must be unique for the entire application.
  Names must be object property safe, (e.g. no dashes, dots, etc).
- `defaults`: Default set of object/array for this state slice.
- `children`: Child sub state associations.

Our states can also participate in dependency injection. This is hooked up automatically
so all you need to do is inject your dependencies in the constructor.

```ts
@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    feed: false,
  },
})
@Injectable()
export class ZooState {
  constructor(private zooService: ZooService) {}
}
```

### (Optional) Defining State Token

Optionally, you can choose to replace the `name` of your state can be made with a state token:

```ts
const ZOO_STATE_TOKEN = new StateToken<ZooStateModel>('zoo');

@State({
  name: ZOO_STATE_TOKEN,
  defaults: {
    feed: false,
  },
})
@Injectable()
export class ZooState {
  constructor(private zooService: ZooService) {}
}
```

A state token can be used as a representation of a state class without referring directly to the state class itself. When creating an StateToken you will provide the location that the state should be stored on your state tree. You can also set a default state model type of the parameterized type `T`, which can assist with ensuring the type safety of referring to your state in your application. The state token is declared as follows:

```ts
const TODOS_STATE_TOKEN = new StateToken<TodoStateModel[]>('todos');
```

Or if you choose to not expose the model of your state class to the rest of the application then you can pass the type as `unknown` or `any`(this is useful if you want to keep all knowledge of the structure of your state class model private).

```ts
const TODOS_STATE_TOKEN = new StateToken<unknown>('todos');
```

If you use pass this token as the `name` property in your `@State` declaration (or if the path specified matches your `name` property then you can use this token to refer to this state class from other parts of your application (in your selectors, or in plugins like the storage plugin that need to refer to a state class). The token can be used in your `@State` declaration as follows:

```ts
interface TodoStateModel {
  title: string;
  completed: boolean;
}

const TODOS_STATE_TOKEN = new StateToken<TodoStateModel[]>('todos');

// Note: the @State model type is inferred from in your token.
@State({
  name: TODOS_STATE_TOKEN,
  defaults: [],
})
@Injectable()
class TodosState {
  // ...
}
```

A state token with a model type provided can be used in other parts of your application to improve type safety in the following aspects:

- Improved type checking for `@State`, `@Selector` in a state class

```ts
interface TodoStateModel {
  title: string;
  completed: boolean;
}

const TODOS_STATE_TOKEN = new StateToken<TodoStateModel[]>('todos');

@State({
  name: TODOS_STATE_TOKEN,
  defaults: [],
  // if you specify the wrong state type,
  // will be a compilation error
})
@Injectable()
class TodosState {
  @Selector([TODOS_STATE_TOKEN])
  // if you specify the wrong state type,
  // will be a compilation error
  static completedList(state: TodoStateModel[]): TodoStateModel[] {
    return state.filter((todo) => todo.completed);
  }
}
```

The following code demonstrates mismatched types that will be picked up as compilation errors:

```ts
const TODOS_STATE_TOKEN = new StateToken<TodoStateModel[]>('todos');

@State({
  name: TODOS_STATE_TOKEN,
  defaults: {},
  // compilation error - array was expected,
  // inferred from the token type
})
@Injectable()
class TodosState {
  @Selector([TODOS_STATE_TOKEN])
  // compilation error - TodoStateModel[] does not match string[]
  static completedList(state: string[]): string[] {
    return state;
  }
}
```

- Improved type checking for `@Select`

```ts
@Component(/**/)
class AppComponent {
  @Select(TODOS_STATE_TOKEN)
  // if you specify the wrong property type,
  // there will be a compilation error
  todos$: Observable<TodoStateModel[]>;
}
```

The following code demonstrates mismatched types that will be picked up as compilation errors:

```ts
@Component(/**/)
class AppComponent {
  @Select(TODOS_STATE_TOKEN) // compilation error
  todos$: Observable<string[]>;

  @Select(TODOS_STATE_TOKEN) // compilation error
  todos: string;
}
```

- Improved type inference for `store.select, store.selectOnce, store.selectSnapshot`

```ts
@Component(/**/)
class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    const todos = this.store.selectSnaphot(TODOS_STATE_TOKEN);
    // infers type TodoStateModel[]
    const todos$ = this.store.select(TODOS_STATE_TOKEN);
    // infers type Observable<TodoStateModel[]>
    const oneTodos$ = this.store.selectOnce(TODOS_STATE_TOKEN);
    // infers type Observable<TodoStateModel[]>
  }
}
```

### Provided State Operators

<https://www.ngxs.io/v/master/advanced/operators>

#### patch

#### updateItem

#### removeItem

#### insertItem

#### append

#### compose

#### iif

### Reset

In certain situations you need the ability to reset the state in its entirety without triggering any actions or life-cycle hooks. One example of this would be redux devtools plugin when we are doing time travel.

Another example would be when we are unit testing and need the state to be a specific value for isolated testing.

**`store.reset(myNewStateObject)`** will reset the entire state to the passed argument without firing any actions or life-cycle events.

**Warning:** Using this can cause unintended side effects if improperly used and should be used with caution!

## Select

Selects are functions that slice a specific portion of state from the global state container.

In CQRS and Redux patterns, we keep READ and WRITE separated. This pattern also exists in NGXS. When we want to read data out of our store, we use a **select operator** to retrieve this data.

In NGXS, there are **two methods to select state**, we can either call the **select method on the Store service** or **use the @Select decorator**.

### Select Decorators

You can select slices of data from the store using the @Select decorator. It has a few different ways to get your data out, whether passing the state class, a function, a different state class or a memoized selector.

```ts
import { Select } from '@ngxs/store';
import { ZooState, ZooStateModel } from './zoo.state';

@Component({ ... })
export class ZooComponent {
  // Reads the name of the state from the state class
  @Select(ZooState) animals$: Observable<string[]>;

  // Uses the pandas memoized selector to only return pandas
  @Select(ZooState.pandas) pandas$: Observable<string[]>;

  // Also accepts a function like our select method
  @Select(state => state.zoo.animals) animals$: Observable<string[]>;

  // Reads the name of the state from the parameter
  @Select() zoo$: Observable<ZooStateModel>;
}
```

### Store Select Function

````ts
The `Store` class also has a `select` function:

```ts
import { Store } from '@ngxs/store';

@Component({ ... })
export class ZooComponent {
  animals$: Observable<string[]>;

  constructor(private store: Store) {
    this.animals$ = this.store.select(state => state.zoo.animals);
  }
}
````

This is most helpful to programmatic selects where we can't statically
declare them with the select decorator. There is also a **`selectOnce`** that will basically do **`select().pipe(take(1))`** for you automatically as a shortcut method.

This can be useful in route guards where you only want to check the current state and not continue watching the stream. It can also be useful for unit testing.

### Snapshot Selects

On the store, there is a `selectSnapshot` function that allows you to pull out the
raw value. This is helpful for cases where you need to get a static value but can't
use Observables. A good use case for this would be an interceptor that needs to get
the token from the auth state.

```ts
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot<string>(
      (state: AppState) => state.auth.token,
    );
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req);
  }
}
```

### Memoized Selectors

Oftentimes you will use the same selectors in several different places
or have complex selectors you want to keep separate from your component.
NGXS has a `@Selector` decorator that will help us with that. This decorator
will memoize the function for performance as well as automatically slice
the state portion you are dealing with.

Let's create a selector that will return a list of pandas from the animals.

```ts
import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';

@State<string[]>({
  name: 'animals',
  defaults: [],
})
@Injectable()
export class ZooState {
  @Selector()
  static pandas(state: string[]) {
    return state.filter((s) => s.indexOf('panda') > -1);
  }
}
```

Notice, the `state` is just the local state for this `ZooState` class. Now in our component,
we simply do:

```ts
@Component({ ... })
export class AppComponent {
  @Select(ZooState.pandas) pandas$: Observable<string[]>;
}
```

and our `pandas$` will only return animals with the name panda in them.

#### Selector Options

The behavior of the memoized selectors can be configured at a global level using the `selectorOptions` property in the options passed to the `NgxsModule.forRoot` call.  
These options can also be provided through the `@SelectorOptions` decorator at a Class or Method level in order to configure the behavior of selectors within that scope. The following options are available:

##### `suppressErrors`

- `true` will cause any error within a selector to result in the selector returning `undefined`.
- `false` results in these errors propagating through the stack that triggered the evaluation of the selector that caused the error.
- **NOTE:** _The default for this setting will be changing to `false` in NGXS v4.  
  The default value in NGXS v3.x is `true`._

##### `injectContainerState`

- `true` will cause all selectors defined within a state class to receive the container class' state model as their first parameter. As a result every selector would be re-evaluated after any change to that state.  
  **NOTE:** _This is not ideal, therefore this setting default will be changing to `false` in NGXS v4._
- `false` will prevent the injection of the container state model as the first parameter of a selector method (defined within a state class) that joins to other selectors for its parameters.
- _The default value in NGXS v3.x is `true`._
- See (&rarr; joining-selectors) for examples of the effect this setting has on your selectors.

We recommend setting these options at the global level, unless you are transitioning your application from one behavior to another where you can use this decorator to introduce this transition in a piecemeal fashion. For example, NGXS v4 will be introducing a change to the selectors that will effect methods which make use of joined selectors (see &rarr; `joining-selectors`).

We recommend using the following global settings for new projects in order to minimise the impact of the v4 upgrade:

```ts
{
  // These Selector Settings are recommended in preparation for NGXS v4
  // (See above for their effects)
  suppressErrors: false,
  injectContainerState: false
}
```

#### Memoized Selectors with Arguments

Selectors can be configured to accept arguments.  
There are two patterns that allow for this: **Lazy Selectors** or **Dynamic Selectors**:

##### Lazy Selectors

To create a lazy selector all that you need to do is return a function from the selector.
The function returned by the selector will be memoized automatically and the logic inside this function will be evaluated at a later stage when the consumer of the selector executes the function. Note that this function can take any number of arguments (or zero arguments) as it is the consumer's responsibility to supply them.

For instance, I can have a Lazy Selector that will filter my pandas to the provided type of panda.

```ts
@State<string[]>({
  name: 'animals',
  defaults: [],
})
@Injectable()
export class ZooState {
  @Selector()
  static pandas(state: string[]) {
    return (type: string) => {
      return state
        .filter((s) => s.indexOf('panda') > -1)
        .filter((s) => s.indexOf(type) > -1);
    };
  }
}
```

then you can use `store.select` and evaluate the lazy function using the `rxjs` `map` pipeline function.

```ts
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({ ... })
export class ZooComponent {
  babyPandas$: Observable<string[]>;

  constructor(private store: Store) {
    this.babyPandas$ = this.store
      .select(ZooState.pandas)
      .pipe(map(filterFn => filterFn('baby')));
  }
}
```

##### Dynamic Selectors

A dynamic selector is created by using the `createSelector` function as opposed to the `@Selector` decorator. It does not need to be created in any special area at any specific time. The typical use case though would be to create a selector that looks like a normal selector but takes an argument to provide to the dynamic selector.

For instance, I can have a Dynamic Selector that will filter my pandas to the provided type of panda.

```ts
@State<string[]>({
  name: 'animals',
  defaults: [],
})
@Injectable()
export class ZooState {
  static pandas(type: string) {
    return createSelector([ZooState], (state: string[]) => {
      return state
        .filter((s) => s.indexOf('panda') > -1)
        .filter((s) => s.indexOf(type) > -1);
    });
  }
}
```

then you can use `@Select` to call this function with the parameter provided.

```ts
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({ ... })
export class ZooComponent {

  @Select(ZooState.pandas('baby'))
  babyPandas$: Observable<string[]>;

  @Select(ZooState.pandas('adult'))
  adultPandas$: Observable<string[]>;

}
```

Note that each of these selectors have their own separate memoization. Even if two dynamic selectors created in this way are provided the same argument, they will have separate memoization.

These selectors are extremely powerful and are what is used under the hood to create all other selectors.

_Dynamic Selectors (dynamic state slice)_

An interesting use case would be to allow for a selector to be reused to select from States that have the same structure. For example:

```ts
export class SharedSelectors {
  static getEntities(stateClass) {
    return createSelector(
      [stateClass],
      (state: { entities: any[] }) => {
        return state.entities;
      },
    );
  }
}
```

then this could be used as follows:

```ts

@Component({ ... })
export class ZooComponent {

  @Select(SharedSelectors.getEntities(ZooState))
  zoos$: Observable<Zoo[]>;

  @Select(SharedSelectors.getEntities(ParkState))
  parks$: Observable<Park[]>;

}
```

#### Joining Selectors

When defining a selector, you can also pass other selectors into the signature
of the `Selector` decorator to join other selectors with this state selector.

If you do not change the Selector Options (see &rarr; selector-options) then these selectors will have the following signature in NGXS v3.x:

```ts
@State<PreferencesStateModel>({ ... })
@Injectable()
export class PreferencesState { ... }

@State<string[]>({ ... })
@Injectable()
export class ZooState {

  @Selector([PreferencesState])
  static firstLocalPanda(state: string[], preferencesState: PreferencesStateModel) {
    return state.find(
      s => s.indexOf('panda') > -1 && s.indexOf(preferencesState.location)
    );
  }

  @Selector([ZooState.firstLocalPanda])
  static happyLocalPanda(state: string[], panda: string) {
    return 'happy ' + panda;
  }

}
```

Here you can see that when using the `Selector` decorator with arguments within a state class, it will inject the state class's state model as the first parameter followed by the other selectors in the order they were passed in the signature.

This is the behavior provided by the &rarr; `injectContainerState` option being defaulted to `true` in NGXS v3.x.

The memoized selectors will recalculate when any of their input parameter values change (whether they use them or not). In the case of the behavior above where the state class's state model is injected as the first input parameter, the selectors will recalculate on any change to this model. You will notice that the `happyLocalPanda` selector has the `state` dependency even though it is not used. It would recalculate on every change to `state` ignoring the fact that `firstLocalPanda` value may not have changed. This is not ideal, therefore this default behavior is changing in NGXS v4.

In NGXS v4 and above the default value of the &rarr; `injectContainerState` selector option will change to `false`, resulting in selectors that are more optimised because they do not get the state model injected as the first parameter unless explicitly requested. With this setting the selectors would need to be defined as follows:

```ts
@State<PreferencesStateModel>({ ... })
@Injectable()
export class PreferencesState { ... }

@State<string[]>({ ... })
@Injectable()
export class ZooState {

 @Selector([ZooState, PreferencesState])
 static firstLocalPanda(state: string[], preferencesState: PreferencesStateModel) {
   return state.find(
     s => s.indexOf('panda') > -1 && s.indexOf(preferencesState.location)
   );
 }

 @Selector([ZooState.firstLocalPanda])
 static happyLocalPanda(panda: string) {
   return 'happy ' + panda;
 }

}
```

Now the `happyLocalPanda` will only recalculate when the output value of the `firstLocalPanda` selector changes.

We recommend that you move your projects to this behavior in order to optimize your selectors and to prepare for the change to the defaults coming in NGXS v4. See the Selector Options section for the recommended settings.

#### Meta Selectors

By default selectors in NGXS are bound to a state. Sometimes you need the ability
to join to un-related states in a high-performance re-usable fashion. A meta selector
is a selector allows you to bind N number of selectors together to return a state
stream.

Let's say we have 2 states; 'zoos' and 'theme parks'. We have a component that needs
to show all the zoos and theme parks for a given city. These are two very distinct
state classes that are likely not related in any manner. We can use a meta selector
to join these two states together like:

```ts
export class CityService {
  @Selector([Zoo, ThemePark])
  static zooThemeParks(zoos, themeParks) {
    return [...zoos, ...themeParks];
  }
}
```

now we can use this `zooThemeParks` selector anywhere in our application.

#### The Order of Interacting Selectors

In versions of NGXS prior to 3.6.1 there was an issue where the order which the selectors were declared would matter. This was fixed in PR [#1514](https://github.com/ngxs/store/pull/1514) and selectors can now be declared in any arbitrary order.

#### Inheriting Selectors

When we have states that share similar structure, we can extract the shared selectors into a base class which we can later extend from. If we have an `entities` field on multiple states, we can create a base class containing a dynamic `@Selector()` for that field, and extend from it on the `@State` classes like this.

```ts
export class EntitiesState {
  static entities<T>() {
    return createSelector([this], (state: { entities: T[] }) => {
      return state.entities;
    });
  }

  //...
}
```

And extend the `EntitiesState` class on each `@State` like this:

```ts
export interface UsersStateModel {
  entities: User[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class UsersState extends EntitiesState {
  //...
}

export interface ProductsStateModel {
  entities: Product[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class ProductsState extends EntitiesState {
  //...
}
```

Then you can use them as follows:

```ts

@Component({ ... })
export class AppComponent {

  @Select(UsersState.entities<User>())
  users$: Observable<User[]>;

  @Select(ProductsState.entities<Product>())
  products$: Observable<Product[]>;

}
```

Or:

```ts
this.store.select(UsersState.entities<User>());
```

### Special Considerations

#### Angular Libraries: Use of lambdas in static functions

_If you are building an Angular lib directly so that it can be deployed to npm the Angular compiler option `strictMetadataEmit` (see [docs](https://angular.io/guide/aot-compiler#strictmetadataemit)) will most likely be set to true and, as a result, Angular's `MetadataCollector` from the `@angular/compiler-cli` package will report the following issue with using lambdas in static methods:_

> Metadata collected contains an error that will be reported at runtime: Lambda not supported.`

This error would be reported for each of the selectors defined below but, as demonstrated in the sample, you can prevent this by including the `// @dynamic` comment before the class expression and decorators:

```ts
// @dynamic
@State<string[]>({
  name: 'animals',
  defaults: ['panda', 'horse', 'bee'],
})
@Injectable()
export class ZooState {
  @Selector()
  static pandas(state: string[]) {
    return state.filter((s) => s.indexOf('panda') > -1);
  }

  @Selector()
  static horses(state: string[]) {
    return (type: string) => {
      return state
        .filter((s) => s.indexOf('horse') > -1)
        .filter((s) => s.indexOf(type) > -1);
    };
  }

  static bees(type: string) {
    return createSelector([ZooState], (state: string[]) => {
      return state
        .filter((s) => s.indexOf('bee') > -1)
        .filter((s) => s.indexOf(type) > -1);
    });
  }
}
```

As an alternative you can assign your result to a variable before you return it:  
See https://github.com/ng-packagr/ng-packagr/issues/696#issuecomment-387114613

```ts
@State<string[]>({
  name: 'animals',
  defaults: ['panda', 'horse', 'bee'],
})
@Injectable()
export class ZooState {
  @Selector()
  static pandas(state: string[]) {
    const result = state.filter((s) => s.indexOf('panda') > -1);
    return result;
  }

  @Selector()
  static horses(state: string[]) {
    const fn = (type: string) => {
      return state
        .filter((s) => s.indexOf('horse') > -1)
        .filter((s) => s.indexOf(type) > -1);
    };
    return fn;
  }

  static bees(type: string) {
    const selector = createSelector([ZooState], (state: string[]) => {
      return state
        .filter((s) => s.indexOf('bee') > -1)
        .filter((s) => s.indexOf(type) > -1);
    });
    return selector;
  }
}
```

#### Using Select Decorator with `strictPropertyInitialization`

If `strictPropertyInitialization` option is enabled then the TypeScript compiler will require all class properties to be explicitly initialized in the constructor. Given the following code:

```ts
@Component({ ... })
export class ZooComponent {
  @Select(ZooState.pandas) pandas$: Observable<string[]>;
}
```

In the above example the compiler will emit the following error only if `strictPropertyInitialization` is turned on:

```
// Type error: Property 'pandas$' has no initializer
// and is not definitely assigned in the constructor
```

We can solve that by applying the [definite assignment assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions) to `pandas$` property declaration (note the added exclamation mark):

```ts
@Component({ ... })
export class ZooComponent {
  @Select(ZooState.pandas) pandas$!: Observable<string[]>;
}
```

By adding the definite assignment assertion we're telling the type-checker that we're sure that `pandas$` property will be initialized (by the `@Select` decorator).

## Actions

Actions can either be thought of as a command which should trigger something to happen, or as the resulting event of something that has already happened.

Each action contains a `type` field which is its unique identifier.

### Naming Conventions

#### Actions taking place in the future

Names should contain three parts:

- A context as to where the command came from, `[User API]`, `[Product Page]`, `[Dashboard Page]`.
- A verb describing what we want to do with the entity.
- The entity we are acting upon, `User`, `Card`, `Project`.

Examples:

- `[User API] GetUser`
- `[Product Page] AddItemToCart`
- `[Dashboard Page] ArchiveProject`

#### Actions as Reaction of Events (already triggered)

Events are actions that have already happened and we now need to react to them.

The same naming conventions apply as commands, but they should always be in the past tense.

By using `API` in the context part of the action name we know that this event was fired because of an async action to an API.

Actions are normally dispatched from container components such as router pages.
By having explicit actions for each page, it's also easier to track where an event came from.

Examples:

- [User API] GetUserSuccess
- [Project API] ProjectUpdateFailed
- [User Details Page] PasswordChanged
- [Project Stars Component] StarsUpdated

A great video on the topic is [Good Action Hygiene by Mike Ryan](https://www.youtube.com/watch?v=JmnsEvoy-gY)
It's for NgRx, but the same naming conventions apply to NGXS.

### Internal Actions

There are two actions that get triggered in the internals of the library:

1. @@INIT - store being initialized, before all the **ngxsOnInit Life-cycle** events. <https://www.ngxs.io/advanced/life-cycle>
1. @@UPDATE_STATE - a new **lazy-loaded state** being added to the store. <https://www.ngxs.io/advanced/lazy>

### Creating/Defining Actions

#### Quick Example

```ts
export class AddAnimal {
  static readonly type = '[Zoo] Add Animal';
  constructor(public name: string) {}
}
```

##### Actions with Metadata

```ts
export class FeedZebra {
  static readonly type = '[Zoo] Feed Zebra';
  constructor(public name: string, public hayAmount: number) {}
}
```

#### Details

Our states listen to actions via an **@Action** decorator. The action decorator accepts an action class or an array of action classes.

##### Simple Actions

Let's define a state that will listen to a `FeedAnimals` action to toggle whether the animals have been fed:

```ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

export class FeedAnimals {
  static readonly type = '[Zoo] FeedAnimals';
}

export interface ZooStateModel {
  feed: boolean;
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    feed: false,
  },
})
@Injectable()
export class ZooState {
  @Action(FeedAnimals)
  feedAnimals(ctx: StateContext<ZooStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      feed: !state.feed,
    });
  }
}
```

The `feedAnimals` function has one argument called `ctx` with a type of `StateContext<ZooStateModel>`.

This context state has a slice pointer and a function exposed to set the state. It's important to note that the `getState()` method will always return the freshest state slice from the global store each time it is accessed.

This ensures that when we're performing async operations the state is always fresh. If you want a snapshot, you can always clone the state in the method.

##### Actions with a payload

Actions can also pass along metadata that has to do with the action.
Say we want to pass along how much hay and carrots each zebra needs.

```ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

// This is an interface that is part of your domain model
export interface ZebraFood {
  name: string;
  hay: number;
  carrots: number;
}

// naming your action metadata explicitly makes it easier to understand what the action
// is for and makes debugging easier.
export class FeedZebra {
  static readonly type = '[Zoo] FeedZebra';
  constructor(public zebraToFeed: ZebraFood) {}
}

export interface ZooStateModel {
  zebraFood: ZebraFood[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    zebraFood: [],
  },
})
@Injectable()
export class ZooState {
  @Action(FeedZebra)
  feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      zebraFood: [
        ...state.zebraFood,
        // this is the new ZebraFood instance that we add to the state
        action.zebraToFeed,
      ],
    });
  }
}
```

In this example, we have a second argument that represents the action and we destructure it
to pull out the name, hay, and carrots which we then update the state with.

There is also a shortcut `patchState` function to make updating the state easier. In this case, you only pass it the properties you want to update on the state and it handles the rest. The above function could be reduced to this:

```ts
@Action(FeedZebra)
feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
  const state = ctx.getState();
  ctx.patchState({
    zebraFood: [
      ...state.zebraFood,
      action.zebraToFeed,
    ]
  });
}
```

The `setState` function can also be called with a function which will be given the existing state and should return the new state. All immutability concerns need to be honoured by this function.

For comparison, here are the two ways that you can invoke the `setState` function...  
With a new constructed state value:

```ts
@Action(MyAction)
public addValue(ctx: StateContext, { payload }: MyAction) {
  ctx.setState({ ...ctx.getState(), value: payload  });
}
```

With a function that returns the new state value:

```ts
@Action(MyAction)
public addValue(ctx: StateContext, { payload }: MyAction) {
  ctx.setState((state) => ({ ...state, value: payload }));
}
```

You may ask _"How is this valuable?"_. Well, it opens the door for refactoring of your immutable updates into `state operators` so that your code can become more declarative as opposed to imperative. We will be adding some standard `state operators` soon that you will be able to use to express your updates to the state. Follow the issue here for updates: https://github.com/ngxs/store/issues/545

As another example you could use a library like [immer](https://github.com/mweststrate/immer) that can handle the immutability updates for you and provide a different way of expressing your immutable update through direct mutation of a draft object. We can use this external library because it supports the same signature as out `state operators` through their curried `produce` function. Here is the example from above expressed in this way:

```ts
import produce from 'immer';

// in class ZooState ...
@Action(FeedZebra)
feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
  ctx.setState(produce((draft) => {
    draft.zebraFood.push(action.zebraToFeed);
  }));
}
```

Here the `produce` function from the `immer` library is called with just a single parameter so that it returns its' [curried form](https://github.com/mweststrate/immer#currying) that will take a value and return a new value with all the expressed changes applied.

This approach can also allow for the creation of well named helper functions that can be shared between handlers that require the same type of update.
The above example could be refactored to this:

```ts
// in class ZooState ...
@Action(FeedZebra)
feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
  ctx.setState(addToZebraFood(action.zebraToFeed));
}

// defined elsewhere
import produce from 'immer';

function addToZebraFood(itemToAdd) {
  return produce((draft) => {
    draft.zebraFood.push(itemToAdd);
  });
}
```

##### Async Actions

Actions can perform async operations and update the state after an operation.

Typically in Redux your actions are pure functions and you have some other system like a saga or an effect to perform
these operations and dispatch another action back to your state to mutate it. There are some
reasons for this, but for the most part it can be redundant and just add boilerplate. The great thing here is
we give you the flexibility to make that decision yourself based on your requirements.

Let's take a look at a simple async action:

```ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

export class FeedAnimals {
  static readonly type = '[Zoo] FeedAnimals';
  constructor(public animalsToFeed: string) {}
}

export interface ZooStateModel {
  feedAnimals: string[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    feedAnimals: [],
  },
})
@Injectable()
export class ZooState {
  constructor(private animalService: AnimalService) {}

  @Action(FeedAnimals)
  feedAnimals(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
    return this.animalService.feed(action.animalsToFeed).pipe(
      tap((animalsToFeedResult) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          feedAnimals: [...state.feedAnimals, animalsToFeedResult],
        });
      }),
    );
  }
}
```

In this example, we reach out to the animal service and call `feed` and then
call `setState` with the result. Remember that we can guarantee that the state
is fresh since the state property is a getter back to the current state slice.

You might notice I returned the Observable and just did a `tap`. If we return
the Observable, the framework will automatically subscribe to it for us, so
we don't have to deal with that ourselves. Additionally, if we want the stores
`dispatch` function to be able to complete only once the operation is completed,
we need to return that so it knows that.

Observables are not a requirement, you can use promises too. We could swap
that observable chain to look like this:

```ts
import { Injectable } from '@angular/core';
import { State, Action } from '@ngxs/store';

export class FeedAnimals {
  static readonly type = '[Zoo] FeedAnimals';
  constructor(public animalsToFeed: string) {}
}

export interface ZooStateModel {
  feedAnimals: string[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    feedAnimals: [],
  },
})
@Injectable()
export class ZooState {
  constructor(private animalService: AnimalService) {}

  @Action(FeedAnimals)
  async feedAnimals(
    ctx: StateContext<ZooStateModel>,
    action: FeedAnimals,
  ) {
    const result = await this.animalService.feed(
      action.animalsToFeed,
    );
    const state = ctx.getState();
    ctx.setState({
      ...state,
      feedAnimals: [...state.feedAnimals, result],
    });
  }
}
```

##### Dispatching Actions From Actions

If you want your action to dispatch another action, you can use the `dispatch` function that is contained in the state context object.

```ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { map } from 'rxjs/operators';

export interface ZooStateModel {
  feedAnimals: string[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    feedAnimals: [],
  },
})
@Injectable()
export class ZooState {
  constructor(private animalService: AnimalService) {}

  /**
   * Simple Example
   */
  @Action(FeedAnimals)
  feedAnimals(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      feedAnimals: [...state.feedAnimals, action.animalsToFeed],
    });

    return ctx.dispatch(new TakeAnimalsOutside());
  }

  /**
   * Async Example
   */
  @Action(FeedAnimals)
  feedAnimals2(
    ctx: StateContext<ZooStateModel>,
    action: FeedAnimals,
  ) {
    return this.animalService.feed(action.animalsToFeed).pipe(
      tap((animalsToFeedResult) => {
        const state = ctx.getState();
        ctx.patchState({
          feedAnimals: [...state.feedAnimals, animalsToFeedResult],
        });
      }),
      mergeMap(() => ctx.dispatch(new TakeAnimalsOutside())),
    );
  }
}
```

Notice I returned the dispatch function, this goes back to our example above with async operations and the dispatcher subscribing to the result. It is not required though.

### Grouping Actions

**Don't suffix** your actions like:

```ts
export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public payload: any) {}
}

export class FetchAllTodos {
  static readonly type = '[Todo] Fetch All';
}
```

**better group** similar actions into a namespace:

```ts
export namespace Todo {
  export class Add {
    static readonly type = '[Todo] Add';
    constructor(public payload: any) {}
  }

  export class FetchAll {
    static readonly type = '[Todo] Fetch All';
  }
}
```

### Dispatching Actions

To **dispatch** actions, you need to inject the **Store** service into your **component/service** and **invoke the dispatch function** with an action or an array of actions you wish to trigger.

```ts
import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {
  constructor(private store: Store) {}

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name));
  }
}

```

### Dispatching Multiple Actions

You can also dispatch multiple actions at the same time by passing an array of actions like:

```ts
this.store.dispatch([new AddAnimal('Panda'), new AddAnimal('Zebra')]);
```

### Dispatching & Observables

#### Reseting a form after dispatching - I

Let's say after the action executes you want to clear the form. Our dispatch function actually returns an Observable, so we can subscribe to it and reset the form after it was successful.

```ts
import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {

  constructor(private store: Store) {}

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name))
    .subscribe(() => this.form.reset());
  }

}
```

#### Reseting a form - II - getting state

The **Observable** that a dispatch returns has a **void** type, this is because there can be **multiple states** that listen to the same **@Action**, therefore it's not realistically possible to return the state from these actions since we don't know the form of them.

**If you need to get the state after this**, simply use a @Select in the chain like:

```ts
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {

  @Select(state => state.animals) animals$: Observable<any>;

  constructor(private store: Store) {}

  addAnimal(name: string) {
    this.store
      .dispatch(new AddAnimal(name))
      .pipe(withLatestFrom(this.animals$))
      .subscribe(([_, animals]) => {
        // do something with animals
        this.form.reset();
      });
  }

}
```

## Advanced Topics

### Actions Life Cycle

This document describes the life cycle of actions, after reading it you should have a better understanding of how NGXS handles actions and what stages they may be at.

#### Theory

Any action in NGXS can be in one of four states, these states are `DISPATCHED`, `SUCCESSFUL`, `ERRORED`, `CANCELED`, think of it as a finite state machine.

<https://www.ngxs.io/advanced/actions-life-cycle> &rarr; Image

NGXS has an internal stream of actions. When we dispatch any action using the following code:

```ts
store.dispatch(new GetNovels());
```

The internal actions stream emits an object called `ActionContext`, that has 2 properties:

```ts
{
  action: GetNovelsInstance,
  status: 'DISPATCHED'
}
```

There is an action stream listener that filters actions by `DISPATCHED` status and invokes the appropriate handlers for this action. After all processing for the action has completed it generates a new `ActionContext` with the following `status` value:

```ts
{
  action: GetNovelsInstance,
  status: 'SUCCESSFUL'
}
```

The observable returned by the `dispatch` method is then triggered after the action is handled "successfully" and, in response to this observable, you are able to do the actions you wanted to do on completion of the action.

If the `GetNovels` handler throws an error, for example:

```ts
@Action(GetNovels)
getNovels() {
  throw new Error('This is just a simple error!');
}
```

Then the following `ActionContext` will be created:

```ts
{
  action: GetNovelsInstance,
  status: 'ERRORED'
}
```

Actions can be both synchronous and asynchronous, for example if you send a request to your API and wait for the response. Asynchronous actions are handled in parallel, synchronous actions are handled one after another.

What about the `CANCELED` status? Only asynchronous actions can be canceled, this means that the new action was dispatched before the previous action handler finished doing some asynchronous job. Canceling actions can be achieved by providing options to the `@Action` decorator:

```ts
export class NovelsState {
  constructor(private novelsService: NovelsService) {}

  @Action(GetNovels, { cancelUncompleted: true })
  getNovels(ctx: StateContext<Novel[]>) {
    return this.novelsService.getNovels().pipe(
      tap((novels) => {
        ctx.setState(novels);
      }),
    );
  }
}
```

Imagine a component where you've got a button that dispatches the `GetNovels` action on click:

```ts
@Component({
  selector: 'app-novels',
  template: `
    <app-novel
      *ngFor="let novel of novels$ | async"
      [novel]="novel"
    ></app-novel>
    <button (click)="getNovels()">Get novels</button>
  `,
})
export class NovelsComponent {
  @Select(NovelsState) novels$: Observable<Novel[]>;

  constructor(private store: Store) {}

  getNovels() {
    this.store.dispatch(new GetNovels());
  }
}
```

If you click the button twice - two actions will be dispatched and the previous action will be canceled because it's asynchronous. This works exactly the same as `switchMap`. If we didn't use NGXS - the code would look as follows:

```ts
@Component({
  selector: 'app-novels',
  template: `
    <app-novel
      *ngFor="let novel of novels"
      [novel]="novel"
    ></app-novel>
    <button #button>Get novels</button>
  `,
})
export class NovelsComponent implements OnInit {
  @ViewChild('button', { static: true })
  button: ElementRef<HTMLButtonElement>;

  novels: Novel[] = [];

  constructor(private novelsService: NovelsService) {}

  ngOnInit() {
    fromEvent(this.button.nativeElement, 'click')
      .pipe(switchMap(() => this.novelsService.getNovels()))
      .subscribe((novels) => {
        this.novels = novels;
      });
  }
}
```

#### Asynchronous actions

Let's talk more about asynchronous actions, imagine a simple state that stores different genres of books and has the following code:

```ts
export interface BooksStateModel {
  novels: Book[];
  detectives: Book[];
}

export class GetNovels {
  static type = '[Books] Get novels';
}

export class GetDetectives {
  static type = '[Books] Get detectives';
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    novels: [],
    detectives: [],
  },
})
@Injectable()
export class BooksState {
  constructor(private booksService: BooksService) {}

  @Action(GetNovels)
  getNovels(ctx: StateContext<BooksStateModel>) {
    return this.booksService.getNovels().pipe(
      tap((novels) => {
        ctx.patchState({ novels });
      }),
    );
  }

  @Action(GetDetectives)
  getDetectives(ctx: StateContext<BooksStateModel>) {
    return this.booksService.getDetectives().pipe(
      tap((detectives) => {
        ctx.patchState({ detectives });
      }),
    );
  }
}
```

Let's say that you dispatch `GetNovels` and `GetDetectives` actions separately like this:

```ts
store
  .dispatch(new GetNovels())
  .subscribe(() => {
    ...
  });

store
  .dispatch(new GetDetectives())
  .subscribe(() => {
    ...
  });
```

You could correctly assume that the request for `GetNovels` would be dispatched before `GetDetectives`. This is true due to the synchronous nature of the dispatch, but their action handlers are asynchronous so you can't be sure which HTTP response would return first. In this example we dispatch the `GetNovels` action before `GetDetectives`, but if the call to fetch novels takes longer then the `novels` property will be set after `detectives`. The `store.dispatch` function returns an observable that can be used to respond to the completion of each of these actions.

Alternatively you could dispatch an array of actions:

```ts
store
  .dispatch([
    new GetNovels(),
    new GetDetectives()
  ])
  .subscribe(() => {
    ...
  });
```

The order of dispatch would be the same as the previous example, but in this code we are able to subscribe to an observable from the `store.dispatch` function that will fire only when both actions have completed. The below diagram demonstrates how asynchronous actions are handled under the hood:

<https://www.ngxs.io/advanced/actions-life-cycle> &rarr; Image

#### Error life cycle

So, how are errors handled in this regard? Let's say that you dispatch multiple actions at the same time like this:

```ts
store
  .dispatch([
    new GetNovelById(id), // action handler throws `new Error(...)`
    new GetDetectiveById(id),
  ])
  .subscribe(
    () => {
      // they will never see me
    },
    (error) => {
      console.log(error); // `Error` that was thrown by the `getNovelById` handler
    },
  );
```

Because at least one action throws an error NGXS returns an error to the `onError` observable callback and neither the `onNext` or `onComplete` callbacks would be called.

#### Asynchronous Actions continued - "Fire and forget" vs "Fire and wait"

In NGXS, when you do asynchronous work you should return an `Observable` or `Promise` from your `@Action` method that represents that asynchronous work (and completion). The completion of the action will then be bound to the completion of the asynchronous work. If you use the `async/await` javascript syntax then NGXS will know about the completion because an `async` method returns the `Promise` for you. If you return an `Observable` NGXS will subscribe to the observable for you and bind the action's completion lifecycle event to the completion of the `Observable`.

Sometimes you may not want the completion of an action to wait for the asynchronous work to complete. This is what we will refer to as "fire and forget". This can be achieved by simply not returning the handle to your asynchronous work from the `@Action` method. Note that in the case of an `Observable` you would have to `.subscribe(...)` or call `.toPromise()` to ensure that your observable runs.

`Observable` version:

```ts
@Action(GetNovels)
getNovels(ctx: StateContext<BooksStateModel>) {
  this.booksService.getNovels().subscribe(novels => {
    ctx.patchState({ novels });
  });
}
```

`Promise` version:

```ts
@Action(GetNovels)
getNovels(ctx: StateContext<BooksStateModel>) {
  this.booksService.getNovels().toPromise()
    .then(novels => {
      ctx.patchState({ novels });
    });
}
```

Another more common use case of using the "fire and forget" approach would be when you dispatch a new action inside a handler and you don't want to wait for the 'child' action to complete. For example, if we want to load detectives right after novels but we don't want the completion of our `GetNovels` action to wait for the detectives to load then we would have the following code:

```ts
export class BooksState {
  constructor(private booksService: BooksService) {}

  @Action(GetNovels)
  getNovels(ctx: StateContext<BooksStateModel>) {
    return this.booksService.getNovels().pipe(
      tap((novels) => {
        ctx.patchState({ novels });
        ctx.dispatch(new GetDetectives());
      }),
    );
  }

  @Action(GetDetectives)
  getDetectives(ctx: StateContext<BooksStateModel>) {
    return this.booksService.getDetectives().pipe(
      tap((detectives) => {
        ctx.patchState({ detectives });
      }),
    );
  }
}
```

Here the `GetDetectives` action would be dispatched just before the `GetNovels` action completes. The `GetDetectives` action is just a "fire and forget" as far as the `GetNovels` action is concerned. To be clear, NGXS will wait for a response from the `getNovels` service call, then it will populate a new state with the returned novels, then it will dispatch the new `GetDetectives` action (which kicks off another asynchronous request), and then `GetNovels` would move into its' success state (without waiting for the completion of the `GetDetectives` action):

```ts
store.dispatch(new GetNovels()).subscribe(() => {
  // they will see me, but detectives will be still loading in the background
});
```

If you want the `GetNovels` action to wait for the `GetDetectives` action to complete, you will have to use `mergeMap` operator (or any operator that maps to the inner `Observable`, like `concatMap`, `switchMap`, `exhaustMap`) so that the `Observable` returned by the `@Action` method has bound its completion to the inner action's completion:

```ts
@Action(GetNovels)
getNovels(ctx: StateContext<BooksStateModel>) {
  return this.booksService.getNovels().pipe(
    tap(novels => {
      ctx.patchState({ novels });
    }),
    mergeMap(() => ctx.dispatch(new GetDetectives()))
  );
}
```

Often this type of code can be made simpler by converting to Promises and using the `async/await` syntax. The same method would be as follows:

```ts
@Action(GetNovels)
async getNovels(ctx: StateContext<BooksStateModel>) {
  const novels = await this.booksService.getNovels().toPromise();
  ctx.patchState({ novels });
  await ctx.dispatch(new GetDetectives()).toPromise();
}
```

Note: leaving out the final `await` keyword here would cause this to be "fire and forget" again.

#### Summary

In summary - any dispatched action starts with the status `DISPATCHED`. Next, NGXS looks for handlers that listen to this action, if there are any — NGXS invokes them and processes the return value and errors. If the handler has done some work and has not thrown an error, the status of the action changes to `SUCCESSFUL`. If something went wrong while processing the action (for example, if the server returned an error) then the status of the action changes to `ERRORED`. And if an action handler is marked as `cancelUncompleted` and a new action has arrived before the old one was processed then NGXS interrupts the processing of the first action and sets the action status to `CANCELED`.

### Action Handlers

Event sourcing involves modeling the state changes made by applications as an immutable sequence or “log” of events.

Instead of focusing on current state, you focus on the changes that have occurred over time. It is the practice of modeling your system as a sequence of events. In NGXS, we called this Action Handlers.

Typically actions directly correspond to state changes but it can be difficult to always make your component react based on state. As a side effect of this paradigm, we end up creating lots of intermediate state properties
to do things like reset a form/etc. Action handlers let us drive our components based on state along with events that are emitted.

For example, if we were to have a shopping cart and we were to delete an item out of it you might want to show a notification that it was successfully removed. In a pure state driven application, you might create some kind
of message array to make the dialog show up. With Action Handlers, we can respond to the action directly.

The action handler is an Observable that receives all the actions dispatched before the state takes any action on it.

Actions in NGXS also have a lifecycle. Since any potential action can be async we tag actions showing when they are "DISPATCHED", "SUCCESSFUL", "CANCELED" or "ERRORED". This gives you the ability to react to actions at different points in their existence.

Since it's an Observable, we can use the following pipes:

- `ofAction`: triggers when any of the below lifecycle events happen
- `ofActionDispatched`: triggers when an action has been dispatched
- `ofActionSuccessful`: triggers when an action has been completed successfully
- `ofActionCanceled`: triggers when an action has been canceled
- `ofActionErrored`: triggers when an action has caused an error to be thrown
- `ofActionCompleted`: triggers when an action has been completed whether it was successful or not (returns completion summary)

All of the above pipes return the original `action` in the observable except for the `ofActionCompleted` pipe which returns some summary information for the completed action. This summary is an object with the following interface:

```ts
interface ActionCompletion<T = any> {
  action: T;
  result: {
    successful: boolean;
    canceled: boolean;
    error?: Error;
  };
}
```

Below is a action handler that filters for `RouteNavigate` actions and then tells the router to navigate to that
route.

```ts
import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class RouteHandler {
  constructor(private router: Router, private actions$: Actions) {
    this.actions$
      .pipe(ofActionDispatched(RouteNavigate))
      .subscribe(({ payload }) => this.router.navigate([payload]));
  }
}
```

Remember you need to make sure to inject the `RouteHandler` somewhere in your application for DI to hook things up. If you want it to happen on application startup, Angular provides a method for doing this:

```ts
import { NgModule, APP_INITIALIZER } from '@angular/core';

// Noop handler for factory function
export function noop() {
  return function () {};
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [RouteHandler],
      multi: true,
    },
  ],
})
export class AppModule {}
```

Action handlers can be used in components too. Given the cart deletion example, we might construct something like:

```ts
@Component({ ... })
export class CartComponent {
  constructor(private actions$: Actions) {}

  ngOnInit() {
    this.actions$
    .pipe(ofActionSuccessful(CartDelete))
    .subscribe(() => alert('Item deleted'));
  }
}
```

Remember to unsubscribe from an action handler with something like this:

```ts
@Component({ ... })
export class CartComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  constructor(private actions$: Actions) {}

  ngOnInit() {
    this.actions$
      .pipe(
        ofActionSuccessful(CartDelete),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => alert('Item deleted'));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
```

### Canceling

If you have an async action, you may want to cancel a previous Observable if the action has been dispatched again.

This is useful for canceling previous requests like in a typeahead.

#### Basic

For basic scenarios, we can use the `cancelUncompleted` action decorator option.

```ts
import { Injectable } from '@angular/core';
import { State, Action } from '@ngxs/store';

@State<ZooStateModel>({
  defaults: {
    animals: []
  }
})
@Injectable()
export class ZooState {
  constructor(private animalService: AnimalService, private actions$: Actions) {}

  @Action(FeedAnimals, { cancelUncompleted: true })
  get(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
    return this.animalService.get(action.payload).pipe(
      tap((res) => ctx.setState(res))
    ));
  }
}
```

#### Advanced

For more advanced cases, we can use normal Rx operators.

```ts
import { Injectable } from '@angular/core';
import { State, Action, Actions, ofAction } from '@ngxs/store';
import { tap } from 'rxjs/operators';

@State<ZooStateModel>({
  defaults: {
    animals: []
  }
})
@Injectable()
export class ZooState {
  constructor(private animalService: AnimalService, private actions$: Actions) {}

  @Action(FeedAnimals)
  get(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
    return this.animalService.get(action.payload).pipe(
      tap((res) => ctx.setState(res)),
      takeUntil(this.actions$.pipe(ofAction(RemoveTodo)))
    ));
  }
}
```

### Composition

You can compose multiple stores together using class inheritance. This is quite simple:

```ts
@State({
  name: 'zoo',
  defaults: {
    type: null,
  },
})
@Injectable()
class ZooState {
  @Action(Eat)
  eat(ctx: StateContext) {
    ctx.setState({ type: 'eat' });
  }
}

@State({
  name: 'stlzoo',
})
@Injectable()
class StLouisZooState extends ZooState {
  @Action(Drink)
  drink(ctx: StateContext) {
    ctx.setState({ type: 'drink' });
  }
}
```

Now when `StLouisZooState` is invoked, it will share the actions of the `ZooState`. Also all state options are inherited.

### Error Handling

NGXS uses Angular's default `ErrorHandler` class, so if an action throws an error, Angular's `ErrorHandler` is called. You can easily override this flow by providing your own handler like so:

```ts
import { NgModule, ErrorHandler } from '@angular/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.log('ERROR! ', error);

    // Make sure to rethrow the error so Angular can pick it up
    throw error;
  }
}

@NgModule({
  imports: [AppComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler,
    },
  ],
})
export class AppModule {}
```

#### Handling errors within an `@Select`

```ts
@Component({ ... })
class AppComponent {
  @Select(state => state.count.number.value) count$: Observable<number>;
}
```

Let's take a look at the below example:

```ts
this.store.reset({}); // reset all states
```

The catch is that when resetting the entire state, the object will no longer have those deeply nested properties (`state.count.number.value`). Given the following code:

```ts
const state = {};

function getCount() {
  return state.count.number.value;
}

const count = getCount(); // will throw
```

RxJS will automatically complete the stream under the hood if any error is thrown.

You have to disable suppressing errors using the `suppressErrors` option:

```ts
@NgModule({
  imports: [
    NgxsModule.forRoot([CountState], {
      selectorOptions: {
        suppressErrors: false, // `true` by default
      },
    }),
  ],
})
export class AppModule {}
```

This option allows to track errors and handle them.

```ts
@Component({ ... })
class AppComponent {
  @Select(state => {
    try {
      return state.count.number.value;
    } catch (error) {
      console.log('error', error);
      // throw error;
      // Automatic unsubscription will occur if
      // you use the `throw` statement here.
      // Skip it if you don't want the stream
      // to be completed on error.
    }
  })
  count$: Observable<number>;
}
```

##### Why does RxJS unsubscribe on error?

RxJS [design guidelines](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/observable.md#executing-observables) provides a great explanation of this behavior.

#### Handling errors within an `@Action`

When you define an @Action you can handle error within the action and if you do so, the error will not propagate to Angular's global `ErrorHandler`, nor the `dispatch` Observable. This applies to both sync and async types of Actions.

```ts
  @Action(HandledError)
  handledError(ctx: StateContext<StateModel>) {
    try {
      // error is thrown
    } catch (err) {
      console.log(`error catched inside
      @Action wont propagate to ErrorHandler
      or dispatch subscription`)
    }
  }
```

#### Handling errors after dispatching an action

If an unhandled exception is thrown inside an action, the error will be propagated to the `ErrorHandler` and you can also catch it subscribing to the `dispatch` Observable. If you subscribe to the `dispatch` Observable the error will be caught twice, once in the ErrorHandler and on your `dispatch` handle.

```ts
  @Action(UnhandledError)
  unhandledError(ctx: StateContext<StateModel>) {
    // error is thrown
  }
```

```ts
  unhandled() {
    this.store.dispatch(new UnhandledError()).pipe(
      catchError(err => {
        console.log('unhandled error on dispatch subscription')
        return of('')
      })
    ).subscribe();
  }
```

It is recommended to handle errors within `@Action` and update state to reflect the error, which you can later select to display where required.

You can play around with error handling in this following [stackblitz](https://stackblitz.com/edit/ngxs-error-handling)

### Lazy Loaded Stores

Stores can be lazy-loaded easily by importing the `NgxsModule` using the
`forFeature` method. All the other syntax for how you import
and describe them are the same. For example:

```ts
@NgModule({
  imports: [NgxsModule.forFeature([LazyState])],
})
export class LazyModule {}
```

It's important to note when lazy-loading a store, it is registered in the global
state so this state object will now be persisted globally. Even though
it's available globally, you should only use it within that feature module so you
make sure not to create dependencies on things that could not be loaded yet.

How are feature states added to the global state graph? Assume you've got a `ZoosState`:

```ts
@State<Zoo[]>({
  name: 'zoos',
  defaults: [],
})
@Injectable()
export class ZoosState {}
```

And it's registered in the root module via `NgxsModule.forRoot([ZoosState])`. Assume you've got a feature `offices` state:

```ts
@State<Office[]>({
  name: 'offices',
  defaults: [],
})
@Injectable()
export class OfficesState {}
```

You register this state in some lazy-loaded module via `NgxsModule.forFeature([OfficesState])`. After the lazy module is loaded - the global state will have such signature:

```ts
{
  zoos: [],
  offices: []
}
```

You can try it yourself by invoking `store.snapshot()` and printing the result to the console before and after the lazy module is loaded.

### Life-cycle

States can implement life-cycle events.

#### `ngxsOnChanges`

If a state implements the NgxsOnChanges interface, its ngxsOnChanges method respond when (re)sets state. The states' ngxsOnChanges methods are invoked in a topological sorted order going from parent to child. The first parameter is the NgxsSimpleChange object of current and previous state.

```ts
export interface ZooStateModel {
  animals: string[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    animals: [],
  },
})
@Injectable()
export class ZooState implements NgxsOnChanges {
  ngxsOnChanges(change: NgxsSimpleChange) {
    console.log('prev state', change.previousValue);
    console.log('next state', change.currentValue);
  }
}
```

#### `ngxsOnInit`

If a state implements the `NgxsOnInit` interface, its `ngxsOnInit` method will be invoked after
all the states from the state's module definition have been initialized and pushed into the state stream.
The states' `ngxsOnInit` methods are invoked in a topological sorted order going from parent to child.
The first parameter is the `StateContext` where you can get the current state and dispatch actions as usual.

```ts
export interface ZooStateModel {
  animals: string[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    animals: [],
  },
})
@Injectable()
export class ZooState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<ZooStateModel>) {
    console.log('State initialized, now getting animals');
    ctx.dispatch(new GetAnimals());
  }
}
```

#### `ngxsAfterBootstrap`

If a state implements the `NgxsAfterBootstrap` interface, its `ngxsAfterBootstrap` method will be invoked after the root view and all its children have been rendered, because Angular invokes functions, retrieved from the injector by `APP_BOOTSTRAP_LISTENER` token, only after creating and attaching `ComponentRef` of the root component to the tree of views.

```ts
export interface ZooStateModel {
  animals: string[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    animals: [],
  },
})
@Injectable()
export class ZooState implements NgxsAfterBootstrap {
  ngxsAfterBootstrap(ctx: StateContext<ZooStateModel>) {
    console.log('The application has been fully rendered');
    ctx.dispatch(new GetAnimals());
  }
}
```

#### Lifecycle sequence

After creating the state by calling its constructor, NGXS calls the lifecycle hook methods in the following sequence at specific moments:

| Hook                 | Purpose and Timing                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| ngxsOnChanges()      | Called _before_ `ngxsOnInit()` and whenever state changes.                                               |
| ngxsOnInit()         | Called _once_, after the _first_ `ngxsOnChanges()` and _before_ the `APP_INITIALIZER` token is resolved. |
| ngxsAfterBootstrap() | Called _once_, after the root view and all its children have been rendered.                              |

#### Feature Modules Order of Imports

If you have feature modules they need to be imported after the root module:

```ts
// feature.module.ts
@NgModule({
  imports: [NgxsModule.forFeature([FeatureState])],
})
export class FeatureModule {}

// app.module.ts
@NgModule({
  imports: [NgxsModule.forRoot([]), FeatureModule],
})
export class AppModule {}
```

#### APP_INITIALIZER Stage

##### Theoretical Introduction

The `APP_INITIALIZER` is just a token that references Promise factories. If you've ever used the `APP_INITIALIZER` token, then you are already familiar with its syntax:

```ts
export function appInitializerFactory() {
  return () => Promise.resolve();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
    },
  ],
})
export class AppModule {}
```

This token is injected into `ApplicationInitStatus` class. What does Angular do under the hood? It gets an instance of this class and invokes the `runInitializers` method:

```ts
const initStatus = moduleRef.injector.get(ApplicationInitStatus);
initStatus.runInitializers();
```

All that it does inside this method is looping via the `APP_INITIALIZER` array (as it's a `multi` token) and invoking those factories, that you've provided in `useFactory` properties:

```ts
for (let i = 0; i < this.appInits.length; i++) {
  const initResult = this.appInits[i]();
  if (isPromise(initResult)) {
    asyncInitPromises.push(initResult);
  }
}
```

Then `asyncInitPromises` are provided into `Promise.all`. That's all the magic. That's why the `bootstrapModule` returns a `Promise`:

```ts
platformBrowser()
  .bootstrapModule(AppModule)
  .then(() => {
    console.log('Hey there!');
  });
```

##### APP_INITIALIZER and NGXS

Everything that we examined earlier is very important, because from this comes the fact that `APP_INITIALIZER` is resolved after NGXS states are initialized. They are initialized by the `NgxsModule` that is imported into the `AppModule`. The `ngxsOnInit` method on states is also invoked before the `APP_INITIALIZER` token is resolved. Given the following code:

```ts
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private version: string | null = null;

  constructor(private http: HttpClient) {}

  loadVersion(): Observable<string> {
    return this.http.get<string>('/api/version').pipe(
      tap((version) => {
        this.version = version;
      }),
    );
  }

  getVersion(): never | string {
    if (this.version === null) {
      throw new Error('"version" is not available yet!');
    }

    return this.version;
  }
}

@State<string | null>({
  name: 'version',
  defaults: null,
})
@Injectable()
export class VersionState implements NgxsOnInit {
  constructor(private configService: ConfigService) {}

  ngxsOnInit(ctx: StateContext<string | null>) {
    ctx.setState(this.configService.getVersion());
  }
}

export function appInitializerFactory(configService: ConfigService) {
  return () => configService.loadVersion().toPromise();
}

@NgModule({
  imports: [NgxsModule.forRoot([VersionState])],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [ConfigService],
    },
  ],
})
export class AppModule {}
```

The above example is used only for demonstration purposes! This code will throw an error because the `getVersion` method is invoked before the `version` property is set. Why? Because the `ngxsOnInit` methods on states are invoked before the `APP_INITIALIZER` is invoked!

##### Solution

There are different solutions. Let's look at the simplest. The first solution would be to use the `ngxsAfterBootstrap` method:

```ts
@State<string | null>({
  name: 'version',
  defaults: null,
})
@Injectable()
export class VersionState implements NgxsAfterBootstrap {
  constructor(private configService: ConfigService) {}

  ngxsAfterBootstrap(ctx: StateContext<string | null>) {
    ctx.setState(this.configService.getVersion());
  }
}
```

The second solution would be dispatching some `SetVersion` action right after the version is fetched:

```ts
export class SetVersion {
  static readonly type = '[Version] Set version';
  constructor(public version: string) {}
}

@State<string | null>({
  name: 'version',
  defaults: null,
})
@Injectable()
export class VersionState {
  @Action(SetVersion)
  setVersion(
    ctx: StateContext<string | null>,
    action: SetVersion,
  ): void {
    ctx.setState(action.version);
  }
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient, private store: Store) {}

  loadVersion() {
    return this.http.get<string>('/api/version').pipe(
      tap((version) => {
        this.store.dispatch(new SetVersion(version));
      }),
    );
  }
}
```

##### Summary

In conclusion, do not try to access any data in state constructors or `ngxsOnInit` methods that is fetched during the `APP_INITIALIZER` stage.

### Mapped Sub States

NGXS provides the ability to merge multiple dynamic selectors into one.

Let's look at the code below:

```ts
interface Animal {
  type: string;
  age: string;
  name: string;
}

@State<Animal[]>({
  name: 'animals',
  defaults: [
    { type: 'zebra', age: 'old', name: 'Ponny' },
    { type: 'panda', age: 'young', name: 'Jimmy' },
  ],
})
@Injectable()
export class ZooState {
  static pandas(age: string) {
    return createSelector([ZooState], (state: Animal[]) => {
      return state.filter(
        (animal) => animal.type === 'panda' && animal.age === age,
      );
    });
  }

  static zebras(age: string) {
    return createSelector([ZooState], (state: Animal[]) => {
      return state.filter(
        (animal) => animal.type === 'zebra' && animal.age === age,
      );
    });
  }

  static pandasAndZebras(age: string) {
    return createSelector(
      [ZooState.pandas(age), ZooState.zebras(age)],
      (pandas: Animal[], zebras: Animal[]) => {
        return [pandas, zebras];
      },
    );
  }
}
```

This construct will merge 2 dynamic selectors and memoize the result.

Another example could be multiple Zoos in our application:

```ts
interface Animal {
  type: string;
  age: string;
  name: string;
}

interface ZooStateModel {
  [id: string]: {
    animals: Animal[];
    ageFilter: string;
  };
}

@State<ZooStateModel>({
  name: 'animals',
  defaults: {
    zoo1: {
      ageFilter: 'young',
      animals: [
        { type: 'zebra', age: 'old', name: 'Ponny' },
        { type: 'panda', age: 'young', name: 'Jimmy' },
      ],
    },
  },
})
@Injectable()
export class ZooState {
  static getZooAnimals(zooName: string) {
    return createSelector(
      [ZooState],
      (state: ZooStateModel) => state[zooName].animals,
    );
  }

  static pandas(zooName: string) {
    return createSelector(
      [ZooState.getZooAnimals(zooName)],
      (state: Animal[]) => {
        return state.filter(
          (animal) =>
            animal.type === 'panda' && animal.age === 'young',
        );
      },
    );
  }

  static pandasWithoutMemoize(zooName: string) {
    return createSelector([ZooState], (state: ZooStateModel) => {
      return state[zooName].animals.filter(
        (animal) => animal.type === 'panda' && animal.age === 'young',
      );
    });
  }
}
```

In that example merging is required to avoid unnecessary store events.

When we subscribe to **Zoo.pandasWithoutMemoize** store will dispatch event whenever **ZooState** will **change** (even ZooState.ageFilter), but when subscribing to **Zoo.pandas** store will dispatch event only if result has been changed.

### Meta Reducers

A meta reducer is a higher order reducer that allows you to
take action on the global state rather than a state slice.
In NGXS, we don't have this concept but you can accomplish
this with &rarr; `plugins`.

An example of a meta reducer might be to clear the entire
state when a user logs out. An example implementation would be:

```ts
import { getActionTypeFromInstance } from '@ngxs/store';

export function logoutPlugin(state, action, next) {
  // Use the get action type helper to determine the type
  if (getActionTypeFromInstance(action) === Logout.type) {
    // if we are a logout type, lets erase all the state
    state = {};
  }

  // return the next function with the empty state
  return next(state, action);
}
```

Then we import that like:

```ts
import { NgModule } from '@angular/core';
import { NGXS_PLUGINS } from '@ngxs/store';

@NgModule({
  imports: [NgxsModule.forRoot([])],
  providers: [
    {
      provide: NGXS_PLUGINS,
      useValue: logoutPlugin,
      multi: true,
    },
  ],
})
export class AppModule {}
```

Now when we dispatch the logout action it will use our new
plugin and erase the state.

### Optimizing Selectors

Selectors are responsible for providing state data to your application. As your application code grows, naturally the number of selectors you create also increases. Ensuring your selectors are optimized can be instrumental in building a faster performing application.

#### Memoization

Selectors are memoized functions. Memoized functions are calculated when their arguments change and the results are cached. Regardless of how many components or services consume a selector, a selector will calculate only once when state changes and the cached result will be returned to all consumers. Taking advantage of this feature can result in performance increases.

For example, there exists this state model:

```ts
interface SomeStateModel {
  data: Data[];
  name: string;
}
```

And in this example there is an input component where a user can type a name. On key down, an action is dispatched updating the `name` property of state. On the same page, another component renders `data`. In order to render state data we create a selector in our state class:

```ts
@Selector()
static getViewData(state: SomeStateModel) {
   return state.data.map(d => expensiveFunction(d));
}
```

Selectors defined in state classes implicitly have `state` injected as their first argument. The above selector will be recalculated every time the user types into the input component.

Since `state` could update rapidly when a user types, the expensive selector will needlessly recalculate even though it does not care about the `name` property of `state` changing. This selector does not take advantage of memoization.

One way to solve this problem is to turn off the `injectContainerState` selector **option** at _root_, _state_, or **selector level**.

By default (in NGXS v3), the state is implicitly injected as the first argument for composite selectors _defined within state classes_.

Turning off this setting prevents the container state from being injected as the first argument. This requires you to explicitly specify all arguments when you use the `@Selector([...])` decorator.

Any parameterless `@Selector()` decorators will still inject the state as an implicit argument. Note that this option does not apply to selectors declared _outside of state classes_ (because there is no container state to inject). For example, we create two selectors in our state class:

```ts
@Selector([SomeState])
static getData(state: SomeStateModel) {
   return state.data;
}

@Selector([SomeState.getData])
static getViewData(data: Data[]) {
  return data.map(d => expensiveFunction(d));
}
```

This `getViewData` selector will not be recalculated when a user types into the input component. This selector targets the specific property of `state` it cares about as its argument by leveraging an additional selector. When the `name` property of state changes, the `getViewData` arguments _do not change_. Memoization is taken advantage of.

An alternative solution to turning off the selector option is to create a **meta selector**. For example, we declare one selector in our state class and declare another selector outside of our state class:

```ts
@State({...})
@Injectable()
export class SomeState {
  @Selector()
  static getData(state: SomeStateModel) {
    return state.data;
  }
}

export class SomeStateQueries {
  @Selector([SomeState.getData])
  static getViewData(data: Data[]) {
    return data.map(d => expensiveFunction(d));
  }
}
```

#### Implementation

Selectors are calculated when state changes. As your application grows, the number of state changes increases. Finding optimizations in your selector implementations can have significant benefits.

For example, say you have this state model:

```ts
interface SelectedDataStateModel {
  selectedIds: number[];
}
```

And you have this selector:

```ts
@Selector([SelectedDataState])
isDataSelected(state: SelectedDataStateModel) {
  return (id: number) => state.selectedIds.includes(id);
}
```

The above selector is an example of a **lazy selector**.

This selector returns a function, which accepts an `id` as an argument and returns a boolean indicating whether or not this `id` is selected. The lazy selector returned by `isDataSelected` uses [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) and has `O(n)` time complexity. In this example, we want to render a list of checkboxes:

```html
<ng-container *ngIf="isDataSelected$ | async as isDataSelected">
  <data-check-box
    *ngFor="data of data$ | async"
    [checked]="isDataSelected(d.id)"
  ></data-check-box>
</ng-container>
```

When a user checks or unchecks an item, `state.selectedIds` is updated, therefore the `isDataSelected` selector is recalculated and the list must re-render.

Every time the list re-renders, the lazy selector `isDataSelected` is invoked `data.length` number of times. Because the lazy selector implementation has `O(n)` time complexity, this template renders with `O(n^2)` time complexity - **Ugh!**.

One magnitude of `n` for the length of `data` , another for `state.selectedIds.length`.

Here's one way to improve performance in that example:

```ts
@Selector([SelectedDataState])
isDataSelected(state: SelectedDataStateModel) {
  const selectedIds = new Set(state.selectedIds);
  return (id: number) => selectedIds.has(id);
}
```

The above selector implementation creates a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). The lazy selector returned by `isDataSelected` _is a closure with access to the `selectedIds` variable created in the parent function_. The lazy selector uses [Set.has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) which has `O(1)` time complexity.

Now when the list re-renders, because the lazy selector has `O(1)` time complexity, this template renders with `O(n)` time complexity. This optimizes performance by a magnitude of `n`.

### Shared State

Shared States

Shared state is the ability to get state from one state container and use its properties
in another state container in a read-only manner. While it's not natively supported it can
be accomplished.

Let's say you have 2 stores: Animals and Preferences. In your preferences store, which is backed
by `localstorage`, you have the sort order for the Animals. You need to get the state from the
preferences in order to be able to sort your animals. This is achievable with `selectSnapshot`.

```ts
@State<PreferencesStateModel>({
  name: 'preferences',
  defaults: {
    sort: [{ prop: 'name', dir: 'asc' }]
  }
})
@Injectable()
export class PreferencesState {
  @Selector()
  static getSort(state: PreferencesStateModel) {
    return state.sort;
  }
}

@State<AnimalStateModel>({
  name: 'animals',
  defaults: [
    animals: []
  ]
})
@Injectable()
export class AnimalState {

  constructor(private store: Store) {}

  @Action(GetAnimals)
  getAnimals(ctx: StateContext<AnimalStateModel>) {
    const state = ctx.getState();

    // select the snapshot state from preferences
    const sort = this.store.selectSnapshot(PreferencesState.getSort);

    // do sort magic here
    return state.sort(sort);
  }

}
```

### State Operators

#### Why?

The NGXS `patchState` method is used to do [immutable object](https://en.wikipedia.org/wiki/Immutable_object) updates to the container state slice without the typical long-handed syntax. This is very neat and convenient because you do not have to use the `getState` and `setState` as well as the `Object.assign(...)`or the spread operator to update the state. The `patchState` method only offers a shallow patch and as a result is left wanting in more advanced scenarios. This is where state operators come in. The `setState` method can be passed a state operator which will be used to determine the new state.

#### Basic

The basic idea of operators is that we could describe the modifications to the state using curried functions that are given any inputs that they need to describe the change and are finalized using the state slice that they are assigned to.

#### Example

From theory to practice - let's take the following example:

```ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

export interface AnimalsStateModel {
  zebras: string[];
  pandas: string[];
  monkeys?: string[];
}

export class CreateMonkeys {
  static readonly type = '[Animals] Create monkeys';
}

@State<AnimalsStateModel>({
  name: 'animals',
  defaults: {
    zebras: [],
    pandas: [],
  },
})
@Injectable()
export class AnimalsState {
  @Action(CreateMonkeys)
  createMonkeys(ctx: StateContext<AnimalsStateModel>) {
    ctx.setState(
      patch({
        monkeys: [],
      }),
    );
  }
}
```

The `patch` operator expresses the intended modification quite nicely and returns a function that will apply these modifications as a new object based on the provided state.
In order to understand what this is doing let's express this in a long handed form:

```ts
  // For demonstration purposes! This long handed form is not needed from NGXS v3.4 onwards.
  @Action(CreateMonkeys)
  createMonkeys(ctx: StateContext<AnimalsStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      monkeys: []
    });
  }
```

##### Supplied State Operators

This is not the only operator, we introduce much more that can be used along with or in place of `patch`.

If you want to update the value of a property based on some condition - you can use `iif`, it's signature is:

```ts
iif<T>(
  condition: Predicate<T> | boolean,
  trueOperatorOrValue: StateOperator<T> | T,
  elseOperatorOrValue?: StateOperator<T> | T
): StateOperator<T>
```

If you want to update an item in the array using an operator or value - you can use `updateItem`, it's signature is:

```ts
updateItem<T>(selector: number | Predicate<T>, operator: T | StateOperator<T>): StateOperator<T[]>
```

If you want to remove an item from an array by index or predicate - you can use `removeItem`:

```ts
removeItem<T>(selector: number | Predicate<T>): StateOperator<T[]>
```

If you want to insert an item to an array, optionally before a specified index - use `insertItem` operator:

```ts
insertItem<T>(value: T, beforePosition?: number): StateOperator<T[]>
```

If you want to append specified items to the end of an array - the `append` operator is suitable for that:

```ts
append<T>(items: T[]): StateOperator<T[]>
```

It's also possible to compose multiple operators into a single operator that would apply each consecutively using `compose`:

```ts
compose<T>(...operators: StateOperator<T>[]): StateOperator<T>
```

These operators introduce a new way of declarative state mutation.

##### Advanced Example

Let's look at more advanced examples:

```ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

export interface AnimalsStateModel {
  zebras: string[];
  pandas: string[];
}

export class AddZebra {
  static readonly type = '[Animals] Add zebra';
  constructor(public payload: string) {}
}

export class RemovePanda {
  static readonly type = '[Animals] Remove panda';
  constructor(public payload: string) {}
}

export class ChangePandaName {
  static readonly type = '[Animals] Change panda name';
  constructor(public payload: { name: string; newName: string }) {}
}

@State<AnimalsStateModel>({
  name: 'animals',
  defaults: {
    zebras: ['Jimmy', 'Jake', 'Alan'],
    pandas: ['Michael', 'John']
  }
})
@Injectable()
export class AnimalsState {
  @Action(AddZebra)
  addZebra(ctx: StateContext<AnimalsStateModel>, { payload }: AddZebra) {
    ctx.setState(
      patch({
        zebras: append([payload])
      })
    );
  }

  @Action(RemovePanda)
  removePanda(ctx: StateContext<AnimalsStateModel>, { payload }: RemovePanda) {
    ctx.setState(
      patch({
        pandas: removeItem<string>(name => name === payload)
      })
    );
  }

  @Action(ChangePandaName)
  changePandaName(ctx: StateContext<AnimalsStateModel>, { payload }: ChangePandaName) {
    ctx.setState(
      patch({
        pandas: updateItem<string>(name => name === payload.name, payload.newName)
      })
    );
  }
```

You will see that in each case above the state operators are wrapped within a call to the `patch` operator. This is only done because of the convenience that the `patch` state operator provides for targeting a nested property of the state.

##### Custom Operators

You can also define your own operators for updates that are common to your domain. For example:

```ts
function addEntity(
  entity: Entity,
): StateOperator<EntitiesStateModel> {
  return (state: ReadOnly<EntitiesStateModel>) => {
    return {
      ...state,
      entities: { ...state.entities, [entity.id]: entity },
      ids: [...state.ids, entity.id],
    };
  };
}

interface CitiesStateModel {
  // ...
}

@State<CitiesStateModel>({
  name: 'cities',
  defaults: {
    entities: {},
    ids: [],
  },
})
@Injectable()
export class CitiesState {
  @Action(AddCity)
  addCity(ctx: StateContext<CitiesStateModel>, { payload }: AddCity) {
    ctx.setState(addEntity(payload.city));
  }
}
```

Here you can see that the developer chose to define a convenience method called `addEntity` for doing a common state modification. This operator could also have also been defined using existing operators like so:

```ts
function addEntity(
  entity: Entity,
): StateOperator<EntitiesStateModel> {
  return patch<EntitiesStateModel>({
    entities: patch({ [entity.id]: entity }),
    ids: append([entity.id]),
  });
}
```

As you can see, state operators are very powerful to start moving your immutable state updates to be more declarative and expressive. Enhancing the overall maintainability and readability of your state class code.

##### Relevant Articles

[NGXS State Operators](https://medium.com/ngxs/ngxs-state-operators-8b339641b220)

### Sub States

Complex and large state graphs are difficult to manage. Oftentimes we need to break these down into sub states that we can manage on a individual basis. With NGXS, we can use a concept called sub states to handle this.

Image: <https://github.com/ngxs/store/blob/release/docs/assets/unidirectional.png>

#### Unidirectional Data Flow in NGXS

Unidirectional data flow as a pattern is usually mentioned when talking about performance in Angular. The reason why data flows from top to bottom, is because change detection is also always performed from top to bottom for every single component, every single time, starting from the root component. Unidirectional data flow is much easier to debug as it has no side effects unlike the AngularJS's digest cycle. The view is stable throughout a single rendering pass.

Unidirectional data flow policy is also applied to the state management. We have to make sure that states are independent and do not affect each other, the child state should know nothing about its parent. Potentially that could lead to unpredictable side effects. Our states are meant to be encapsulated from each other and only the parent can manage its children.

&rarr; Graphic

#### Example

Let's take the following example state graph:

```ts
{
  cart: {
    checkedout: false,
    items: [],
    saved: {
      dateSaved: new Date(),
      items: []
    };
  }
}
```

At the top, we have a `cart` with several items associated to its state.
Beneath that we have a `saved` object which represents another state slice.
To express this relationship with NGXS, we simply need to use the `children`
property in the `@State` decorator:

```ts
export interface CartStateModel {
  checkedout: boolean;
  items: CartItem[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    checkedout: false,
    items: [],
  },
  children: [CartSavedState],
})
@Injectable()
export class CartState {}
```

Then we describe our sub-state like normal:

```ts
export interface CartSavedStateModel {
  dateSaved: Date;
  items: CartItem[];
}

@State<CartSavedStateModel>({
  name: 'saved',
  defaults: {
    dateSaved: new Date(),
    items: [],
  },
})
@Injectable()
export class CartSavedState {}
```

The relationship between these two are bound by their hierarchical order. To finish this up, we need to import both of these into the `NgxsModule`:

```ts
@NgModule({
  imports: [NgxsModule.forRoot([CartState, CartSavedState])],
})
export class AppModule {}
```

The store will then automatically recognize the relationship and bind them together.

#### Caveats

This is only intended to work with nested objects, so trying to create stores on
nested array objects will not work.

Sub states can only be used once, reuse implies several restrictions that would eliminate some high value features. If you want to re-use them, just create a new state and inherit from it.

#### Preventing sub-state erasure

Let's have a look at the state graph again:

```ts
{
  cart: {
    checkedout: false,
    items: [],
    saved: {
      dateSaved: new Date(),
      items: []
    };
  }
}
```

This means that you have to avoid using `setState` function in the parent `CartState` state as your child state will erase. Assume you've got an action called `SetCheckedoutAndItems`:

```ts
export interface CartStateModel {
  checkedout: boolean;
  items: CartItem[];
}

export class SetCheckedoutAndItems {
  static type = '[Cart] Set checkedout and items';
  constructor(public checkedout: boolean, public items: CartItem[]) {}
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    checkedout: false,
    items: [],
  },
  children: [CartSavedState],
})
@Injectable()
export class CartState {
  @Action(SetCheckedoutAndItems)
  setCheckedoutAndItems(
    ctx: StateContext<CartStateModel>,
    { checkedout, items }: SetCheckedoutAndItems,
  ): void {
    ctx.patchState({ checkedout, items });
  }
}
```

If we had used the `setState` function - we would have overwritten the whole state value and our sub-state `CartSavedState` would be erased. The `patchState` function allows us to update only needed properties and preserve our sub-state safe and sound.

### Recipes

<https://www.ngxs.io/recipes>

#### Authentication

- Authentication <https://www.ngxs.io/recipes/authentication>

#### Caching

- Caching <https://www.ngxs.io/recipes/cache>

#### Component Events from NGXS

- Component Events from NGXS <https://www.ngxs.io/recipes/component-events-from-ngxs>

#### Debouncing Actions

- Debouncing Actions <https://www.ngxs.io/recipes/debouncing-actions>

#### Dynamic Plugins

- Dynamic Plugins <https://www.ngxs.io/recipes/dynamic-plugins>

#### Immutability Helpers

- Immutability Helpers <https://www.ngxs.io/recipes/immutability-helpers>

#### Style Guide

- Style Guide <https://www.ngxs.io/recipes/style-guide>

#### Unit Testing

- Unit Testing <https://www.ngxs.io/recipes/unit-testing>

#### RxAngular Integration

- RxAngular Integration <https://www.ngxs.io/recipes/intregration-with-rxangular>

### Plugins

#### Introduction

- Introduction <https://www.ngxs.io/plugins/intro>

#### cli

- CLI <https://www.ngxs.io/plugins/cli>

#### logger

- Logger <https://www.ngxs.io/plugins/logger>

#### devtools

- Devtools <https://www.ngxs.io/plugins/devtools>

#### storage

- Storage <https://www.ngxs.io/plugins/storage>

#### form

- Forms <https://www.ngxs.io/plugins/form>

#### websocket

- Web Socket <https://www.ngxs.io/plugins/websocket>

#### router

- Router <https://www.ngxs.io/plugins/router>

#### hmr

- HMR <https://www.ngxs.io/plugins/hmr>

> As of Angular v10, HMR is no longer supported and will be deprecated.
>
> As a workaround to keep store's state on full-page reloads you can use [`@ngxs/storage-plugin`](https://www.ngxs.io/plugins/storage). Here's a [basic implementation example](https://stackblitz.com/edit/ngxs-hmr-workaround-using-storage-plugin)

## Labs

Intro: <https://www.ngxs.io/ngxs-labs/intro>
Github: <https://github.com/ngxs-labs>

### Stable Packages

#### @ngxs-labs/data

- <https://www.npmjs.com/package/@ngxs-labs/data>

#### @ngxs-labs/emitter

- <https://www.npmjs.com/package/@ngxs-labs/emitter>

#### @ngxs-labs/immer-adapter

- <https://www.npmjs.com/package/@ngxs-labs/immer-adapter>

#### @ngxs-labs/dispatch-decorator

- <https://www.npmjs.com/package/@ngxs-labs/dispatch-decorator>

#### @ngxs-labs/select-snapshot

- <https://www.npmjs.com/package/@ngxs-labs/select-snapshot>

### Alpha or in Development

#### @ngxs-labs/async-storage-plugin

- <https://www.npmjs.com/package/@ngxs-labs/async-storage-plugin>

#### @ngxs-labs/entity-state

- <https://www.npmjs.com/package/@ngxs-labs/entity-state>

#### @ngxs-labs/actions-executing

- <https://www.npmjs.com/package/@ngxs-labs/actions-executing>

#### @ngxs-labs/attach-action

- <https://www.npmjs.com/package/@ngxs-labs/attach-action>

#### @ngxs-labs/firestore-plugin

- <https://www.npmjs.com/package/@ngxs-labs/firestore-plugin>
