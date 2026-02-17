# NGXS Simulating Effects with Action Handlers

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ngx-effects approach](#ngx-effects-approach)
- [Own Approach](#own-approach)

<!-- /code_chunk_output -->

## ngx-effects approach

See online for Details <npmjs.com/package/ngx-effects>

```ts
export declare const actionStatus: {
    dispatched: (a: any) => boolean;
    successful: (a: any) => boolean;
    error: (a: any) => boolean;
    canceled: (a: any) => boolean;
    completed: (a: any) => boolean;
};
export declare const ActionLifecycle: {
    onDispatched: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onSuccess: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onError: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onCanceled: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onCompleted: () => import("rxjs").MonoTypeOperatorFunction<any>;
};
```

## Own Approach

```ts
export function ofActionCanceled<T>(actionType: string): MonoTypeOperatorFunction<T> {
  return filter((action: Action) => action.type === actionType && action.status === ActionStatus.Canceled);
}

export function ofActionCompleted<T>(actionType: string): MonoTypeOperatorFunction<T> {
  return filter((action: Action) => action.type === actionType && action.status === ActionStatus.Completed);
}

export function ofActionDispatched<T>(actionType: string): MonoTypeOperatorFunction<T> {
  return filter((action: Action) => action.type === actionType && action.status === ActionStatus.Dispatched);
}

export function ofActionErrored<T>(actionType: string): MonoTypeOperatorFunction<T> {
  return filter((action: Action) => action.type === actionType && action.status === ActionStatus.Errored);
}

export function ofAction<T>(actionType: string): MonoTypeOperatorFunction<T> {
  return filter((action: Action) => action.type === actionType);
}

export function ofActionSuccessful<T>(actionType: string): MonoTypeOperatorFunction<T> {
  return filter((action: Action) => action.type === actionType && action.status === ActionStatus.Successful);
}

export enum StoreActionType {
  onCanceled = ofActionCanceled,
  onCompleted = ofActionCompleted,
  onDispatched = ofActionDispatched,
  onErrored = ofActionErrored,
  onAction = ofAction, // Dispatched or Completed
  onSuccess = ofActionSuccessful,
}

import { State, Action, StateContext } from '@ngxs/store';
import { StoreActionType } from './store-action-type.enum';

export class MyAction {
  static readonly type = '[MyFeature] MyAction';
}

@State({
  name: 'myFeature',
  defaults: {}
})
export class MyFeatureState {
  @Action(MyAction)
  myAction(ctx: StateContext<any>) {
    console.log('MyAction dispatched');
  }

  @Action(MyAction, { type: StoreActionType.onCompleted })
  myActionCompleted(ctx: StateContext<any>) {
    console.log('MyAction completed');
  }

  @Action(MyAction, { type: StoreActionType.onSuccess })
  myActionSuccess(ctx: StateContext<any>) {
    console.log('MyAction successful');
  }

  @Action(MyAction, { type: StoreActionType.onCanceled })
  myActionCanceled(ctx: StateContext<any>) {
    console.log('MyAction canceled');
  }

  @Action(MyAction, { type: StoreActionType.onDispatched })
  myActionDispatched(ctx: StateContext<any>) {
    console.log('MyAction dispatched');
  }

  @Action(MyAction, { type: StoreActionType.onErrored })
  myActionErrored(ctx: StateContext<any>) {
    console.log('MyAction errored');
  }
}
```
