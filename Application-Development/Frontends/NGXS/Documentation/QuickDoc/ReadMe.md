# NGXS - Short Documentation

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Setup](#setup)
- [Important Keynotes & Necessary Files](#important-keynotes--necessary-files)
  - [1. **`<state-name>.model.ts`**](#1-state-namemodelts)
  - [2. **`<state-name>.actions.ts`**](#2-state-nameactionsts)
  - [3. **`<state-name>.state.ts`**](#3-state-namestatets)
  - [Optional: 4. File `<state-name>.service.ts`](#optional-4-file-state-nameservicets)
  - [Using in a Component](#using-in-a-component)
- [Basic Examples](#basic-examples)
  - [1. Model](#1-model)
  - [2. Actions](#2-actions)
  - [3. State](#3-state)
  - [Using Store (in Components or Services)](#using-store-in-components-or-services)
    - [First of all: See the template](#first-of-all-see-the-template)
    - [Using in Components](#using-in-components)
      - [@Select and Store Methods](#select-and-store-methods)
        - [Dispatching: Using additional RxJS Operators](#dispatching-using-additional-rxjs-operators)
      - [Using @Select and @Dispatch Decorators in a Component](#using-select-and-dispatch-decorators-in-a-component)
    - [Using in a Service](#using-in-a-service)
      - [@Select and @Dispatch Decorators in a Service](#select-and-dispatch-decorators-in-a-service)
        - [Consume the Service in a Component](#consume-the-service-in-a-component)

<!-- /code_chunk_output -->

## Setup

> See other documents for details, here the concept only.

- Install it as a shared library in a NxMonorepo: e.g. CustomStoreModule
   - contains empty state `[]` and options:
   `NgxsModule.forRoot([], { developmentMode: !environment.production })`
   - In Nx v16+ &rarr; Environment variables handled differently, see [here](https://nx.dev/recipes/angular/use-environment-variables-in-angular)
- Import it in any of the applications in the NxMonoRepo: e.g. `AppModule`
  - `NgxsModule.forFeature([InitialStateOfTheApp])`
  - Important: **"forFeature"**.

## Important Keynotes & Necessary Files

- Do not compare it directly with @ngrx/store, NGXS does not need effects, there are "Action Handlers" for this purpose. (ignore `ngxs/effects` library).
- Basic concepts are similar, **3 files would be enough**.

### 1. **`<state-name>.model.ts`**

See examples chapter below.

- You need it first, because you need to define the type of the state.
- It contains:
  - the type of the state: SomeStateModel
  - the token of the state: SOME_STATE_TOKEN
  - the default values of the state: SomeStateDefaults

### 2. **`<state-name>.actions.ts`**

See examples chapter below.

- You need to create it, before creating the state.
- Create a namespace and create actions within it.
- Actions:
  - Must be defined as **classes**, with a **static readonly type** property.
  - The **type** property must be **unique**.
  - The **constructor** is **optional**;
    - **but necessary if** you want to pass **data (payload)** to the action.
  - **Create TypeDefs** for the payload, **if** it is **not a primitive type**.
    - In the basic example below it is a string (= no need for TypeDef)

### 3. **`<state-name>.state.ts`**

See examples chapter below.

- State: Must be defined as classes, with a `@State` decorator.
- It is an @Injectable() class (A kind of Angular Service)
- The state class must have a `@Selector` decorator for each property.
- The state class must have a `@Action` decorator for each action.
- The constructor is optional, but can be used to initialize the state.

### Optional: 4. File `<state-name>.service.ts`

If you need to use **Action Handlers**, you should create a new Service and consume it in the component. What are Action Handlers? See the examples below.

Short explanation, they are similar to:

- Lifecycle Hooks in Angular,
- Effects in @ngrx/store
- Redux-Saga in Redux

### Using in a Component

See examples chapter below, here a short summary:

- @Select and @Dispatch decorators will be used in components/services.
  - @Select: To select a property from the state.
  - @Dispatch: To dispatch an action.
  - Both of them are **observables**.
  - By using in templates: **async** pipe is needed.

## Basic Examples

### 1. Model

```ts
import { StateToken } from '@ngxs/store';

export type SomeStateNameModel = {
  msg: string;
};

export const SOME_STATE_TOKEN = new StateToken<SomeStateNameModel>(
  /**
   * That is the name of the state in the store, you will
   * see it in the Redux DevTools.
   */

  'someState',
);

export const SomeStateNameDefaults: SomeStateNameModel = {
  msg: "Hello World!"
};
```

### 2. Actions

> - **payload** is the state property name, which will be updated.
    - In this case: `msg`
> - Define a TypeDef for the payload, if it is not a primitive type.

```ts
export namespace SomeStateNameActions {
  export class UpdateMsg {
    static readonly type = '[Some State Name] Update Msg';
    constructor(public msg: string) {}
  }
}
```

### 3. State

```ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SomeStateNameModel, SOME_STATE_TOKEN, SomeStateNameDefaults } from './somewhere/some-';
import { SomeStateNameActions } from './somewhere/some-state-name.actions';

@State<SomeStateNameModel>({
  name: SOME_STATE_TOKEN,
  defaults: SomeStateNameDefaults,
})
@Injectable()

export class SomeStateNameState {
  constructor() {}
  @Selector()
  static msgSelector(state: SomeStateNameModel) {
    return state.msg;
  }

  @Action(SomeStateNameActions.UpdateMsg)
  updateMsg(
    { patchState }: StateContext<SomeStateNameModel>,
    // { payload }: SomeStateNameActions.SomeAction,
    { msg }: SomeStateNameActions.UpdateMsg,
  ) {
    patchState({ msg: msg });
  }
}
```

### Using Store (in Components or Services)

#### First of all: See the template

It containts `msg$` observable, which is the state property, and `updateMsg()` method, which dispatches the action.

```html
<p>{{ msg$ | async }}</p>
<button (click)="updateMsg('Hello World!')">Update Msg</button>
```

#### Using in Components

##### @Select and Store Methods

```ts
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SomeStateNameModel } from './somewhere/some-state-name.model';
import { SomeStateNameActions } from './somewhere/some-state-name.actions';

@Component({
  selector: 'app-some-component',
  templateUrl: './some-component.component.html',
  styleUrls: ['./some-component.component.scss'],
})
export class SomeComponentComponent implements OnInit {

  /**
   * You can only @Select something, which is already defined
   * in the state class before, by using a @Selector decorator.
   *
   * See the state class and the selector section above. Here an excerpt:
   *
   *   @Selector()
   *   static msgSelector(state: SomeStateNameModel) {
   *     return state.msg;
   *     }
   *
   * Important: NO @Select WITHOUT @Selector!
   */


  @Select(SomeStateNameState.msgSelector) msg$: Observable<string>;

  constructor(private store: Store) {}
  ngOnInit(): void {}

  updateMsg(msg: string) {

    /**
     * Eventthough you can use the store.dispatch() method,
     * it is easier to use the @Dispatch decorator. (See examples below)
     *
     * You can also use a service, which itself can dispatch the action
     * by using the @Dispatch decorator. (See examples below)
     */

    this.store.dispatch(new SomeStateNameActions.UpdateMsg(msg));
  }
}
```

###### Dispatching: Using additional RxJS Operators

```ts
  // excerpt from the component above
  updateMsg(msg: string) {
       this.store
      .dispatch(new SomeStateNameActions.UpdateMsg(msg))
      /**
       * withLatestFrom is used to get the updated value.
       * this.msg$ is defined above by using @Select decorator.
       *
       * dispatch will update the state, and the state will be
       * updated in the store, and the store will be updated
       * in the component.
       *
       * After it is an observable, you need to use `withLatestFrom`
       * to get the (last) updated value.
       */
      .pipe(withLatestFrom(this.msg$))
      .subscribe(([_, msg]) => {
        /**
         * _ is the result of the dispatch, it is not used here, e.g.:
         * { type: "[Some State Name] Update Msg", msg: "Hello World!" }
         * "msg" is the updated value of the state property.
         *
         * Do something with the updated 'msg' value, if you want.
         */
        this.form.reset();
      });
  }
```

##### Using @Select and @Dispatch Decorators in a Component

Die simpliest way to use the state in a component is to use the `@Select` and `@Dispatch` decorators. See the example below, how easy it is:

```ts
// excerpt from the component above
export class SomeComponentComponent implements OnInit {
  @Select(SomeStateNameState.msgSelector) msg$: Observable<string>;
  @Dispatch() updateMsgAction = (msg: string) => new SomeStateNameActions.UpdateMsg(msg);

  updateMsg(msg: string) {
    this.updateMsgAction(msg); // updateMsg -> updateMsgAction
  }
}

```

#### Using in a Service

##### @Select and @Dispatch Decorators in a Service

**Best Practice:** If you handle with **Action Handlers**, you should use a service. See the example below, how easy it is:

```ts
import { Injectable } from '@angular/core';
import {
  Store,
  Select,
  Actions,
  ofActionSuccessful,
  ofActionDispatched,
  ofActionErrored,
  } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { SomeStateNameModel } from './somewhere/some-';
import { SomeStateNameActions } from './somewhere/some-state-name.actions';

@Injectable()
export class SomeStateService {
  @Select(SomeStateNameState.msgSelector) msg$: Observable<string>;
  @Dispatch() updateMsg = (msg: string) => new SomeStateNameActions.UpdateMsg(msg);

  constructor(private store: Store, private actions$: Actions) {

    /**
     * These are the so called "Action Handlers".
     * Similar to the "Effects" in @ngrx/store.
     * But much easier to use.
     *
     * You will need them, if you e.g. handle with api calls;
     * you can use the response of an action to dispatch another action.
     *
     * Another usecase would be to dispatch an action, if another action
     * was errorneous.
     *
     * There are 6 different action handlers:
     *
     * - ofActionDispatched
     * - ofActionSuccessful
     * - ofActionCanceled
     * - ofActionErrored
     * - ofActionCompleted
     * - ofAction // Dispatched or Completed (Successful or Errored)
     *
     * You see below 3 Examples.
     */


    this.actions$
      .pipe(ofActionSuccessful(SomeStateNameActions.UpdateMsg))
      .subscribe(() => {
        console.log('UpdateMsg action was successful');
      });

    this.actions$
      .pipe(ofActionDispatched(SomeStateNameActions.UpdateMsg))
      .subscribe(() => {
        console.log('UpdateMsg action was dispatched');
      });

    this.actions$
      .pipe(ofActionErrored(SomeStateNameActions.UpdateMsg))
      .subscribe(() => {
        console.log('UpdateMsg action was errored');
      });

    this.msg$.subscribe((msg) => {

      /**
       * Do something with the updated 'msg' value, if you want.
       */
    });
}
```

###### Consume the Service in a Component

```ts
import { Component, OnInit } from '@angular/core';
import { SomeStateService } from './some-state.service';

@Component({
  selector: 'app-some-component',
  templateUrl: './some-component.component.html',
  styleUrls: ['./some-component.component.scss'],
})

export class SomeComponentComponent implements OnInit {

  @Select(SomeStateNameState.msgSelector) msg$: Observable<string>;

  constructor(private someStateService: SomeStateService) {}
  ngOnInit(): void {}

  updateMsg(msg: string) {
    this.someStateService
      .updateMsg(msg)
      .pipe(withLatestFrom(this.someStateService.msg$))
      .subscribe(([_, msg]) => {
        this.form.reset();
      });
  }
}
```
